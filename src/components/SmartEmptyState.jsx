import React from 'react';
import { Sparkles, ArrowRight, RotateCcw, Zap, Compass, Users } from 'lucide-react';
import { INITIAL_CREATORS } from '../data/mockData';

export const SmartEmptyState = ({ 
  selectedTools, 
  selectedSpecialization, 
  onApplyAlternativeTool,
  onResetFilters,
  onSelectCreator
}) => {
  const hasKlingOrSora = selectedTools.includes('Kling 1.5') || selectedTools.includes('Sora');
  const has3D = selectedSpecialization === '3D & VFX';

  let recommendationMessage = 'No creators match this exact rigid combination of filters.';
  let suggestedTool = 'Runway Gen-3';
  let recommendedCreators = INITIAL_CREATORS.slice(0, 3);

  if (hasKlingOrSora) {
    recommendationMessage = 'No specific single model match? Runway Gen-3 & ComfyUI specialists offer equivalent photorealistic motion & prompt coherence benchmarks.';
    suggestedTool = 'Runway Gen-3';
    recommendedCreators = INITIAL_CREATORS.filter(c => c.primaryTools.includes('Runway Gen-3') || c.primaryTools.includes('ComfyUI'));
  } else if (has3D) {
    recommendationMessage = 'Looking for generative 3D? Marcus Chen & Devon Sato specialize in hybrid ControlNet & Unreal Engine 5 render pipelines.';
    suggestedTool = 'Flux.1';
    recommendedCreators = INITIAL_CREATORS.filter(c => c.specializations.includes('3D & VFX'));
  } else {
    recommendationMessage = 'Here are our top benchmark-tested directors with 98%+ consistency and Clear-to-Air™ commercial certification.';
    suggestedTool = 'ComfyUI';
    recommendedCreators = INITIAL_CREATORS.slice(0, 3);
  }

  return (
    <div className="w-full p-8 rounded-3xl bg-white border border-[#dfd5c4] text-center space-y-6 my-6 shadow-md">
      
      {/* Icon & AI Badge */}
      <div className="inline-flex items-center justify-center p-3 rounded-2xl bg-[#ff5522]/10 border border-[#ff5522]/20 text-[#ff5522]">
        <Sparkles className="w-6 h-6 animate-pulse" />
      </div>

      <div className="max-w-xl mx-auto space-y-2">
        <h3 className="font-display font-black text-xl text-black tracking-tight uppercase">
          Smart Toolchain Recommendation
        </h3>
        <p className="text-sm text-neutral-600 leading-relaxed font-medium">
          {recommendationMessage}
        </p>
      </div>

      {/* Suggested 1-Click Action Buttons */}
      <div className="flex flex-wrap items-center justify-center gap-3">
        <button
          onClick={() => onApplyAlternativeTool(suggestedTool)}
          className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#ff5522] hover:bg-[#eb4817] text-white font-bold text-xs shadow-md shadow-[#ff5522]/20 transition-all"
        >
          <Zap className="w-4 h-4" />
          <span>Switch to {suggestedTool} Specialists</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>

        <button
          onClick={onResetFilters}
          className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#f1e8dd] hover:bg-[#e7dcce] text-neutral-800 font-bold text-xs transition-colors"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Reset All Filters</span>
        </button>
      </div>

      {/* Recommended Alternative Creators Carousel/Grid */}
      <div className="pt-6 border-t border-[#ede4d8] max-w-4xl mx-auto">
        <div className="text-left text-xs font-bold text-neutral-500 uppercase tracking-wider mb-3 flex items-center gap-2">
          <Users className="w-4 h-4 text-[#ff5522]" />
          Recommended Alternative Creators with Matching Benchmarks:
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-left">
          {recommendedCreators.slice(0, 3).map((creator) => (
            <div 
              key={creator.id}
              onClick={() => onSelectCreator(creator)}
              className="p-3.5 rounded-2xl bg-[#faf6f0] hover:bg-white border border-[#e5dcd0] hover:border-[#ff5522] cursor-pointer transition-all group shadow-sm"
            >
              <div className="flex items-center gap-2.5">
                <img 
                  src={creator.avatar} 
                  alt={creator.name} 
                  className="w-10 h-10 rounded-xl object-cover border border-[#dfd5c4]"
                />
                <div className="min-w-0 flex-1">
                  <h4 className="text-xs font-black text-black group-hover:text-[#ff5522] truncate font-display">
                    {creator.name}
                  </h4>
                  <p className="text-[11px] text-neutral-500 truncate font-medium">{creator.title}</p>
                  <p className="text-[10px] text-emerald-600 font-mono font-bold mt-0.5">
                    Consistency {creator.characterConsistencyIndex}%
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
