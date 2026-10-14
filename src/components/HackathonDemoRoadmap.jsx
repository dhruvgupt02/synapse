import React from 'react';
import { 
  Users, 
  Sparkles, 
  FileText, 
  Briefcase, 
  Sliders, 
  ArrowRight, 
  CheckCircle2, 
  Award,
  ChevronRight
} from 'lucide-react';

export const HackathonDemoRoadmap = ({ 
  activeTab, 
  setActiveTab, 
  onInspectDemoRecipe 
}) => {
  const steps = [
    {
      id: 'explore',
      stepNumber: '1',
      title: 'Explore Creators',
      desc: 'Browse 12+ verified Indian AI directors & filter by LoRAs/ComfyUI',
      icon: Users,
      action: () => setActiveTab('explore')
    },
    {
      id: 'recipe',
      stepNumber: '2',
      title: 'Inspect Recipe',
      desc: 'Inspect reverse-engineerable prompt, LoRA & workflow graph',
      icon: Sparkles,
      action: () => {
        if (onInspectDemoRecipe) {
          onInspectDemoRecipe();
        } else {
          setActiveTab('explore');
        }
      }
    },
    {
      id: 'brief-builder',
      stepNumber: '3',
      title: 'AI Brief Wizard',
      desc: 'Convert brand raw ideas into multi-shot cinematic briefs',
      icon: FileText,
      action: () => setActiveTab('brief-builder')
    },
    {
      id: 'briefs',
      stepNumber: '4',
      title: 'Live Briefs',
      desc: 'Explore ₹57L in active brand briefs with smart escrow locks',
      icon: Briefcase,
      action: () => setActiveTab('briefs')
    },
    {
      id: 'delivery-room',
      stepNumber: '5',
      title: 'Seed Studio',
      desc: 'Compare seed iterations, drop inpaint pins & release escrow',
      icon: Sliders,
      action: () => setActiveTab('delivery-room')
    }
  ];

  // Determine active step index
  const getCurrentStepIndex = () => {
    switch (activeTab) {
      case 'explore': return 0;
      case 'profile': return 1;
      case 'brief-builder': return 2;
      case 'briefs': return 3;
      case 'delivery-room': return 4;
      default: return 0;
    }
  };

  const currentIndex = getCurrentStepIndex();
  const nextStep = currentIndex < steps.length - 1 ? steps[currentIndex + 1] : steps[0];

  return (
    <div className="w-full px-5 sm:px-10 py-2">
      <div className="rounded-2xl sm:rounded-3xl bg-white/95 border-2 border-[#1c120c] p-3.5 sm:p-4 shadow-md backdrop-blur-md">
        
        {/* Header line */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2.5 pb-3 border-b border-[#dfd5c4]">
          <div className="flex items-center gap-2">
            <span className="flex items-center justify-center w-6 h-6 rounded-full bg-[#ff5522] text-white text-xs font-black shadow-sm">
              🏆
            </span>
            <div>
              <span className="font-display font-black text-xs sm:text-sm text-black uppercase tracking-wider">
                Hackathon Demo Roadmap
              </span>
              <span className="hidden md:inline text-xs text-neutral-600 font-medium ml-2">
                — Follow the 5-step prototype workflow to evaluate the full Synapse AI pipeline
              </span>
            </div>
          </div>

          {/* Quick "Next Step" Jump Button */}
          <button
            onClick={nextStep.action}
            className="group flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#ff5522] hover:bg-[#e24413] text-white font-bold text-xs shadow-sm transition-all hover:scale-105 active:scale-95"
            title={`Jump directly to ${nextStep.title}`}
          >
            <span>Next Step: <strong>{nextStep.title}</strong></span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
          </button>
        </div>

        {/* 5-Step Connected Progress Pills */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2 pt-3">
          {steps.map((step, idx) => {
            const Icon = step.icon;
            const isCurrent = idx === currentIndex;
            const isCompleted = idx < currentIndex;

            return (
              <button
                key={step.id}
                onClick={step.action}
                className={`relative flex items-center gap-2.5 p-2 sm:p-2.5 rounded-xl border text-left transition-all group ${
                  isCurrent
                    ? 'bg-black text-white border-black shadow-md ring-2 ring-[#ff5522]/60'
                    : isCompleted
                    ? 'bg-[#faf6f0] text-neutral-800 border-[#dfd5c4] hover:border-black'
                    : 'bg-white text-neutral-600 border-[#eae0d2] hover:border-neutral-400'
                }`}
              >
                {/* Step Number Circle */}
                <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-black shrink-0 ${
                  isCurrent
                    ? 'bg-[#ff5522] text-white'
                    : isCompleted
                    ? 'bg-emerald-600 text-white'
                    : 'bg-neutral-200 text-neutral-700'
                }`}>
                  {isCompleted ? '✓' : step.stepNumber}
                </span>

                {/* Step Info */}
                <div className="overflow-hidden">
                  <div className={`font-display font-black text-xs truncate flex items-center gap-1 ${
                    isCurrent ? 'text-white' : 'text-black'
                  }`}>
                    <span>{step.title}</span>
                    {isCurrent && (
                      <span className="w-1.5 h-1.5 rounded-full bg-[#ff5522] animate-ping inline-block" />
                    )}
                  </div>
                  <div className={`text-[10px] truncate hidden sm:block ${
                    isCurrent ? 'text-neutral-300' : 'text-neutral-500'
                  }`}>
                    {step.id === 'explore' && 'Creators & Filters'}
                    {step.id === 'recipe' && 'Prompts & Workflows'}
                    {step.id === 'brief-builder' && 'Prompt-to-Brief'}
                    {step.id === 'briefs' && '₹57L Escrow Board'}
                    {step.id === 'delivery-room' && 'Seed Iterations'}
                  </div>
                </div>
              </button>
            );
          })}
        </div>

      </div>
    </div>
  );
};
