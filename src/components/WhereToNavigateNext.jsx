import React from 'react';
import { 
  Compass, 
  ArrowRight, 
  Sparkles, 
  FileText, 
  Briefcase, 
  Sliders, 
  RotateCcw,
  CheckCircle2,
  Users,
  ShieldCheck,
  Zap
} from 'lucide-react';

export const WhereToNavigateNext = ({ 
  currentView, 
  onNavigate, 
  onInspectRecipe 
}) => {
  const configs = {
    'explore': {
      tag: 'Commissioning & Discovery',
      title: 'Ready to Commission an Indian Generative AI Director?',
      description: 'Engage verified Indian AI filmmakers directly or generate an AI-assisted commercial brief with locked ₹ INR smart escrow, ASCI Clear-to-Air™ compliance, and C2PA cryptographic provenance.',
      primaryAction: {
        label: 'Create Campaign Brief with AI Wizard',
        icon: Zap,
        onClick: () => onNavigate('brief-builder')
      },
      secondaryActions: [
        {
          label: 'Inspect Featured Production Recipe',
          icon: Sparkles,
          onClick: () => {
            if (onInspectRecipe) onInspectRecipe();
          }
        },
        {
          label: 'Browse Live Briefs Board (₹57L)',
          icon: Briefcase,
          onClick: () => onNavigate('briefs')
        }
      ]
    },
    'profile': {
      tag: 'Director Scope & Engagement',
      title: 'Engage This Director on Your Next Commercial Campaign',
      description: 'Directly commission this director using their verified recipe architecture, or post a tailored commercial brief with milestone-governed ₹ INR escrow and full commercial buyout indemnity.',
      primaryAction: {
        label: 'Create Tailored AI Brief',
        icon: FileText,
        onClick: () => onNavigate('brief-builder')
      },
      secondaryActions: [
        {
          label: 'Explore Active Market Briefs',
          icon: Briefcase,
          onClick: () => onNavigate('briefs')
        },
        {
          label: 'Enter Seed Delivery Studio',
          icon: Sliders,
          onClick: () => onNavigate('delivery-room')
        }
      ]
    },
    'brief-builder': {
      tag: 'Production Scoping & Escrow',
      title: 'Commercial Brief Ready for Marketplace Allocation',
      description: 'Your multi-shot AI brief is structured with model stacks and budget milestones. Publish to the live marketplace to receive treatment pitches from verified directors with matching LoRAs.',
      primaryAction: {
        label: 'Browse Live Market Opportunities (₹57L)',
        icon: Briefcase,
        onClick: () => onNavigate('briefs')
      },
      secondaryActions: [
        {
          label: 'Enter Seed Studio Delivery Room',
          icon: Sliders,
          onClick: () => onNavigate('delivery-room')
        },
        {
          label: 'Explore Verified AI Directors',
          icon: Users,
          onClick: () => onNavigate('explore')
        }
      ]
    },
    'briefs': {
      tag: 'Enterprise Production Pipeline',
      title: 'Manage Your Enterprise Production Deliverables',
      description: 'Track active brand commissions, review milestone seed renders, drop frame-precise inpainting pins, and authorize cryptographic escrow releases to creators.',
      primaryAction: {
        label: 'Open Seed Studio Delivery Room',
        icon: Sliders,
        onClick: () => onNavigate('delivery-room')
      },
      secondaryActions: [
        {
          label: 'Create New Campaign Brief',
          icon: FileText,
          onClick: () => onNavigate('brief-builder')
        },
        {
          label: 'Explore Verified Directors Directory',
          icon: Users,
          onClick: () => onNavigate('explore')
        }
      ]
    },
    'delivery-room': {
      tag: 'Milestone Governance & Escrow Settlement',
      title: 'Commercial Milestone Delivery & Escrow Execution',
      description: 'Seed Studio ensures complete brand control over generative iterations. Authorize milestone payouts with ISO-certified C2PA cryptographic provenance and full commercial copyright buyout.',
      primaryAction: {
        label: 'Explore Verified AI Directors',
        icon: Users,
        onClick: () => onNavigate('explore')
      },
      secondaryActions: [
        {
          label: 'Commission Another Campaign Brief',
          icon: FileText,
          onClick: () => onNavigate('brief-builder')
        },
        {
          label: 'Inspect Active Marketplace Briefs',
          icon: Briefcase,
          onClick: () => onNavigate('briefs')
        }
      ]
    }
  };

  const config = configs[currentView] || configs['explore'];
  const PrimaryIcon = config.primaryAction.icon;

  return (
    <div className="w-full mt-10 pt-8 border-t-2 border-dashed border-[#dfd5c4]">
      <div className="rounded-3xl bg-white border-2 border-[#1c120c] p-6 sm:p-8 shadow-xl relative overflow-hidden">
        
        {/* Subtle decorative background watermark */}
        <div className="absolute top-2 right-4 text-[100px] font-black text-black/[0.03] select-none pointer-events-none font-display">
          FLOW
        </div>

        <div className="relative z-10 space-y-4">
          
          {/* Top Pill & Tag */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-3 py-1 rounded-full text-xs font-black bg-[#ff5522] text-white flex items-center gap-1.5 shadow-sm">
              <ShieldCheck className="w-3.5 h-3.5" />
              {config.tag}
            </span>
            <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-[#faf6f0] text-neutral-800 border border-[#dfd5c4]">
              Production Workflow Navigator
            </span>
          </div>

          {/* Heading & Summary */}
          <div>
            <h3 className="font-display font-black text-xl sm:text-2xl text-black tracking-tight">
              {config.title}
            </h3>
            <p className="text-xs sm:text-sm text-neutral-700 font-medium mt-1 leading-relaxed max-w-3xl">
              {config.description}
            </p>
          </div>

          {/* Action Navigation Buttons */}
          <div className="flex flex-wrap items-center gap-3 pt-2">
            
            {/* Primary Action Button */}
            <button
              onClick={config.primaryAction.onClick}
              className="flex items-center gap-2 px-6 py-3 rounded-full bg-black hover:bg-neutral-900 text-white font-black text-xs sm:text-sm shadow-md transition-all hover:scale-105 active:scale-95"
            >
              <PrimaryIcon className="w-4 h-4 text-[#ff5522]" />
              <span>{config.primaryAction.label}</span>
              <ArrowRight className="w-4 h-4 text-white" />
            </button>

            {/* Secondary Action Buttons */}
            {config.secondaryActions.map((sec, i) => {
              const SecIcon = sec.icon;
              return (
                <button
                  key={i}
                  onClick={sec.onClick}
                  className="flex items-center gap-2 px-4 py-2.5 rounded-full bg-[#faf6f0] hover:bg-white text-neutral-900 font-bold text-xs border border-[#dfd5c4] shadow-sm transition-all hover:border-black"
                >
                  <SecIcon className="w-3.5 h-3.5 text-[#ff5522]" />
                  <span>{sec.label}</span>
                </button>
              );
            })}

          </div>

        </div>

      </div>
    </div>
  );
};
