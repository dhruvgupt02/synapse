import React, { useState } from 'react';
import { 
  X, 
  Copy, 
  Check, 
  Cpu, 
  Layers, 
  Music, 
  ShieldCheck, 
  Sparkles, 
  GitFork, 
  Lock, 
  Maximize2, 
  ExternalLink,
  Sliders,
  Terminal,
  FileCode2,
  CheckCircle2,
  Share2
} from 'lucide-react';

export const RecipeModal = ({ recipe, creator, isOpen, onClose, onForkRecipe, onBookCreator }) => {
  const [copiedSection, setCopiedSection] = useState(null);
  const [activeTab, setActiveTab] = useState('models'); // 'models', 'pipeline', 'prompt', 'clearance'

  if (!isOpen || !recipe) return null;

  const handleCopy = (text, sectionKey) => {
    navigator.clipboard.writeText(text);
    setCopiedSection(sectionKey);
    setTimeout(() => setCopiedSection(null), 2200);
  };

  // Harmonize data structure whether passed from creator.featuredRecipe or portfolio item recipe
  const baseModels = recipe.baseModels || (recipe.recipe && recipe.recipe.baseModels) || ['Kling 1.5 Pro', 'ComfyUI', 'Topaz Video AI 4K'];
  const loras = recipe.loraStack || (recipe.recipe && recipe.recipe.loras) || [
    { name: 'Custom Character Face LoRA v2.4', weight: 0.88, source: 'Proprietary Bespoke' }
  ];
  const audioPipeline = recipe.audioPipeline || (recipe.recipe && recipe.recipe.audio) || 'ElevenLabs Voice Engine v3 + Spatial Sub-bass Mastering';
  const clearance = recipe.commercialClearance || {
    clearToAir: true,
    licenseTier: 'Enterprise Commercial Full Buyout',
    c2paHash: 'c2pa:sha256:8f92bd39a48f0291e9f029c7b94a821e',
    trainingConsent: 'Zero scraped copyrighted IP, opt-in verified models'
  };
  const promptArch = recipe.promptArchitecture || {
    positiveSnippet: 'cinematic 35mm anamorphic wide shot, protagonist walking through rain-drenched neo-Tokyo marketplace, tight facial anchor geometry, specular highlights on obsidian wet asphalt, soft golden-amber rim backlight, film grain Kodak 5219, 24fps filmic motion',
    negativeSnippet: 'plastic sheen, morphing fingers, distorted anatomy, jittery edges, blurry pupils',
    cameraSettings: 'Focal length 35mm anamorphic, T1.8 depth of field, 24fps',
    seedLock: recipe.seedLock || (recipe.recipe && recipe.recipe.seedLock) || '4928172940',
    cfgScale: 7.0,
    sampler: 'DPM++ SDE Karras (40 steps)'
  };

  const seed = promptArch.seedLock || recipe.seedLock || '4928172940';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-md overflow-y-auto animate-fadeIn">
      <div 
        className="relative w-full max-w-4xl bg-[#101015] border border-zinc-700/80 rounded-2xl shadow-2xl shadow-orange-500/10 overflow-hidden my-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="p-5 sm:p-6 border-b border-zinc-800 bg-gradient-to-r from-zinc-900 via-zinc-900/90 to-zinc-950 flex items-start justify-between gap-4">
          <div className="space-y-1">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-orange-500/15 text-orange-400 border border-orange-500/30 flex items-center gap-1">
                <Sparkles className="w-3 h-3" />
                AI Production Recipe
              </span>
              <span className="px-2 py-0.5 rounded text-[11px] font-mono bg-zinc-800 text-zinc-300 border border-zinc-700 flex items-center gap-1">
                <Lock className="w-3 h-3 text-amber-400" />
                Seed Locked: {seed}
              </span>
              <span className="px-2 py-0.5 rounded text-[11px] font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 flex items-center gap-1">
                <ShieldCheck className="w-3 h-3" />
                Clear-to-Air™ Verified
              </span>
            </div>
            
            <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight pt-1">
              {recipe.title || 'Production Specification Breakdown'}
            </h2>
            <p className="text-xs text-zinc-400 flex items-center gap-1.5">
              <span>Authored by</span>
              <span className="text-orange-400 font-medium">{creator?.name || 'Lead Creator'}</span>
              <span>•</span>
              <span>{recipe.resolution || '4K UHD Cinema Master'}</span>
              <span>•</span>
              <span>{recipe.aspectRatio || '16:9 Anamorphic'}</span>
            </p>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-zinc-800/80 hover:bg-zinc-700 text-zinc-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation Tabs within Modal */}
        <div className="flex border-b border-zinc-800 bg-zinc-950/60 px-6 gap-2 overflow-x-auto">
          <button
            onClick={() => setActiveTab('models')}
            className={`py-3 px-3 text-xs font-semibold border-b-2 flex items-center gap-2 transition-all whitespace-nowrap ${
              activeTab === 'models'
                ? 'border-orange-500 text-orange-400'
                : 'border-transparent text-zinc-400 hover:text-zinc-200'
            }`}
          >
            <Cpu className="w-4 h-4" />
            1. Model & Tool Stack
          </button>

          <button
            onClick={() => setActiveTab('pipeline')}
            className={`py-3 px-3 text-xs font-semibold border-b-2 flex items-center gap-2 transition-all whitespace-nowrap ${
              activeTab === 'pipeline'
                ? 'border-orange-500 text-orange-400'
                : 'border-transparent text-zinc-400 hover:text-zinc-200'
            }`}
          >
            <Layers className="w-4 h-4" />
            2. LoRA & ControlNet Pipeline
          </button>

          <button
            onClick={() => setActiveTab('prompt')}
            className={`py-3 px-3 text-xs font-semibold border-b-2 flex items-center gap-2 transition-all whitespace-nowrap ${
              activeTab === 'prompt'
                ? 'border-orange-500 text-orange-400'
                : 'border-transparent text-zinc-400 hover:text-zinc-200'
            }`}
          >
            <Terminal className="w-4 h-4" />
            3. Prompt Architecture & Seed
          </button>

          <button
            onClick={() => setActiveTab('clearance')}
            className={`py-3 px-3 text-xs font-semibold border-b-2 flex items-center gap-2 transition-all whitespace-nowrap ${
              activeTab === 'clearance'
                ? 'border-orange-500 text-orange-400'
                : 'border-transparent text-zinc-400 hover:text-zinc-200'
            }`}
          >
            <ShieldCheck className="w-4 h-4" />
            4. C2PA Provenance & Legal Rights
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-6 max-h-[60vh] overflow-y-auto">
          
          {/* TAB 1: Base Models & Audio */}
          {activeTab === 'models' && (
            <div className="space-y-5 animate-fadeIn">
              <div>
                <h4 className="text-xs uppercase font-bold tracking-wider text-zinc-400 mb-3 flex items-center gap-2">
                  <Cpu className="w-4 h-4 text-orange-400" />
                  Primary Generative Engine Orchestration
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {baseModels.map((model, idx) => (
                    <div key={idx} className="p-4 rounded-xl bg-zinc-900/80 border border-zinc-800 flex flex-col justify-between">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-[10px] font-mono text-orange-400 font-bold uppercase">
                          Node {idx + 1}
                        </span>
                        <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                      </div>
                      <p className="font-semibold text-sm text-zinc-100">{model}</p>
                      <p className="text-[11px] text-zinc-400 mt-1">
                        {idx === 0 ? 'Primary Diffusion Latent' : idx === 1 ? 'Frame Orchestrator' : 'Neural Upscaler & Color Pass'}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Audio Pipeline Card */}
              <div className="p-4 rounded-xl bg-zinc-900/60 border border-zinc-800 space-y-2">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs uppercase font-bold tracking-wider text-zinc-400 flex items-center gap-2">
                    <Music className="w-4 h-4 text-violet-400" />
                    Audio & Voice Pipeline
                  </h4>
                  <span className="text-[10px] px-2 py-0.5 rounded bg-violet-500/20 text-violet-300 font-mono">
                    Stereo Stems 48kHz
                  </span>
                </div>
                <p className="text-xs text-zinc-300 font-mono bg-zinc-950 p-3 rounded-lg border border-zinc-800/80">
                  {typeof audioPipeline === 'string' ? audioPipeline : JSON.stringify(audioPipeline)}
                </p>
              </div>

              {/* Technical Canvas Specs */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div className="p-3 rounded-xl bg-zinc-900/40 border border-zinc-800/80">
                  <span className="text-[10px] text-zinc-500 block uppercase">Canvas Ratio</span>
                  <span className="text-xs font-semibold text-zinc-200">{recipe.aspectRatio || '16:9 Cinema'}</span>
                </div>
                <div className="p-3 rounded-xl bg-zinc-900/40 border border-zinc-800/80">
                  <span className="text-[10px] text-zinc-500 block uppercase">Master Resolution</span>
                  <span className="text-xs font-semibold text-zinc-200">{recipe.resolution || '3840x2160 (4K)'}</span>
                </div>
                <div className="p-3 rounded-xl bg-zinc-900/40 border border-zinc-800/80">
                  <span className="text-[10px] text-zinc-500 block uppercase">Frame Rate</span>
                  <span className="text-xs font-semibold text-zinc-200">24fps Filmic Cadence</span>
                </div>
                <div className="p-3 rounded-xl bg-zinc-900/40 border border-zinc-800/80">
                  <span className="text-[10px] text-zinc-500 block uppercase">Bitrate / Codec</span>
                  <span className="text-xs font-semibold text-zinc-200">ProRes 422 HQ</span>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: LoRA & Pipeline */}
          {activeTab === 'pipeline' && (
            <div className="space-y-4 animate-fadeIn">
              <div className="flex items-center justify-between">
                <h4 className="text-xs uppercase font-bold tracking-wider text-zinc-400 flex items-center gap-2">
                  <Layers className="w-4 h-4 text-orange-400" />
                  Custom LoRA Weights & Conditioning Adapters
                </h4>
                <span className="text-xs text-zinc-400">
                  {Array.isArray(loras) ? loras.length : 1} active adapters
                </span>
              </div>

              <div className="space-y-3">
                {Array.isArray(loras) && loras.map((lora, i) => {
                  const name = typeof lora === 'string' ? lora : lora.name;
                  const weight = typeof lora === 'object' && lora.weight ? lora.weight : 0.85;
                  const source = typeof lora === 'object' && lora.source ? lora.source : 'Proprietary Fine-tune';
                  return (
                    <div key={i} className="p-4 rounded-xl bg-zinc-900/80 border border-zinc-800 space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="w-2 h-2 rounded-full bg-orange-400"></span>
                          <span className="font-semibold text-xs text-white">{name}</span>
                        </div>
                        <span className="font-mono text-xs text-orange-400 font-bold bg-orange-500/10 px-2 py-0.5 rounded border border-orange-500/20">
                          Weight: {weight}
                        </span>
                      </div>
                      
                      <div className="w-full bg-zinc-800 h-2 rounded-full overflow-hidden">
                        <div 
                          className="bg-gradient-to-r from-orange-500 to-amber-400 h-full rounded-full transition-all"
                          style={{ width: `${weight * 100}%` }}
                        ></div>
                      </div>

                      <div className="flex items-center justify-between text-[11px] text-zinc-400 pt-1">
                        <span>Source: <strong className="text-zinc-300 font-normal">{source}</strong></span>
                        <span className="text-emerald-400 flex items-center gap-1">
                          <CheckCircle2 className="w-3 h-3" /> Zero Overfitting Verified
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="p-4 rounded-xl bg-zinc-950 border border-zinc-800 text-xs text-zinc-400 space-y-2">
                <div className="flex items-center gap-2 text-zinc-300 font-semibold">
                  <Sliders className="w-4 h-4 text-orange-400" />
                  ControlNet & Conditioning Passes:
                </div>
                <p>
                  • OpenPose Keyframe Anchor for bodily kinematics and zero limbs deformation.<br />
                  • Depth Map ControlNet (MiDaS v3.1) locking camera focal distance and physical background depth.<br />
                  • IP-Adapter Plus face embedding maintaining 98%+ actor reproducibility across all 12 scene cuts.
                </p>
              </div>
            </div>
          )}

          {/* TAB 3: Prompt Architecture & Seed */}
          {activeTab === 'prompt' && (
            <div className="space-y-4 animate-fadeIn">
              
              {/* Positive Prompt */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="text-xs uppercase font-bold tracking-wider text-zinc-400 flex items-center gap-2">
                    <Terminal className="w-4 h-4 text-emerald-400" />
                    Positive Conditioning Tokens
                  </label>
                  <button
                    onClick={() => handleCopy(promptArch.positiveSnippet, 'positive')}
                    className="flex items-center gap-1 text-[11px] text-orange-400 hover:text-orange-300 bg-orange-500/10 px-2 py-1 rounded border border-orange-500/20 transition-all"
                  >
                    {copiedSection === 'positive' ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                    <span>{copiedSection === 'positive' ? 'Copied Tokens' : 'Copy Prompt'}</span>
                  </button>
                </div>
                <div className="p-3.5 rounded-xl bg-zinc-950 border border-zinc-800 font-mono text-xs text-zinc-200 leading-relaxed">
                  {promptArch.positiveSnippet}
                </div>
              </div>

              {/* Negative Prompt */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="text-xs uppercase font-bold tracking-wider text-zinc-400 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-rose-400"></span>
                    Negative Suppression Tokens
                  </label>
                  <button
                    onClick={() => handleCopy(promptArch.negativeSnippet, 'negative')}
                    className="flex items-center gap-1 text-[11px] text-zinc-400 hover:text-zinc-200 bg-zinc-800/80 px-2 py-1 rounded transition-all"
                  >
                    {copiedSection === 'negative' ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                    <span>{copiedSection === 'negative' ? 'Copied' : 'Copy'}</span>
                  </button>
                </div>
                <div className="p-3 rounded-xl bg-zinc-950 border border-zinc-800 font-mono text-xs text-zinc-400 leading-relaxed">
                  {promptArch.negativeSnippet}
                </div>
              </div>

              {/* Camera & Sampler Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                <div className="p-3 rounded-xl bg-zinc-900/70 border border-zinc-800">
                  <span className="text-[10px] text-zinc-500 uppercase block font-semibold">Camera Rig / Focal</span>
                  <span className="text-xs text-zinc-200 font-mono">{promptArch.cameraSettings}</span>
                </div>
                <div className="p-3 rounded-xl bg-zinc-900/70 border border-zinc-800">
                  <span className="text-[10px] text-zinc-500 uppercase block font-semibold">Seed Lock</span>
                  <span className="text-xs text-amber-400 font-mono font-bold flex items-center gap-1">
                    <Lock className="w-3 h-3" /> {seed}
                  </span>
                </div>
                <div className="p-3 rounded-xl bg-zinc-900/70 border border-zinc-800">
                  <span className="text-[10px] text-zinc-500 uppercase block font-semibold">Sampler & CFG</span>
                  <span className="text-xs text-zinc-200 font-mono">{promptArch.sampler} • CFG: {promptArch.cfgScale}</span>
                </div>
              </div>

            </div>
          )}

          {/* TAB 4: Commercial Clearance & C2PA */}
          {activeTab === 'clearance' && (
            <div className="space-y-4 animate-fadeIn">
              
              {/* Clear-to-Air Card */}
              <div className="p-4 rounded-xl bg-emerald-950/20 border border-emerald-500/30 space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="p-2 rounded-lg bg-emerald-500/20 text-emerald-400">
                      <ShieldCheck className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-bold text-sm text-emerald-300">
                        Clear-to-Air™ Certified Commercial Production
                      </h4>
                      <p className="text-xs text-emerald-400/80">
                        Safe for broadcast television, theatrical release, and global digital campaigns.
                      </p>
                    </div>
                  </div>
                  <span className="px-2.5 py-1 text-xs font-bold rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
                    Grade A+ Audit Passed
                  </span>
                </div>
              </div>

              {/* License Tier */}
              <div className="p-4 rounded-xl bg-zinc-900/80 border border-zinc-800 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs uppercase font-bold text-zinc-400">License Buyout Tier</span>
                  <span className="text-xs font-semibold text-orange-400">Full Commercial Buyout</span>
                </div>
                <p className="text-xs text-zinc-300">
                  {clearance.licenseTier}
                </p>
                <p className="text-[11px] text-zinc-500">
                  Includes complete IP indemnity from Synapse Underwriting Guild. Creator transfers all synthetic production outputs and raw node JSON files upon milestone sign-off.
                </p>
              </div>

              {/* C2PA Provenance Hash */}
              <div className="p-4 rounded-xl bg-zinc-900/80 border border-zinc-800 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs uppercase font-bold text-zinc-400 flex items-center gap-1.5">
                    <FileCode2 className="w-4 h-4 text-cyan-400" />
                    C2PA Cryptographic Provenance Manifest
                  </span>
                  <button
                    onClick={() => handleCopy(clearance.c2paHash, 'c2pa')}
                    className="flex items-center gap-1 text-[11px] text-cyan-400 hover:text-cyan-300 bg-cyan-500/10 px-2 py-0.5 rounded border border-cyan-500/20"
                  >
                    {copiedSection === 'c2pa' ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                    <span>{copiedSection === 'c2pa' ? 'Hash Copied' : 'Copy Hash'}</span>
                  </button>
                </div>
                <div className="p-2.5 rounded-lg bg-zinc-950 font-mono text-[11px] text-cyan-300 break-all border border-zinc-800/80">
                  {clearance.c2paHash}
                </div>
                <p className="text-[11px] text-zinc-400">
                  Training Set Verification: <strong className="text-zinc-300 font-normal">{clearance.trainingConsent}</strong>
                </p>
              </div>

            </div>
          )}

        </div>

        {/* Modal Footer with Actions */}
        <div className="p-4 sm:p-5 border-t border-zinc-800 bg-gradient-to-r from-zinc-950 via-zinc-900 to-zinc-950 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2 text-xs text-zinc-400">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span>ComfyUI Node JSON & LoRA Weights Ready for Download</span>
          </div>

          <div className="flex items-center gap-2.5 w-full sm:w-auto">
            <button
              onClick={() => {
                if (onForkRecipe) onForkRecipe(recipe);
                onClose();
              }}
              className="flex-1 sm:flex-initial flex items-center justify-center gap-2 px-4 py-2 text-xs font-bold rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-200 border border-zinc-700 transition-all hover:border-zinc-600"
              title="Preload this recipe's style tokens and AI model stack into the Brief Wizard"
            >
              <GitFork className="w-3.5 h-3.5 text-violet-400" />
              <span>Fork Recipe to Brief Wizard</span>
            </button>

            <button
              onClick={() => {
                if (onBookCreator) onBookCreator(creator, recipe);
                onClose();
              }}
              className="flex-1 sm:flex-initial flex items-center justify-center gap-2 px-4 py-2 text-xs font-bold rounded-xl bg-gradient-to-r from-orange-500 to-amber-500 hover:brightness-110 text-white shadow-lg shadow-orange-500/20 transition-all"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Book with this Recipe</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
