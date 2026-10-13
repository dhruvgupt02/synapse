import React from 'react';
import { ShieldCheck, Sparkles, Sliders, ArrowRight, Layers, FileCheck, Award, Zap } from 'lucide-react';

export const RoleBanner = ({ userRole, setUserRole, onActionClick }) => {
  return (
    <div className="w-full bg-gradient-to-r from-zinc-950 via-zinc-900 to-zinc-950 border-b border-zinc-800/60 py-2.5 px-4">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2 text-xs">
        
        {/* Left Side: Contextual Indian Role Message */}
        <div className="flex items-center gap-2 text-zinc-300">
          {userRole === 'brand' ? (
            <>
              <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-orange-500/10 text-orange-400 border border-orange-500/30 font-semibold text-[11px]">
                <ShieldCheck className="w-3.5 h-3.5" />
                Indian Brand & Agency Mode
              </div>
              <span className="text-zinc-400 hidden md:inline">
                Access ASCI Synthetic Media Compliant & Clear-to-Air™ certified Indian AI creators, locked in ₹ INR smart escrow.
              </span>
            </>
          ) : (
            <>
              <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-violet-500/10 text-violet-400 border border-violet-500/30 font-semibold text-[11px]">
                <Layers className="w-3.5 h-3.5" />
                Indian AI Creator Mode
              </div>
              <span className="text-zinc-400 hidden md:inline">
                Showcase Indian bridal consistency LoRAs, Bollywood VFX ComfyUI nodes, fork recipes, and pitch to top brands.
              </span>
            </>
          )}
        </div>

        {/* Right Side: Quick Action or Switch Hint */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 text-zinc-400 text-[11px]">
            <span>Active Perspective:</span>
            <span className="font-semibold text-zinc-200 uppercase tracking-wider">
              {userRole === 'brand' ? 'Brand Commissioner (INR)' : 'Generative Director'}
            </span>
          </div>

          <button
            onClick={() => setUserRole(userRole === 'brand' ? 'creator' : 'brand')}
            className="flex items-center gap-1 text-[11px] font-semibold text-orange-400 hover:text-orange-300 transition-colors"
          >
            <span>Switch to {userRole === 'brand' ? 'Creator' : 'Brand'} View</span>
            <ArrowRight className="w-3 h-3" />
          </button>
        </div>

      </div>
    </div>
  );
};
