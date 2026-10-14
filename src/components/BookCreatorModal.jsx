import React, { useState } from 'react';
import { 
  X, 
  ShieldCheck, 
  Sparkles, 
  Calendar, 
  DollarSign, 
  CheckCircle2, 
  Lock, 
  Layers, 
  Send 
} from 'lucide-react';
import confetti from 'canvas-confetti';

export const BookCreatorModal = ({ creator, recipe, isOpen, onClose, onBookingSuccess }) => {
  const [projectTitle, setProjectTitle] = useState(
    recipe ? `Production based on "${recipe.title}"` : 'AI Commercial Production'
  );
  const [budget, setBudget] = useState(
    creator 
      ? (typeof creator.projectMinimum === 'string' && creator.projectMinimum.startsWith('₹') ? creator.projectMinimum : `₹${Number(creator.projectMinimum).toLocaleString('en-IN')}`)
      : '₹2,50,000'
  );
  const [timeline, setTimeline] = useState(creator ? creator.turnaround : 'Under 1 Week');
  const [briefNotes, setBriefNotes] = useState(
    recipe 
      ? `We would like to book you to produce a campaign using your inspectable recipe architecture ("${recipe.title}") with locked character consistency, ASCI compliance, and C2PA commercial clearance.`
      : 'Looking to produce a high-fidelity commercial with Clear-to-Air™ India compliance and guaranteed multi-shot actor consistency.'
  );
  const [isSubmitted, setIsSubmitted] = useState(false);

  if (!isOpen || !creator) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      confetti({ particleCount: 90, spread: 70, origin: { y: 0.6 } });
    } catch (err) {}
    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      onClose();
      if (onBookingSuccess) onBookingSuccess(creator);
    }, 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fadeIn">
      <div 
        className="relative w-full max-w-lg bg-[#121217] border border-zinc-700/80 rounded-3xl p-6 sm:p-7 shadow-2xl space-y-5"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between">
          <div className="space-y-1">
            <span className="text-[10px] font-mono uppercase font-bold text-orange-400">
              Direct Production Commission (India)
            </span>
            <h3 className="text-xl font-bold text-white">
              Commission {creator.name}
            </h3>
            <p className="text-xs text-zinc-400">
              Rate: {typeof creator.hourlyRate === 'string' && creator.hourlyRate.startsWith('₹') ? creator.hourlyRate : `₹${Number(creator.hourlyRate).toLocaleString('en-IN')}`}/hr • Min. {typeof creator.projectMinimum === 'string' && creator.projectMinimum.startsWith('₹') ? creator.projectMinimum : `₹${Number(creator.projectMinimum).toLocaleString('en-IN')}`}
            </p>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-xl bg-zinc-800 text-zinc-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Creator Snapshot Card */}
        <div className="flex items-center gap-3 p-3 rounded-2xl bg-zinc-950 border border-zinc-800">
          <img 
            src={creator.avatar} 
            alt={creator.name} 
            className="w-12 h-12 rounded-xl object-cover border border-zinc-700"
          />
          <div className="flex-1 min-w-0">
            <h4 className="font-bold text-sm text-white truncate">{creator.name}</h4>
            <p className="text-xs text-orange-400 truncate">{creator.title}</p>
            <div className="flex items-center gap-2 mt-0.5 text-[10px]">
              <span className="text-emerald-400 flex items-center gap-1 font-semibold">
                <ShieldCheck className="w-3 h-3" /> Clear-to-Air™
              </span>
              <span className="text-cyan-400 font-mono">
                Consistency {creator.characterConsistencyIndex}%
              </span>
            </div>
          </div>
        </div>

        {isSubmitted ? (
          <div className="p-8 text-center space-y-3 bg-emerald-950/30 rounded-2xl border border-emerald-500/30 animate-fadeIn">
            <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto animate-bounce" />
            <h4 className="font-bold text-white text-lg">Smart Escrow Commission Sent!</h4>
            <p className="text-xs text-emerald-300/80 max-w-sm mx-auto leading-relaxed">
              {creator.name} has been notified and will deposit initial Milestone 1 seed keyframes directly to your Seed Studio.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1">
              <label className="text-xs font-semibold text-zinc-300">Project / Campaign Title</label>
              <input
                type="text"
                required
                value={projectTitle}
                onChange={(e) => setProjectTitle(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-950 border border-zinc-800 text-xs text-white focus:outline-none focus:border-orange-500"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1">
                <label className="text-xs font-semibold text-zinc-300">Escrow Deposit</label>
                <div className="relative">
                  <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
                  <input
                    type="text"
                    required
                    value={budget}
                    onChange={(e) => setBudget(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 rounded-xl bg-zinc-950 border border-zinc-800 text-xs text-white focus:outline-none focus:border-orange-500"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-zinc-300">Delivery SLA</label>
                <input
                  type="text"
                  value={timeline}
                  onChange={(e) => setTimeline(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-zinc-950 border border-zinc-800 text-xs text-white focus:outline-none focus:border-orange-500"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold text-zinc-300">Production Specifications & Narrative Notes</label>
              <textarea
                rows={3}
                required
                value={briefNotes}
                onChange={(e) => setBriefNotes(e.target.value)}
                className="w-full p-3 rounded-xl bg-zinc-950 border border-zinc-800 text-xs text-white leading-relaxed focus:outline-none focus:border-orange-500"
              />
            </div>

            {/* Smart Escrow Protection Notice */}
            <div className="p-3 rounded-xl bg-zinc-950 border border-zinc-800 text-[11px] text-zinc-400 space-y-1">
              <div className="flex items-center gap-1.5 text-orange-400 font-semibold">
                <Lock className="w-3.5 h-3.5" />
                Brivio Escrow Milestone Protection
              </div>
              <p>
                Funds remain safely held in smart escrow and are released only upon your interactive approval in the Seed Studio.
              </p>
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-gradient-to-r from-orange-500 to-amber-500 hover:brightness-110 text-white font-bold text-xs shadow-lg shadow-orange-500/25 transition-all flex items-center justify-center gap-2"
            >
              <Sparkles className="w-4 h-4" />
              <span>Lock Escrow & Commission Creator</span>
            </button>
          </form>
        )}

      </div>
    </div>
  );
};
