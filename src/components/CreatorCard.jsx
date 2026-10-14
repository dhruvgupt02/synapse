import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Sparkles, 
  Bookmark, 
  ArrowRight, 
  Zap,
  Sliders
} from 'lucide-react';

export const CreatorCard = ({ 
  creator, 
  onSelectCreator, 
  onInspectRecipe, 
  isSaved, 
  onToggleSave,
  onBookCreator 
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const featured = creator.featuredRecipe;

  return (
    <div 
      className="group relative flex flex-col rounded-3xl bg-white border border-[#e3d8ca] hover:border-[#ff5522]/60 transition-all duration-300 hover:shadow-xl hover:shadow-black/5 overflow-hidden"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Top Media Showcase Container */}
      <div className="relative aspect-[16/10] w-full overflow-hidden bg-[#ede4d8]">
        <img 
          src={featured?.thumbnail || creator.coverImage} 
          alt={creator.name}
          className={`w-full h-full object-cover transition-transform duration-700 ease-out ${
            isHovered ? 'scale-105 filter brightness-105' : 'scale-100'
          }`}
        />
        
        {/* Subtle overlay gradients */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/30 pointer-events-none" />

        {/* Top Badges overlay */}
        <div className="absolute top-3 inset-x-3 flex items-center justify-between gap-2 z-10">
          <div className="flex flex-wrap items-center gap-1.5">
            {creator.clearToAirCertified && (
              <span className="flex items-center gap-1 px-2.5 py-1 text-[10px] font-extrabold rounded-full bg-black text-white shadow-sm">
                <ShieldCheck className="w-3 h-3 text-[#ff5522]" />
                Clear-to-Air™
              </span>
            )}
            <span className="flex items-center gap-1 px-2 py-0.5 text-[10px] font-bold rounded-full bg-white/90 text-neutral-900 shadow-sm">
              <span className="text-[#ff5522]">★</span> {creator.rating} ({creator.reviewsCount})
            </span>
          </div>

          <button
            onClick={(e) => {
              e.stopPropagation();
              onToggleSave(creator.id);
            }}
            className={`p-2 rounded-full transition-all ${
              isSaved 
                ? 'bg-[#ff5522] text-white shadow-md' 
                : 'bg-white/80 hover:bg-white text-neutral-800'
            }`}
            title={isSaved ? 'Saved Creator' : 'Save Creator'}
          >
            <Bookmark className="w-3.5 h-3.5 fill-current" />
          </button>
        </div>

        {/* Hover Inspect Recipe Quick Trigger */}
        <div className="absolute bottom-3 right-3 z-10">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onInspectRecipe(featured, creator);
            }}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#ff5522] hover:bg-[#e04413] text-white text-[11px] font-extrabold shadow-md transition-transform hover:scale-105"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Recipe</span>
          </button>
        </div>

        {/* Character Consistency Index Pill on media */}
        <div className="absolute bottom-3 left-3 z-10">
          <div className="px-2.5 py-1 rounded-full bg-black/85 text-[10px] font-mono text-white flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
            <span>Consistency: <strong className="text-white font-bold">{creator.characterConsistencyIndex}%</strong></span>
          </div>
        </div>
      </div>

      {/* Creator Info Body */}
      <div className="p-5 flex-1 flex flex-col justify-between space-y-4 bg-white">
        
        {/* Creator Header: Avatar + Name + Turnaround */}
        <div className="flex items-start gap-3">
          <img 
            src={creator.avatar} 
            alt={creator.name} 
            className="w-12 h-12 rounded-2xl object-cover border-2 border-[#e7ded0] shadow-sm group-hover:border-[#ff5522] transition-colors"
          />
          <div className="flex-1 min-w-0">
            <h3 
              onClick={() => onSelectCreator(creator)}
              className="font-display font-extrabold text-base text-black truncate hover:text-[#ff5522] cursor-pointer transition-colors"
            >
              {creator.name}
            </h3>
            <p className="text-xs text-[#ff5522] font-bold truncate">{creator.title}</p>
            <p className="text-[11px] text-neutral-500 font-medium flex items-center gap-1.5 mt-0.5">
              <span>{creator.location}</span>
              <span>•</span>
              <span className="text-neutral-700 font-semibold">{creator.turnaroundBadge}</span>
            </p>
          </div>
        </div>

        {/* Bio snippet */}
        <p className="text-xs text-neutral-600 line-clamp-2 leading-relaxed font-medium">
          {creator.bio}
        </p>

        {/* Toolchain Badges */}
        <div className="space-y-1.5">
          <div className="text-[10px] uppercase font-bold tracking-wider text-neutral-400">
            Primary AI Stack
          </div>
          <div className="flex flex-wrap gap-1">
            {creator.primaryTools.slice(0, 4).map((tool, idx) => (
              <span 
                key={idx}
                className="px-2 py-0.5 text-[10px] font-mono font-medium rounded-md bg-[#f6f0e7] text-neutral-800 border border-[#e4dacb]"
              >
                {tool}
              </span>
            ))}
            {creator.primaryTools.length > 4 && (
              <span className="px-1.5 py-0.5 text-[10px] font-mono rounded-md bg-[#f6f0e7] text-neutral-600 border border-[#e4dacb]">
                +{creator.primaryTools.length - 4}
              </span>
            )}
          </div>
        </div>

        {/* Pricing & Footer Actions */}
        <div className="pt-3 border-t border-[#ede4d8] flex items-center justify-between gap-2">
          <div>
            <div className="text-xs font-black text-black">
              {typeof creator.hourlyRate === 'string' && creator.hourlyRate.startsWith('₹') 
                ? creator.hourlyRate 
                : `₹${Number(creator.hourlyRate).toLocaleString('en-IN')}`
              }<span className="text-[10px] text-neutral-500 font-normal">/hr</span>
            </div>
            <div className="text-[10px] text-neutral-500 font-medium">
              Min. {typeof creator.projectMinimum === 'string' && creator.projectMinimum.startsWith('₹')
                ? creator.projectMinimum
                : `₹${Number(creator.projectMinimum).toLocaleString('en-IN')}`
              }
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => onSelectCreator(creator)}
              className="px-3 py-1.5 text-xs font-bold rounded-full bg-[#f1e9dd] hover:bg-[#e8decb] text-neutral-800 transition-colors"
            >
              Portfolio
            </button>
            <button
              onClick={() => onBookCreator(creator)}
              className="px-3.5 py-1.5 text-xs font-black rounded-full bg-black hover:bg-neutral-800 text-white shadow-sm transition-all flex items-center gap-1"
            >
              <span>Book</span>
              <ArrowRight className="w-3 h-3 text-[#ff5522]" />
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
