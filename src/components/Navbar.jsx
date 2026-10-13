import React from 'react';
import { 
  Sparkles, 
  Search, 
  Layers, 
  UserCheck, 
  FileText, 
  Briefcase, 
  Sliders, 
  ShieldCheck, 
  PlusCircle, 
  Send,
  Zap,
  Key,
  Server
} from 'lucide-react';

export const Navbar = ({ 
  activeTab, 
  setActiveTab, 
  userRole, 
  setUserRole, 
  onOpenBriefModal,
  onOpenKeysModal,
  hasApiKey
}) => {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-zinc-800/80 bg-[#09090b]/85 backdrop-blur-xl transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20 gap-4">
          
          {/* Brand Logo with India Context */}
          <div className="flex items-center gap-3 cursor-pointer select-none" onClick={() => setActiveTab('explore')}>
            <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-orange-500 via-amber-500 to-emerald-600 p-[1px] shadow-lg shadow-orange-500/20">
              <div className="w-full h-full bg-[#0d0d12] rounded-[11px] flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-orange-400" />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-xl tracking-wider text-white">
                  SYN<span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-amber-300 to-emerald-400">APSE</span>
                </span>
                <span className="px-1.5 py-0.5 text-[10px] font-bold tracking-wide uppercase rounded bg-orange-500/10 text-orange-400 border border-orange-500/30 flex items-center gap-1">
                  <span>🇮🇳</span> India
                </span>
              </div>
              <p className="text-[11px] text-zinc-400 hidden sm:block">
                AI-Native Marketplace for Indian Brands & Creators
              </p>
            </div>
          </div>

          {/* Navigation Tabs */}
          <nav className="hidden md:flex items-center gap-1 bg-zinc-900/60 p-1.5 rounded-2xl border border-zinc-800">
            <button
              onClick={() => setActiveTab('explore')}
              className={`flex items-center gap-2 px-3.5 py-2 text-xs font-semibold rounded-xl transition-all ${
                activeTab === 'explore'
                  ? 'bg-gradient-to-r from-orange-500/20 to-amber-500/10 text-orange-400 border border-orange-500/30 shadow-sm'
                  : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/40'
              }`}
            >
              <Search className="w-3.5 h-3.5" />
              Explore Creators
            </button>

            <button
              onClick={() => setActiveTab('profile')}
              className={`flex items-center gap-2 px-3.5 py-2 text-xs font-semibold rounded-xl transition-all ${
                activeTab === 'profile'
                  ? 'bg-gradient-to-r from-orange-500/20 to-amber-500/10 text-orange-400 border border-orange-500/30 shadow-sm'
                  : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/40'
              }`}
            >
              <UserCheck className="w-3.5 h-3.5" />
              Creator Portfolios
            </button>

            <button
              onClick={() => setActiveTab('brief-builder')}
              className={`flex items-center gap-2 px-3.5 py-2 text-xs font-semibold rounded-xl transition-all ${
                activeTab === 'brief-builder'
                  ? 'bg-gradient-to-r from-violet-500/20 to-orange-500/10 text-violet-300 border border-violet-500/30 shadow-sm'
                  : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/40'
              }`}
            >
              <Zap className="w-3.5 h-3.5 text-amber-400" />
              AI Brief Wizard
            </button>

            <button
              onClick={() => setActiveTab('briefs')}
              className={`flex items-center gap-2 px-3.5 py-2 text-xs font-semibold rounded-xl transition-all ${
                activeTab === 'briefs'
                  ? 'bg-gradient-to-r from-orange-500/20 to-amber-500/10 text-orange-400 border border-orange-500/30 shadow-sm'
                  : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/40'
              }`}
            >
              <Briefcase className="w-3.5 h-3.5" />
              Briefs Board
              <span className="ml-0.5 px-1.5 py-0.2 text-[10px] rounded-full bg-orange-500/20 text-orange-300 font-mono">
                ₹57L Live
              </span>
            </button>

            <button
              onClick={() => setActiveTab('delivery-room')}
              className={`flex items-center gap-2 px-3.5 py-2 text-xs font-semibold rounded-xl transition-all ${
                activeTab === 'delivery-room'
                  ? 'bg-gradient-to-r from-cyan-500/20 to-blue-500/10 text-cyan-300 border border-cyan-500/30 shadow-sm'
                  : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/40'
              }`}
            >
              <Sliders className="w-3.5 h-3.5 text-cyan-400" />
              Seed Studio
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse"></span>
            </button>
          </nav>

          {/* Right Action Area: API Key Button, Currency & Role Switcher */}
          <div className="flex items-center gap-2 sm:gap-3">
            
            {/* AI Key & Backend Settings trigger */}
            <button
              onClick={onOpenKeysModal}
              className="flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-semibold rounded-xl bg-zinc-900/90 border border-zinc-800 hover:border-orange-500/40 text-zinc-300 transition-all"
              title="Configure AI API Keys (Gemini/OpenAI) or check Backend Server status"
            >
              <Key className="w-3.5 h-3.5 text-amber-400" />
              <span className="hidden xl:inline">AI Engine</span>
              <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
            </button>

            {/* Role Switcher Toggle */}
            <div className="flex items-center bg-zinc-900/90 border border-zinc-800 rounded-xl p-1 shadow-inner">
              <span className="text-[11px] font-medium text-zinc-400 px-1.5 hidden xl:inline">
                Viewing as:
              </span>
              <button
                onClick={() => setUserRole('brand')}
                className={`flex items-center gap-1.5 px-2.5 py-1 text-xs font-semibold rounded-lg transition-all ${
                  userRole === 'brand'
                    ? 'bg-orange-500 text-white shadow-md shadow-orange-500/30'
                    : 'text-zinc-400 hover:text-zinc-200'
                }`}
                title="Brand/Agency: Commission creators, post briefs in INR, clear ASCI compliance"
              >
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Brand</span>
              </button>

              <button
                onClick={() => setUserRole('creator')}
                className={`flex items-center gap-1.5 px-2.5 py-1 text-xs font-semibold rounded-lg transition-all ${
                  userRole === 'creator'
                    ? 'bg-violet-600 text-white shadow-md shadow-violet-600/30'
                    : 'text-zinc-400 hover:text-zinc-200'
                }`}
                title="Creator: Showcase Indian AI recipes, LoRAs, pitch on briefs"
              >
                <Layers className="w-3.5 h-3.5" />
                <span>Creator</span>
              </button>
            </div>

            {/* Quick Context CTA */}
            {userRole === 'brand' ? (
              <button
                onClick={() => setActiveTab('brief-builder')}
                className="hidden sm:flex items-center gap-2 px-3.5 py-2 text-xs font-bold rounded-xl bg-gradient-to-r from-orange-500 to-amber-500 text-white hover:brightness-110 shadow-lg shadow-orange-500/25 transition-all"
              >
                <PlusCircle className="w-4 h-4" />
                <span>Post Brief</span>
              </button>
            ) : (
              <button
                onClick={() => setActiveTab('briefs')}
                className="hidden sm:flex items-center gap-2 px-3.5 py-2 text-xs font-bold rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 text-white hover:brightness-110 shadow-lg shadow-violet-600/25 transition-all"
              >
                <Send className="w-4 h-4" />
                <span>Find Briefs</span>
              </button>
            )}

          </div>

        </div>
      </div>

      {/* Mobile Sub-Navigation Bar */}
      <div className="flex md:hidden border-t border-zinc-800/80 px-2 py-2 overflow-x-auto gap-1 bg-[#09090b]/90">
        <button
          onClick={() => setActiveTab('explore')}
          className={`px-3 py-1.5 text-xs font-medium rounded-lg whitespace-nowrap ${
            activeTab === 'explore' ? 'bg-orange-500/20 text-orange-400' : 'text-zinc-400'
          }`}
        >
          Explore Creators
        </button>
        <button
          onClick={() => setActiveTab('profile')}
          className={`px-3 py-1.5 text-xs font-medium rounded-lg whitespace-nowrap ${
            activeTab === 'profile' ? 'bg-orange-500/20 text-orange-400' : 'text-zinc-400'
          }`}
        >
          Portfolios
        </button>
        <button
          onClick={() => setActiveTab('brief-builder')}
          className={`px-3 py-1.5 text-xs font-medium rounded-lg whitespace-nowrap ${
            activeTab === 'brief-builder' ? 'bg-violet-500/20 text-violet-300' : 'text-zinc-400'
          }`}
        >
          ⚡ Brief Wizard
        </button>
        <button
          onClick={() => setActiveTab('briefs')}
          className={`px-3 py-1.5 text-xs font-medium rounded-lg whitespace-nowrap ${
            activeTab === 'briefs' ? 'bg-orange-500/20 text-orange-400' : 'text-zinc-400'
          }`}
        >
          Briefs Board
        </button>
        <button
          onClick={() => setActiveTab('delivery-room')}
          className={`px-3 py-1.5 text-xs font-medium rounded-lg whitespace-nowrap ${
            activeTab === 'delivery-room' ? 'bg-cyan-500/20 text-cyan-300' : 'text-zinc-400'
          }`}
        >
          Seed Studio
        </button>
      </div>
    </header>
  );
};
