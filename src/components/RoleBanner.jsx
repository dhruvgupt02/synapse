import React from 'react';
import { ShieldCheck, Sparkles, Sliders, ArrowRight, Layers, FileCheck, Award, Zap } from 'lucide-react';

export const RoleBanner = ({ userRole, setUserRole, onActionClick }) => {
  return (
    <div className="w-full border-y border-[#dfd5c4]/70 bg-[#ede4d7]/60 py-2 px-5 sm:px-10">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-2 text-xs">
        
        {/* Left Side: Contextual Indian Role Message */}
        <div className="flex items-center gap-2 text-neutral-800">
          {userRole === 'brand' ? (
            <>
              <div className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-black text-white font-bold text-[10px] tracking-wide uppercase">
                <ShieldCheck className="w-3 h-3 text-[#ff5522]" />
                Brand & Agency Mode
              </div>
              <span className="text-neutral-600 font-medium hidden md:inline text-[11px]">
                ASCI Synthetic Media Compliant & Clear-to-Air™ certified Indian AI creators with ₹ INR escrow.
              </span>
            </>
          ) : (
            <>
              <div className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-black text-white font-bold text-[10px] tracking-wide uppercase">
                <Layers className="w-3 h-3 text-[#ff5522]" />
                AI Creator Mode
              </div>
              <span className="text-neutral-600 font-medium hidden md:inline text-[11px]">
                Showcase Indian bridal consistency LoRAs, Bollywood VFX ComfyUI nodes, fork recipes & pitch in ₹ INR.
              </span>
            </>
          )}
        </div>

        {/* Right Side: Quick Action or Switch Hint */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 text-neutral-600 text-[11px] font-medium">
            <span>Perspective:</span>
            <span className="font-bold text-black uppercase tracking-wider">
              {userRole === 'brand' ? 'Brand Commissioner (INR)' : 'Generative Director'}
            </span>
          </div>

          <button
            onClick={() => setUserRole(userRole === 'brand' ? 'creator' : 'brand')}
            className="flex items-center gap-1 text-[11px] font-bold text-[#ff5522] hover:text-[#d94112] transition-colors"
          >
            <span>Switch to {userRole === 'brand' ? 'Creator' : 'Brand'}</span>
            <ArrowRight className="w-3 h-3" />
          </button>
        </div>

      </div>
    </div>
  );
};
