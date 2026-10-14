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

import { WhereToNavigateNext } from './WhereToNavigateNext';

export const CreatorProfileView = ({ 
  creator, 
  onBack, 
  onInspectRecipe, 
  onBookCreator, 
  isSaved, 
  onToggleSave,
  onNavigate
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
          className="flex items-center gap-2 text-xs font-bold text-neutral-800 hover:text-black px-4 py-2 rounded-full bg-white border border-[#dfd5c4] shadow-sm transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Creator Discovery</span>
        </button>

        <div className="flex items-center gap-2">
          <button
            onClick={() => onToggleSave(creator.id)}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-bold border transition-all ${
              isSaved
                ? 'bg-[#ff5522] text-white border-[#ff5522]'
                : 'bg-white text-neutral-800 border-[#dfd5c4] hover:bg-neutral-50'
            }`}
          >
            <Bookmark className="w-3.5 h-3.5 fill-current" />
            <span>{isSaved ? 'Saved Creator' : 'Save'}</span>
          </button>

          <button
            onClick={() => onBookCreator(creator)}
            className="flex items-center gap-1.5 px-5 py-2 rounded-full text-xs font-black bg-black text-white hover:bg-neutral-900 shadow-md transition-all"
          >
            <Send className="w-3.5 h-3.5 text-[#ff5522]" />
            <span>Book Creator</span>
          </button>
        </div>
      </div>

      {/* Hero Creator Header Banner */}
      <div className="relative rounded-3xl bg-white border border-[#dfd5c4] overflow-hidden shadow-lg">
        {/* Banner Cover Image */}
        <div className="relative h-56 sm:h-72 w-full overflow-hidden bg-[#e8dece]">
          <img 
            src={creator.coverImage} 
            alt={creator.name} 
            className="w-full h-full object-cover filter brightness-90"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-white via-white/40 to-transparent" />
          
          <div className="absolute top-4 right-4 flex items-center gap-2">
            <span className="px-3.5 py-1.5 rounded-full text-xs font-mono font-bold bg-black/80 backdrop-blur-md text-amber-300 border border-white/20 flex items-center gap-1.5 shadow-md">
              <Sparkles className="w-3.5 h-3.5 text-[#ff5522]" />
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
                  className="w-24 h-24 sm:w-28 sm:h-28 rounded-3xl object-cover border-4 border-white shadow-xl"
                />
                <div className="absolute -bottom-1 -right-1 p-1.5 rounded-full bg-black text-[#ff5522] shadow-md border-2 border-white">
                  <ShieldCheck className="w-4 h-4" />
                </div>
              </div>

              <div className="space-y-1">
                <div className="flex flex-wrap items-center gap-2">
                  <h1 className="font-display font-black text-2xl sm:text-4xl text-black tracking-tight">
                    {creator.name}
                  </h1>
                  <span className="text-xs text-neutral-500 font-mono font-semibold">{creator.handle}</span>
                </div>

                <p className="text-sm font-bold text-[#ff5522]">{creator.title}</p>
                <p className="text-xs text-neutral-600 flex items-center gap-2 font-medium">
                  <span>{creator.location}</span>
                  <span>•</span>
                  <span className="flex items-center gap-1 text-black font-bold">
                    <span className="text-[#ff5522]">★</span> {creator.rating} ({creator.reviewsCount} verified reviews)
                  </span>
                </p>
              </div>
            </div>

            {/* Verification Badges Grid */}
            <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto">
              <div className="px-3.5 py-1.5 rounded-full bg-black text-white text-xs font-bold flex items-center gap-1.5 shadow-sm">
                <ShieldCheck className="w-4 h-4 text-[#ff5522]" />
                <span>Clear-to-Air™ Verified</span>
              </div>
              
              <div className="px-3.5 py-1.5 rounded-full bg-white border border-[#dfd5c4] text-neutral-900 text-xs font-bold font-mono flex items-center gap-1.5 shadow-sm">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                <span>Consistency Index: {creator.characterConsistencyIndex}%</span>
              </div>
            </div>

          </div>

          {/* Bio & Details */}
          <div className="mt-6 pt-6 border-t border-[#dfd5c4] grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-4">
              <p className="text-sm text-neutral-700 leading-relaxed font-medium">
                {creator.bio}
              </p>

              {/* Toolchain tags */}
              <div className="space-y-2">
                <div className="text-xs uppercase font-bold tracking-wider text-neutral-400">
                  Certified Pipeline & Tool Stack
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {creator.primaryTools.map((tool, i) => (
                    <span 
                      key={i}
                      className="px-3 py-1 text-xs font-mono font-semibold rounded-full bg-[#faf6f0] text-neutral-800 border border-[#dfd5c4]"
                    >
                      {tool}
                    </span>
                  ))}
                  {creator.specializations.map((spec, i) => (
                    <span 
                      key={i}
                      className="px-3 py-1 text-xs font-bold rounded-full bg-[#ff5522]/10 text-[#ff5522] border border-[#ff5522]/20"
                    >
                      {spec}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Creator Metrics Box */}
            <div className="p-4 rounded-3xl bg-[#faf6f0] border border-[#dfd5c4] grid grid-cols-2 gap-3 text-center">
              <div className="p-2.5 rounded-2xl bg-white border border-[#e5dcd0]">
                <div className="text-lg font-black text-black font-display">{creator.stats?.completedBriefs || 38}</div>
                <div className="text-[10px] text-neutral-500 uppercase font-bold">Briefs Delivered</div>
              </div>
              <div className="p-2.5 rounded-2xl bg-white border border-[#e5dcd0]">
                <div className="text-lg font-black text-[#ff5522] font-display">{creator.stats?.repeatClients || '92%'}</div>
                <div className="text-[10px] text-neutral-500 uppercase font-bold">Repeat Brands</div>
              </div>
              <div className="p-2.5 rounded-2xl bg-white border border-[#e5dcd0]">
                <div className="text-lg font-black text-black font-display">{creator.stats?.averageDeliveryDays || 3.5}d</div>
                <div className="text-[10px] text-neutral-500 uppercase font-bold">Avg Delivery</div>
              </div>
              <div className="p-2.5 rounded-2xl bg-white border border-[#e5dcd0]">
                <div className="text-lg font-black text-emerald-600 font-display">{creator.stats?.totalFramesGenerated || '1M+'}</div>
                <div className="text-[10px] text-neutral-500 uppercase font-bold">Frames Rendered</div>
              </div>
            </div>

          </div>

        </div>
      </div>

      {/* Featured Master Recipe Banner */}
      {featured && (
        <div className="relative rounded-3xl bg-white border border-[#dfd5c4] p-6 sm:p-8 space-y-6 shadow-md">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="px-3 py-1 rounded-full text-[11px] font-bold bg-[#ff5522]/10 text-[#ff5522] border border-[#ff5522]/20 flex items-center gap-1">
                  <Sparkles className="w-3.5 h-3.5" />
                  Featured Recipe-First Production
                </span>
                <span className="text-xs font-mono text-neutral-600 flex items-center gap-1">
                  <Lock className="w-3 h-3 text-[#ff5522]" />
                  Seed Lock: {featured.promptArchitecture?.seedLock || '4928172940'}
                </span>
              </div>
              <h2 className="font-display font-black text-xl sm:text-2xl text-black tracking-tight">
                {featured.title}
              </h2>
            </div>

            <button
              onClick={() => onInspectRecipe(featured, creator)}
              className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#ff5522] hover:bg-[#eb4817] text-white text-xs font-black shadow-md transition-all hover:scale-105"
            >
              <FileCode2 className="w-4 h-4" />
              <span>Inspect Full Production Recipe</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Visual Thumbnail */}
            <div className="relative aspect-video rounded-2xl overflow-hidden bg-[#e8dece] border border-[#dfd5c4]">
              <img 
                src={featured.thumbnail} 
                alt={featured.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-2 left-2 px-2.5 py-0.5 rounded-full bg-black/80 text-[10px] font-mono font-bold text-white">
                {featured.resolution}
              </div>
            </div>

            {/* Recipe Snapshot Details */}
            <div className="md:col-span-2 space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div className="p-3 rounded-2xl bg-[#faf6f0] border border-[#dfd5c4]">
                  <span className="text-[10px] text-neutral-500 uppercase block font-bold">Engine Stack</span>
                  <span className="text-black font-mono font-bold">{featured.baseModels?.join(' • ')}</span>
                </div>
                <div className="p-3 rounded-2xl bg-[#faf6f0] border border-[#dfd5c4]">
                  <span className="text-[10px] text-neutral-500 uppercase block font-bold">Audio Pipeline</span>
                  <span className="text-black font-mono text-[11px] truncate block font-medium">{featured.audioPipeline}</span>
                </div>
              </div>

              {/* Prompt Snapshot */}
              <div className="p-4 rounded-2xl bg-[#faf6f0] border border-[#dfd5c4] font-mono text-xs text-neutral-800 leading-relaxed">
                <span className="text-[#ff5522] font-bold block text-[10px] uppercase mb-1">
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
        <div className="flex items-center justify-between border-b border-[#dfd5c4] pb-3">
          <h3 className="font-display font-black text-xl text-black tracking-tight flex items-center gap-2">
            <Film className="w-5 h-5 text-[#ff5522]" />
            Verified Portfolio Pieces with Inspectable Recipes
          </h3>
          <span className="text-xs text-neutral-600 font-mono font-bold">
            {portfolioItems.length} Productions
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {portfolioItems.map((item) => (
            <div 
              key={item.id}
              className="group rounded-3xl bg-white border border-[#dfd5c4] hover:border-[#ff5522] overflow-hidden transition-all duration-300 shadow-md flex flex-col justify-between"
            >
              <div className="relative aspect-[16/10] bg-[#e8dece] overflow-hidden">
                <img 
                  src={item.image} 
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/20" />
                
                <div className="absolute top-2.5 right-2.5 px-2.5 py-0.5 rounded-full bg-black/70 backdrop-blur-md text-[10px] text-white font-mono font-bold">
                  {item.duration}
                </div>

                <div className="absolute bottom-2.5 left-2.5 right-2.5 flex items-center justify-between">
                  <span className="text-[10px] font-bold text-white bg-black px-2.5 py-1 rounded-full">
                    Clear-to-Air™
                  </span>
                  
                  <button
                    onClick={() => onInspectRecipe(item, creator)}
                    className="flex items-center gap-1 px-3 py-1 rounded-full bg-[#ff5522] text-white text-[10px] font-extrabold shadow hover:bg-[#eb4817] transition-colors"
                  >
                    <Sparkles className="w-3 h-3" />
                    <span>Inspect</span>
                  </button>
                </div>
              </div>

              <div className="p-5 space-y-3 flex-1 flex flex-col justify-between">
                <div>
                  <h4 className="font-display font-black text-sm text-black group-hover:text-[#ff5522] transition-colors">
                    {item.title}
                  </h4>
                  <p className="text-xs text-neutral-500 font-medium mt-0.5">{item.type}</p>
                </div>

                <div className="flex flex-wrap gap-1">
                  {item.tags.map((tag, idx) => (
                    <span 
                      key={idx}
                      className="px-2.5 py-0.5 text-[10px] font-mono rounded-md bg-[#faf6f0] text-neutral-800 border border-[#dfd5c4]"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="pt-3 border-t border-[#ede4d8] flex items-center justify-between text-[11px] text-neutral-600 font-medium">
                  <span className="text-[#ff5522] font-bold">{item.awards}</span>
                  <span>{item.views} views</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Where to Navigate Next */}
      <WhereToNavigateNext 
        currentView="profile" 
        onNavigate={onNavigate || (() => {})} 
      />

    </div>
  );
};
