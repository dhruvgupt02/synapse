import React, { useState } from 'react';
import { 
  Briefcase, 
  Search, 
  ShieldCheck, 
  Clock, 
  DollarSign, 
  Sparkles, 
  Send, 
  Filter, 
  Layers, 
  CheckCircle2, 
  Eye, 
  ArrowRight, 
  PlusCircle,
  X,
  FileCode2,
  Users
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { WhereToNavigateNext } from './WhereToNavigateNext';

export const BriefsBoardView = ({ 
  briefs, 
  userRole, 
  onOpenBriefBuilder, 
  onOpenDeliveryStudio,
  onNavigate
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedBriefForPitch, setSelectedBriefForPitch] = useState(null);
  
  // Pitch Modal State
  const [creatorPitchData, setCreatorPitchData] = useState({
    creatorName: 'Elena Rostova',
    proposedBudget: '',
    estimatedDays: '3',
    proposedStack: 'Kling 1.5 + ComfyUI + Topaz 4K',
    pitchNotes: 'I can guarantee 98%+ character consistency using my proprietary face anchor LoRA with frame-accurate multi-shot continuity and Clear-to-Air™ certified models.'
  });
  const [pitchSuccessMessage, setPitchSuccessMessage] = useState(false);

  // Filter logic
  const filteredBriefs = briefs.filter(brief => {
    const matchesSearch = 
      brief.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      brief.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
      brief.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      brief.requiredTools.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesCategory = 
      selectedCategory === 'All' || 
      brief.specialization === selectedCategory ||
      brief.tags?.includes(selectedCategory);

    return matchesSearch && matchesCategory;
  });

  const handleOpenPitchModal = (brief) => {
    setSelectedBriefForPitch(brief);
    setCreatorPitchData({
      ...creatorPitchData,
      proposedBudget: brief.budget
    });
  };

  const handleSubmitPitch = (e) => {
    e.preventDefault();
    try {
      confetti({ particleCount: 70, spread: 60, origin: { y: 0.7 } });
    } catch (err) {}
    setPitchSuccessMessage(true);
    setTimeout(() => {
      setPitchSuccessMessage(false);
      setSelectedBriefForPitch(null);
    }, 1800);
  };

  return (
    <div className="w-full space-y-8 animate-fadeIn pb-16">
      
      {/* Board Header & Metrics */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 rounded-full text-xs font-bold bg-[#ff5522]/10 text-[#ff5522] border border-[#ff5522]/20">
              Live Marketplace
            </span>
            <span className="text-xs text-neutral-600 font-mono font-semibold">
              Smart Escrow Guaranteed
            </span>
          </div>
          <h1 className="font-display font-black text-2xl sm:text-4xl text-black tracking-tight mt-1">
            Active Brand Briefs Board
          </h1>
          <p className="text-xs sm:text-sm text-neutral-600 mt-0.5 font-medium">
            Verified enterprise commissions with locked escrow budgets and clear commercial specifications.
          </p>
        </div>

        <div className="flex items-center gap-3">
          {userRole === 'brand' ? (
            <button
              onClick={onOpenBriefBuilder}
              className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-black hover:bg-neutral-900 text-white text-xs font-bold shadow-md transition-all"
            >
              <PlusCircle className="w-4 h-4 text-[#ff5522]" />
              <span>Post New AI Brief</span>
            </button>
          ) : (
            <button
              onClick={() => onOpenDeliveryStudio()}
              className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-white hover:bg-neutral-50 text-neutral-900 border border-[#dfd5c4] text-xs font-bold transition-colors shadow-sm"
            >
              <Sparkles className="w-4 h-4 text-[#ff5522]" />
              <span>My Active Milestones</span>
            </button>
          )}
        </div>
      </div>

      {/* Marketplace Stats Strip */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="p-4 rounded-3xl bg-white border border-[#dfd5c4] shadow-sm">
          <span className="text-[10px] text-neutral-500 uppercase font-bold">Active Commissions</span>
          <span className="text-lg font-black text-black block mt-0.5 font-display">{briefs.length} Briefs</span>
        </div>
        <div className="p-4 rounded-3xl bg-white border border-[#dfd5c4] shadow-sm">
          <span className="text-[10px] text-neutral-500 uppercase font-bold">Total Escrow Value</span>
          <span className="text-lg font-black text-[#ff5522] block mt-0.5 font-display">₹57,50,000 Locked</span>
        </div>
        <div className="p-4 rounded-3xl bg-white border border-[#dfd5c4] shadow-sm">
          <span className="text-[10px] text-neutral-500 uppercase font-bold">Average SLA</span>
          <span className="text-lg font-black text-black block mt-0.5 font-display">&lt; 3.2 Hours</span>
        </div>
        <div className="p-4 rounded-3xl bg-white border border-[#dfd5c4] shadow-sm">
          <span className="text-[10px] text-neutral-500 uppercase font-bold">Clear-to-Air™ Ratio</span>
          <span className="text-lg font-black text-emerald-600 block mt-0.5 font-display">100% Certified</span>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search briefs by brand, keyword, or model..."
            className="w-full pl-11 pr-4 py-2.5 rounded-full bg-white border border-[#dfd5c4] text-xs text-black placeholder-neutral-400 focus:outline-none focus:border-[#ff5522]"
          />
        </div>

        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
          {['All', 'AI Filmmaking', '3D & VFX', 'Character Consistency', 'Motion Graphics'].map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-all border ${
                selectedCategory === cat
                  ? 'bg-black text-white border-black shadow-sm'
                  : 'bg-white text-neutral-700 border-[#dfd5c4] hover:bg-neutral-50'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Briefs Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredBriefs.map((brief) => (
          <div 
            key={brief.id}
            className="rounded-3xl bg-white border border-[#dfd5c4] hover:border-[#ff5522] p-6 space-y-4 shadow-md flex flex-col justify-between transition-all"
          >
            {/* Top Bar: Brand + Budget */}
            <div className="space-y-2">
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3">
                  <img 
                    src={brief.brandLogo} 
                    alt={brief.brand}
                    className="w-12 h-12 rounded-2xl object-cover border border-[#dfd5c4] bg-[#faf6f0]"
                  />
                  <div>
                    <h3 className="font-display font-black text-base text-black leading-snug">
                      {brief.title}
                    </h3>
                    <p className="text-xs text-[#ff5522] font-bold">{brief.brand}</p>
                  </div>
                </div>

                <div className="text-right shrink-0">
                  <span className="text-lg font-black text-black block font-display">{brief.budget}</span>
                  <span className="text-[10px] text-neutral-500 uppercase font-bold">Escrow Locked</span>
                </div>
              </div>

              {/* Status & Deadline pill */}
              <div className="flex flex-wrap items-center gap-2 pt-1">
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-[#faf6f0] text-black border border-[#dfd5c4]">
                  {brief.status}
                </span>
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono bg-[#faf6f0] text-neutral-700 border border-[#dfd5c4] flex items-center gap-1">
                  <Clock className="w-3 h-3 text-[#ff5522]" />
                  {brief.deadline}
                </span>
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-black text-white flex items-center gap-1">
                  <ShieldCheck className="w-3 h-3 text-[#ff5522]" />
                  {brief.complianceTier?.split('(')[0] || 'Clear-to-Air™'}
                </span>
              </div>
            </div>

            {/* Description */}
            <p className="text-xs text-neutral-700 leading-relaxed line-clamp-3 font-medium">
              {brief.description}
            </p>

            {/* Formats & Tool Stack */}
            <div className="space-y-2.5 pt-1">
              <div className="grid grid-cols-2 gap-2 text-[11px] p-3 rounded-2xl bg-[#faf6f0] border border-[#dfd5c4]">
                <div>
                  <span className="text-[10px] text-neutral-500 block uppercase font-bold">Deliverable</span>
                  <span className="text-neutral-900 font-bold truncate block">{brief.mediaType}</span>
                </div>
                <div>
                  <span className="text-[10px] text-neutral-500 block uppercase font-bold">Aspect Ratio</span>
                  <span className="text-neutral-900 font-bold truncate block">{brief.aspectRatio}</span>
                </div>
              </div>

              {/* Required AI Tools */}
              <div className="space-y-1">
                <span className="text-[10px] text-neutral-500 uppercase font-bold">Required Engines:</span>
                <div className="flex flex-wrap gap-1">
                  {brief.requiredTools?.map((tool, idx) => (
                    <span 
                      key={idx}
                      className="px-2.5 py-0.5 text-[10px] font-mono rounded-md bg-[#faf6f0] text-neutral-800 border border-[#dfd5c4]"
                    >
                      {tool}
                    </span>
                  ))}
                </div>
              </div>

              {/* Style Tokens */}
              {brief.styleTokens && brief.styleTokens.length > 0 && (
                <div className="space-y-1">
                  <span className="text-[10px] text-neutral-500 uppercase font-bold">Deconstructed Tokens:</span>
                  <div className="flex flex-wrap gap-1">
                    {brief.styleTokens.slice(0, 4).map((tok, idx) => (
                      <span key={idx} className="px-2 py-0.5 text-[10px] font-mono rounded-md bg-[#ff5522]/10 text-[#ff5522] border border-[#ff5522]/20 font-medium">
                        {tok}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Bottom Actions */}
            <div className="pt-3 border-t border-[#ede4d8] flex items-center justify-between gap-3">
              <div className="text-xs text-neutral-500 font-medium flex items-center gap-1.5">
                <Users className="w-3.5 h-3.5 text-neutral-400" />
                <span>{brief.proposalsCount || 0} Pitches Submitted</span>
              </div>

              {userRole === 'creator' ? (
                <button
                  onClick={() => handleOpenPitchModal(brief)}
                  className="flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-black bg-[#ff5522] hover:bg-[#eb4817] text-white shadow-md shadow-[#ff5522]/20 transition-all"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Submit Pitch</span>
                </button>
              ) : (
                <button
                  onClick={() => onOpenDeliveryStudio(brief)}
                  className="flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-bold bg-[#faf6f0] hover:bg-neutral-200 text-neutral-900 border border-[#dfd5c4] transition-colors"
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>Manage</span>
                </button>
              )}
            </div>

          </div>
        ))}
      </div>

      {/* Where to Navigate Next */}
      <WhereToNavigateNext 
        currentView="briefs" 
        onNavigate={onNavigate || (() => {})} 
      />

      {/* PITCH MODAL FOR CREATORS */}
      {selectedBriefForPitch && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fadeIn">
          <div 
            className="w-full max-w-lg bg-[#121217] border border-zinc-700 rounded-3xl p-6 space-y-5 shadow-2xl relative"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between">
              <div>
                <span className="text-[10px] font-mono uppercase text-violet-400 font-bold">
                  Submit Production Treatment
                </span>
                <h3 className="text-lg font-bold text-white mt-0.5">
                  Pitch for {selectedBriefForPitch.title}
                </h3>
                <p className="text-xs text-zinc-400">Escrow Budget: {selectedBriefForPitch.budget}</p>
              </div>

              <button
                onClick={() => setSelectedBriefForPitch(null)}
                className="p-1.5 rounded-lg bg-zinc-800 text-zinc-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {pitchSuccessMessage ? (
              <div className="p-8 text-center space-y-3 bg-emerald-950/30 rounded-2xl border border-emerald-500/30">
                <CheckCircle2 className="w-10 h-10 text-emerald-400 mx-auto" />
                <h4 className="font-bold text-white text-base">Pitch Submitted with Escrow Lock!</h4>
                <p className="text-xs text-emerald-300/80">
                  The brand creative director has been notified of your recipe & turnaround proposal.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmitPitch} className="space-y-4">
                
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-zinc-300">Quote / Escrow Bid</label>
                    <input
                      type="text"
                      value={creatorPitchData.proposedBudget}
                      onChange={(e) => setCreatorPitchData({ ...creatorPitchData, proposedBudget: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl bg-zinc-950 border border-zinc-800 text-xs text-white"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-zinc-300">Delivery SLA (Days)</label>
                    <input
                      type="text"
                      value={creatorPitchData.estimatedDays}
                      onChange={(e) => setCreatorPitchData({ ...creatorPitchData, estimatedDays: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl bg-zinc-950 border border-zinc-800 text-xs text-white"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-zinc-300">Proposed Generative Model Pipeline</label>
                  <input
                    type="text"
                    value={creatorPitchData.proposedStack}
                    onChange={(e) => setCreatorPitchData({ ...creatorPitchData, proposedStack: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-zinc-950 border border-zinc-800 text-xs text-white"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-zinc-300">Consistency Guarantee & Production Notes</label>
                  <textarea
                    rows={3}
                    value={creatorPitchData.pitchNotes}
                    onChange={(e) => setCreatorPitchData({ ...creatorPitchData, pitchNotes: e.target.value })}
                    className="w-full p-3 rounded-xl bg-zinc-950 border border-zinc-800 text-xs text-white"
                  />
                </div>

                <div className="p-3 rounded-xl bg-zinc-950 border border-zinc-800 text-[11px] text-zinc-400 space-y-1">
                  <div className="flex items-center gap-1.5 text-emerald-400 font-semibold">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    Clear-to-Air™ Certified Guarantee Included
                  </div>
                  <p>Upon client selection, milestone 1 seeds will be deposited directly to the Seed Studio.</p>
                </div>

                <button
                  type="submit"
                  className="w-full py-2.5 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 hover:brightness-110 text-white font-bold text-xs shadow-lg shadow-violet-600/30 transition-all"
                >
                  Confirm & Submit Treatment Pitch
                </button>

              </form>
            )}

          </div>
        </div>
      )}

    </div>
  );
};
