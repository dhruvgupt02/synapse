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

export const BriefsBoardView = ({ 
  briefs, 
  userRole, 
  onOpenBriefBuilder, 
  onOpenDeliveryStudio 
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
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-orange-500/10 text-orange-400 border border-orange-500/20">
              Live Marketplace
            </span>
            <span className="text-xs text-zinc-400 font-mono">
              Smart Escrow Guaranteed
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight mt-1">
            Active Brand Briefs Board
          </h1>
          <p className="text-xs sm:text-sm text-zinc-400 mt-0.5">
            Verified enterprise commissions with locked escrow budgets and clear commercial specifications.
          </p>
        </div>

        <div className="flex items-center gap-3">
          {userRole === 'brand' ? (
            <button
              onClick={onOpenBriefBuilder}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-orange-500 to-amber-500 hover:brightness-110 text-white text-xs font-bold shadow-lg shadow-orange-500/20 transition-all"
            >
              <PlusCircle className="w-4 h-4" />
              <span>Post New AI Brief</span>
            </button>
          ) : (
            <button
              onClick={() => onOpenDeliveryStudio()}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-200 border border-zinc-700 text-xs font-bold transition-colors"
            >
              <Sparkles className="w-4 h-4 text-cyan-400" />
              <span>My Active Milestones</span>
            </button>
          )}
        </div>
      </div>

      {/* Marketplace Stats Strip */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="p-3.5 rounded-2xl bg-zinc-900/80 border border-zinc-800">
          <span className="text-[10px] text-zinc-500 uppercase font-semibold">Active Commissions</span>
          <span className="text-lg font-bold text-white block mt-0.5">{briefs.length} Briefs</span>
        </div>
        <div className="p-3.5 rounded-2xl bg-zinc-900/80 border border-zinc-800">
          <span className="text-[10px] text-zinc-500 uppercase font-semibold">Total Escrow Value</span>
          <span className="text-lg font-bold text-emerald-400 block mt-0.5">₹57,50,000 Locked</span>
        </div>
        <div className="p-3.5 rounded-2xl bg-zinc-900/80 border border-zinc-800">
          <span className="text-[10px] text-zinc-500 uppercase font-semibold">Average Response Time</span>
          <span className="text-lg font-bold text-cyan-400 block mt-0.5">&lt; 3.2 Hours</span>
        </div>
        <div className="p-3.5 rounded-2xl bg-zinc-900/80 border border-zinc-800">
          <span className="text-[10px] text-zinc-500 uppercase font-semibold">Clear-to-Air™ Ratio</span>
          <span className="text-lg font-bold text-amber-400 block mt-0.5">100% Certified</span>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search briefs by brand, keyword, or model..."
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-orange-500"
          />
        </div>

        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
          {['All', 'AI Filmmaking', '3D & VFX', 'Character Consistency', 'Motion Graphics'].map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all border ${
                selectedCategory === cat
                  ? 'bg-orange-500 text-white border-orange-400 shadow-sm'
                  : 'bg-zinc-900 text-zinc-400 border-zinc-800 hover:text-zinc-200'
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
            className="rounded-3xl bg-[#121217] border border-zinc-800 hover:border-zinc-700 p-6 space-y-4 shadow-xl flex flex-col justify-between transition-all"
          >
            {/* Top Bar: Brand + Budget */}
            <div className="space-y-2">
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3">
                  <img 
                    src={brief.brandLogo} 
                    alt={brief.brand}
                    className="w-10 h-10 rounded-xl object-cover border border-zinc-700 bg-zinc-900"
                  />
                  <div>
                    <h3 className="font-bold text-base text-white leading-snug">
                      {brief.title}
                    </h3>
                    <p className="text-xs text-zinc-400">{brief.brand}</p>
                  </div>
                </div>

                <div className="text-right shrink-0">
                  <span className="text-lg font-extrabold text-amber-400">{brief.budget}</span>
                  <span className="text-[10px] text-zinc-500 block uppercase">Escrow Locked</span>
                </div>
              </div>

              {/* Status & Deadline pill */}
              <div className="flex flex-wrap items-center gap-2 pt-1">
                <span className="px-2 py-0.5 rounded text-[10px] font-mono font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                  {brief.status}
                </span>
                <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-zinc-900 text-zinc-400 border border-zinc-800 flex items-center gap-1">
                  <Clock className="w-3 h-3 text-orange-400" />
                  {brief.deadline}
                </span>
                <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-cyan-500/10 text-cyan-300 border border-cyan-500/20 flex items-center gap-1">
                  <ShieldCheck className="w-3 h-3" />
                  {brief.complianceTier?.split('(')[0] || 'Clear-to-Air™'}
                </span>
              </div>
            </div>

            {/* Description */}
            <p className="text-xs text-zinc-300 leading-relaxed line-clamp-3">
              {brief.description}
            </p>

            {/* Formats & Tool Stack */}
            <div className="space-y-2.5 pt-1">
              <div className="grid grid-cols-2 gap-2 text-[11px] p-2.5 rounded-xl bg-zinc-950 border border-zinc-800/80">
                <div>
                  <span className="text-[10px] text-zinc-500 block uppercase">Deliverable</span>
                  <span className="text-zinc-200 font-medium truncate block">{brief.mediaType}</span>
                </div>
                <div>
                  <span className="text-[10px] text-zinc-500 block uppercase">Aspect Ratio</span>
                  <span className="text-zinc-200 font-medium truncate block">{brief.aspectRatio}</span>
                </div>
              </div>

              {/* Required AI Tools */}
              <div className="space-y-1">
                <span className="text-[10px] text-zinc-500 uppercase font-bold">Required Engines:</span>
                <div className="flex flex-wrap gap-1">
                  {brief.requiredTools?.map((tool, idx) => (
                    <span 
                      key={idx}
                      className="px-2 py-0.5 text-[10px] font-mono rounded bg-zinc-900 text-zinc-300 border border-zinc-800"
                    >
                      {tool}
                    </span>
                  ))}
                </div>
              </div>

              {/* Style Tokens */}
              {brief.styleTokens && brief.styleTokens.length > 0 && (
                <div className="space-y-1">
                  <span className="text-[10px] text-zinc-500 uppercase font-bold">Deconstructed Tokens:</span>
                  <div className="flex flex-wrap gap-1">
                    {brief.styleTokens.slice(0, 4).map((tok, idx) => (
                      <span key={idx} className="px-1.5 py-0.5 text-[10px] font-mono rounded bg-orange-500/10 text-orange-300 border border-orange-500/20">
                        {tok}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Bottom Actions */}
            <div className="pt-3 border-t border-zinc-800/80 flex items-center justify-between gap-3">
              <div className="text-xs text-zinc-400 flex items-center gap-1.5">
                <Users className="w-3.5 h-3.5 text-zinc-500" />
                <span>{brief.proposalsCount || 0} Pitches Submitted</span>
              </div>

              {userRole === 'creator' ? (
                <button
                  onClick={() => handleOpenPitchModal(brief)}
                  className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold bg-gradient-to-r from-violet-600 to-indigo-600 hover:brightness-110 text-white shadow-md shadow-violet-600/25 transition-all"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Submit AI Pitch</span>
                </button>
              ) : (
                <button
                  onClick={() => onOpenDeliveryStudio(brief)}
                  className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold bg-zinc-800 hover:bg-zinc-700 text-zinc-200 transition-colors"
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>Manage Milestone</span>
                </button>
              )}
            </div>

          </div>
        ))}
      </div>

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
