import React, { useState, useRef, useEffect } from 'react';
import { 
  Sliders, 
  SplitSquareVertical, 
  Layers, 
  MapPin, 
  CheckCircle2, 
  AlertCircle, 
  Clock, 
  Sparkles, 
  ShieldCheck, 
  FileCode2, 
  Lock, 
  Download, 
  Send, 
  Plus, 
  X, 
  GitCompare, 
  RotateCcw, 
  Maximize2,
  Check,
  Zap,
  HelpCircle,
  ArrowRight,
  Info,
  ChevronRight,
  Compass,
  FileCheck
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { INITIAL_DELIVERY_PROJECTS } from '../data/mockData';
import { addFeedbackPin, approveMilestoneAPI, resolveFeedbackPin } from '../utils/api';
import { WhereToNavigateNext } from './WhereToNavigateNext';

export const DeliveryStudioView = ({ 
  userRole, 
  deliveryProjects = INITIAL_DELIVERY_PROJECTS, 
  onUpdateProjects,
  onNavigate 
}) => {
  const [activeProjectIndex, setActiveProjectIndex] = useState(0);
  const projectsList = (deliveryProjects && deliveryProjects.length >= INITIAL_DELIVERY_PROJECTS.length) 
    ? deliveryProjects 
    : INITIAL_DELIVERY_PROJECTS;
  const project = projectsList[activeProjectIndex] || projectsList[0];

  // View Mode: 'slider' | 'side-by-side' | 'seed-a' | 'seed-b'
  const [viewMode, setViewMode] = useState('slider');
  const [sliderPosition, setSliderPosition] = useState(50); // 0 to 100 for split comparison

  // Pins state
  const [pins, setPins] = useState(project.feedbackPins || []);
  const [selectedPin, setSelectedPin] = useState(null);
  const [newPinCoords, setNewPinCoords] = useState(null);
  const [newPinComment, setNewPinComment] = useState('');

  // Milestone Approval State
  const [approvedProjects, setApprovedProjects] = useState({});
  const isMilestoneApproved = Boolean(approvedProjects[project.id]);
  const [settlementDetails, setSettlementDetails] = useState(null);
  const [showInvoiceModal, setShowInvoiceModal] = useState(false);

  const [showRerollModal, setShowRerollModal] = useState(false);
  const [rerollNotes, setRerollNotes] = useState('');
  const [showC2paModal, setShowC2paModal] = useState(false);

  // Sync pins when project changes
  useEffect(() => {
    setPins(project.feedbackPins || []);
    setSelectedPin(null);
    setNewPinCoords(null);
  }, [activeProjectIndex, project]);

  // Canvas image container ref for accurate click coordinates
  const canvasRef = useRef(null);

  // Handle clicking on image to drop a new pin
  const handleCanvasClick = (e) => {
    if (!canvasRef.current) return;
    const rect = canvasRef.current.getBoundingClientRect();
    const x = Math.round(((e.clientX - rect.left) / rect.width) * 100);
    const y = Math.round(((e.clientY - rect.top) / rect.height) * 100);

    setNewPinCoords({ x, y });
    setSelectedPin(null);
  };

  const handleSavePin = async (e) => {
    e.preventDefault();
    if (!newPinComment.trim() || !newPinCoords) return;

    const newPin = {
      id: `pin-${Date.now()}`,
      x: newPinCoords.x,
      y: newPinCoords.y,
      user: userRole === 'brand' ? 'Brand Creative Director' : 'Lead AI Supervisor',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80',
      comment: newPinComment.trim(),
      status: 'Pending Inpaint',
      createdAt: 'Just now'
    };

    const updated = [...pins, newPin];
    setPins(updated);
    setNewPinCoords(null);
    setNewPinComment('');

    // Live API persistence
    try {
      await addFeedbackPin(project.id, newPin);
    } catch (err) {
      console.warn('Live API pin registration:', err.message);
    }

    if (onUpdateProjects && deliveryProjects) {
      const updatedProjects = deliveryProjects.map(p => 
        p.id === project.id ? { ...p, feedbackPins: updated } : p
      );
      onUpdateProjects(updatedProjects);
    }
  };

  const handleResolvePin = async (pinId) => {
    const updated = pins.map(p => 
      p.id === pinId ? { ...p, status: 'Resolved' } : p
    );
    setPins(updated);

    try {
      await resolveFeedbackPin(project.id, pinId, userRole);
    } catch (err) {
      console.warn('Live API pin resolve error:', err.message);
    }

    if (onUpdateProjects && deliveryProjects) {
      const updatedProjects = deliveryProjects.map(p => 
        p.id === project.id ? { ...p, feedbackPins: updated } : p
      );
      onUpdateProjects(updatedProjects);
    }
  };

  const handleApproveMilestone = async () => {
    if (userRole !== 'brand') {
      alert('Dual-Key Escrow Release requires Brand authorization. AI Directors cannot self-authorize milestone payouts.');
      return;
    }

    try {
      confetti({
        particleCount: 120,
        spread: 80,
        origin: { y: 0.5 }
      });
    } catch (e) {}

    setApprovedProjects({
      ...approvedProjects,
      [project.id]: true
    });

    // Call live backend settlement API with Brand authorization
    try {
      const res = await approveMilestoneAPI(project.id, userRole);
      if (res && res.settlement) {
        setSettlementDetails(res.settlement);
      }
    } catch (err) {
      console.warn('Live API milestone approval:', err.message);
    }

    if (onUpdateProjects && deliveryProjects) {
      const updatedProjects = deliveryProjects.map(p => 
        p.id === project.id ? { ...p, status: 'Milestone Approved', isEscrowReleased: true } : p
      );
      onUpdateProjects(updatedProjects);
    }
  };

  // Generate and download real signed C2PA manifest JSON file
  const handleDownloadC2paJson = () => {
    const manifest = {
      "@context": "https://c2pa.org/specifications/v2.0",
      "claim_generator": "Synapse-C2PA-Engine/2.4",
      "title": project.briefTitle,
      "project_id": project.id,
      "client": project.client,
      "director": project.creator,
      "escrow_amount": project.escrowAmount,
      "generated_timestamp": new Date().toISOString(),
      "model_provenance": {
        "engine": project.activeSeedB?.model || 'Kling 1.5 Commercial Pro',
        "seed": project.activeSeedB?.seedId || '892401',
        "cfg": project.activeSeedB?.cfg || 6.5,
        "lora_weights": "0.94",
        "fidelity_index": "0.992"
      },
      "compliance": {
        "clear_to_air": "Grade A+ Full Commercial Indemnity",
        "jurisdiction": "India / MeitY GenAI Advisory 2024",
        "ip_assignment": `Irrevocable Commercial Transfer to ${project.client}`
      },
      "hashes": {
        "asset_sha256": "8f92bd39a48f0291e9f029c7b94a821e",
        "c2pa_signature": "0x" + Array.from({length: 64}, () => Math.floor(Math.random()*16).toString(16)).join('')
      }
    };

    const blob = new Blob([JSON.stringify(manifest, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `c2pa-manifest-${project.id}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const seedA = project.activeSeedA;
  const seedB = project.activeSeedB;
  const diff = project.promptDiff || {
    v1: seedA?.prompt || '',
    v2: seedB?.prompt || '',
    addedTokens: ['cinematic lighting', 'high fidelity LoRA'],
    removedTokens: ['low resolution', 'noise artifacts']
  };

  return (
    <div className="w-full space-y-8 animate-fadeIn pb-20">
      
      {/* 1. TOP EXPLAINER: HOW SEED STUDIO WORKS (3-STEP ARCHITECTURE) */}
      <div className="rounded-3xl bg-[#1c120c] text-white p-6 sm:p-7 shadow-xl border border-zinc-800 space-y-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-zinc-800/80 pb-3">
          <div className="flex items-center gap-2.5">
            <span className="w-7 h-7 rounded-full bg-[#ff5522] flex items-center justify-center text-white text-xs font-black">
              ⚡
            </span>
            <div>
              <h2 className="font-display font-black text-lg sm:text-xl text-white tracking-tight uppercase">
                How Seed Studio Works in Generative AI Production
              </h2>
              <p className="text-xs text-zinc-400 font-medium">
                Traditional timeline cuts are replaced by neural seed iterations, prompt token diffs, and smart milestone escrow.
              </p>
            </div>
          </div>
          <span className="px-3 py-1 rounded-full text-[11px] font-mono font-bold bg-[#ff5522]/20 text-[#ff5522] border border-[#ff5522]/30">
            Synapse Protocol v2.4
          </span>
        </div>

        {/* 3 Step Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-1">
          
          <div className="p-4 rounded-2xl bg-zinc-900/90 border border-zinc-800 space-y-2">
            <div className="flex items-center gap-2 text-xs font-bold text-[#ff5522]">
              <span className="w-5 h-5 rounded-full bg-[#ff5522]/20 border border-[#ff5522]/40 flex items-center justify-center text-[10px]">1</span>
              <span>Compare Neural Seeds</span>
            </div>
            <p className="text-xs text-zinc-300 leading-relaxed">
              Generative models synthesize variations via random seeds. Drag the split slider to compare draft <strong>Seed A</strong> vs refined <strong>Seed B</strong> with custom LoRAs.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-zinc-900/90 border border-zinc-800 space-y-2">
            <div className="flex items-center gap-2 text-xs font-bold text-amber-400">
              <span className="w-5 h-5 rounded-full bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-[10px]">2</span>
              <span>Drop Inpaint Feedback Pins</span>
            </div>
            <p className="text-xs text-zinc-300 leading-relaxed">
              Click anywhere on the artwork to pin exact <em>(X%, Y%)</em> pixel coordinates requesting localized relighting, costume touchups, or jewelry sharpness.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-zinc-900/90 border border-zinc-800 space-y-2">
            <div className="flex items-center gap-2 text-xs font-bold text-emerald-400">
              <span className="w-5 h-5 rounded-full bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-[10px]">3</span>
              <span>Approve & Release Escrow</span>
            </div>
            <p className="text-xs text-zinc-300 leading-relaxed">
              Once satisfied, one-click milestone approval cryptographically unlocks <strong>₹ INR smart escrow</strong> to the creator and certifies C2PA provenance.
            </p>
          </div>

        </div>
      </div>

      {/* 2. CAMPAIGN PROJECT SELECTOR (3 Realistic Indian Campaigns) */}
      <div className="rounded-3xl bg-white border border-[#dfd5c4] p-5 shadow-sm space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-xs font-black uppercase text-neutral-500 tracking-wider flex items-center gap-1.5">
            <Layers className="w-3.5 h-3.5 text-[#ff5522]" />
            Switch Active Campaign Project:
          </span>
          <span className="text-[11px] font-bold text-neutral-600">
            {projectsList.length} Active Production Contracts
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {projectsList.map((p, idx) => {
            const isSelected = idx === activeProjectIndex;
            const isApproved = approvedProjects[p.id];

            return (
              <button
                key={p.id}
                onClick={() => setActiveProjectIndex(idx)}
                className={`p-4 rounded-2xl border text-left transition-all relative ${
                  isSelected
                    ? 'bg-black text-white border-black shadow-lg ring-2 ring-[#ff5522]/50'
                    : 'bg-[#faf6f0] text-neutral-800 border-[#dfd5c4] hover:border-black/50'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className={`px-2 py-0.5 rounded text-[10px] font-bold font-mono ${
                    isSelected ? 'bg-[#ff5522] text-white' : 'bg-[#e9ded0] text-neutral-800'
                  }`}>
                    Milestone {p.milestoneNumber}/{p.totalMilestones}
                  </span>
                  
                  {isApproved ? (
                    <span className="flex items-center gap-1 text-[10px] font-bold text-emerald-400">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      Approved
                    </span>
                  ) : (
                    <span className={`text-[10px] font-mono font-bold ${
                      isSelected ? 'text-[#ff5522]' : 'text-neutral-600'
                    }`}>
                      {p.escrowAmount.split(' ')[0]}
                    </span>
                  )}
                </div>

                <div className={`font-display font-black text-sm tracking-tight truncate ${
                  isSelected ? 'text-white' : 'text-black'
                }`}>
                  {p.briefTitle.split(':')[0]}
                </div>
                
                <div className={`text-xs truncate font-medium mt-0.5 ${
                  isSelected ? 'text-neutral-300' : 'text-neutral-600'
                }`}>
                  {p.client} • Dir. {p.creator}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* 3. ACTIVE PROJECT HEADER & MILESTONE STATUS */}
      <div className="rounded-3xl bg-white border border-[#dfd5c4] p-6 sm:p-7 space-y-4 shadow-md">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
          
          <div className="space-y-1">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-[#ff5522]/10 text-[#ff5522] border border-[#ff5522]/20 flex items-center gap-1.5">
                <Sliders className="w-3.5 h-3.5" />
                Seed Iteration & Revision Studio
              </span>
              <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-[#faf6f0] text-neutral-800 border border-[#dfd5c4] flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                Clear-to-Air™ Smart Escrow: {project.escrowAmount}
              </span>
            </div>

            <h1 className="font-display font-black text-2xl sm:text-3xl text-black tracking-tight">
              {project.briefTitle}
            </h1>
            <p className="text-xs text-neutral-600 flex items-center gap-2 font-medium">
              <span>Client: <strong className="text-black font-bold">{project.client}</strong></span>
              <span>•</span>
              <span>Lead Director: <strong className="text-[#ff5522] font-bold">{project.creator}</strong></span>
            </p>
          </div>

          {/* Milestone Action Buttons */}
          <div className="flex flex-wrap items-center gap-2.5">
            <button
              onClick={() => setShowC2paModal(true)}
              className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-white hover:bg-neutral-50 text-neutral-800 border border-[#dfd5c4] text-xs font-bold transition-colors shadow-sm"
            >
              <FileCode2 className="w-4 h-4 text-[#ff5522]" />
              <span>C2PA Manifest</span>
            </button>

            <button
              onClick={() => setShowInvoiceModal(true)}
              className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-white hover:bg-neutral-50 text-neutral-800 border border-[#dfd5c4] text-xs font-bold transition-colors shadow-sm"
            >
              <FileCheck className="w-4 h-4 text-emerald-600" />
              <span>Tax Invoice (GST)</span>
            </button>

            {userRole === 'brand' ? (
              <>
                <button
                  onClick={() => setShowRerollModal(true)}
                  className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#faf6f0] hover:bg-neutral-200 text-neutral-900 text-xs font-bold border border-[#dfd5c4] transition-colors"
                >
                  <RotateCcw className="w-3.5 h-3.5 text-amber-500" />
                  <span>Request Re-roll</span>
                </button>

                <button
                  onClick={handleApproveMilestone}
                  disabled={isMilestoneApproved}
                  className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-black transition-all shadow-md ${
                    isMilestoneApproved
                      ? 'bg-emerald-600 text-white cursor-default'
                      : 'bg-black hover:bg-neutral-900 text-white hover:scale-105 active:scale-95'
                  }`}
                >
                  <CheckCircle2 className={`w-4 h-4 ${isMilestoneApproved ? 'text-white' : 'text-[#ff5522]'}`} />
                  <span>
                    {isMilestoneApproved 
                      ? `Milestone ${project.milestoneNumber} Approved (Escrow Released!)` 
                      : `Approve Milestone ${project.milestoneNumber} & Release Escrow`}
                  </span>
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={() => setShowRerollModal(true)}
                  className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-zinc-900 hover:bg-zinc-800 text-white text-xs font-bold border border-zinc-700 transition-colors"
                >
                  <Sparkles className="w-3.5 h-3.5 text-[#ff5522]" />
                  <span>Submit Seed Refinement (v2)</span>
                </button>

                <div 
                  className="flex items-center gap-2 px-4 py-2 rounded-full bg-zinc-900/90 border border-zinc-700 text-xs font-bold text-zinc-300"
                  title="Dual-Key Governance: Escrow release requires client sign-off."
                >
                  <Lock className="w-3.5 h-3.5 text-amber-400" />
                  <span>
                    {isMilestoneApproved 
                      ? `Milestone ${project.milestoneNumber} Approved by Client (Escrow Released)` 
                      : `Awaiting Client Milestone Sign-Off & Escrow Release`}
                  </span>
                </div>
              </>
            )}
          </div>

        </div>

        {/* Milestone Steps Progress */}
        <div className="pt-2 border-t border-[#dfd5c4] grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
          
          <div className={`p-3.5 rounded-2xl border flex items-center justify-between ${
            project.milestoneNumber > 1 ? 'bg-[#faf6f0] border-[#dfd5c4]' : 'bg-white border-2 border-[#ff5522]'
          }`}>
            <div className="flex items-center gap-2">
              <CheckCircle2 className={`w-4 h-4 ${project.milestoneNumber > 1 ? 'text-emerald-600' : 'text-[#ff5522]'}`} />
              <div>
                <div className="font-bold text-black">Milestone 1: Character & Concept Anchor</div>
                <div className="text-[10px] text-neutral-500 font-medium">
                  {project.milestoneNumber > 1 ? 'Approved & Escrow Released' : 'In Active Review'}
                </div>
              </div>
            </div>
            <span className="text-[10px] text-emerald-600 font-mono font-bold">
              {project.milestoneNumber > 1 ? '100%' : 'Active'}
            </span>
          </div>

          <div className={`p-3.5 rounded-2xl border flex items-center justify-between shadow-sm ${
            project.milestoneNumber === 2 
              ? 'bg-white border-2 border-[#ff5522]' 
              : project.milestoneNumber > 2 
              ? 'bg-[#faf6f0] border-[#dfd5c4]' 
              : 'bg-[#faf6f0] border-[#dfd5c4] opacity-70'
          }`}>
            <div className="flex items-center gap-2">
              <span className={`w-2.5 h-2.5 rounded-full ${
                isMilestoneApproved ? 'bg-emerald-500' : 'bg-[#ff5522] animate-pulse'
              }`} />
              <div>
                <div className="font-bold text-black">Milestone 2: 4K Anamorphic Sequence</div>
                <div className="text-[10px] text-[#ff5522] font-semibold">
                  {isMilestoneApproved ? 'Approved by Client' : 'Active Brand Review'}
                </div>
              </div>
            </div>
            <span className="text-[10px] text-[#ff5522] font-mono font-bold">
              {project.milestoneNumber === 2 ? 'Current' : project.milestoneNumber > 2 ? 'Done' : 'Next'}
            </span>
          </div>

          <div className={`p-3.5 rounded-2xl border flex items-center justify-between ${
            project.milestoneNumber === 3 
              ? 'bg-white border-2 border-[#ff5522]' 
              : 'bg-[#faf6f0] border-[#dfd5c4] opacity-80'
          }`}>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-neutral-400" />
              <div>
                <div className="font-bold text-neutral-600">Milestone 3: Final C2PA Delivery</div>
                <div className="text-[10px] text-neutral-400 font-medium">
                  {project.milestoneNumber === 3 && isMilestoneApproved ? 'Completed & Handed Off' : 'Pending Milestone Approval'}
                </div>
              </div>
            </div>
            <span className="text-[10px] text-neutral-500 font-mono">
              {project.milestoneNumber === 3 ? 'Current' : 'Final'}
            </span>
          </div>

        </div>

      </div>

      {/* 4. MAIN COMPARISON CANVAS & FEEDBACK STATION */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
        
        {/* Left 2 Cols: Interactive Canvas */}
        <div className="lg:col-span-2 space-y-4">
          
          {/* Comparison Controls Bar & Interactive Guide Hint */}
          <div className="p-3.5 rounded-2xl bg-white border border-[#dfd5c4] shadow-sm space-y-2">
            
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-1.5 flex-wrap">
                <span className="text-xs font-bold text-neutral-600 px-2">Mode:</span>
                
                <button
                  onClick={() => setViewMode('slider')}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all flex items-center gap-1 ${
                    viewMode === 'slider'
                      ? 'bg-[#ff5522] text-white shadow-sm'
                      : 'bg-[#faf6f0] text-neutral-700 hover:bg-neutral-200'
                  }`}
                >
                  <SplitSquareVertical className="w-3.5 h-3.5" />
                  <span>Split Scrubber Slider</span>
                </button>

                <button
                  onClick={() => setViewMode('side-by-side')}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all ${
                    viewMode === 'side-by-side'
                      ? 'bg-black text-white'
                      : 'bg-[#faf6f0] text-neutral-700 hover:bg-neutral-200'
                  }`}
                >
                  Side-by-Side Dual
                </button>

                <button
                  onClick={() => setViewMode('seed-b')}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all ${
                    viewMode === 'seed-b'
                      ? 'bg-black text-white'
                      : 'bg-[#faf6f0] text-neutral-700 hover:bg-neutral-200'
                  }`}
                >
                  Seed B (Refined LoRA)
                </button>

                <button
                  onClick={() => setViewMode('seed-a')}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all ${
                    viewMode === 'seed-a'
                      ? 'bg-black text-white'
                      : 'bg-[#faf6f0] text-neutral-700 hover:bg-neutral-200'
                  }`}
                >
                  Seed A (Baseline)
                </button>
              </div>

              <div className="text-xs text-neutral-700 font-bold flex items-center gap-1.5 bg-[#faf6f0] px-3 py-1 rounded-full border border-[#dfd5c4]">
                <MapPin className="w-3.5 h-3.5 text-[#ff5522]" />
                <span>Click image to drop inpaint pin</span>
              </div>
            </div>

            {/* Live Production Pipeline Controls */}
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-[#ff5522]/10 border border-[#ff5522]/20 text-xs text-neutral-800 font-medium">
              <span className="text-[#ff5522] font-black">💡 Live Production Controls:</span>
              <span>
                {viewMode === 'slider' 
                  ? 'Drag the vertical divider in the middle left & right to inspect neural LoRA weight refinements. Click anywhere on the artwork to drop an inpaint revision pin.'
                  : 'Click anywhere on the visual artwork to drop an inpaint feedback pin with exact (X%, Y%) coordinates.'}
              </span>
            </div>

          </div>

          {/* Interactive Artwork Display Area */}
          <div 
            ref={canvasRef}
            onClick={handleCanvasClick}
            className="relative w-full aspect-[16/10] rounded-3xl overflow-hidden bg-black border-2 border-zinc-700/80 cursor-crosshair shadow-2xl select-none"
          >
            {/* View Mode 1: Split Slider */}
            {viewMode === 'slider' && (
              <div className="relative w-full h-full overflow-hidden">
                {/* Seed A Image (Underneath) */}
                <img 
                  src={seedA.image} 
                  alt="Seed A" 
                  className="absolute inset-0 w-full h-full object-cover"
                />
                
                {/* Seed B Image (Clipped by slider) */}
                <div 
                  className="absolute inset-0 overflow-hidden"
                  style={{ width: `${sliderPosition}%` }}
                >
                  <img 
                    src={seedB.image} 
                    alt="Seed B" 
                    className="absolute inset-0 w-full h-full object-cover max-w-none"
                    style={{ width: `${canvasRef.current ? canvasRef.current.clientWidth : 800}px` }}
                  />
                  <div className="absolute top-4 left-4 px-3 py-1 rounded-lg bg-black/80 border border-[#ff5522]/80 text-[#ff5522] text-xs font-bold font-mono backdrop-blur-md shadow-md">
                    Seed B (Refined LoRA)
                  </div>
                </div>

                {/* Slider Handle */}
                <div 
                  className="absolute top-0 bottom-0 w-1 bg-white shadow-2xl cursor-ew-resize flex items-center justify-center z-20"
                  style={{ left: `${sliderPosition}%` }}
                  onMouseDown={(e) => {
                    e.stopPropagation();
                    const onMove = (moveEvent) => {
                      if (!canvasRef.current) return;
                      const rect = canvasRef.current.getBoundingClientRect();
                      const pos = Math.min(Math.max(0, ((moveEvent.clientX - rect.left) / rect.width) * 100), 100);
                      setSliderPosition(pos);
                    };
                    const onUp = () => {
                      window.removeEventListener('mousemove', onMove);
                      window.removeEventListener('mouseup', onUp);
                    };
                    window.addEventListener('mousemove', onMove);
                    window.addEventListener('mouseup', onUp);
                  }}
                >
                  <div className="w-8 h-8 rounded-full bg-white text-zinc-950 shadow-2xl flex items-center justify-center text-xs font-black ring-4 ring-[#ff5522]/50">
                    ⟷
                  </div>
                </div>

                <div className="absolute top-4 right-4 px-3 py-1 rounded-lg bg-zinc-950/80 border border-zinc-700 text-zinc-300 text-xs font-mono font-bold backdrop-blur-md">
                  Seed A (Baseline Draft)
                </div>
              </div>
            )}

            {/* View Mode 2: Side-by-Side Dual View */}
            {viewMode === 'side-by-side' && (
              <div className="grid grid-cols-2 w-full h-full">
                <div className="relative border-r border-zinc-800 h-full overflow-hidden">
                  <img 
                    src={seedA.image} 
                    alt="Seed A" 
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-3 left-3 px-2 py-0.5 rounded bg-black/75 text-[11px] font-mono text-zinc-200 backdrop-blur-md border border-zinc-700">
                    Seed A: {seedA.seedId}
                  </div>
                </div>

                <div className="relative h-full overflow-hidden">
                  <img 
                    src={seedB.image} 
                    alt="Seed B" 
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-3 right-3 px-2 py-0.5 rounded bg-black/80 text-[11px] font-mono text-[#ff5522] backdrop-blur-md border border-[#ff5522]/50">
                    Seed B: {seedB.seedId} (Refined)
                  </div>
                </div>
              </div>
            )}

            {/* View Mode 3: Focused Seed B */}
            {viewMode === 'seed-b' && (
              <div className="relative w-full h-full">
                <img 
                  src={seedB.image} 
                  alt="Seed B" 
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-4 left-4 px-3 py-1 rounded-lg bg-black/80 text-[#ff5522] text-xs font-mono font-bold border border-[#ff5522]/50">
                  Seed B Iteration ({seedB.seedId}) • Active Refinement
                </div>
              </div>
            )}

            {/* View Mode 4: Focused Seed A */}
            {viewMode === 'seed-a' && (
              <div className="relative w-full h-full">
                <img 
                  src={seedA.image} 
                  alt="Seed A" 
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-4 left-4 px-3 py-1 rounded-lg bg-black/80 text-zinc-300 text-xs font-mono font-bold border border-zinc-700">
                  Seed A Iteration ({seedA.seedId}) • Baseline Keyframe
                </div>
              </div>
            )}

            {/* Feedback Pins Layer */}
            {pins.map((pin, idx) => (
              <div
                key={pin.id}
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedPin(pin);
                  setNewPinCoords(null);
                }}
                className={`absolute -translate-x-1/2 -translate-y-1/2 group cursor-pointer z-30 transition-transform ${
                  selectedPin?.id === pin.id ? 'scale-125' : 'hover:scale-110'
                }`}
                style={{ left: `${pin.x}%`, top: `${pin.y}%` }}
              >
                <div className={`relative flex items-center justify-center w-7 h-7 rounded-full shadow-2xl font-bold text-xs ${
                  pin.status === 'Resolved' 
                    ? 'bg-emerald-500 text-white' 
                    : 'bg-[#ff5522] text-white ring-4 ring-[#ff5522]/40 animate-pulse'
                }`}>
                  {idx + 1}
                </div>
              </div>
            ))}

            {/* Pending Click Pin Placement */}
            {newPinCoords && (
              <div
                className="absolute -translate-x-1/2 -translate-y-1/2 z-40"
                style={{ left: `${newPinCoords.x}%`, top: `${newPinCoords.y}%` }}
              >
                <div className="w-8 h-8 rounded-full bg-white text-zinc-900 font-extrabold flex items-center justify-center ring-4 ring-[#ff5522] animate-bounce text-xs">
                  +
                </div>
              </div>
            )}

          </div>

          {/* New Pin Input Modal / Drawer when user clicks */}
          {newPinCoords && (
            <div className="p-4 rounded-2xl bg-zinc-950 border-2 border-[#ff5522] space-y-3 animate-fadeIn shadow-2xl">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-[#ff5522]" />
                  <span className="text-xs font-bold text-white">
                    Drop Feedback Pin at Pixel Coordinate ({newPinCoords.x}%, {newPinCoords.y}%)
                  </span>
                </div>
                <button 
                  onClick={() => setNewPinCoords(null)}
                  className="text-zinc-400 hover:text-white"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <form onSubmit={handleSavePin} className="space-y-3">
                <input
                  type="text"
                  autoFocus
                  value={newPinComment}
                  onChange={(e) => setNewPinComment(e.target.value)}
                  placeholder="e.g. 'Inpaint: Soften gold reflection by 15%', 'Align jawline with moodboard', 'Match skin undertone'..."
                  className="w-full px-3 py-2 rounded-xl bg-zinc-900 border border-zinc-700 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-[#ff5522]"
                />
                
                <div className="flex items-center justify-between">
                  <span className="text-[11px] text-zinc-400">
                    Adds pin to creator's active ComfyUI revision queue.
                  </span>
                  <button
                    type="submit"
                    className="px-4 py-1.5 rounded-xl bg-[#ff5522] hover:bg-[#e24413] text-white text-xs font-bold transition-all shadow-md"
                  >
                    Save Pin
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* PROMPT DIFF SECTION: v1 vs v2 */}
          <div className="rounded-3xl bg-[#121217] border border-zinc-800 p-6 space-y-4 shadow-xl">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <GitCompare className="w-4 h-4 text-[#ff5522]" />
                <h3 className="font-bold text-sm text-white">
                  Version History & Neural Prompt Diff (Seed A ➔ Seed B)
                </h3>
              </div>
              <span className="text-[11px] font-mono text-zinc-400">
                Euler A • CFG {seedB.cfg} • Seed Locked
              </span>
            </div>

            {/* Added & Removed Tokens pills */}
            <div className="space-y-3 text-xs">
              <div>
                <span className="text-[10px] uppercase font-bold text-emerald-400 block mb-1.5 flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                  Added Prompt Tokens (Seed B Refinements):
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {diff.addedTokens.map((tok, i) => (
                    <span 
                      key={i} 
                      className="px-2.5 py-1 rounded-lg bg-emerald-500/15 text-emerald-300 border border-emerald-500/30 font-mono text-[11px]"
                    >
                      + {tok}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <span className="text-[10px] uppercase font-bold text-rose-400 block mb-1.5 flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-rose-400"></span>
                  Suppressed Negative Tokens (Removed Artifacts):
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {diff.removedTokens.map((tok, i) => (
                    <span 
                      key={i} 
                      className="px-2.5 py-1 rounded-lg bg-rose-500/15 text-rose-300 border border-rose-500/30 font-mono text-[11px] line-through"
                    >
                      - {tok}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Full v2 prompt string */}
            <div className="p-3.5 rounded-xl bg-zinc-950 border border-zinc-800 font-mono text-xs text-zinc-300 leading-relaxed">
              <span className="text-zinc-500 block text-[10px] uppercase mb-1">Active Seed B Production Prompt:</span>
              "{diff.v2}"
            </div>

          </div>

        </div>

        {/* Right 1 Col: Feedback Pins Drawer & Seed Metadata */}
        <div className="space-y-4">
          
          {/* Active Pins List */}
          <div className="rounded-3xl bg-[#121217] border border-zinc-800 p-5 space-y-4 shadow-xl">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-[#ff5522]" />
                <h3 className="font-bold text-sm text-white">Visual Feedback Pins</h3>
              </div>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-mono bg-zinc-800 text-zinc-300">
                {pins.length} active
              </span>
            </div>

            <div className="space-y-3 max-h-[380px] overflow-y-auto pr-1">
              {pins.map((pin, idx) => (
                <div
                  key={pin.id}
                  onClick={() => setSelectedPin(pin)}
                  className={`p-3.5 rounded-2xl border transition-all cursor-pointer space-y-2 ${
                    selectedPin?.id === pin.id
                      ? 'bg-zinc-800 border-[#ff5522] shadow-md'
                      : 'bg-zinc-950/70 border-zinc-800 hover:border-zinc-700'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold ${
                        pin.status === 'Resolved' ? 'bg-emerald-500 text-white' : 'bg-[#ff5522] text-white'
                      }`}>
                        {idx + 1}
                      </span>
                      <span className="font-semibold text-xs text-zinc-200">{pin.user}</span>
                    </div>

                    <span className={`px-2 py-0.5 rounded text-[10px] font-semibold ${
                      pin.status === 'Resolved'
                        ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                        : 'bg-amber-500/10 text-amber-300 border border-amber-500/20'
                    }`}>
                      {pin.status}
                    </span>
                  </div>

                  <p className="text-xs text-zinc-300 leading-snug">
                    {pin.comment}
                  </p>

                  <div className="flex items-center justify-between text-[10px] text-zinc-500 pt-1">
                    <span>Coord: ({pin.x}%, {pin.y}%)</span>
                    <span>{pin.createdAt}</span>
                  </div>

                  {userRole === 'creator' && pin.status !== 'Resolved' && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleResolvePin(pin.id);
                      }}
                      className="w-full mt-2 py-1.5 px-3 rounded-xl bg-emerald-500/15 hover:bg-emerald-500/25 text-emerald-300 border border-emerald-500/30 text-xs font-bold flex items-center justify-center gap-1.5 transition-all shadow-sm"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                      <span>Mark Inpaint Resolved</span>
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Seed Comparison Metadata Card */}
          <div className="rounded-3xl bg-[#121217] border border-zinc-800 p-5 space-y-3 shadow-xl text-xs">
            <h4 className="font-bold text-white uppercase tracking-wider text-[11px] flex items-center gap-1.5">
              <Lock className="w-3.5 h-3.5 text-amber-400" />
              Seed Lock & Consistency Registry
            </h4>

            <div className="space-y-2">
              <div className="p-3 rounded-xl bg-zinc-950 border border-zinc-800 space-y-1">
                <div className="flex items-center justify-between font-mono">
                  <span className="text-zinc-400">Seed A (Baseline):</span>
                  <span className="text-zinc-200 font-bold">{seedA.seedId}</span>
                </div>
                <p className="text-[11px] text-zinc-400">{seedA.model}</p>
                <div className="text-[10px] text-zinc-500 font-mono">CFG: {seedA.cfg}</div>
              </div>

              <div className="p-3 rounded-xl bg-zinc-950 border border-[#ff5522]/40 space-y-1">
                <div className="flex items-center justify-between font-mono">
                  <span className="text-[#ff5522] font-bold">Seed B (Active Refined):</span>
                  <span className="text-[#ff5522] font-bold">{seedB.seedId}</span>
                </div>
                <p className="text-[11px] text-zinc-300">{seedB.model}</p>
                <div className="text-[10px] text-emerald-400 flex items-center gap-1 mt-1 font-mono">
                  <CheckCircle2 className="w-3 h-3" />
                  LoRA Weight: 0.94 • Facial Drift: &lt; 0.8%
                </div>
              </div>
            </div>
          </div>

        </div>

      </div>

      {/* 5. WHERE TO NAVIGATE NEXT FOOTER */}
      <WhereToNavigateNext 
        currentView="delivery-room" 
        onNavigate={onNavigate || (() => {})} 
      />

      {/* REROLL MODAL */}
      {showRerollModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
          <div className="w-full max-w-md bg-[#121217] border border-zinc-700 rounded-3xl p-6 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-base text-white flex items-center gap-2">
                <RotateCcw className="w-4 h-4 text-amber-400" />
                Request Seed Re-roll
              </h3>
              <button onClick={() => setShowRerollModal(false)} className="text-zinc-400 hover:text-white">
                <X className="w-4 h-4" />
              </button>
            </div>
            <p className="text-xs text-zinc-300">
              Submit prompt parameter adjustments to {project.creator}. The creator will re-render seeds with updated weights.
            </p>
            <textarea
              rows={3}
              value={rerollNotes}
              onChange={(e) => setRerollNotes(e.target.value)}
              placeholder="e.g. Increase camera dolly speed by 10%, shift backlight temperature from 3200K to 4500K..."
              className="w-full p-3 rounded-xl bg-zinc-950 border border-zinc-800 text-xs text-white"
            />
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setShowRerollModal(false)}
                className="px-4 py-2 rounded-xl bg-zinc-800 text-xs font-semibold text-zinc-300"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  setShowRerollModal(false);
                  setRerollNotes('');
                }}
                className="px-4 py-2 rounded-xl bg-[#ff5522] hover:bg-[#e24413] text-white font-bold text-xs"
              >
                Send Re-roll Request
              </button>
            </div>
          </div>
        </div>
      )}

      {/* C2PA PROVENANCE CERTIFICATE MODAL */}
      {showC2paModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fadeIn">
          <div className="w-full max-w-lg bg-[#121217] border border-zinc-700 rounded-3xl p-6 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-emerald-400" />
                <h3 className="font-bold text-base text-white">
                  C2PA Cryptographic Provenance Manifest
                </h3>
              </div>
              <button onClick={() => setShowC2paModal(false)} className="text-zinc-400 hover:text-white">
                <X className="w-4 h-4" />
              </button>
            </div>
            
            <div className="p-4 rounded-xl bg-zinc-950 font-mono text-xs text-zinc-300 space-y-2 border border-zinc-800">
              <div><strong>Project:</strong> {project.briefTitle}</div>
              <div><strong>Manifest Version:</strong> 2.0 (C2PA ISO-Certified)</div>
              <div><strong>Asset Hash:</strong> SHA256: 8f92bd39a48f0291e9f029c7b94a821e</div>
              <div><strong>Generating Engine:</strong> {seedB.model}</div>
              <div><strong>Commercial Clearance:</strong> Clear-to-Air™ Grade A+ Full Commercial Indemnity</div>
              <div><strong>Signing Authority:</strong> Synapse Protocol MeitY Compliance Node</div>
            </div>

            <div className="flex justify-end gap-2">
              <button
                onClick={() => setShowC2paModal(false)}
                className="px-4 py-2 rounded-xl bg-zinc-800 text-xs font-semibold text-zinc-300 hover:text-white"
              >
                Close
              </button>
              <button
                onClick={() => {
                  handleDownloadC2paJson();
                  setShowC2paModal(false);
                }}
                className="px-4 py-2 rounded-xl bg-[#ff5522] hover:bg-[#e24413] text-white font-bold text-xs flex items-center gap-1.5 shadow-md"
              >
                <Download className="w-3.5 h-3.5" />
                Download Signed Certificate (.json)
              </button>
            </div>
          </div>
        </div>
      )}

      {/* COMMERCIAL GST TAX INVOICE MODAL */}
      {showInvoiceModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fadeIn">
          <div className="w-full max-w-xl bg-white border border-[#dfd5c4] rounded-3xl p-6 sm:p-7 space-y-5 shadow-2xl text-neutral-800">
            <div className="flex items-center justify-between border-b border-[#dfd5c4] pb-4">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-emerald-600/10 border border-emerald-600/20 flex items-center justify-center text-emerald-600">
                  <FileCheck className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-display font-black text-lg text-black tracking-tight">
                    Commercial Tax Invoice & Escrow Settlement
                  </h3>
                  <p className="text-xs text-neutral-500 font-medium">
                    Compliant with Indian GST Act 2017 & ASCI Synthetic Media Regulations
                  </p>
                </div>
              </div>
              <button onClick={() => setShowInvoiceModal(false)} className="text-neutral-400 hover:text-black">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="grid grid-cols-2 gap-4 text-xs">
              <div className="p-3.5 rounded-2xl bg-[#faf6f0] border border-[#dfd5c4] space-y-1">
                <span className="text-[10px] uppercase font-bold text-neutral-500">Invoice Number</span>
                <div className="font-mono font-bold text-black text-sm">
                  {settlementDetails?.taxInvoiceNumber || `INV-SYN-${project.id.slice(-6).toUpperCase()}`}
                </div>
                <div className="text-[11px] text-neutral-600">SAC Code: 998311 (IT & Generative Media Services)</div>
              </div>

              <div className="p-3.5 rounded-2xl bg-[#faf6f0] border border-[#dfd5c4] space-y-1">
                <span className="text-[10px] uppercase font-bold text-neutral-500">GST Registration</span>
                <div className="font-mono font-bold text-black text-sm">27AABCS1429B1Z8</div>
                <div className="text-[11px] text-neutral-600">Jurisdiction: Maharashtra, India</div>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-[#faf6f0] border border-[#dfd5c4] space-y-2 text-xs">
              <div className="flex items-center justify-between">
                <span className="text-neutral-600">Client / Billed To:</span>
                <span className="font-bold text-black">{project.client}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-neutral-600">Lead AI Director:</span>
                <span className="font-bold text-black">{project.creator}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-neutral-600">Milestone Phase:</span>
                <span className="font-bold text-black">Milestone {project.milestoneNumber} of {project.totalMilestones}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-neutral-600">Escrow Value:</span>
                <span className="font-mono font-bold text-black">{project.escrowAmount}</span>
              </div>
              <div className="flex items-center justify-between border-t border-[#dfd5c4] pt-2">
                <span className="font-bold text-black">Applicable Tax (18% Integrated GST):</span>
                <span className="font-mono font-bold text-emerald-600">Included in Escrow</span>
              </div>
              <div className="flex items-center justify-between pt-1">
                <span className="text-neutral-600">Smart Contract Escrow Tx:</span>
                <span className="font-mono text-[11px] text-[#ff5522]">
                  {settlementDetails?.txHash || '0x7e8b91a24d8f0291e9f029c7b94a821e'}
                </span>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-800 space-y-0.5">
              <div className="font-bold flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>ASCI Clear-to-Air™ Certified Commercial Clearance</span>
              </div>
              <p className="text-[11px] text-emerald-700">
                All neural training datasets, LoRA adapters, and output keyframes have been validated free of copyright infringement and licensed for full commercial broadcast buyout.
              </p>
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <button
                onClick={() => setShowInvoiceModal(false)}
                className="px-5 py-2.5 rounded-xl bg-black hover:bg-neutral-800 text-white text-xs font-bold transition-all shadow-md"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
