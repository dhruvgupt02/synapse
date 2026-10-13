import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Sparkles, 
  Clock, 
  Star, 
  Bookmark, 
  Layers, 
  ArrowRight, 
  Film, 
  CheckCircle2, 
  Eye, 
  Award,
  Zap,
  Lock
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
      className="group relative flex flex-col rounded-2xl bg-[#121217] border border-zinc-800/90 hover:border-orange-500/40 transition-all duration-300 hover:shadow-xl hover:shadow-orange-500/10 overflow-hidden"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Top Media Showcase Container */}
      <div className="relative aspect-[16/10] w-full overflow-hidden bg-zinc-950">
        <img 
          src={featured?.thumbnail || creator.coverImage} 
          alt={creator.name}
          className={`w-full h-full object-cover transition-transform duration-700 ease-out ${
            isHovered ? 'scale-105 filter brightness-110' : 'scale-100'
          }`}
        />
        
        {/* Subtle overlay gradients */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#121217] via-transparent to-black/50" />

        {/* Top Badges overlay */}
        <div className="absolute top-3 inset-x-3 flex items-center justify-between gap-2 z-10">
          <div className="flex flex-wrap items-center gap-1.5">
            {creator.clearToAirCertified && (
              <span className="flex items-center gap-1 px-2.5 py-1 text-[10px] font-bold rounded-full bg-emerald-500/90 text-white backdrop-blur-md shadow-sm">
                <ShieldCheck className="w-3 h-3" />
                Clear-to-Air™
              </span>
            )}
            <span className="flex items-center gap-1 px-2 py-0.5 text-[10px] font-semibold rounded-full bg-zinc-900/80 text-zinc-200 border border-zinc-700/80 backdrop-blur-md">
              <span className="text-amber-400 font-bold">★</span> {creator.rating} ({creator.reviewsCount})
            </span>
          </div>

          <button
            onClick={(e) => {
              e.stopPropagation();
              onToggleSave(creator.id);
            }}
            className={`p-1.5 rounded-full backdrop-blur-md transition-all ${
              isSaved 
                ? 'bg-orange-500 text-white shadow-md shadow-orange-500/40' 
                : 'bg-zinc-900/70 text-zinc-300 hover:text-white hover:bg-zinc-800'
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
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-orange-500 hover:bg-orange-600 text-white text-[11px] font-bold shadow-lg shadow-orange-500/30 transition-all transform hover:scale-105"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Inspect Recipe</span>
          </button>
        </div>

        {/* Character Consistency Index Pill on media */}
        <div className="absolute bottom-3 left-3 z-10">
          <div className="px-2 py-1 rounded-lg bg-zinc-950/80 border border-zinc-700/70 backdrop-blur-md text-[10px] font-mono text-zinc-200 flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse"></span>
            <span>Consistency: <strong className="text-cyan-300">{creator.characterConsistencyIndex}%</strong></span>
          </div>
        </div>
      </div>

      {/* Creator Info Body */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between space-y-4">
        
        {/* Creator Header: Avatar + Name + Turnaround */}
        <div className="flex items-start gap-3">
          <img 
            src={creator.avatar} 
            alt={creator.name} 
            className="w-12 h-12 rounded-xl object-cover border-2 border-zinc-700 shadow-md group-hover:border-orange-500/60 transition-colors"
          />
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between gap-1">
              <h3 
                onClick={() => onSelectCreator(creator)}
                className="font-bold text-base text-white truncate hover:text-orange-400 cursor-pointer transition-colors"
              >
                {creator.name}
              </h3>
            </div>
            <p className="text-xs text-orange-400 font-medium truncate">{creator.title}</p>
            <p className="text-[11px] text-zinc-400 flex items-center gap-1.5 mt-0.5">
              <span>{creator.location}</span>
              <span>•</span>
              <span className="text-zinc-300 font-medium">{creator.turnaroundBadge}</span>
            </p>
          </div>
        </div>

        {/* Bio snippet */}
        <p className="text-xs text-zinc-300 line-clamp-2 leading-relaxed">
          {creator.bio}
        </p>

        {/* Toolchain Badges */}
        <div className="space-y-1.5">
          <div className="text-[10px] uppercase font-bold tracking-wider text-zinc-500">
            Primary AI Stack
          </div>
          <div className="flex flex-wrap gap-1">
            {creator.primaryTools.slice(0, 4).map((tool, idx) => (
              <span 
                key={idx}
                className="px-2 py-0.5 text-[10px] font-mono rounded bg-zinc-900 text-zinc-300 border border-zinc-800"
              >
                {tool}
              </span>
            ))}
            {creator.primaryTools.length > 4 && (
              <span className="px-1.5 py-0.5 text-[10px] font-mono rounded bg-zinc-900 text-zinc-400 border border-zinc-800">
                +{creator.primaryTools.length - 4}
              </span>
            )}
          </div>
        </div>

        {/* Pricing & Footer Actions */}
        <div className="pt-3 border-t border-zinc-800/80 flex items-center justify-between gap-2">
          <div>
            <div className="text-xs font-bold text-white">
              {typeof creator.hourlyRate === 'string' && creator.hourlyRate.startsWith('₹') 
                ? creator.hourlyRate 
                : `₹${Number(creator.hourlyRate).toLocaleString('en-IN')}`
              }<span className="text-[10px] text-zinc-400 font-normal">/hr</span>
            </div>
            <div className="text-[10px] text-zinc-400">
              Min. {typeof creator.projectMinimum === 'string' && creator.projectMinimum.startsWith('₹')
                ? creator.projectMinimum
                : `₹${Number(creator.projectMinimum).toLocaleString('en-IN')}`
              }
            </div>
          </div>

          <div className="flex items-center gap-1.5">
            <button
              onClick={() => onSelectCreator(creator)}
              className="px-3 py-1.5 text-xs font-semibold rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-200 transition-colors"
            >
              Portfolio
            </button>
            <button
              onClick={() => onBookCreator(creator)}
              className="px-3 py-1.5 text-xs font-bold rounded-xl bg-gradient-to-r from-orange-500 to-amber-500 hover:brightness-110 text-white shadow-md shadow-orange-500/20 transition-all flex items-center gap-1"
            >
              <span>Book</span>
              <ArrowRight className="w-3 h-3" />
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
