import React, { useState } from 'react';
import { 
  Sparkles, 
  Zap, 
  ArrowRight, 
  ArrowLeft, 
  CheckCircle2, 
  ShieldCheck, 
  Film, 
  Layers, 
  Cpu, 
  FileCheck, 
  Lock, 
  DollarSign, 
  Clock, 
  Sliders, 
  Check, 
  Upload, 
  Eye, 
  HelpCircle,
  AlertCircle,
  Server
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { deconstructBriefAI } from '../utils/api';

const INDIAN_PRESET_CAMPAIGNS = [
  {
    title: 'Tanishq Rivaah: Royal Kundan Bridal Jewellery',
    prompt: 'We need an ethereal, high-heritage campaign for our royal wedding collection "Rivaah". Uncut polki choker caustics, crimson Kanjeevaram silk weave, and seamless actor facial continuity across Udaipur palace courtyards.',
    styleTokens: ['Kundan polki caustics', '22k gold filigree', 'Udaipur marble courtyard', 'crimson Kanjeevaram silk', '24fps filmic cadence'],
    recommendedTools: ['Kling 1.5', 'ComfyUI', 'Midjourney v6.1', 'Topaz 4K'],
    aspectRatio: '16:9 Cinema & 9:16 Dual',
    mediaType: 'Cinematic Video (45s Master & 15s Cutdowns)',
    budget: '₹12,50,000'
  },
  {
    title: 'Mahindra Thar EV: Cyber-Ladakh Desert Odyssey',
    prompt: 'Aggressive futuristic electric 4x4 SUV drifting across Pangong Lake frozen saline crusts at sunset. CAD-accurate matte khaki finish, snowcapped Himalayan peaks, dust rooster tails, and drone chase cam.',
    styleTokens: ['matte khaki chassis', 'Pangong Lake saline dust', 'Himalayan sunset', 'octane lighting', 'drone chase cam 60fps'],
    recommendedTools: ['Flux.1', 'ControlNet', 'Blender', 'Runway Gen-3'],
    aspectRatio: '16:9 Cinema 4K',
    mediaType: '3D Automotive CGI Reveal',
    budget: '₹15,00,000'
  },
  {
    title: 'CRED: 90s Bollywood Neo-Noir Action Chase',
    prompt: 'Retro 90s Mumbai monsoon night chase. Yellow premier padmini taxis, neon signage reflections on rain-slicked asphalt, fast whip-pans, and vintage action voiceover pacing.',
    styleTokens: ['35mm film grain', 'Mumbai monsoon asphalt', 'yellow taxi chase', 'anamorphic flare', 'retro synth foley'],
    recommendedTools: ['Kling 1.5', 'ComfyUI', 'Runway Gen-3', 'ElevenLabs'],
    aspectRatio: '16:9 Cinema & 9:16 Vertical Dual',
    mediaType: 'Motion Campaign (30s TVC)',
    budget: '₹7,50,000'
  },
  {
    title: 'Forest Essentials: Kumkumadi Saffron Dew',
    prompt: 'Macro commercial beauty campaign showcasing Kashmiri saffron facial oil droplets on warm melanin-rich skin. Pure cream linen backdrop, natural fine skin pores, and warm golden hour studio bounce.',
    styleTokens: ['macro melanin-rich dewy skin', 'Kashmiri saffron caustics', 'pure cream linen', 'Phase One 150MP macro'],
    recommendedTools: ['Adobe Firefly', 'Topaz 4K', 'Flux.1'],
    aspectRatio: '1:1 Square & 16:9 Billboard Dual',
    mediaType: '8K Master Print Stills + Micro-Animation',
    budget: '₹9,80,000'
  }
];

export const BriefBuilderView = ({ onPublishBrief, preloadedRecipe }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [isDeconstructing, setIsDeconstructing] = useState(false);
  const [deconstructProgress, setDeconstructProgress] = useState(0);
  const [deconstructStage, setDeconstructStage] = useState('');
  const [aiEngineUsed, setAiEngineUsed] = useState(null);

  // Form State
  const [title, setTitle] = useState(preloadedRecipe ? `Campaign based on ${preloadedRecipe.title}` : '');
  const [brandName, setBrandName] = useState('Titan Company (Tanishq)');
  const [campaignIdea, setCampaignIdea] = useState(
    preloadedRecipe 
      ? `Producing an Indian brand campaign using the ${preloadedRecipe.title} recipe architecture with locked actor consistency and ASCI compliance.`
      : ''
  );
  
  // Style Tokens
  const [styleTokens, setStyleTokens] = useState(
    preloadedRecipe?.recipe?.tokens || ['Kundan polki caustics', '22k gold filigree', 'Udaipur marble courtyard']
  );
  const [newTokenInput, setNewTokenInput] = useState('');

  // AI Tool Stack
  const [selectedTools, setSelectedTools] = useState(
    preloadedRecipe?.baseModels || ['Kling 1.5', 'ComfyUI', 'Topaz 4K', 'ElevenLabs']
  );

  // Step 2 Specs
  const [mediaType, setMediaType] = useState('Cinematic Video (45s Master & 15s Cutdowns)');
  const [aspectRatio, setAspectRatio] = useState(preloadedRecipe?.aspectRatio || '16:9 Cinema & 9:16 Dual');
  const [resolution, setResolution] = useState('4K ProRes Master (3840x2160)');
  const [deadline, setDeadline] = useState('Under 1 Week');
  const [budget, setBudget] = useState('₹12,50,000');

  // Step 3 Compliance
  const [licenseTier, setLicenseTier] = useState('ASCI Synthetic Disclosure Certified • Enterprise Full Buyout');
  const [clearToAirEnforced, setClearToAirEnforced] = useState(true);
  const [asciCompliantEnforced, setAsciCompliantEnforced] = useState(true);
  const [c2paMandatory, setC2paMandatory] = useState(true);
  const [seedLockRequired, setSeedLockRequired] = useState(true);

  // Auto-Deconstruct via Backend API
  const handleAutoDeconstruct = async () => {
    const inputConcept = campaignIdea.trim() || 'Create an ultra-luxurious Indian wedding jewellery commercial in Udaipur with Kundan polki necklaces and crimson Kanjeevaram silk saree with zero actor drift.';
    if (!campaignIdea.trim()) {
      setCampaignIdea(inputConcept);
    }

    setIsDeconstructing(true);
    setDeconstructProgress(20);
    setDeconstructStage('Dispatching to SYNAPSE Backend AI Engine...');

    setTimeout(() => {
      setDeconstructProgress(55);
      setDeconstructStage('Analyzing cultural semantics: Kundan jewellery, Rajputana marble, silk caustics...');
    }, 600);

    try {
      // Call real backend API
      const response = await deconstructBriefAI(inputConcept, brandName);

      setTimeout(() => {
        setDeconstructProgress(85);
        setDeconstructStage('Deriving camera optics, model orchestration & INR budget range...');
      }, 1200);

      setTimeout(() => {
        setDeconstructProgress(100);
        setDeconstructStage('Deconstruction complete! Indian tokens & model pipeline calibrated.');
        
        if (response && response.data) {
          const d = response.data;
          setTitle(d.title || 'Aura Bharat: Cinematic Brand Campaign');
          if (d.styleTokens) setStyleTokens(d.styleTokens);
          if (d.recommendedTools) setSelectedTools(d.recommendedTools);
          if (d.aspectRatio) setAspectRatio(d.aspectRatio);
          if (d.mediaType) setMediaType(d.mediaType);
          if (d.budget) setBudget(d.budget);
          setAiEngineUsed(response.engine || 'SYNAPSE Indian Creative Engine');
        } else {
          // Local fallback
          setTitle('Tanishq Rivaah: Royal Kundan Bridal Campaign');
          setStyleTokens([
            'Kundan polki caustics',
            '22k gold filigree',
            'Udaipur marble courtyard',
            'crimson Kanjeevaram silk',
            '24fps filmic cadence',
            'ASCI certified'
          ]);
          setSelectedTools(['Kling 1.5', 'ComfyUI', 'Midjourney v6.1', 'Topaz 4K']);
          setBudget('₹12,50,000');
          setAiEngineUsed('SYNAPSE Indian Creative Engine (Heuristics)');
        }

        setTimeout(() => {
          setIsDeconstructing(false);
        }, 500);
      }, 1900);
    } catch (err) {
      setIsDeconstructing(false);
    }
  };

  const handleAddToken = (e) => {
    e.preventDefault();
    if (newTokenInput.trim() && !styleTokens.includes(newTokenInput.trim())) {
      setStyleTokens([...styleTokens, newTokenInput.trim()]);
      setNewTokenInput('');
    }
  };

  const handleRemoveToken = (tokenToRemove) => {
    setStyleTokens(styleTokens.filter(t => t !== tokenToRemove));
  };

  const toggleTool = (tool) => {
    if (selectedTools.includes(tool)) {
      setSelectedTools(selectedTools.filter(t => t !== tool));
    } else {
      setSelectedTools([...selectedTools, tool]);
    }
  };

  const handleApplyPreset = (preset) => {
    setTitle(preset.title);
    setCampaignIdea(preset.prompt);
    setStyleTokens(preset.styleTokens);
    setSelectedTools(preset.recommendedTools);
    setAspectRatio(preset.aspectRatio);
    setMediaType(preset.mediaType);
    setBudget(preset.budget);
  };

  const handlePublish = () => {
    try {
      confetti({
        particleCount: 110,
        spread: 75,
        origin: { y: 0.6 }
      });
    } catch (e) {}

    const newBrief = {
      id: `brief-ind-${Date.now()}`,
      title: title || 'Indian Brand AI Campaign',
      brand: brandName || 'Enterprise Brand Client India',
      brandLogo: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80',
      budget: budget || '₹10,00,000',
      status: 'Open for Pitches',
      deadline: deadline || 'Under 1 Week',
      specialization: 'Character Consistency',
      mediaType: mediaType,
      aspectRatio: aspectRatio,
      resolution: resolution,
      requiredTools: selectedTools,
      complianceTier: asciCompliantEnforced 
        ? 'ASCI Synthetic Disclosure • Clear-to-Air™ Certified (Full IP Indemnity)' 
        : 'Commercial Safe Tier B',
      description: campaignIdea || 'Indian market creative campaign brief generated via Synapse AI Wizard.',
      styleTokens: styleTokens,
      licenseTier: licenseTier,
      proposalsCount: 0,
      tags: ['Custom Brief', 'India Market', ...selectedTools.slice(0, 2)]
    };

    onPublishBrief(newBrief);
  };

  return (
    <div className="w-full max-w-6xl mx-auto space-y-8 animate-fadeIn pb-16">
      
      {/* Wizard Header */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/10 text-orange-400 border border-orange-500/20 text-xs font-semibold">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Interactive AI Brief Architect • India Edition</span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
          Deconstruct Your Vision into an <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-amber-300 to-emerald-400">AI-Native Brief</span>
        </h1>
        <p className="text-sm text-zinc-400">
          Transform raw creative narratives into inspectable style tokens, certified model pipelines, and ASCI compliant enterprise briefs.
        </p>
      </div>

      {/* 3-Step Wizard Navigation Stepper */}
      <div className="flex items-center justify-center max-w-2xl mx-auto">
        <div className="flex items-center w-full justify-between relative">
          
          {/* Step 1 */}
          <div 
            onClick={() => setCurrentStep(1)}
            className="flex flex-col items-center gap-1.5 cursor-pointer z-10"
          >
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold text-xs transition-all ${
              currentStep === 1 
                ? 'bg-orange-500 text-white shadow-lg shadow-orange-500/30' 
                : currentStep > 1 
                ? 'bg-emerald-500 text-white' 
                : 'bg-zinc-800 text-zinc-400 border border-zinc-700'
            }`}>
              {currentStep > 1 ? <Check className="w-4 h-4" /> : '1'}
            </div>
            <span className={`text-xs font-semibold ${currentStep === 1 ? 'text-orange-400' : 'text-zinc-400'}`}>
              Campaign & Mood
            </span>
          </div>

          <div className="flex-1 h-0.5 bg-zinc-800 mx-2 -mt-4">
            <div 
              className="h-full bg-gradient-to-r from-orange-500 via-amber-400 to-emerald-400 transition-all duration-300"
              style={{ width: currentStep === 1 ? '0%' : currentStep === 2 ? '50%' : '100%' }}
            ></div>
          </div>

          {/* Step 2 */}
          <div 
            onClick={() => setCurrentStep(2)}
            className="flex flex-col items-center gap-1.5 cursor-pointer z-10"
          >
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold text-xs transition-all ${
              currentStep === 2 
                ? 'bg-orange-500 text-white shadow-lg shadow-orange-500/30' 
                : currentStep > 2 
                ? 'bg-emerald-500 text-white' 
                : 'bg-zinc-800 text-zinc-400 border border-zinc-700'
            }`}>
              {currentStep > 2 ? <Check className="w-4 h-4" /> : '2'}
            </div>
            <span className={`text-xs font-semibold ${currentStep === 2 ? 'text-orange-400' : 'text-zinc-400'}`}>
              Specs & Model Stack
            </span>
          </div>

          <div className="flex-1 h-0.5 bg-zinc-800 mx-2 -mt-4">
            <div 
              className="h-full bg-gradient-to-r from-orange-500 via-amber-400 to-emerald-400 transition-all duration-300"
              style={{ width: currentStep === 3 ? '100%' : '0%' }}
            ></div>
          </div>

          {/* Step 3 */}
          <div 
            onClick={() => setCurrentStep(3)}
            className="flex flex-col items-center gap-1.5 cursor-pointer z-10"
          >
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold text-xs transition-all ${
              currentStep === 3 
                ? 'bg-orange-500 text-white shadow-lg shadow-orange-500/30' 
                : 'bg-zinc-800 text-zinc-400 border border-zinc-700'
            }`}>
              3
            </div>
            <span className={`text-xs font-semibold ${currentStep === 3 ? 'text-orange-400' : 'text-zinc-400'}`}>
              ASCI & Legal Clearance
            </span>
          </div>

        </div>
      </div>

      {/* Main Form + Live Preview Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        
        {/* Left Side: Step Wizards Form */}
        <div className="lg:col-span-2 rounded-3xl bg-[#121217] border border-zinc-800 p-6 sm:p-8 space-y-6 shadow-xl">
          
          {/* STEP 1: Rough Campaign Idea & Reference Moodboard */}
          {currentStep === 1 && (
            <div className="space-y-6 animate-fadeIn">
              
              <div>
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-orange-400"></span>
                  Step 1: Rough Campaign Concept & Indian Cultural Context
                </h3>
                <p className="text-xs text-zinc-400 mt-1">
                  Describe your concept in natural English or Hinglish. Our backend AI engine deconstructs it into technical style tokens, model pipelines, and INR budget projections.
                </p>
              </div>

              {/* Quick Indian Template Presets */}
              <div className="space-y-2">
                <span className="text-[11px] font-bold text-zinc-400 uppercase tracking-wider">
                  Select Indian Brand Benchmark:
                </span>
                <div className="flex flex-wrap gap-2">
                  {INDIAN_PRESET_CAMPAIGNS.map((p, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => handleApplyPreset(p)}
                      className="px-3 py-1.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-xs text-zinc-300 border border-zinc-700/80 hover:border-orange-500/50 transition-all flex items-center gap-1.5"
                    >
                      <Sparkles className="w-3 h-3 text-orange-400" />
                      <span>{p.title.split(':')[0]}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Title & Brand */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-zinc-300">Campaign Title</label>
                  <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="e.g. Tanishq Rivaah: Royal Kundan Bridal Campaign"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-950 border border-zinc-800 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-orange-500"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-zinc-300">Brand / Agency Entity (India)</label>
                  <input
                    type="text"
                    value={brandName}
                    onChange={(e) => setBrandName(e.target.value)}
                    placeholder="e.g. Titan Company / Mahindra & Mahindra"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-950 border border-zinc-800 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-orange-500"
                  />
                </div>
              </div>

              {/* Campaign Concept Textarea */}
              <div className="space-y-2">
                <label className="text-xs font-semibold text-zinc-300 flex items-center justify-between">
                  <span>Creative Description & Visual Narrative</span>
                  <span className="text-[11px] text-zinc-500">{campaignIdea.length} characters</span>
                </label>
                <textarea
                  rows={4}
                  value={campaignIdea}
                  onChange={(e) => setCampaignIdea(e.target.value)}
                  placeholder="Describe the story, lighting, cultural setting (e.g. Udaipur, Ladakh, Mumbai rains), actors, and desired visual pacing..."
                  className="w-full p-3.5 rounded-xl bg-zinc-950 border border-zinc-800 text-xs text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-orange-500 leading-relaxed font-sans"
                />
              </div>

              {/* THE BREAKTHROUGH: ⚡ AI Auto-Deconstruct Brief Button */}
              <div className="p-4 rounded-2xl bg-gradient-to-r from-orange-500/10 via-amber-500/5 to-emerald-500/10 border border-orange-500/30 space-y-3">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                  <div>
                    <h4 className="text-xs font-bold text-white flex items-center gap-1.5">
                      <Zap className="w-4 h-4 text-amber-400" />
                      AI Auto-Deconstruct Brief (Backend Powered)
                    </h4>
                    <p className="text-[11px] text-zinc-400">
                      Dispatches your concept to the Express AI backend to derive technical style tokens, model stacks, and INR budgets.
                    </p>
                    {aiEngineUsed && (
                      <span className="inline-block mt-1 text-[10px] font-mono text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-500/30">
                        ⚡ Engine: {aiEngineUsed}
                      </span>
                    )}
                  </div>

                  <button
                    type="button"
                    onClick={handleAutoDeconstruct}
                    disabled={isDeconstructing}
                    className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-orange-500 to-amber-500 hover:brightness-110 text-white text-xs font-bold shadow-lg shadow-orange-500/30 transition-all disabled:opacity-50 shrink-0"
                  >
                    <Sparkles className="w-4 h-4" />
                    <span>{isDeconstructing ? 'Deconstructing...' : '⚡ AI Auto-Deconstruct'}</span>
                  </button>
                </div>

                {/* Progress bar during auto-deconstruct */}
                {isDeconstructing && (
                  <div className="space-y-1.5 pt-2 animate-fadeIn">
                    <div className="w-full bg-zinc-900 h-2 rounded-full overflow-hidden border border-zinc-800">
                      <div 
                        className="bg-gradient-to-r from-orange-500 via-amber-400 to-emerald-400 h-full rounded-full transition-all duration-300"
                        style={{ width: `${deconstructProgress}%` }}
                      ></div>
                    </div>
                    <p className="text-[11px] font-mono text-orange-300 animate-pulse">
                      {deconstructStage}
                    </p>
                  </div>
                )}
              </div>

              {/* Extracted Style Tokens */}
              <div className="space-y-2">
                <label className="text-xs font-semibold text-zinc-300 flex items-center justify-between">
                  <span>Deconstructed Technical Style Tokens</span>
                  <span className="text-[11px] text-zinc-500">Add or click tags to remove</span>
                </label>

                <div className="flex flex-wrap gap-1.5 min-h-[38px] p-2 rounded-xl bg-zinc-950 border border-zinc-800">
                  {styleTokens.map((token, i) => (
                    <span 
                      key={i}
                      onClick={() => handleRemoveToken(token)}
                      className="px-2.5 py-1 text-xs font-mono rounded-lg bg-orange-500/15 text-orange-300 border border-orange-500/30 flex items-center gap-1.5 cursor-pointer hover:bg-rose-500/20 hover:text-rose-300 transition-colors"
                      title="Click to remove token"
                    >
                      <span>{token}</span>
                      <span className="text-[10px]">✕</span>
                    </span>
                  ))}
                  {styleTokens.length === 0 && (
                    <span className="text-xs text-zinc-500 italic p-1">No style tokens added yet. Click Auto-Deconstruct or type below.</span>
                  )}
                </div>

                <form onSubmit={handleAddToken} className="flex gap-2">
                  <input
                    type="text"
                    value={newTokenInput}
                    onChange={(e) => setNewTokenInput(e.target.value)}
                    placeholder="Add custom prompt token (e.g. 'Kundan caustics', 'IP-Adapter 0.94')..."
                    className="flex-1 px-3 py-2 rounded-xl bg-zinc-950 border border-zinc-800 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-orange-500"
                  />
                  <button
                    type="submit"
                    className="px-3.5 py-2 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-xs font-semibold text-zinc-200 transition-colors"
                  >
                    + Add Token
                  </button>
                </form>
              </div>

            </div>
          )}

          {/* STEP 2: Content Specs & Formats */}
          {currentStep === 2 && (
            <div className="space-y-6 animate-fadeIn">
              
              <div>
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-orange-400"></span>
                  Step 2: Content Specs, Aspect Ratios & Model Stack
                </h3>
                <p className="text-xs text-zinc-400 mt-1">
                  Specify deliverable resolutions and required Indian AI production toolchains.
                </p>
              </div>

              {/* Media Type */}
              <div className="space-y-2">
                <label className="text-xs font-semibold text-zinc-300">Deliverable Format Type</label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                  {[
                    'Cinematic Video (45s Master & 15s Cutdowns)',
                    '3D Automotive CGI Reveal',
                    'Viral Vertical Video (Reels/Shorts)',
                    'Bridal Couture Lookbook Stills',
                    'Audio-Reactive IPL Loop',
                    '8K Print Master Beauty Stills'
                  ].map((type) => (
                    <button
                      key={type}
                      type="button"
                      onClick={() => setMediaType(type)}
                      className={`p-3 rounded-xl text-xs font-semibold text-left border transition-all ${
                        mediaType === type
                          ? 'bg-orange-500/20 text-orange-300 border-orange-500/50 shadow-md'
                          : 'bg-zinc-950 text-zinc-400 border-zinc-800 hover:text-zinc-200'
                      }`}
                    >
                      {type}
                    </button>
                  ))}
                </div>
              </div>

              {/* Aspect Ratio & Resolution Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-zinc-300">Target Aspect Ratio</label>
                  <select
                    value={aspectRatio}
                    onChange={(e) => setAspectRatio(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-xl bg-zinc-950 border border-zinc-800 text-xs text-white focus:outline-none focus:border-orange-500"
                  >
                    <option value="16:9 Cinema & 9:16 Dual">16:9 Cinema & 9:16 Dual Social (TVC + Reels)</option>
                    <option value="16:9 Cinema Landscape (2.39:1)">16:9 Cinema Landscape (2.39:1 Anamorphic)</option>
                    <option value="9:16 Vertical (Instagram Reels & Shorts)">9:16 Vertical (Instagram Reels & Shorts)</option>
                    <option value="1:1 Square & 4:5 Portrait">1:1 Square & 4:5 Portrait</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-zinc-300">Master Output Resolution</label>
                  <select
                    value={resolution}
                    onChange={(e) => setResolution(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-xl bg-zinc-950 border border-zinc-800 text-xs text-white focus:outline-none focus:border-orange-500"
                  >
                    <option value="4K ProRes Master (3840x2160)">4K ProRes Master (3840x2160)</option>
                    <option value="8K Master Print (7680x4320)">8K Master Print (7680x4320)</option>
                    <option value="1080p 60fps High-Bitrate">1080p 60fps High-Bitrate</option>
                  </select>
                </div>
              </div>

              {/* Required AI Tool Stack */}
              <div className="space-y-2">
                <label className="text-xs font-semibold text-zinc-300 flex items-center justify-between">
                  <span>Mandatory / Recommended AI Tools</span>
                  <span className="text-[11px] text-zinc-500">{selectedTools.length} models selected</span>
                </label>
                <div className="flex flex-wrap gap-2">
                  {[
                    'Kling 1.5',
                    'Runway Gen-3',
                    'Midjourney v6.1',
                    'Flux.1',
                    'ComfyUI',
                    'ElevenLabs',
                    'Sora',
                    'Adobe Firefly',
                    'Topaz 4K',
                    'ControlNet'
                  ].map((tool) => {
                    const isSelected = selectedTools.includes(tool);
                    return (
                      <button
                        key={tool}
                        type="button"
                        onClick={() => toggleTool(tool)}
                        className={`px-3 py-1.5 rounded-xl text-xs font-mono font-medium border transition-all ${
                          isSelected
                            ? 'bg-orange-500 text-white border-orange-400 shadow-sm'
                            : 'bg-zinc-950 text-zinc-400 border-zinc-800 hover:text-zinc-200'
                        }`}
                      >
                        {isSelected ? '✓ ' : '+ '}{tool}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Budget & Timeline in INR */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-zinc-300">Campaign Escrow Budget (₹ INR)</label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs font-bold text-zinc-500">₹</span>
                    <input
                      type="text"
                      value={budget}
                      onChange={(e) => setBudget(e.target.value)}
                      placeholder="₹12,50,000"
                      className="w-full pl-8 pr-3 py-2.5 rounded-xl bg-zinc-950 border border-zinc-800 text-xs text-white focus:outline-none focus:border-orange-500 font-mono font-bold"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-zinc-300">Turnaround Expectation</label>
                  <select
                    value={deadline}
                    onChange={(e) => setDeadline(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-xl bg-zinc-950 border border-zinc-800 text-xs text-white focus:outline-none focus:border-orange-500"
                  >
                    <option value="48h Rush (Priority Escrow)">⚡ 48h Rush (Priority Escrow)</option>
                    <option value="Under 1 Week (Standard)">Under 1 Week (Standard)</option>
                    <option value="2-3 Weeks (Multi-Phase Enterprise)">2-3 Weeks (Multi-Phase Enterprise)</option>
                  </select>
                </div>
              </div>

            </div>
          )}

          {/* STEP 3: Enterprise Commercial & Rights Clearance */}
          {currentStep === 3 && (
            <div className="space-y-6 animate-fadeIn">
              
              <div>
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-orange-400"></span>
                  Step 3: ASCI Regulatory & Clear-to-Air™ Rights Clearance
                </h3>
                <p className="text-xs text-zinc-400 mt-1">
                  Ensure compliance with Advertising Standards Council of India (ASCI) synthetic media disclosure guidelines and C2PA provenance.
                </p>
              </div>

              {/* License Tier Option */}
              <div className="space-y-2">
                <label className="text-xs font-semibold text-zinc-300">Commercial License Tier</label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {[
                    {
                      name: 'ASCI Synthetic Disclosure Certified • Enterprise Full Buyout',
                      desc: 'Global exclusive rights in all media forever. IP indemnity backed by Synapse India.'
                    },
                    {
                      name: 'India Digital & OTT 1-Year Buyout',
                      desc: 'Web, social channels, and streaming platforms in India for 12 months.'
                    },
                    {
                      name: 'Internal Pitch & Moodboard Testing',
                      desc: 'Agency pitch decks and non-broadcast test screenings.'
                    }
                  ].map((tier, idx) => (
                    <div
                      key={idx}
                      onClick={() => setLicenseTier(tier.name)}
                      className={`p-3.5 rounded-xl cursor-pointer border transition-all flex flex-col justify-between ${
                        licenseTier === tier.name
                          ? 'bg-emerald-500/10 border-emerald-500 text-white shadow-md'
                          : 'bg-zinc-950 border-zinc-800 text-zinc-400 hover:border-zinc-700'
                      }`}
                    >
                      <div>
                        <div className="flex items-center justify-between mb-1">
                          <span className="font-bold text-xs text-white">{tier.name.split('•')[0]}</span>
                          {licenseTier === tier.name && <CheckCircle2 className="w-4 h-4 text-emerald-400" />}
                        </div>
                        <p className="text-[11px] text-zinc-400 leading-snug">{tier.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Compliance Toggles */}
              <div className="space-y-3 pt-2">
                
                {/* ASCI Compliance toggle */}
                <div className="p-4 rounded-xl bg-zinc-950 border border-zinc-800 flex items-center justify-between gap-4">
                  <div className="space-y-0.5">
                    <div className="flex items-center gap-2">
                      <ShieldCheck className="w-4 h-4 text-emerald-400" />
                      <span className="text-xs font-bold text-zinc-100">Enforce ASCI Synthetic Media Disclosure</span>
                    </div>
                    <p className="text-[11px] text-zinc-400">
                      Ensures compliance with Advertising Standards Council of India guidelines for synthetic avatars and virtual characters.
                    </p>
                  </div>
                  <input
                    type="checkbox"
                    checked={asciCompliantEnforced}
                    onChange={(e) => setAsciCompliantEnforced(e.target.checked)}
                    className="w-5 h-5 accent-emerald-500 cursor-pointer rounded"
                  />
                </div>

                {/* Clear-to-Air toggle */}
                <div className="p-4 rounded-xl bg-zinc-950 border border-zinc-800 flex items-center justify-between gap-4">
                  <div className="space-y-0.5">
                    <div className="flex items-center gap-2">
                      <ShieldCheck className="w-4 h-4 text-orange-400" />
                      <span className="text-xs font-bold text-zinc-100">Enforce Clear-to-Air™ Certified Pipeline</span>
                    </div>
                    <p className="text-[11px] text-zinc-400">
                      Restricts unverified training models. Creators must only utilize verified commercial checkpoints with zero copyright infringement liability.
                    </p>
                  </div>
                  <input
                    type="checkbox"
                    checked={clearToAirEnforced}
                    onChange={(e) => setClearToAirEnforced(e.target.checked)}
                    className="w-5 h-5 accent-orange-500 cursor-pointer rounded"
                  />
                </div>

                {/* C2PA Provenance */}
                <div className="p-4 rounded-xl bg-zinc-950 border border-zinc-800 flex items-center justify-between gap-4">
                  <div className="space-y-0.5">
                    <div className="flex items-center gap-2">
                      <FileCheck className="w-4 h-4 text-cyan-400" />
                      <span className="text-xs font-bold text-zinc-100">Mandatory MeitY C2PA Cryptographic Provenance Manifest</span>
                    </div>
                    <p className="text-[11px] text-zinc-400">
                      Requires final master MP4/EXR to embed tamper-proof Coalition for Content Provenance and Authenticity metadata.
                    </p>
                  </div>
                  <input
                    type="checkbox"
                    checked={c2paMandatory}
                    onChange={(e) => setC2paMandatory(e.target.checked)}
                    className="w-5 h-5 accent-cyan-500 cursor-pointer rounded"
                  />
                </div>

                {/* Seed Lock */}
                <div className="p-4 rounded-xl bg-zinc-950 border border-zinc-800 flex items-center justify-between gap-4">
                  <div className="space-y-0.5">
                    <div className="flex items-center gap-2">
                      <Lock className="w-4 h-4 text-amber-400" />
                      <span className="text-xs font-bold text-zinc-100">Deliver Seed Lock & ComfyUI Workflow JSON</span>
                    </div>
                    <p className="text-[11px] text-zinc-400">
                      Requires creator to hand over exact seed numbers, prompt tokens, and node recipes upon completion.
                    </p>
                  </div>
                  <input
                    type="checkbox"
                    checked={seedLockRequired}
                    onChange={(e) => setSeedLockRequired(e.target.checked)}
                    className="w-5 h-5 accent-amber-500 cursor-pointer rounded"
                  />
                </div>

              </div>

            </div>
          )}

          {/* Stepper Navigation Buttons */}
          <div className="pt-4 border-t border-zinc-800 flex items-center justify-between">
            {currentStep > 1 ? (
              <button
                type="button"
                onClick={() => setCurrentStep(currentStep - 1)}
                className="flex items-center gap-1.5 px-4 py-2 text-xs font-semibold rounded-xl bg-zinc-900 hover:bg-zinc-800 text-zinc-300 border border-zinc-800 transition-colors"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Previous Step</span>
              </button>
            ) : <div></div>}

            {currentStep < 3 ? (
              <button
                type="button"
                onClick={() => setCurrentStep(currentStep + 1)}
                className="flex items-center gap-1.5 px-5 py-2.5 text-xs font-bold rounded-xl bg-orange-500 hover:bg-orange-600 text-white shadow-lg shadow-orange-500/25 transition-all"
              >
                <span>Continue to Step {currentStep + 1}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            ) : (
              <button
                type="button"
                onClick={handlePublish}
                className="flex items-center gap-2 px-6 py-2.5 text-xs font-extrabold rounded-xl bg-gradient-to-r from-orange-500 via-amber-500 to-emerald-500 hover:brightness-110 text-white shadow-xl shadow-orange-500/30 transition-all transform hover:scale-105"
              >
                <Sparkles className="w-4 h-4" />
                <span>Publish to Briefs Board (₹ INR Escrow)</span>
              </button>
            )}
          </div>

        </div>

        {/* Right Side: Live Brief Card Preview */}
        <div className="space-y-4">
          <div className="flex items-center justify-between text-xs font-bold uppercase tracking-wider text-zinc-400">
            <span className="flex items-center gap-1.5">
              <Eye className="w-4 h-4 text-orange-400" />
              Live Brief Spec Preview
            </span>
            <span className="text-[10px] text-emerald-400 font-mono">Real-time</span>
          </div>

          <div className="rounded-3xl bg-[#121217] border border-zinc-700/80 p-5 space-y-4 shadow-xl">
            
            <div className="flex items-start justify-between gap-3">
              <div>
                <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-orange-500/10 text-orange-400 border border-orange-500/30">
                  Open for Pitches
                </span>
                <h3 className="font-bold text-base text-white mt-1.5 leading-snug">
                  {title || 'Untitled Campaign Brief'}
                </h3>
                <p className="text-xs text-zinc-400 mt-0.5">{brandName || 'Client Studio India'}</p>
              </div>
              <div className="text-right">
                <span className="text-base font-extrabold text-amber-400">{budget}</span>
                <span className="text-[10px] text-zinc-500 block uppercase">Escrow Locked</span>
              </div>
            </div>

            <p className="text-xs text-zinc-300 line-clamp-3 leading-relaxed">
              {campaignIdea || 'Creative narrative brief description will appear here as you type...'}
            </p>

            {/* Formats & Delivery */}
            <div className="grid grid-cols-2 gap-2 text-[11px] p-2.5 rounded-xl bg-zinc-950 border border-zinc-800">
              <div>
                <span className="text-zinc-500 block text-[10px]">Format:</span>
                <span className="text-zinc-200 font-medium truncate block">{mediaType}</span>
              </div>
              <div>
                <span className="text-zinc-500 block text-[10px]">Aspect Ratio:</span>
                <span className="text-zinc-200 font-medium truncate block">{aspectRatio}</span>
              </div>
            </div>

            {/* Model Stack */}
            <div className="space-y-1">
              <span className="text-[10px] text-zinc-500 uppercase font-bold">Required AI Engines:</span>
              <div className="flex flex-wrap gap-1">
                {selectedTools.map((t, idx) => (
                  <span key={idx} className="px-2 py-0.5 text-[10px] font-mono rounded bg-zinc-900 text-zinc-300 border border-zinc-800">
                    {t}
                  </span>
                ))}
              </div>
            </div>

            {/* Style Tokens */}
            <div className="space-y-1">
              <span className="text-[10px] text-zinc-500 uppercase font-bold">Conditioning Tokens:</span>
              <div className="flex flex-wrap gap-1">
                {styleTokens.slice(0, 4).map((tok, idx) => (
                  <span key={idx} className="px-1.5 py-0.5 text-[10px] font-mono rounded bg-orange-500/10 text-orange-300 border border-orange-500/20">
                    {tok}
                  </span>
                ))}
                {styleTokens.length > 4 && (
                  <span className="text-[10px] text-zinc-500 self-center">+{styleTokens.length - 4} more</span>
                )}
              </div>
            </div>

            {/* Compliance Badge */}
            <div className="pt-2 border-t border-zinc-800 flex items-center justify-between text-[11px]">
              <span className="text-emerald-400 flex items-center gap-1 font-semibold">
                <ShieldCheck className="w-3.5 h-3.5" />
                ASCI Verified
              </span>
              <span className="text-zinc-400 font-mono">{deadline}</span>
            </div>

          </div>

          {/* Assistant Note */}
          <div className="p-3.5 rounded-2xl bg-zinc-900/60 border border-zinc-800 text-[11px] text-zinc-400 flex items-start gap-2.5">
            <HelpCircle className="w-4 h-4 text-orange-400 shrink-0 mt-0.5" />
            <p>
              Once published, certified Indian AI creators with matching LoRA consistency scores will submit video treatments and node recipes directly to your dashboard.
            </p>
          </div>
        </div>

      </div>

    </div>
  );
};
