import React, { useState } from 'react';
import { 
  Sparkles, 
  Search, 
  Layers, 
  UserCheck, 
  Briefcase, 
  Sliders, 
  ShieldCheck, 
  ArrowUpRight,
  ChevronDown,
  Menu,
  X
} from 'lucide-react';

export const Navbar = ({ 
  activeTab, 
  setActiveTab, 
  userRole, 
  setUserRole, 
  onOpenBriefModal,
  loggedInCreator,
  onOpenCreatorLogin,
  onOpenAccessModal
}) => {
  const [isCategoryMenuOpen, setIsCategoryMenuOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="relative z-30 w-full px-5 sm:px-10 pt-6 pb-4">
      <div className="flex items-center justify-between gap-4">
        
        {/* Brand Logo - Bold Grotesque with Orange Period Dot */}
        <div 
          className="flex items-center gap-2 cursor-pointer select-none group" 
          onClick={() => setActiveTab('explore')}
        >
          <span className="font-display font-black text-2xl sm:text-3xl tracking-tight text-black flex items-center">
            BRIVIO
            <span className="inline-block w-2.5 h-2.5 ml-1 bg-[#ff5522] rounded-sm group-hover:scale-125 transition-transform" />
          </span>
          <span className="hidden sm:inline-flex items-center px-2 py-0.5 text-[10px] font-bold uppercase rounded bg-[#ff5522]/10 text-[#ff5522] border border-[#ff5522]/20">
            India 🇮🇳
          </span>
        </div>

        {/* Minimal Editorial Navigation Links */}
        <nav className="hidden lg:flex items-center gap-7 text-sm font-semibold text-neutral-800">
          <button
            onClick={() => setActiveTab('explore')}
            className={`transition-colors relative py-1 ${
              activeTab === 'explore' 
                ? 'text-black font-extrabold after:absolute after:bottom-0 after:left-0 after:w-full after:h-[2px] after:bg-[#ff5522]' 
                : 'hover:text-black'
            }`}
          >
            Home / Explore
          </button>

          <button
            onClick={() => setActiveTab('profile')}
            className={`transition-colors relative py-1 ${
              activeTab === 'profile' 
                ? 'text-black font-extrabold after:absolute after:bottom-0 after:left-0 after:w-full after:h-[2px] after:bg-[#ff5522]' 
                : 'hover:text-black'
            }`}
          >
            Nominees & Creators
          </button>

          {/* Categories Dropdown */}
          <div className="relative">
            <button
              onClick={() => setIsCategoryMenuOpen(!isCategoryMenuOpen)}
              className="flex items-center gap-1 hover:text-black transition-colors py-1"
            >
              <span>Categories</span>
              <ChevronDown className="w-3.5 h-3.5 opacity-70" />
            </button>

            {isCategoryMenuOpen && (
              <div 
                className="absolute top-full left-0 mt-2 w-56 rounded-2xl bg-white border border-[#e2d8cb] p-2 shadow-xl shadow-black/10 z-50 text-xs font-medium space-y-1"
                onMouseLeave={() => setIsCategoryMenuOpen(false)}
              >
                <button 
                  onClick={() => { setActiveTab('explore'); setIsCategoryMenuOpen(false); }} 
                  className="w-full text-left px-3 py-2 rounded-xl hover:bg-[#f6efe6] text-neutral-800"
                >
                  🎬 Bollywood & Narrative VFX
                </button>
                <button 
                  onClick={() => { setActiveTab('explore'); setIsCategoryMenuOpen(false); }} 
                  className="w-full text-left px-3 py-2 rounded-xl hover:bg-[#f6efe6] text-neutral-800"
                >
                  👗 Virtual Bridal Couture
                </button>
                <button 
                  onClick={() => { setActiveTab('explore'); setIsCategoryMenuOpen(false); }} 
                  className="w-full text-left px-3 py-2 rounded-xl hover:bg-[#f6efe6] text-neutral-800"
                >
                  ⚡ Commercial D2C & Ads
                </button>
                <button 
                  onClick={() => { setActiveTab('explore'); setIsCategoryMenuOpen(false); }} 
                  className="w-full text-left px-3 py-2 rounded-xl hover:bg-[#f6efe6] text-neutral-800"
                >
                  🎙️ Indic Multilingual Lip-Sync
                </button>
              </div>
            )}
          </div>

          <button
            onClick={() => setActiveTab('briefs')}
            className={`transition-colors relative py-1 flex items-center gap-1.5 ${
              activeTab === 'briefs' 
                ? 'text-black font-extrabold after:absolute after:bottom-0 after:left-0 after:w-full after:h-[2px] after:bg-[#ff5522]' 
                : 'hover:text-black'
            }`}
          >
            <span>Live Briefs</span>
            <span className="px-1.5 py-0.5 text-[10px] font-mono font-bold bg-[#ff5522]/15 text-[#ff5522] rounded-full">
              ₹57L
            </span>
          </button>

          <button
            onClick={() => setActiveTab('delivery-room')}
            className={`transition-colors relative py-1 flex items-center gap-1.5 ${
              activeTab === 'delivery-room' 
                ? 'text-black font-extrabold after:absolute after:bottom-0 after:left-0 after:w-full after:h-[2px] after:bg-[#ff5522]' 
                : 'hover:text-black'
            }`}
          >
            <span>Seed Studio</span>
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          </button>
        </nav>

        {/* Right Action Tools: Role Switcher, Creator Chip, Register/Post Brief Button */}
        <div className="flex items-center gap-2 sm:gap-3">
          
          {/* Active Creator Chip or Creator Login Trigger */}
          {loggedInCreator ? (
            <button
              onClick={onOpenCreatorLogin}
              className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white hover:bg-neutral-50 border border-[#dfd5c4] shadow-sm transition-all text-xs"
              title="Manage Creator Profile / Switch Persona"
            >
              <img 
                src={loggedInCreator.avatar} 
                alt={loggedInCreator.name} 
                className="w-5 h-5 rounded-full object-cover border border-[#ff5522]"
              />
              <span className="hidden sm:inline text-black font-extrabold">{loggedInCreator.name.split(' ')[0]}</span>
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            </button>
          ) : userRole === 'creator' && (
            <button
              onClick={onOpenCreatorLogin}
              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#ff5522]/10 hover:bg-[#ff5522]/20 border border-[#ff5522]/30 text-[#ff5522] text-xs font-bold transition-all"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Sign In</span>
            </button>
          )}

          {/* Role Pill Switcher */}
          <div className="flex items-center bg-[#eae1d3] border border-[#d8cdbf] rounded-full p-1 text-xs">
            <button
              onClick={() => setUserRole('brand')}
              className={`px-3 py-1 font-bold rounded-full transition-all ${
                userRole === 'brand'
                  ? 'bg-black text-white shadow-sm'
                  : 'text-neutral-700 hover:text-black'
              }`}
            >
              Brand
            </button>
            <button
              onClick={() => {
                setUserRole('creator');
                if (!loggedInCreator && onOpenCreatorLogin) {
                  onOpenCreatorLogin();
                }
              }}
              className={`px-3 py-1 font-bold rounded-full transition-all ${
                userRole === 'creator'
                  ? 'bg-black text-white shadow-sm'
                  : 'text-neutral-700 hover:text-black'
              }`}
            >
              Creator
            </button>
          </div>



          {/* Black Pill CTA Button from Reference: "Register / Log In ↗" or "Post Brief ↗" */}
          <button
            onClick={() => {
              if (userRole === 'brand') {
                setActiveTab('brief-builder');
              } else if (onOpenCreatorLogin) {
                onOpenCreatorLogin();
              } else {
                setActiveTab('briefs');
              }
            }}
            className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-black hover:bg-neutral-900 text-white font-bold text-xs sm:text-sm shadow-md transition-transform hover:-translate-y-0.5 active:translate-y-0"
          >
            <span>{userRole === 'brand' ? 'Post Brief' : loggedInCreator ? 'Creator Studio' : 'Register / Log In'}</span>
            <ArrowUpRight className="w-4 h-4 text-white" />
          </button>

          {/* Mobile hamburger menu toggle */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2 rounded-full bg-white/70 border border-[#dfd5c4] text-neutral-800"
          >
            {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

      </div>

      {/* Mobile Drawer */}
      {isMobileMenuOpen && (
        <div className="lg:hidden mt-3 p-4 rounded-2xl bg-white border border-[#dfd5c4] shadow-xl space-y-2 text-sm font-semibold">
          <button 
            onClick={() => { setActiveTab('explore'); setIsMobileMenuOpen(false); }}
            className={`w-full text-left px-3 py-2 rounded-xl ${activeTab === 'explore' ? 'bg-[#ff5522]/10 text-[#ff5522]' : 'text-neutral-800'}`}
          >
            Home / Explore
          </button>
          <button 
            onClick={() => { setActiveTab('profile'); setIsMobileMenuOpen(false); }}
            className={`w-full text-left px-3 py-2 rounded-xl ${activeTab === 'profile' ? 'bg-[#ff5522]/10 text-[#ff5522]' : 'text-neutral-800'}`}
          >
            Nominees & Creators
          </button>
          <button 
            onClick={() => { setActiveTab('brief-builder'); setIsMobileMenuOpen(false); }}
            className={`w-full text-left px-3 py-2 rounded-xl ${activeTab === 'brief-builder' ? 'bg-[#ff5522]/10 text-[#ff5522]' : 'text-neutral-800'}`}
          >
            ⚡ AI Brief Wizard
          </button>
          <button 
            onClick={() => { setActiveTab('briefs'); setIsMobileMenuOpen(false); }}
            className={`w-full text-left px-3 py-2 rounded-xl ${activeTab === 'briefs' ? 'bg-[#ff5522]/10 text-[#ff5522]' : 'text-neutral-800'}`}
          >
            Live Briefs Board (₹57L)
          </button>
          <button 
            onClick={() => { setActiveTab('delivery-room'); setIsMobileMenuOpen(false); }}
            className={`w-full text-left px-3 py-2 rounded-xl ${activeTab === 'delivery-room' ? 'bg-[#ff5522]/10 text-[#ff5522]' : 'text-neutral-800'}`}
          >
            Seed Studio Milestone Review
          </button>
        </div>
      )}
    </header>
  );
};
