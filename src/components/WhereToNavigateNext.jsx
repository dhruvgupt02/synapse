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
  Users
} from 'lucide-react';

export const WhereToNavigateNext = ({ 
  currentView, 
  onNavigate, 
  onInspectRecipe 
}) => {
  const configs = {
    'explore': {
      tag: 'Step 1 of 5 Completed',
      title: 'Where to Navigate Next: Inspect AI Recipes or Generate a Brief',
      description: 'You have explored curated Indian AI directors and experienced instant tool/turnaround filtering. Next, see how creators publish inspectable production recipes with prompt tokens and ComfyUI workflow graphs, or use our AI Wizard to generate a multi-shot brief.',
      primaryAction: {
        label: 'Inspect Aarav Sharma\'s Recipe',
        icon: Sparkles,
        onClick: () => {
          if (onInspectRecipe) onInspectRecipe();
        }
      },
      secondaryActions: [
        {
          label: 'Launch AI Brief Wizard',
          icon: FileText,
          onClick: () => onNavigate('brief-builder')
        },
        {
          label: 'Browse Live Briefs Board (₹57L)',
          icon: Briefcase,
          onClick: () => onNavigate('briefs')
        }
      ]
    },
    'profile': {
      tag: 'Step 2 of 5 Completed',
      title: 'Where to Navigate Next: Commission this Director or Post a Brief',
      description: 'You have inspected this creator\'s recipe-first portfolio, LoRA parameters, and ASCI Clear-to-Air™ safety badge. Next, commission them directly with locked ₹ INR escrow or open the AI Brief Wizard to generate a customized campaign spec.',
      primaryAction: {
        label: 'Create AI Brief with Wizard',
        icon: FileText,
        onClick: () => onNavigate('brief-builder')
      },
      secondaryActions: [
        {
          label: 'Explore Live Briefs Board',
          icon: Briefcase,
          onClick: () => onNavigate('briefs')
        },
        {
          label: 'Open Seed Studio Delivery Room',
          icon: Sliders,
          onClick: () => onNavigate('delivery-room')
        }
      ]
    },
    'brief-builder': {
      tag: 'Step 3 of 5 Completed',
      title: 'Where to Navigate Next: Review Live Briefs or Milestone Delivery',
      description: 'The AI Brief Wizard automatically turns raw prompts into commercial multi-shot storyboards with ASCI compliance and smart escrow budgeting. Next, view all active marketplace opportunities or inspect how milestone seeds are reviewed in the Seed Studio.',
      primaryAction: {
        label: 'Browse Live Briefs Board (₹57L)',
        icon: Briefcase,
        onClick: () => onNavigate('briefs')
      },
      secondaryActions: [
        {
          label: 'Open Seed Studio Milestone Review',
          icon: Sliders,
          onClick: () => onNavigate('delivery-room')
        },
        {
          label: 'Back to Creators Discovery',
          icon: Users,
          onClick: () => onNavigate('explore')
        }
      ]
    },
    'briefs': {
      tag: 'Step 4 of 5 Completed',
      title: 'Where to Navigate Next: Review Seed Iterations & Release Escrow',
      description: 'Once brands post briefs and creators pitch their recipes, active production moves to the Delivery Room. Enter Seed Studio to compare draft vs refined seeds with split sliders, drop coordinate inpaint pins, and release smart contract escrow.',
      primaryAction: {
        label: 'Enter Seed Studio Milestone Review',
        icon: Sliders,
        onClick: () => onNavigate('delivery-room')
      },
      secondaryActions: [
        {
          label: 'Launch AI Brief Wizard',
          icon: FileText,
          onClick: () => onNavigate('brief-builder')
        },
        {
          label: 'Explore AI Creators Grid',
          icon: Users,
          onClick: () => onNavigate('explore')
        }
      ]
    },
    'delivery-room': {
      tag: 'Step 5 of 5: Full Pipeline Completed! 🏆',
      title: 'You\'ve Experienced the Complete Synapse Prototype Pipeline!',
      description: 'From Creator Discovery ➔ Recipe Inspection ➔ AI Brief Creation ➔ Live Briefs Escrow Board ➔ Seed Studio Milestone Delivery, you have witnessed the world\'s first AI-native creative marketplace designed for high-stakes commercial production.',
      primaryAction: {
        label: 'Explore AI Creators (Restart Tour)',
        icon: RotateCcw,
        onClick: () => onNavigate('explore')
      },
      secondaryActions: [
        {
          label: 'Create Another Brief with AI Wizard',
          icon: FileText,
          onClick: () => onNavigate('brief-builder')
        },
        {
          label: 'Inspect Live Marketplace Briefs',
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
          NEXT
        </div>

        <div className="relative z-10 space-y-4">
          
          {/* Top Pill & Tag */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-3 py-1 rounded-full text-xs font-black bg-[#ff5522] text-white flex items-center gap-1.5 shadow-sm">
              <Compass className="w-3.5 h-3.5" />
              {config.tag}
            </span>
            <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-[#faf6f0] text-neutral-800 border border-[#dfd5c4]">
              Where to Navigate Next
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
