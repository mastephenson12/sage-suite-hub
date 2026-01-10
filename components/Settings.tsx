
import React, { useState } from 'react';
import { Save, Lock, MapPin, Link as LinkIcon, AlertTriangle, Globe, Globe2, ShieldCheck, Zap, Layout, Copy, Check, Rocket, Github, Key, FolderPlus, UploadCloud } from 'lucide-react';

const Settings: React.FC = () => {
  const [copied, setCopied] = useState(false);
  const rootDomain = "healthandtravels.com";
  const subdomain = "adventure";
  const appUrl = `https://${subdomain}.${rootDomain}`;

  const handleCopy = () => {
    navigator.clipboard.writeText(appUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-10 pb-20 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex justify-between items-end">
        <div>
            <div className="flex items-center space-x-2 text-brand-500 mb-2">
                <Rocket className="w-5 h-5" />
                <span className="text-xs font-black uppercase tracking-[0.2em]">Launch Control</span>
            </div>
            <h2 className="text-4xl font-black text-slate-900 dark:text-slate-100 tracking-tight">Launch to the Web</h2>
            <p className="text-slate-500 dark:text-slate-400 mt-2 text-lg font-medium">How to put your app on <strong>{appUrl}</strong>.</p>
        </div>
      </div>

      {/* The Magic Backpack Section */}
      <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] shadow-premium border border-white dark:border-slate-800 overflow-hidden">
        <div className="p-10">
            <div className="flex items-center space-x-4 mb-8">
                <div className="p-3 bg-brand-500 rounded-2xl shadow-lg shadow-brand-500/30 text-white">
                    <Github className="w-6 h-6" />
                </div>
                <div>
                    <h3 className="text-xl font-black text-slate-900 dark:text-slate-100 tracking-tight">Step 1: The Magic Backpack (Repository)</h3>
                    <p className="text-sm font-semibold text-slate-500">How to save your work online</p>
                </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-6">
                    <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                        GitHub is like a backpack for your code. Follow these steps to put your files inside:
                    </p>
                    <ul className="space-y-4">
                        <li className="flex items-start space-x-3">
                            <div className="w-5 h-5 rounded-full bg-brand-100 dark:bg-brand-900/30 text-brand-600 flex items-center justify-center text-[10px] font-black shrink-0 mt-0.5">1</div>
                            <p className="text-xs font-bold text-slate-700 dark:text-slate-200">Go to GitHub.com and click "New Repository"</p>
                        </li>
                        <li className="flex items-start space-x-3">
                            <div className="w-5 h-5 rounded-full bg-brand-100 dark:bg-brand-900/30 text-brand-600 flex items-center justify-center text-[10px] font-black shrink-0 mt-0.5">2</div>
                            <p className="text-xs font-bold text-slate-700 dark:text-slate-200">Name it "adventure-hub" and click "Create"</p>
                        </li>
                        <li className="flex items-start space-x-3">
                            <div className="w-5 h-5 rounded-full bg-brand-100 dark:bg-brand-900/30 text-brand-600 flex items-center justify-center text-[10px] font-black shrink-0 mt-0.5">3</div>
                            <p className="text-xs font-bold text-slate-700 dark:text-slate-200">Click "Upload existing files" and drag these files into the box!</p>
                        </li>
                    </ul>
                </div>
                <div className="bg-slate-50 dark:bg-slate-800/40 rounded-3xl border border-dashed border-slate-200 dark:border-slate-800 p-8 flex flex-col items-center justify-center text-center">
                    <UploadCloud className="w-12 h-12 text-slate-300 mb-4" />
                    <p className="text-xs font-black text-slate-400 uppercase tracking-widest">Upload Files There</p>
                </div>
            </div>
        </div>
      </div>

      {/* Deployment Section */}
      <div className="bg-slate-900 rounded-[2.5rem] p-10 text-white border border-white/5 relative overflow-hidden group">
            <div className="absolute -right-10 -top-10 w-40 h-40 bg-brand-500/20 blur-3xl rounded-full" />
            <div className="relative z-10">
                <div className="flex items-center space-x-3 mb-6">
                    <Zap className="w-6 h-6 text-brand-400" />
                    <h3 className="text-xl font-black tracking-tight">Step 2: The Display Window (Deployment)</h3>
                </div>
                <p className="text-slate-400 text-sm mb-8 leading-relaxed">
                    Now tell your cloud provider to show everyone what's inside your backpack:
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-black/40 p-6 rounded-2xl border border-white/10">
                        <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest block mb-2">Login To Vercel</span>
                        <p className="text-xs text-slate-300">Click "Add New" -> "Project" and pick your backpack.</p>
                    </div>
                    <div className="bg-black/40 p-6 rounded-2xl border border-white/10">
                        <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest block mb-2">Secret Key</span>
                        <p className="text-xs text-slate-300">Add an Environment Variable named <b>API_KEY</b> with your Sage Engine code.</p>
                    </div>
                    <div className="md:col-span-2 bg-black/40 p-6 rounded-2xl border border-white/10 flex items-center justify-between">
                        <div>
                            <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest block mb-1">Final Domain</span>
                            <span className="text-brand-400 font-mono font-bold text-sm">{subdomain}.{rootDomain}</span>
                        </div>
                        <div className="text-right">
                             <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest block mb-1">CNAME Points To</span>
                             <span className="text-slate-200 font-mono text-xs">cname.vercel-dns.com</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>

      {/* Navigation Portal Link */}
      <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] p-10 shadow-premium border border-white dark:border-slate-800">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div className="flex items-center space-x-4">
                    <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-2xl">
                        <Layout className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                    </div>
                    <div>
                        <h3 className="text-lg font-black text-slate-900 dark:text-slate-100">Step 3: Add to Navigation</h3>
                        <p className="text-sm font-semibold text-slate-500">Copy this for your platform's Custom Menu link</p>
                    </div>
                </div>
                <div className="flex items-center bg-slate-50 dark:bg-slate-800/50 p-2 rounded-2xl border border-slate-100 dark:border-slate-800 w-full md:w-auto">
                    <code className="px-4 py-2 font-mono text-xs text-brand-600 dark:text-brand-400 truncate">{appUrl}</code>
                    <button 
                        onClick={handleCopy}
                        className="ml-2 p-3 bg-brand-500 text-white rounded-xl shadow-lg shadow-brand-500/20 hover:scale-105 active:scale-95 transition-all"
                    >
                        {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                    </button>
                </div>
            </div>
        </div>
    </div>
  );
};

export default Settings;
