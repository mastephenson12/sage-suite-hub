import React, { useState, useEffect, useRef, useCallback } from 'react';
import { LiveServerMessage, Modality } from '@google/genai';
// Fixed: Removed .ts extension from import
import { geminiService } from '../services/gemini';

// Audio Encoding & Decoding Utilities (Manual implementation as per guidelines)
function decode(base64: string) {
  const binaryString = atob(base64);
  const bytes = new Uint8Array(binaryString.length);
  for (let i = 0; i < binaryString.length; i++) bytes[i] = binaryString.charCodeAt(i);
  return bytes;
}

function encode(bytes: Uint8Array) {
  let binary = '';
  for (let i = 0; i < bytes.byteLength; i++) binary += String.fromCharCode(bytes[i]);
  return btoa(binary);
}

async function decodeAudioData(data: Uint8Array, ctx: AudioContext, sampleRate: number, numChannels: number): Promise<AudioBuffer> {
  const dataInt16 = new Int16Array(data.buffer);
  const frameCount = dataInt16.length / numChannels;
  const buffer = ctx.createBuffer(numChannels, frameCount, sampleRate);
  for (let channel = 0; channel < numChannels; channel++) {
    const channelData = buffer.getChannelData(channel);
    for (let i = 0; i < frameCount; i++) channelData[i] = dataInt16[i * numChannels + channel] / 32768.0;
  }
  return buffer;
}

const VoiceConcierge: React.FC = () => {
  const [isActive, setIsActive] = useState(false);
  const [transcription, setTranscription] = useState('');
  const [status, setStatus] = useState<'idle' | 'connecting' | 'active'>('idle');
  
  const sessionRef = useRef<any>(null);
  const audioCtxRef = useRef<{ input: AudioContext; output: AudioContext } | null>(null);
  const sourcesRef = useRef<Set<AudioBufferSourceNode>>(new Set());
  const nextStartTimeRef = useRef(0);
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
    sourcesRef.current.forEach(s => {
      try { s.stop(); } catch(e) {}
    });
    sourcesRef.current.clear();
    setIsActive(false);
    setStatus('idle');
  }, []);

  const startVoice = async () => {
    try {
      setStatus('connecting');
      const ai = geminiService.getClient();
      if (!ai) throw new Error("Satellite Link Down");

      const outputCtx = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 24000 });
      const inputCtx = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 16000 });
      audioCtxRef.current = { input: inputCtx, output: outputCtx };

      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      streamRef.current = stream;

      const sessionPromise = ai.live.connect({
        model: 'gemini-2.5-flash-native-audio-preview-12-2025',
        callbacks: {
          onopen: () => {
            setIsActive(true);
            setStatus('active');
            const source = inputCtx.createMediaStreamSource(stream);
            const processor = inputCtx.createScriptProcessor(4096, 1, 1);
            processor.onaudioprocess = (e) => {
              const data = e.inputBuffer.getChannelData(0);
              const int16 = new Int16Array(data.length);
              for (let i = 0; i < data.length; i++) int16[i] = data[i] * 32768;
              sessionPromise.then(s => {
                if(s) s.sendRealtimeInput({ media: { data: encode(new Uint8Array(int16.buffer)), mimeType: 'audio/pcm;rate=16000' } });
              });
            };
            source.connect(processor);
            processor.connect(inputCtx.destination);
          },
          onmessage: async (msg: LiveServerMessage) => {
            if (msg.serverContent?.outputTranscription) {
              setTranscription(t => (t + ' ' + msg.serverContent?.outputTranscription?.text).slice(-200));
            }
            const audio = msg.serverContent?.modelTurn?.parts[0]?.inlineData?.data;
            if (audio) {
              nextStartTimeRef.current = Math.max(nextStartTimeRef.current, outputCtx.currentTime);
              const buffer = await decodeAudioData(decode(audio), outputCtx, 24000, 1);
              const src = outputCtx.createBufferSource();
              src.buffer = buffer;
              src.connect(outputCtx.destination);
              src.onended = () => sourcesRef.current.delete(src);
              src.start(nextStartTimeRef.current);
              nextStartTimeRef.current += buffer.duration;
              sourcesRef.current.add(src);
            }
            if (msg.serverContent?.interrupted) {
              sourcesRef.current.forEach(s => { try { s.stop(); } catch(e) {} });
              sourcesRef.current.clear();
              nextStartTimeRef.current = 0;
            }
          },
          onclose: () => stopSession(),
          onerror: (e) => {
            console.error("Voice Error:", e);
            stopSession();
          }
        },
        config: {
          responseModalities: [Modality.AUDIO],
          outputAudioTranscription: {},
          speechConfig: {
            voiceConfig: { prebuiltVoiceConfig: { voiceName: 'Zephyr' } }
          },
          systemInstruction: 'You are Sage, the authoritative and high-performance AI Concierge for the Adventure Command Center. You provide expert guidance for Flightsage, Travelsage, and Campsage. Your tone is editorial, elite, and efficient.'
        }
      });
      sessionRef.current = await sessionPromise;
    } catch (e) {
      console.error(e);
      setStatus('idle');
    }
  };

  useEffect(() => {
    return () => stopSession();
  }, [stopSession]);

  return (
    <div className="flex flex-col items-center justify-center p-12 bg-zinc-50/50 rounded-sm border border-zinc-100 min-h-[450px]">
      <div className="relative mb-16">
        <div className={`absolute -inset-10 rounded-full blur-3xl transition-all duration-1000 ${isActive ? 'bg-zinc-200/50 scale-110' : 'bg-transparent scale-100'}`}></div>
        <div className={`w-32 h-32 rounded-full border-2 flex items-center justify-center transition-all duration-700 ${isActive ? 'border-black scale-105' : 'border-zinc-200 opacity-50'}`}>
          <div className={`w-16 h-16 bg-black rounded-full shadow-2xl ${isActive ? 'animate-pulse' : ''}`}></div>
        </div>
      </div>
      
      <div className="text-center">
        <h3 className="text-xl font-black uppercase tracking-[0.2em] mb-4">Voice Adventure Guide</h3>
        <p className="text-zinc-500 max-w-sm mb-10 text-xs font-medium leading-relaxed uppercase tracking-widest">
          Low-latency PCM interface for gear advice, itinerary mapping, and wilderness inquiries across all travel brands.
        </p>
        
        <button 
          onClick={isActive ? stopSession : startVoice}
          disabled={status === 'connecting'}
          className={`px-12 py-4 text-[10px] font-black uppercase tracking-widest transition-all ${
            isActive 
            ? 'bg-white text-red-600 border border-zinc-200 hover:bg-zinc-50' 
            : 'bg-black text-white hover:scale-105 active:scale-95'
          }`}
        >
          {status === 'connecting' ? 'Connecting Engine...' : isActive ? 'End Session' : 'Initiate Concierge'}
        </button>
      </div>

      {isActive && (
        <div className="mt-16 w-full max-w-lg">
          <div className="flex items-center space-x-2 mb-4 justify-center">
             <div className="w-1.5 h-1.5 rounded-full bg-black animate-pulse"></div>
             <p className="text-[9px] font-black uppercase tracking-widest text-zinc-400">Live Transcription Active</p>
          </div>
          <div className="p-6 bg-white border border-zinc-100 rounded-sm min-h-[80px] flex items-center justify-center text-center">
            <p className="italic text-zinc-800 text-sm leading-relaxed">
              {transcription ? `"${transcription}..."` : "Awaiting user input..."}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default VoiceConcierge;
  );
};

export default VoiceConcierge;
