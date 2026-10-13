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
  // Derive smart recommendation logic:
  // E.g., if user searched for Kling or Sora, recommend Runway Gen-3 or ComfyUI creators
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
    <div className="w-full p-8 rounded-3xl bg-gradient-to-b from-zinc-900/90 to-zinc-950 border border-zinc-800 text-center space-y-6 my-6 shadow-2xl">
      
      {/* Icon & AI Badge */}
      <div className="inline-flex items-center justify-center p-3 rounded-2xl bg-orange-500/10 border border-orange-500/20 text-orange-400">
        <Sparkles className="w-6 h-6 animate-pulse" />
      </div>

      <div className="max-w-xl mx-auto space-y-2">
        <h3 className="text-xl font-bold text-white tracking-tight">
          Smart Toolchain Recommendation
        </h3>
        <p className="text-sm text-zinc-400 leading-relaxed">
          {recommendationMessage}
        </p>
      </div>

      {/* Suggested 1-Click Action Buttons */}
      <div className="flex flex-wrap items-center justify-center gap-3">
        <button
          onClick={() => onApplyAlternativeTool(suggestedTool)}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-orange-500 hover:bg-orange-600 text-white font-semibold text-xs shadow-lg shadow-orange-500/20 transition-all"
        >
          <Zap className="w-4 h-4" />
          <span>Switch to {suggestedTool} Specialists</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>

        <button
          onClick={onResetFilters}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-300 font-semibold text-xs border border-zinc-700 transition-colors"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Reset All Filters</span>
        </button>
      </div>

      {/* Recommended Alternative Creators Carousel/Grid */}
      <div className="pt-6 border-t border-zinc-800/80 max-w-4xl mx-auto">
        <div className="text-left text-xs font-bold text-zinc-400 uppercase tracking-wider mb-3 flex items-center gap-2">
          <Users className="w-4 h-4 text-orange-400" />
          Recommended Alternative Creators with Matching Benchmarks:
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-left">
          {recommendedCreators.slice(0, 3).map((creator) => (
            <div 
              key={creator.id}
              onClick={() => onSelectCreator(creator)}
              className="p-3.5 rounded-xl bg-zinc-900/80 hover:bg-zinc-800/80 border border-zinc-800 hover:border-orange-500/40 cursor-pointer transition-all group"
            >
              <div className="flex items-center gap-2.5">
                <img 
                  src={creator.avatar} 
                  alt={creator.name} 
                  className="w-10 h-10 rounded-lg object-cover border border-zinc-700"
                />
                <div className="min-w-0 flex-1">
                  <h4 className="text-xs font-bold text-zinc-100 group-hover:text-orange-400 truncate">
                    {creator.name}
                  </h4>
                  <p className="text-[11px] text-zinc-400 truncate">{creator.title}</p>
                  <p className="text-[10px] text-emerald-400 font-mono mt-0.5">
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
