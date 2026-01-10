
import React, { useState, useRef, useEffect, useCallback } from 'react';
import { GoogleGenAI, Modality } from '@google/genai';
import { Sparkles, X, Mic, Waves, Info } from 'lucide-react';

// Audio decoding functions as per requirements
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

const VoiceConcierge: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const sessionRef = useRef<any>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const inputAudioContextRef = useRef<AudioContext | null>(null);
  const outputNodeRef = useRef<GainNode | null>(null);
  const sourcesRef = useRef<Set<AudioBufferSourceNode>>(new Set());
  const nextStartTimeRef = useRef<number>(0);
  const streamRef = useRef<MediaStream | null>(null);

  const stopSession = useCallback(() => {
    if (sessionRef.current) {
      sessionRef.current.close?.();
      sessionRef.current = null;
    }
    if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop());
        streamRef.current = null;
    }
    setIsActive(false);
  }, []);

  const startSession = async () => {
    try {
      setError(null);
      setIsActive(true);
      
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      
      const inputAudioContext = new (window.AudioContext || (window as any).webkitAudioContext)({sampleRate: 16000});
      const outputAudioContext = new (window.AudioContext || (window as any).webkitAudioContext)({sampleRate: 24000});
      inputAudioContextRef.current = inputAudioContext;
      audioContextRef.current = outputAudioContext;
      
      const outputNode = outputAudioContext.createGain();
      outputNode.connect(outputAudioContext.destination);
      outputNodeRef.current = outputNode;

      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      streamRef.current = stream;

      const sessionPromise = ai.live.connect({
        model: 'gemini-2.5-flash-native-audio-preview-12-2025',
        callbacks: {
          onopen: () => {
            const source = inputAudioContext.createMediaStreamSource(stream);
            const scriptProcessor = inputAudioContext.createScriptProcessor(4096, 1, 1);
            
            scriptProcessor.onaudioprocess = (audioProcessingEvent) => {
              const inputData = audioProcessingEvent.inputBuffer.getChannelData(0);
              
              // Convert to PCM 16-bit
              const l = inputData.length;
              const int16 = new Int16Array(l);
              for (let i = 0; i < l; i++) {
                int16[i] = inputData[i] * 32768;
              }
              const pcmBlob = {
                data: encode(new Uint8Array(int16.buffer)),
                mimeType: 'audio/pcm;rate=16000',
              };

              sessionPromise.then((session) => {
                session.sendRealtimeInput({ media: pcmBlob });
              });
            };
            
            source.connect(scriptProcessor);
            scriptProcessor.connect(inputAudioContext.destination);
          },
          onmessage: async (message) => {
            const base64EncodedAudioString = message.serverContent?.modelTurn?.parts[0]?.inlineData?.data;
            if (base64EncodedAudioString && audioContextRef.current && outputNodeRef.current) {
                const ctx = audioContextRef.current;
                nextStartTimeRef.current = Math.max(nextStartTimeRef.current, ctx.currentTime);
                
                const audioBuffer = await decodeAudioData(
                    decode(base64EncodedAudioString),
                    ctx,
                    24000,
                    1
                );
                
                const source = ctx.createBufferSource();
                source.buffer = audioBuffer;
                source.connect(outputNodeRef.current);
                source.addEventListener('ended', () => {
                    sourcesRef.current.delete(source);
                });
                
                source.start(nextStartTimeRef.current);
                nextStartTimeRef.current += audioBuffer.duration;
                sourcesRef.current.add(source);
            }

            if (message.serverContent?.interrupted) {
                for (const source of sourcesRef.current.values()) {
                    source.stop();
                    sourcesRef.current.delete(source);
                }
                nextStartTimeRef.current = 0;
            }
          },
          onerror: (e) => {
            console.error('Session Error:', e);
            setError("The concierge is having trouble connecting. Try again later.");
            stopSession();
          },
          onclose: () => {
            setIsActive(false);
          }
        },
        config: {
          responseModalities: [Modality.AUDIO],
          speechConfig: {
            voiceConfig: { prebuiltVoiceConfig: { voiceName: 'Kore' } },
          },
          systemInstruction: "You are the SageSuite Adventure Concierge. Your mission is to help families and groups of friends plan incredible journeys. Be warm, enthusiastic, and focus on details like safety, family-friendly vibes, and creating lasting memories. Suggest specific activities like stargazing, hiking, or campfire storytelling based on the brand context.",
        }
      });

      sessionRef.current = await sessionPromise;
    } catch (err) {
      console.error(err);
      setError("Microphone access is required to speak with the concierge.");
      setIsActive(false);
    }
  };

  return (
    <>
      {/* Floating Button */}
      <button 
        onClick={() => setIsOpen(true)}
        className="fixed bottom-10 right-10 w-20 h-20 rounded-[2rem] bg-gradient-to-br from-brand-400 to-indigo-600 shadow-2xl flex items-center justify-center group hover:scale-110 active:scale-95 transition-all z-[60]"
      >
        <Sparkles className="w-8 h-8 text-white fill-current group-hover:rotate-12 transition-transform" />
        <div className="absolute inset-0 bg-white/20 rounded-[2rem] animate-ping opacity-20" />
      </button>

      {/* Overlay */}
      {isOpen && (
        <div className="fixed inset-0 z-[100] bg-slate-950/90 backdrop-blur-3xl animate-in fade-in duration-500 flex flex-col items-center justify-center p-8 text-white">
            <button 
                onClick={() => { setIsOpen(false); stopSession(); }}
                className="absolute top-10 right-10 p-4 bg-white/10 hover:bg-white/20 rounded-full transition-colors"
            >
                <X className="w-6 h-6" />
            </button>

            <div className="max-w-2xl w-full text-center space-y-12">
                <div className="space-y-4">
                    <h2 className="text-4xl font-black tracking-tighter">Your Adventure Guide</h2>
                    <p className="text-slate-400 font-medium">Talk to me about your next family trip or group getaway.</p>
                </div>

                <div className="relative h-64 flex items-center justify-center">
                    {isActive ? (
                        <div className="flex items-center space-x-2">
                            {[...Array(12)].map((_, i) => (
                                <div 
                                    key={i}
                                    className="w-1.5 bg-gradient-to-t from-brand-400 to-indigo-500 rounded-full animate-wave"
                                    style={{ 
                                        height: `${20 + Math.random() * 60}px`,
                                        animationDelay: `${i * 0.1}s` 
                                    }}
                                />
                            ))}
                        </div>
                    ) : (
                        <div className="w-48 h-48 rounded-[3rem] bg-white/5 border border-white/10 flex items-center justify-center animate-pulse">
                            <Mic className="w-12 h-12 text-slate-500" />
                        </div>
                    )}
                </div>

                <div className="flex flex-col items-center gap-6">
                    {error && (
                        <div className="flex items-center space-x-2 text-rose-400 bg-rose-500/10 px-4 py-2 rounded-xl text-sm font-bold">
                            <Info className="w-4 h-4" />
                            <span>{error}</span>
                        </div>
                    )}
                    
                    {!isActive ? (
                        <button 
                            onClick={startSession}
                            className="px-12 py-5 bg-white text-slate-950 rounded-[2rem] font-black text-lg shadow-2xl hover:scale-105 active:scale-95 transition-all flex items-center"
                        >
                            <Mic className="w-6 h-6 mr-3 text-brand-500" />
                            Connect Now
                        </button>
                    ) : (
                        <button 
                            onClick={stopSession}
                            className="px-12 py-5 bg-rose-500 text-white rounded-[2rem] font-black text-lg shadow-2xl hover:scale-105 active:scale-95 transition-all flex items-center"
                        >
                            <Waves className="w-6 h-6 mr-3 animate-pulse" />
                            Disconnect
                        </button>
                    )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-8">
                    <SuggestionCard text="Plan a first-time camping trip" />
                    <SuggestionCard text="Best family hikes near water" />
                    <SuggestionCard text="What gear do I need for kids?" />
                </div>
            </div>
        </div>
      )}

      <style>{`
        @keyframes wave {
          0%, 100% { transform: scaleY(1); }
          50% { transform: scaleY(2); }
        }
        .animate-wave {
          animation: wave 1s infinite ease-in-out;
        }
        @keyframes bounce-slow {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        .animate-bounce-slow {
          animation: bounce-slow 3s infinite ease-in-out;
        }
      `}</style>
    </>
  );
};

const SuggestionCard = ({ text }: { text: string }) => (
    <div className="p-4 bg-white/5 border border-white/10 rounded-2xl text-xs font-bold text-slate-400 hover:bg-white/10 cursor-pointer transition-all">
        "{text}"
    </div>
);

export default VoiceConcierge;
