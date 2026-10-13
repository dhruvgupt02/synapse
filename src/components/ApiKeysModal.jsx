import React, { useState, useEffect } from 'react';
import { 
  X, 
  Key, 
  ShieldCheck, 
  Sparkles, 
  CheckCircle2, 
  Cpu, 
  ExternalLink, 
  HelpCircle,
  AlertCircle,
  Server
} from 'lucide-react';
import { getApiKeysStatus, saveApiKeys, checkBackendHealth } from '../utils/api';

export const ApiKeysModal = ({ isOpen, onClose, onKeysUpdated }) => {
  const [geminiKeyInput, setGeminiKeyInput] = useState('');
  const [openaiKeyInput, setOpenaiKeyInput] = useState('');
  const [keysStatus, setKeysStatus] = useState(null);
  const [backendHealth, setBackendHealth] = useState(null);
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  useEffect(() => {
    if (isOpen) {
      loadStatus();
    }
  }, [isOpen]);

  const loadStatus = async () => {
    const status = await getApiKeysStatus();
    const health = await checkBackendHealth();
    setKeysStatus(status);
    setBackendHealth(health);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setIsSaving(true);
    await saveApiKeys({
      geminiKey: geminiKeyInput,
      openaiKey: openaiKeyInput
    });
    setIsSaving(false);
    setSaveSuccess(true);
    await loadStatus();
    if (onKeysUpdated) onKeysUpdated();
    setTimeout(() => setSaveSuccess(false), 2500);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fadeIn">
      <div 
        className="relative w-full max-w-lg bg-[#121217] border border-zinc-700/80 rounded-3xl p-6 sm:p-7 shadow-2xl space-y-5"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between">
          <div className="space-y-1">
            <span className="text-[10px] font-mono uppercase font-bold text-orange-400 flex items-center gap-1.5">
              <Server className="w-3.5 h-3.5" />
              Backend & AI Engine Settings
            </span>
            <h3 className="text-xl font-bold text-white">
              AI Model API Keys & Engine Status
            </h3>
            <p className="text-xs text-zinc-400">
              Configure live LLM integration for the AI Brief Architect.
            </p>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-xl bg-zinc-800 text-zinc-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Backend Status Banner */}
        <div className="p-3.5 rounded-2xl bg-zinc-950 border border-zinc-800 flex items-center justify-between text-xs">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse"></span>
            <div>
              <span className="font-bold text-white">Express Backend: Connected</span>
              <span className="text-[10px] text-zinc-500 block">Port 5001 • REST API Active</span>
            </div>
          </div>
          <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
            {backendHealth?.aiEngine?.activeMode || 'Active'}
          </span>
        </div>

        {/* Important Clarification Note */}
        <div className="p-3.5 rounded-2xl bg-gradient-to-r from-orange-500/10 to-amber-500/5 border border-orange-500/30 text-xs space-y-1">
          <div className="flex items-center gap-1.5 font-bold text-orange-300">
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span>No API Key Required by Default!</span>
          </div>
          <p className="text-zinc-300 text-[11px] leading-relaxed">
            SYNAPSE includes a <strong>built-in Indian Creative Heuristics Engine</strong> that deconstructs campaigns into Indian cultural tokens, model stacks, and INR budgets automatically with zero setup.
          </p>
          <p className="text-zinc-400 text-[10px] pt-1">
            If you wish to use <strong>Live Generative AI</strong> via Google Gemini or OpenAI, you can optionally provide your key below or in your <code className="text-orange-300 bg-zinc-900 px-1 py-0.5 rounded">.env</code> file.
          </p>
        </div>

        {/* Forms for optional keys */}
        <form onSubmit={handleSave} className="space-y-4">
          
          {/* Gemini Key */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <label className="text-xs font-semibold text-zinc-300 flex items-center gap-1.5">
                <Key className="w-3.5 h-3.5 text-orange-400" />
                Google Gemini API Key (Optional)
              </label>
              {keysStatus?.hasGeminiKey && (
                <span className="text-[10px] text-emerald-400 font-mono flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3" /> Configured ({keysStatus.geminiKeyMasked})
                </span>
              )}
            </div>
            <input
              type="password"
              value={geminiKeyInput}
              onChange={(e) => setGeminiKeyInput(e.target.value)}
              placeholder={keysStatus?.hasGeminiKey ? 'Enter new key to replace' : 'AIzaSy... (leave blank to use built-in engine)'}
              className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-950 border border-zinc-800 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-orange-500 font-mono"
            />
            <p className="text-[10px] text-zinc-500 flex items-center justify-between">
              <span>Used for Gemini 1.5 Flash live brief auto-deconstruction.</span>
              <a 
                href="https://aistudio.google.com/app/apikey" 
                target="_blank" 
                rel="noreferrer"
                className="text-orange-400 hover:underline flex items-center gap-0.5"
              >
                Get Free Gemini Key <ExternalLink className="w-2.5 h-2.5" />
              </a>
            </p>
          </div>

          {/* OpenAI Key */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <label className="text-xs font-semibold text-zinc-300 flex items-center gap-1.5">
                <Key className="w-3.5 h-3.5 text-violet-400" />
                OpenAI API Key (Optional)
              </label>
              {keysStatus?.hasOpenaiKey && (
                <span className="text-[10px] text-emerald-400 font-mono flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3" /> Configured
                </span>
              )}
            </div>
            <input
              type="password"
              value={openaiKeyInput}
              onChange={(e) => setOpenaiKeyInput(e.target.value)}
              placeholder="sk-proj-... (leave blank to skip)"
              className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-950 border border-zinc-800 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-violet-500 font-mono"
            />
          </div>

          {saveSuccess && (
            <div className="p-3 rounded-xl bg-emerald-950/40 border border-emerald-500/30 text-emerald-300 text-xs flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>API key configuration updated and saved!</span>
            </div>
          )}

          <div className="pt-2 flex items-center justify-between">
            <span className="text-[11px] text-zinc-500 font-mono">
              Saved to runtime db & .env
            </span>

            <button
              type="submit"
              disabled={isSaving}
              className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-orange-500 to-amber-500 hover:brightness-110 text-white font-bold text-xs shadow-lg shadow-orange-500/25 transition-all disabled:opacity-50"
            >
              {isSaving ? 'Updating...' : 'Save Preferences'}
            </button>
          </div>

        </form>

      </div>
    </div>
  );
};
