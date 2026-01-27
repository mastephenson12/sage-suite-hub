
import React, { useState } from 'react';
import { GoogleGenAI, Type } from "@google/genai";
import { TravelLead } from '../types';

const LeadQualifier: React.FC = () => {
  const [leads, setLeads] = useState<TravelLead[]>([
    { id: 'l1', source: 'Instagram DM', rawInput: 'Hey, me and 4 friends want to do something wild in Montana. Tents, fishing, maybe a bear sighting if safe? Budget is flexible.', score: 0, classification: 'Inquiry', timestamp: new Date() }
  ]);
  const [isProcessing, setIsProcessing] = useState<string | null>(null);

  const processLead = async (lead: TravelLead) => {
    setIsProcessing(lead.id);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const response = await ai.models.generateContent({
        model: 'gemini-3-pro-preview',
        contents: `Process this travel lead. Extract the 'vibe', determine if it's Hot/Inquiry/Support, and score it 1-100. Lead: "${lead.rawInput}"`,
        config: {
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              dreamMap: { type: Type.STRING, description: 'Brief description of the core travel wish/vibe.' },
              classification: { type: Type.STRING, description: 'Hot, Inquiry, or Support' },
              score: { type: Type.NUMBER, description: '1-100 score based on intent.' }
            },
            required: ['dreamMap', 'classification', 'score']
          }
        }
      });

      const data = JSON.parse(response.text);
      setLeads(prev => prev.map(l => l.id === lead.id ? { 
        ...l, 
        ...data
      } : l));
    } catch (e) {
      console.error(e);
    } finally {
      setIsProcessing(null);
    }
  };

  return (
    <div className="animate-in fade-in duration-700">
      <h2 className="text-3xl font-black tracking-tighter mb-12">Explorer Qualifying</h2>
      
      <div className="space-y-6">
        {leads.map(lead => (
          <div key={lead.id} className="p-8 border border-zinc-100 rounded-sm">
            <div className="flex justify-between items-center mb-6">
              <p className="text-[10px] font-black uppercase tracking-widest text-zinc-400">{lead.source} • {lead.timestamp.toLocaleDateString()}</p>
              <div className="flex items-center space-x-4">
                {lead.score > 0 && (
                  <div className="text-center">
                    <p className="text-[8px] font-black uppercase text-zinc-400">Score</p>
                    <p className="text-xl font-black">{lead.score}</p>
                  </div>
                )}
                <span className={`px-4 py-1 text-[9px] font-black uppercase tracking-widest border border-zinc-100 ${
                  lead.classification === 'Hot' ? 'bg-orange-50 text-orange-600' : 'text-zinc-500'
                }`}>
                  {lead.classification}
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <div>
                <p className="text-[9px] font-black uppercase tracking-widest text-zinc-400 mb-2">Raw Inquiry</p>
                <p className="text-sm text-zinc-600 leading-relaxed italic">"{lead.rawInput}"</p>
              </div>
              
              {lead.dreamMap ? (
                <div className="bg-zinc-50 p-6 rounded-sm">
                  <p className="text-[9px] font-black uppercase tracking-widest text-black mb-2">AI Dream Map</p>
                  <p className="text-sm text-black leading-relaxed font-medium">{lead.dreamMap}</p>
                  <div className="mt-4 flex space-x-2">
                    <button className="text-[9px] font-black uppercase tracking-widest bg-black text-white px-4 py-1.5">Approve to CRM</button>
                    <button className="text-[9px] font-black uppercase tracking-widest border border-zinc-200 px-4 py-1.5">Dismiss</button>
                  </div>
                </div>
              ) : (
                <div className="flex items-center justify-center border-2 border-dashed border-zinc-100 rounded-sm">
                   <button 
                    onClick={() => processLead(lead)}
                    disabled={isProcessing === lead.id}
                    className="text-[10px] font-black uppercase tracking-widest text-zinc-400 hover:text-black transition-colors"
                  >
                    {isProcessing === lead.id ? 'Mapping...' : 'Generate Dream Map'}
                  </button>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LeadQualifier;
