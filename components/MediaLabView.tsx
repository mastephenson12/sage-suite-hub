import React, { useState } from 'react';
import { GoogleGenAI } from "@google/genai";
import { GeneratedAsset } from '../types.ts';
import { geminiService } from '../services/geminiService.ts';

export const MediaLabView: React.FC = () => {
  const [prompt, setPrompt] = useState('');
  const [assets, setAssets] = useState<GeneratedAsset[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generationType, setGenerationType] = useState<'image' | 'video'>('image');
  const [videoStatus, setVideoStatus] = useState<string>('');

  const generateImage = async () => {
    if (!prompt.trim() || isGenerating) return;

    if (typeof (window as any).aistudio !== 'undefined') {
      const hasKey = await (window as any).aistudio.hasSelectedApiKey();
      if (!hasKey) {
        await (window as any).aistudio.openSelectKey();
      }
    }

    setIsGenerating(true);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY as string });

      const response = await ai.models.generateContent({
        model: 'gemini-3-pro-image-preview',
        contents: { parts: [{ text: prompt }] },
        config: {
          imageConfig: { aspectRatio: "1:1", imageSize: "1K" }
        } as any
      });

      if (!response.candidates?.[0]?.content?.parts) throw new Error("No image data returned.");

      for (const part of response.candidates[0].content.parts) {
        if (part.inlineData) {
          const imageUrl = `data:image/png;base64,${part.inlineData.data}`;
          const newAsset: GeneratedAsset = {
            id: Date.now().toString(),
            type: 'image',
            url: imageUrl,
            prompt: prompt,
            timestamp: new Date()
          };
          setAssets(prev => [newAsset, ...prev]);
          break;
        }
      }
    } catch (error: any) {
      console.error("Image generation failed:", error);
      if (error.message?.includes("Requested entity was not found") || error.status === 404) {
        if ((window as any).aistudio) await (window as any).aistudio.openSelectKey();
      }
    } finally {
      setIsGenerating(false);
    }
  };

  const generateVideo = async () => {
    if (!prompt.trim() || isGenerating) return;
    
    if (typeof (window as any).aistudio !== 'undefined') {
        const hasKey = await (window as any).aistudio.hasSelectedApiKey();
        if (!hasKey) {
            await (window as any).aistudio.openSelectKey();
        }
    }

    setIsGenerating(true);
    setVideoStatus('Establishing Secure Satellite Link...');
    
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY as string });

      let operation = await ai.models.generateVideos({
        model: 'veo-3.1-fast-generate-preview',
        prompt: prompt,
        config: {
          numberOfVideos: 1,
          resolution: '1080p',
          aspectRatio: '16:9'
        }
      });

      while (!operation.done) {
        setVideoStatus('Processing Cinematic Frames via Veo 3.1...');
        await new Promise(resolve => setTimeout(resolve, 10000));
        operation = await ai.operations.getVideosOperation({ operation: operation });
      }

      const downloadLink = operation.response?.generatedVideos?.[0]?.video?.uri;
      if (!downloadLink) throw new Error("Video generation completed but no link found.");
      
      const response = await fetch(`${downloadLink}&key=${process.env.GEMINI_API_KEY}`);
      const blob = await response.blob();
      const videoUrl = URL.createObjectURL(blob);

      const newAsset: GeneratedAsset = {
        id: Date.now().toString(),
        type: 'video',
        url: videoUrl,
        prompt: prompt,
        timestamp: new Date()
      };
      setAssets(prev => [newAsset, ...prev]);
    } catch (error: any) {
      console.error("Video generation failed:", error);
      if (error.message?.includes("Requested entity was not found") || error.status === 404) {
        if ((window as any).aistudio) await (window as any).aistudio.openSelectKey();
      }
    } finally {
      setIsGenerating(false);
      setVideoStatus('');
    }
  };

  return (
    <div className="animate-in fade-in duration-700 h-full flex flex-col">
      <header className="mb-12 flex items-center justify-between shrink-0">
        <div>
          <p className="text-[10px] font-black text-zinc-400 uppercase tracking-[0.4em] mb-4">Generative Lab</p>
          <h2 className="text-3xl font-black tracking-tighter">Media Assets</h2>
        </div>
        <div className="flex bg-zinc-50 p-1 rounded-sm border border-zinc-100">
          <button 
            onClick={() => setGenerationType('image')}
            className={`px-6 py-2 text-[9px] font-black uppercase tracking-widest transition-all ${generationType === 'image' ? 'bg-black text-white shadow-sm' : 'text-zinc-400 hover:text-black'}`}
          >
            Image
          </button>
          <button 
            onClick={() => setGenerationType('video')}
            className={`px-6 py-2 text-[9px] font-black uppercase tracking-widest transition-all ${generationType === 'video' ? 'bg-black text-white shadow-sm' : 'text-zinc-400 hover:text-black'}`}
          >
            Video
          </button>
        </div>
      </header>

      <div className="mb-12 border-b-2 border-zinc-100 pb-12 shrink-0">
        <div className="mb-4 flex items-center gap-2">
           <span className={`w-2 h-2 rounded-full ${generationType === 'video' ? 'bg-blue-500 animate-pulse' : 'bg-black'}`}></span>
           <p className="text-[9px] font-black text-zinc-600 uppercase tracking-widest">
             {generationType === 'video' ? 'Veo Render Key Required' : 'Gemini 3 Pro Imaging Link'}
             {generationType === 'video' && <span className="ml-2 opacity-50">• <a href="https://ai.google.dev/gemini-api/docs/billing" target="_blank" className="underline">Billing Intel</a></span>}
           </p>
        </div>
        <textarea
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder={generationType === 'image' ? "Describe a high-resolution travel scene..." : "Describe a cinematic wilderness sequence..."}
          className="w-full bg-transparent text-black placeholder-zinc-200 text-3xl font-medium focus:outline-none resize-none h-32 mb-8 leading-tight"
        />
        <div className="flex items-center justify-between">
           <p className="text-[9px] font-black uppercase tracking-widest text-zinc-300 italic">
             {generationType === 'image' ? 'Model: Gemini 3 Pro Image' : 'Model: Veo 3.1 Fast'}
           </p>
           <button
             onClick={generationType === 'image' ? generateImage : generateVideo}
             disabled={!prompt.trim() || isGenerating}
             className="px-12 py-4 bg-black text-white text-[10px] font-black uppercase tracking-[0.2em] hover:opacity-80 disabled:opacity-20 transition-all shadow-xl shadow-black/5"
           >
             {isGenerating ? 'Synthesizing...' : `Generate ${generationType}`}
           </button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto custom-scrollbar pr-2">
        {isGenerating && (
          <div className="flex flex-col items-center justify-center py-16">
            <div className="w-8 h-8 border-2 border-zinc-100 border-t-black rounded-full animate-spin mb-6"></div>
            <p className="text-[10px] font-black uppercase tracking-widest text-zinc-400 animate-pulse">
              {videoStatus || 'Synthesizing Media Node...'}
            </p>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pb-12">
          {assets.map((asset) => (
            <div key={asset.id} className="group border border-zinc-100 rounded-sm overflow-hidden hover:border-black transition-all bg-white shadow-sm">
              <div className="aspect-square bg-zinc-50 flex items-center justify-center overflow-hidden">
                {asset.type === 'image' ? (
                  <img src={asset.url} alt={asset.prompt} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000" />
                ) : (
                  <video src={asset.url} controls className="w-full h-full object-cover" />
                )}
              </div>
              <div className="p-6">
                <p className="text-xs text-zinc-500 line-clamp-2 italic mb-6">"{asset.prompt}"</p>
                <div className="flex items-center justify-between">
                  <span className="text-[9px] font-black uppercase tracking-widest text-zinc-300">{asset.type} • {asset.timestamp.toLocaleDateString()}</span>
                  <a href={asset.url} download={`sage-${asset.id}.${asset.type === 'image' ? 'png' : 'mp4'}`} className="text-black hover:opacity-50 transition-opacity">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a2 2 0 002 2h12a2 2 0 002-2v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          ))}
          {assets.length === 0 && !isGenerating && (
            <div className="col-span-full py-24 border-2 border-dashed border-zinc-50 flex flex-col items-center justify-center text-center">
              <p className="text-[10px] font-black text-zinc-200 uppercase tracking-widest">Gallery Empty</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
