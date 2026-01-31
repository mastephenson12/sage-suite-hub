import React, { useState, useEffect, useRef, useCallback } from 'react';
import { LiveServerMessage, Modality } from '@google/genai';
import { geminiService } from '../services/gemini';

// Audio Helpers as per guidelines
function decode(base64: string) {
  const binaryString = atob(base64);
  const len = binaryString.length;
  const bytes = new Uint8Array(len);
  for (let i = 0; i < len; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }
  return bytes;
}

function encode(bytes: Uint8Array) {
  let binary = '';
  const len = bytes.byteLength;
  for (let i = 0; i < len; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return btoa(binary);
}

async function decodeAudioData(
  data: Uint8Array,
  ctx: AudioContext,
  sampleRate: number,
  numChannels: number,
): Promise<AudioBuffer> {
  const dataInt16 = new Int16Array(data.buffer);
  const frameCount = dataInt16.length / numChannels;
  const buffer = ctx.createBuffer(numChannels, frameCount, sampleRate);

  for (let channel = 0; channel < numChannels; channel++) {
    const channelData = buffer.getChannelData(channel);
    for (let i = 0; i < frameCount; i++) {
      channelData[i] = dataInt16[i * numChannels + channel] / 32768.0;
    }
  }
  return buffer;
}

export const LiveVoiceView: React.FC = () => {
  const [isActive, setIsActive] = useState(false);
  const [transcription, setTranscription] = useState<string>('');
  const [status, setStatus] = useState<'idle' | 'connecting' | 'listening'>('idle');
  
  const sessionRef = useRef<any>(null);
  const audioContextRef = useRef<{ input: AudioContext; output: AudioContext } | null>(null);
  const sourcesRef = useRef<Set<AudioBufferSourceNode>>(new Set());
  const nextStartTimeRef = useRef<number>(0);
  const streamRef = useRef<MediaStream | null>(null);

  const stopSession = useCallback(() => {
    if (sessionRef.current) {
      sessionRef.current.close();
      sessionRef.current = null;
    }
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }
    sourcesRef.current.forEach(source => {
      try { source.stop(); } catch(e) {}
    });
    sourcesRef.current.clear();
    setIsActive(false);
    setStatus('idle');
  }, []);

  const startSession = async () => {
    try {
      setStatus('connecting');
      const ai = geminiService.getClient();
      if (!ai) throw new Error("Satellite Link Down");
      
      const inputCtx = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 16000 });
      const outputCtx = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 24000 });
      audioContextRef.current = { input: inputCtx, output: outputCtx };
      
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      streamRef.current = stream;

      const sessionPromise = ai.live.connect({
        model: 'gemini-2.5-flash-native-audio-preview-12-2025',
        callbacks: {
          onopen: () => {
            console.log('Voice session opened');
            setStatus('listening');
            setIsActive(true);

            const source = inputCtx.createMediaStreamSource(stream);
            const scriptProcessor = inputCtx.createScriptProcessor(4096, 1, 1);
            
            scriptProcessor.onaudioprocess = (e) => {
              const inputData = e.inputBuffer.getChannelData(0);
              const l = inputData.length;
              const int16 = new Int16Array(l);
              for (let i = 0; i < l; i++) {
                int16[i] = inputData[i] * 32768;
              }
              const pcmBlob = {
                data: encode(new Uint8Array(int16.buffer)),
                mimeType: 'audio/pcm;rate=16000',
              };
              
              sessionPromise.then(session => {
                session.sendRealtimeInput({ media: pcmBlob });
              });
            };

            source.connect(scriptProcessor);
            scriptProcessor.connect(inputCtx.destination);
          },
          onmessage: async (message: LiveServerMessage) => {
            if (message.serverContent?.outputTranscription) {
              setTranscription(prev => prev + ' ' + message.serverContent?.outputTranscription?.text);
            }

            const base64Audio = message.serverContent?.modelTurn?.parts[0]?.inlineData?.data;
            if (base64Audio) {
              nextStartTimeRef.current = Math.max(nextStartTimeRef.current, outputCtx.currentTime);
              const buffer = await decodeAudioData(decode(base64Audio), outputCtx, 24000, 1);
              const source = outputCtx.createBufferSource();
              source.buffer = buffer;
              source.connect(outputCtx.destination);
              source.addEventListener('ended', () => sourcesRef.current.delete(source));
              source.start(nextStartTimeRef.current);
              nextStartTimeRef.current += buffer.duration;
              sourcesRef.current.add(source);
            }

            if (message.serverContent?.interrupted) {
              sourcesRef.current.forEach(s => { try { s.stop(); } catch(e) {} });
              sourcesRef.current.clear();
              nextStartTimeRef.current = 0;
            }
          },
          onerror: (e) => {
            console.error('Voice Error:', e);
            stopSession();
          },
          onclose: () => {
            console.log('Voice session closed');
            stopSession();
          }
        },
        config: {
          responseModalities: [Modality.AUDIO],
          speechConfig: {
            voiceConfig: { prebuiltVoiceConfig: { voiceName: 'Zephyr' } }
          },
          outputAudioTranscription: {},
          systemInstruction: 'You are Sage Voice, a helpful AI in the Sage Suite. You are engaging in a natural conversation. Be warm and helpful.'
        }
      });

      sessionRef.current = await sessionPromise;
    } catch (err) {
      console.error("Failed to start voice:", err);
      setStatus('idle');
    }
  };

  useEffect(() => {
    return () => stopSession();
  }, [stopSession]);

  return (
    <div className="flex flex-col h-full items-center justify-center p-6 bg-gradient-to-b from-transparent to-blue-900/10">
      <div className="mb-12 text-center">
        <h1 className="text-3xl font-bold text-white mb-2">Voice Sage</h1>
        <p className="text-gray-400">Natural voice interactions with Gemini Live</p>
      </div>

      <div className="relative mb-20">
        <div className={`absolute -inset-10 rounded-full blur-3xl transition-all duration-1000 ${
          isActive ? 'bg-blue-500/30 scale-125' : 'bg-transparent scale-100'
        }`}></div>
        
        <button
          onClick={isActive ? stopSession : startSession}
          disabled={status === 'connecting'}
          className={`relative z-10 w-48 h-48 rounded-full flex flex-col items-center justify-center transition-all duration-500 shadow-2xl ${
            isActive 
            ? 'bg-red-500 shadow-red-500/20' 
            : 'bg-white text-black shadow-white/10 hover:scale-105'
          }`}
        >
          {isActive ? (
            <>
              <svg className="w-16 h-16 mb-2" fill="currentColor" viewBox="0 0 24 24">
                <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
              </svg>
              <span className="font-bold uppercase tracking-widest text-xs">Stop</span>
            </>
          ) : (
            <>
              <svg className="w-16 h-16 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
              </svg>
              <span className="font-bold uppercase tracking-widest text-xs">
                {status === 'connecting' ? 'Connecting...' : 'Start Session'}
              </span>
            </>
          )}
        </button>

        {isActive && (
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 pointer-events-none">
            <div className="absolute inset-0 border-2 border-blue-500/50 rounded-full animate-ping opacity-20"></div>
            <div className="absolute inset-4 border-2 border-blue-400/30 rounded-full animate-ping [animation-delay:-0.5s] opacity-20"></div>
          </div>
        )}
      </div>

      <div className="max-w-2xl w-full">
        <div className="glass rounded-3xl p-8 min-h-[150px] flex flex-col">
          <div className="flex items-center space-x-2 mb-4">
             <div className={`w-2 h-2 rounded-full ${isActive ? 'bg-green-500 animate-pulse' : 'bg-gray-600'}`}></div>
             <span className="text-xs font-bold uppercase tracking-widest text-gray-500">Live Transcript</span>
          </div>
          <p className="text-lg text-gray-200 leading-relaxed italic">
            {transcription || "Transcription will appear here as you speak..."}
          </p>
        </div>
        
        <div className="mt-8 flex justify-center space-x-8 text-gray-500 text-xs font-medium uppercase tracking-widest">
          <div className="flex items-center space-x-2">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-500"></span>
            <span>PCM 16k Input</span>
          </div>
          <div className="flex items-center space-x-2">
            <span className="w-1.5 h-1.5 rounded-full bg-purple-500"></span>
            <span>PCM 24k Output</span>
          </div>
          <div className="flex items-center space-x-2">
            <span className="w-1.5 h-1.5 rounded-full bg-green-500"></span>
            <span>Zero Latency</span>
          </div>
        </div>
      </div>
    </div>
  );
};
