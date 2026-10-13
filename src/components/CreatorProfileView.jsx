import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Sparkles, 
  Clock, 
  Star, 
  Bookmark, 
  Layers, 
  ArrowLeft, 
  Film, 
  CheckCircle2, 
  Eye, 
  Award, 
  Zap, 
  FileCode2, 
  Lock, 
  Share2, 
  Send,
  Sliders,
  Cpu,
  TrendingUp,
  Download
} from 'lucide-react';

export const CreatorProfileView = ({ 
  creator, 
  onBack, 
  onInspectRecipe, 
  onBookCreator, 
  isSaved, 
  onToggleSave 
}) => {
  const [activePortfolioTab, setActivePortfolioTab] = useState('all');

  if (!creator) return null;

  const featured = creator.featuredRecipe;
  const portfolioItems = creator.portfolio || [];

  return (
    <div className="w-full space-y-8 animate-fadeIn pb-16">
      
      {/* Back Button & Top Navigation */}
      <div className="flex items-center justify-between">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-xs font-semibold text-zinc-400 hover:text-white px-3 py-1.5 rounded-xl bg-zinc-900 border border-zinc-800 transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Creator Discovery</span>
        </button>

        <div className="flex items-center gap-2">
          <button
            onClick={() => onToggleSave(creator.id)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all ${
              isSaved
                ? 'bg-orange-500 text-white border-orange-400'
                : 'bg-zinc-900 text-zinc-300 border-zinc-800 hover:text-white'
            }`}
          >
            <Bookmark className="w-3.5 h-3.5 fill-current" />
            <span>{isSaved ? 'Saved Creator' : 'Save'}</span>
          </button>

          <button
            onClick={() => onBookCreator(creator)}
            className="flex items-center gap-1.5 px-4 py-1.5 rounded-xl text-xs font-bold bg-gradient-to-r from-orange-500 to-amber-500 text-white shadow-lg shadow-orange-500/25 hover:brightness-110 transition-all"
          >
            <Send className="w-3.5 h-3.5" />
            <span>Book Creator</span>
          </button>
        </div>
      </div>

      {/* Hero Creator Header Banner */}
      <div className="relative rounded-3xl bg-[#121217] border border-zinc-800 overflow-hidden shadow-2xl">
        {/* Banner Cover Image */}
        <div className="relative h-56 sm:h-72 w-full overflow-hidden bg-zinc-950">
          <img 
            src={creator.coverImage} 
            alt={creator.name} 
            className="w-full h-full object-cover filter brightness-75"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#121217] via-[#121217]/50 to-transparent" />
          
          <div className="absolute top-4 right-4 flex items-center gap-2">
            <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-black/60 backdrop-blur-md text-amber-400 border border-amber-500/30 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" />
              Benchmark: {creator.benchmarkScore}
            </span>
          </div>
        </div>

        {/* Creator Info Box Overlay */}
        <div className="relative px-6 sm:px-8 pb-8 pt-0 -mt-16 sm:-mt-20">
          <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-6">
            
            {/* Avatar & Identifiers */}
            <div className="flex flex-col sm:flex-row items-start sm:items-end gap-5">
              <div className="relative">
                <img 
                  src={creator.avatar} 
                  alt={creator.name} 
                  className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl object-cover border-4 border-[#121217] shadow-xl"
                />
                <div className="absolute -bottom-1 -right-1 p-1 rounded-full bg-emerald-500 text-white shadow-md">
                  <ShieldCheck className="w-4 h-4" />
                </div>
              </div>

              <div className="space-y-1">
                <div className="flex flex-wrap items-center gap-2">
                  <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                    {creator.name}
                  </h1>
                  <span className="text-xs text-zinc-400 font-mono">{creator.handle}</span>
                </div>

                <p className="text-sm font-medium text-orange-400">{creator.title}</p>
                <p className="text-xs text-zinc-400 flex items-center gap-2">
                  <span>{creator.location}</span>
                  <span>•</span>
                  <span className="flex items-center gap-1 text-amber-400">
                    ★ <strong>{creator.rating}</strong> ({creator.reviewsCount} verified brand reviews)
                  </span>
                </p>
              </div>
            </div>

            {/* Verification Badges Grid */}
            <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto">
              <div className="px-3 py-1.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-bold flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4" />
                <span>Clear-to-Air™ Verified</span>
              </div>
              
              <div className="px-3 py-1.5 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-bold font-mono flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse"></span>
                <span>Consistency Index: {creator.characterConsistencyIndex}%</span>
              </div>
            </div>

          </div>

          {/* Bio & Details */}
          <div className="mt-6 pt-6 border-t border-zinc-800/80 grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-4">
              <p className="text-sm text-zinc-300 leading-relaxed">
                {creator.bio}
              </p>

              {/* Toolchain tags */}
              <div className="space-y-2">
                <div className="text-xs uppercase font-bold tracking-wider text-zinc-500">
                  Certified Pipeline & Tool Stack
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {creator.primaryTools.map((tool, i) => (
                    <span 
                      key={i}
                      className="px-2.5 py-1 text-xs font-mono font-medium rounded-lg bg-zinc-900 text-zinc-200 border border-zinc-800"
                    >
                      {tool}
                    </span>
                  ))}
                  {creator.specializations.map((spec, i) => (
                    <span 
                      key={i}
                      className="px-2.5 py-1 text-xs font-semibold rounded-lg bg-orange-500/10 text-orange-300 border border-orange-500/20"
                    >
                      {spec}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Creator Metrics Box */}
            <div className="p-4 rounded-2xl bg-zinc-900/80 border border-zinc-800 grid grid-cols-2 gap-3 text-center">
              <div className="p-2.5 rounded-xl bg-zinc-950/60 border border-zinc-800/60">
                <div className="text-lg font-bold text-white">{creator.stats?.completedBriefs || 38}</div>
                <div className="text-[10px] text-zinc-400 uppercase">Briefs Delivered</div>
              </div>
              <div className="p-2.5 rounded-xl bg-zinc-950/60 border border-zinc-800/60">
                <div className="text-lg font-bold text-emerald-400">{creator.stats?.repeatClients || '92%'}</div>
                <div className="text-[10px] text-zinc-400 uppercase">Repeat Brands</div>
              </div>
              <div className="p-2.5 rounded-xl bg-zinc-950/60 border border-zinc-800/60">
                <div className="text-lg font-bold text-cyan-400">{creator.stats?.averageDeliveryDays || 3.5}d</div>
                <div className="text-[10px] text-zinc-400 uppercase">Avg Delivery</div>
              </div>
              <div className="p-2.5 rounded-xl bg-zinc-950/60 border border-zinc-800/60">
                <div className="text-lg font-bold text-amber-400">{creator.stats?.totalFramesGenerated || '1M+'}</div>
                <div className="text-[10px] text-zinc-400 uppercase">Frames Rendered</div>
              </div>
            </div>

          </div>

        </div>
      </div>

      {/* Featured Master Recipe Banner */}
      {featured && (
        <div className="relative rounded-3xl bg-gradient-to-r from-zinc-900 via-zinc-900/90 to-zinc-950 border border-zinc-800 p-6 sm:p-8 space-y-6 shadow-xl">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-orange-500/15 text-orange-400 border border-orange-500/30 flex items-center gap-1">
                  <Sparkles className="w-3.5 h-3.5" />
                  Featured Recipe-First Production
                </span>
                <span className="text-xs font-mono text-zinc-400 flex items-center gap-1">
                  <Lock className="w-3 h-3 text-amber-400" />
                  Seed Lock: {featured.promptArchitecture?.seedLock || '4928172940'}
                </span>
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                {featured.title}
              </h2>
            </div>

            <button
              onClick={() => onInspectRecipe(featured, creator)}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-orange-500 hover:bg-orange-600 text-white text-xs font-bold shadow-lg shadow-orange-500/20 transition-all hover:scale-105"
            >
              <FileCode2 className="w-4 h-4" />
              <span>Inspect Full Production Recipe</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Visual Thumbnail */}
            <div className="relative aspect-video rounded-2xl overflow-hidden bg-zinc-950 border border-zinc-800">
              <img 
                src={featured.thumbnail} 
                alt={featured.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-2 left-2 px-2 py-0.5 rounded bg-black/70 text-[10px] font-mono text-zinc-200">
                {featured.resolution}
              </div>
            </div>

            {/* Recipe Snapshot Details */}
            <div className="md:col-span-2 space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div className="p-3 rounded-xl bg-zinc-950 border border-zinc-800/80">
                  <span className="text-[10px] text-zinc-500 uppercase block font-semibold">Engine Stack</span>
                  <span className="text-zinc-200 font-mono font-medium">{featured.baseModels?.join(' • ')}</span>
                </div>
                <div className="p-3 rounded-xl bg-zinc-950 border border-zinc-800/80">
                  <span className="text-[10px] text-zinc-500 uppercase block font-semibold">Audio Pipeline</span>
                  <span className="text-zinc-200 font-mono text-[11px] truncate block">{featured.audioPipeline}</span>
                </div>
              </div>

              {/* Prompt Snapshot */}
              <div className="p-3.5 rounded-xl bg-zinc-950 border border-zinc-800 font-mono text-xs text-zinc-300 leading-relaxed">
                <span className="text-orange-400 font-bold block text-[10px] uppercase mb-1">
                  Conditioning Architecture:
                </span>
                "{featured.promptArchitecture?.positiveSnippet}"
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Portfolio Showcase Grid */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-bold text-white tracking-tight flex items-center gap-2">
            <Film className="w-5 h-5 text-orange-400" />
            Verified Portfolio Pieces with Inspectable Recipes
          </h3>
          <span className="text-xs text-zinc-400 font-mono">
            {portfolioItems.length} Productions
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {portfolioItems.map((item) => (
            <div 
              key={item.id}
              className="group rounded-2xl bg-[#121217] border border-zinc-800 hover:border-orange-500/40 overflow-hidden transition-all duration-300 shadow-lg flex flex-col justify-between"
            >
              <div className="relative aspect-[16/10] bg-zinc-950 overflow-hidden">
                <img 
                  src={item.image} 
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20" />
                
                <div className="absolute top-2.5 right-2.5 px-2 py-0.5 rounded-full bg-black/60 backdrop-blur-md text-[10px] text-zinc-300 font-mono">
                  {item.duration}
                </div>

                <div className="absolute bottom-2.5 left-2.5 right-2.5 flex items-center justify-between">
                  <span className="text-[10px] font-semibold text-emerald-400 bg-emerald-950/80 px-2 py-0.5 rounded border border-emerald-500/30">
                    Clear-to-Air™
                  </span>
                  
                  <button
                    onClick={() => onInspectRecipe(item, creator)}
                    className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-orange-500 text-white text-[10px] font-bold shadow hover:bg-orange-600 transition-colors"
                  >
                    <Sparkles className="w-3 h-3" />
                    <span>Inspect Recipe</span>
                  </button>
                </div>
              </div>

              <div className="p-4 space-y-3 flex-1 flex flex-col justify-between">
                <div>
                  <h4 className="font-bold text-sm text-zinc-100 group-hover:text-orange-400 transition-colors">
                    {item.title}
                  </h4>
                  <p className="text-xs text-zinc-400 mt-0.5">{item.type}</p>
                </div>

                <div className="flex flex-wrap gap-1">
                  {item.tags.map((tag, idx) => (
                    <span 
                      key={idx}
                      className="px-2 py-0.5 text-[10px] font-mono rounded bg-zinc-900 text-zinc-400 border border-zinc-800"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="pt-2 border-t border-zinc-800/80 flex items-center justify-between text-[11px] text-zinc-400">
                  <span className="text-amber-400 font-semibold">{item.awards}</span>
                  <span>{item.views} views</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
