import React, { useState } from 'react';
import { 
  X, 
  Sparkles, 
  CheckCircle2, 
  ShieldCheck, 
  Layers, 
  ArrowRight, 
  UserCheck, 
  LogOut, 
  Plus, 
  MapPin, 
  DollarSign,
  Cpu,
  Award
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { INITIAL_CREATORS } from '../data/mockData';

export const CreatorLoginModal = ({ 
  isOpen, 
  onClose, 
  loggedInCreator, 
  onLoginCreator, 
  onLogoutCreator,
  onRegisterCreator 
}) => {
  const [activeTab, setActiveTab] = useState('quick-personas'); // 'quick-personas' | 'custom-register'
  
  // Custom Registration Form State
  const [customName, setCustomName] = useState('');
  const [customTitle, setCustomTitle] = useState('Senior Generative AI Filmmaker');
  const [customLocation, setCustomLocation] = useState('Mumbai, Maharashtra 🇮🇳');
  const [customTools, setCustomTools] = useState(['Kling 1.5', 'ComfyUI']);
  const [customRate, setCustomRate] = useState('₹50,000 / milestone');
  const [customSpecialization, setCustomSpecialization] = useState('Bridal & Luxury Fashion');

  if (!isOpen) return null;

  const handleSelectPersona = (creator) => {
    try {
      confetti({
        particleCount: 80,
        spread: 60,
        origin: { y: 0.6 }
      });
    } catch (e) {}

    onLoginCreator(creator);
    onClose();
  };

  const handleCustomRegister = (e) => {
    e.preventDefault();
    if (!customName.trim()) return;

    const newCreator = {
      id: `creator-custom-${Date.now()}`,
      name: customName.trim(),
      title: customTitle,
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
      location: customLocation,
      primaryTools: customTools,
      specializations: [customSpecialization],
      clearToAirCertified: true,
      verificationTier: 'Tier 1 Pro Verified',
      turnaround: '24-48 Hours',
      startingRate: customRate,
      stats: {
        completedBriefs: 0,
        totalEarnings: '₹0',
        consistencyScore: '99%'
      }
    };

    try {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });
    } catch (e) {}

    if (onRegisterCreator) {
      onRegisterCreator(newCreator);
    } else {
      onLoginCreator(newCreator);
    }
    onClose();
  };

  const handleToggleTool = (tool) => {
    if (customTools.includes(tool)) {
      setCustomTools(customTools.filter(t => t !== tool));
    } else {
      setCustomTools([...customTools, tool]);
    }
  };

  const popularTools = ['Kling 1.5', 'ComfyUI', 'Runway Gen-3', 'Flux.1', 'Midjourney v6.1', 'Luma Dream Machine'];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
      <div 
        className="w-full max-w-2xl bg-white border-2 border-black rounded-[28px] sm:rounded-[36px] p-6 sm:p-8 space-y-6 shadow-2xl relative max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Header */}
        <div className="flex items-start justify-between gap-4 border-b border-[#dfd5c4] pb-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 rounded-full text-xs font-black bg-[#ff5522] text-white flex items-center gap-1.5 shadow-sm">
                <Layers className="w-3.5 h-3.5" />
                Creator Portal Sign-In 🇮🇳
              </span>
              <span className="text-xs text-neutral-500 font-bold">
                India AI Marketplace
              </span>
            </div>

            <h2 className="font-display font-black text-2xl sm:text-3xl text-black tracking-tight pt-1">
              {loggedInCreator ? 'Manage Creator Account' : 'Sign In as an Indian AI Director'}
            </h2>
            <p className="text-xs text-neutral-600 font-medium leading-relaxed">
              Log in to pitch on live brand briefs, publish ComfyUI recipe nodes, and receive ₹ INR milestone payouts.
            </p>
          </div>

          <button 
            onClick={onClose}
            className="p-2 rounded-full hover:bg-neutral-100 text-neutral-500 hover:text-black transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Current Login Status Banner if already logged in */}
        {loggedInCreator && (
          <div className="p-4 rounded-2xl bg-[#faf6f0] border-2 border-emerald-600/40 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <img 
                src={loggedInCreator.avatar} 
                alt={loggedInCreator.name} 
                className="w-12 h-12 rounded-full object-cover border-2 border-emerald-600 shadow-sm"
              />
              <div>
                <div className="flex items-center gap-1.5">
                  <h4 className="font-display font-black text-base text-black">
                    {loggedInCreator.name}
                  </h4>
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="text-[10px] font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full">
                    Active Session
                  </span>
                </div>
                <p className="text-xs text-neutral-600 font-medium">
                  {loggedInCreator.title} • {loggedInCreator.location}
                </p>
              </div>
            </div>

            <button
              onClick={() => {
                onLogoutCreator();
                onClose();
              }}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-rose-50 hover:bg-rose-100 text-rose-700 text-xs font-bold border border-rose-200 transition-colors"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Log Out</span>
            </button>
          </div>
        )}

        {/* Tabs: Quick 1-Click Personas vs Custom Registration */}
        <div className="flex items-center gap-2 p-1 bg-[#ede4d7] rounded-full border border-[#d8cdbf] text-xs font-bold">
          <button
            onClick={() => setActiveTab('quick-personas')}
            className={`flex-1 py-2 rounded-full transition-all text-center ${
              activeTab === 'quick-personas'
                ? 'bg-black text-white shadow-sm'
                : 'text-neutral-700 hover:text-black'
            }`}
          >
            ⚡ Verified Director Accounts (Instant Switch)
          </button>
          <button
            onClick={() => setActiveTab('custom-register')}
            className={`flex-1 py-2 rounded-full transition-all text-center ${
              activeTab === 'custom-register'
                ? 'bg-black text-white shadow-sm'
                : 'text-neutral-700 hover:text-black'
            }`}
          >
            ✏️ Apply as Verified AI Director
          </button>
        </div>

        {/* TAB 1: VERIFIED DIRECTOR ACCOUNTS */}
        {activeTab === 'quick-personas' && (
          <div className="space-y-3">
            <span className="text-xs text-neutral-600 font-medium block">
              Select an active verified director account to access your studio pipeline, pitch treatments, and escrow ledgers:
            </span>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
              {INITIAL_CREATORS.slice(0, 4).map((creator) => {
                const isCurrent = loggedInCreator?.id === creator.id;

                return (
                  <div
                    key={creator.id}
                    onClick={() => handleSelectPersona(creator)}
                    className={`p-4 rounded-2xl border-2 text-left cursor-pointer transition-all space-y-3 group ${
                      isCurrent
                        ? 'bg-black text-white border-black shadow-lg ring-2 ring-[#ff5522]'
                        : 'bg-white border-[#dfd5c4] hover:border-black hover:shadow-md'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <img 
                        src={creator.avatar} 
                        alt={creator.name} 
                        className="w-12 h-12 rounded-full object-cover border-2 border-[#ff5522] shadow-sm shrink-0"
                      />
                      <div className="overflow-hidden">
                        <div className="flex items-center gap-1.5">
                          <h4 className={`font-display font-black text-sm truncate ${
                            isCurrent ? 'text-white' : 'text-black group-hover:text-[#ff5522]'
                          }`}>
                            {creator.name}
                          </h4>
                          {creator.clearToAirCertified && (
                            <ShieldCheck className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                          )}
                        </div>
                        <p className={`text-[11px] truncate font-medium ${
                          isCurrent ? 'text-neutral-300' : 'text-neutral-500'
                        }`}>
                          {creator.title}
                        </p>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-1 text-[10px]">
                      {creator.primaryTools?.slice(0, 3).map((tool, idx) => (
                        <span 
                          key={idx}
                          className={`px-2 py-0.5 rounded font-mono ${
                            isCurrent 
                              ? 'bg-neutral-800 text-neutral-200' 
                              : 'bg-[#faf6f0] text-neutral-800 border border-[#dfd5c4]'
                          }`}
                        >
                          {tool}
                        </span>
                      ))}
                    </div>

                    <div className={`pt-2 border-t flex items-center justify-between text-xs font-bold ${
                      isCurrent ? 'border-neutral-800' : 'border-[#ede4d8]'
                    }`}>
                      <span className="text-[#ff5522]">{creator.startingRate}</span>
                      <span className={`text-[11px] flex items-center gap-1 ${
                        isCurrent ? 'text-emerald-400' : 'text-neutral-700'
                      }`}>
                        {isCurrent ? '✓ Active Session' : 'Sign In ➔'}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* TAB 2: CUSTOM REGISTRATION */}
        {activeTab === 'custom-register' && (
          <form onSubmit={handleCustomRegister} className="space-y-4">
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-neutral-800">Your Full Name</label>
                <input 
                  type="text"
                  required
                  value={customName}
                  onChange={(e) => setCustomName(e.target.value)}
                  placeholder="e.g. Dhruv Gupta"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#faf6f0] border border-[#dfd5c4] text-xs text-neutral-900 focus:outline-none focus:border-[#ff5522]"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-neutral-800">Professional Title</label>
                <input 
                  type="text"
                  value={customTitle}
                  onChange={(e) => setCustomTitle(e.target.value)}
                  placeholder="e.g. Generative AI Director & VFX Lead"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#faf6f0] border border-[#dfd5c4] text-xs text-neutral-900 focus:outline-none focus:border-[#ff5522]"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-neutral-800">Base Location</label>
                <input 
                  type="text"
                  value={customLocation}
                  onChange={(e) => setCustomLocation(e.target.value)}
                  placeholder="e.g. New Delhi / Bengaluru 🇮🇳"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#faf6f0] border border-[#dfd5c4] text-xs text-neutral-900 focus:outline-none focus:border-[#ff5522]"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-neutral-800">Starting Milestone Rate (₹ INR)</label>
                <input 
                  type="text"
                  value={customRate}
                  onChange={(e) => setCustomRate(e.target.value)}
                  placeholder="e.g. ₹50,000 / milestone"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#faf6f0] border border-[#dfd5c4] text-xs text-neutral-900 focus:outline-none focus:border-[#ff5522]"
                />
              </div>
            </div>

            {/* Select Primary AI Tools */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-neutral-800">Select Primary AI Engines / Workflows</label>
              <div className="flex flex-wrap gap-2">
                {popularTools.map((tool) => {
                  const isSelected = customTools.includes(tool);
                  return (
                    <button
                      key={tool}
                      type="button"
                      onClick={() => handleToggleTool(tool)}
                      className={`px-3 py-1.5 rounded-full text-xs font-bold border transition-all ${
                        isSelected
                          ? 'bg-[#ff5522] text-white border-[#ff5522] shadow-sm'
                          : 'bg-[#faf6f0] text-neutral-700 border-[#dfd5c4] hover:border-black'
                      }`}
                    >
                      {isSelected ? '✓ ' : '+ '}{tool}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="pt-2">
              <button
                type="submit"
                className="w-full py-3.5 rounded-full bg-black hover:bg-neutral-900 text-white font-black text-sm shadow-md transition-all flex items-center justify-center gap-2 hover:scale-[1.01] active:scale-[0.99]"
              >
                <span>Register & Access Creator Studio</span>
                <ArrowRight className="w-4 h-4 text-[#ff5522]" />
              </button>
            </div>

          </form>
        )}

      </div>
    </div>
  );
};
