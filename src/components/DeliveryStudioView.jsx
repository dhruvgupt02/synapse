import React, { useState, useRef } from 'react';
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
  HelpCircle
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { INITIAL_DELIVERY_PROJECTS } from '../data/mockData';

export const DeliveryStudioView = ({ userRole, deliveryProjects, onUpdateProjects }) => {
  const [activeProjectIndex, setActiveProjectIndex] = useState(0);
  const project = deliveryProjects[activeProjectIndex] || INITIAL_DELIVERY_PROJECTS[0];

  // View Mode: 'slider' | 'side-by-side' | 'seed-a' | 'seed-b'
  const [viewMode, setViewMode] = useState('side-by-side');
  const [sliderPosition, setSliderPosition] = useState(50); // 0 to 100 for split comparison

  // Pins state
  const [pins, setPins] = useState(project.feedbackPins || []);
  const [selectedPin, setSelectedPin] = useState(null);
  const [newPinCoords, setNewPinCoords] = useState(null);
  const [newPinComment, setNewPinComment] = useState('');

  // Milestone Approval State
  const [isMilestoneApproved, setIsMilestoneApproved] = useState(false);
  const [showRerollModal, setShowRerollModal] = useState(false);
  const [rerollNotes, setRerollNotes] = useState('');
  const [showC2paModal, setShowC2paModal] = useState(false);

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

  const handleSavePin = (e) => {
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

    setPins([...pins, newPin]);
    setNewPinCoords(null);
    setNewPinComment('');
  };

  const handleApproveMilestone = () => {
    try {
      confetti({
        particleCount: 120,
        spread: 80,
        origin: { y: 0.5 }
      });
    } catch (e) {}
    setIsMilestoneApproved(true);
  };

  const seedA = project.activeSeedA;
  const seedB = project.activeSeedB;
  const diff = project.promptDiff;

  return (
    <div className="w-full space-y-8 animate-fadeIn pb-20">
      
      {/* Studio Header Bar */}
      <div className="rounded-3xl bg-[#121217] border border-zinc-800 p-6 sm:p-7 space-y-4 shadow-xl">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
          
          <div className="space-y-1">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 flex items-center gap-1.5">
                <Sliders className="w-3.5 h-3.5" />
                Seed Iteration & Revision Studio
              </span>
              <span className="px-2.5 py-0.5 rounded-full text-xs font-mono bg-zinc-900 text-zinc-300 border border-zinc-800 flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                Clear-to-Air™ Smart Escrow: {project.escrowAmount}
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              {project.briefTitle}
            </h1>
            <p className="text-xs text-zinc-400 flex items-center gap-2">
              <span>Client: <strong className="text-zinc-200">{project.client}</strong></span>
              <span>•</span>
              <span>Lead Director: <strong className="text-orange-400">{project.creator}</strong></span>
            </p>
          </div>

          {/* Milestone Action Buttons */}
          <div className="flex flex-wrap items-center gap-2.5">
            <button
              onClick={() => setShowC2paModal(true)}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-zinc-300 border border-zinc-800 text-xs font-semibold transition-colors"
            >
              <FileCode2 className="w-4 h-4 text-cyan-400" />
              <span>C2PA Manifest</span>
            </button>

            <button
              onClick={() => setShowRerollModal(true)}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-200 text-xs font-semibold border border-zinc-700 transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5 text-amber-400" />
              <span>Request Re-roll</span>
            </button>

            <button
              onClick={handleApproveMilestone}
              disabled={isMilestoneApproved}
              className={`flex items-center gap-2 px-5 py-2 rounded-xl text-xs font-bold transition-all shadow-lg ${
                isMilestoneApproved
                  ? 'bg-emerald-600 text-white shadow-emerald-500/20'
                  : 'bg-gradient-to-r from-emerald-500 to-teal-500 hover:brightness-110 text-white shadow-emerald-500/30'
              }`}
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>{isMilestoneApproved ? 'Milestone 2 Approved (Escrow Released)' : 'Approve Milestone & Release Escrow'}</span>
            </button>
          </div>

        </div>

        {/* Milestone Steps Progress */}
        <div className="pt-2 border-t border-zinc-800/80 grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
          <div className="p-3 rounded-xl bg-zinc-950/80 border border-emerald-500/30 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <div>
                <div className="font-bold text-white">Milestone 1: Character LoRA Anchor</div>
                <div className="text-[10px] text-zinc-500">Approved & Escrow Released (₹2,75,000)</div>
              </div>
            </div>
            <span className="text-[10px] text-emerald-400 font-mono">100%</span>
          </div>

          <div className="p-3 rounded-xl bg-zinc-950/80 border border-cyan-500/40 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-pulse"></span>
              <div>
                <div className="font-bold text-white">Milestone 2: 4K Anamorphic Sequence</div>
                <div className="text-[10px] text-cyan-400">
                  {isMilestoneApproved ? 'Approved by Client' : 'In Active Brand Review (₹5,50,000)'}
                </div>
              </div>
            </div>
            <span className="text-[10px] text-cyan-300 font-mono">Current</span>
          </div>

          <div className="p-3 rounded-xl bg-zinc-950/40 border border-zinc-800/60 flex items-center justify-between opacity-70">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-zinc-500" />
              <div>
                <div className="font-bold text-zinc-400">Milestone 3: Final C2PA Delivery</div>
                <div className="text-[10px] text-zinc-600">Pending Milestone 2 Approval (₹5,50,000)</div>
              </div>
            </div>
            <span className="text-[10px] text-zinc-600 font-mono">Next</span>
          </div>
        </div>

      </div>

      {/* Main Comparison Canvas & Feedback Station */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
        
        {/* Left 2 Cols: Interactive Canvas */}
        <div className="lg:col-span-2 space-y-4">
          
          {/* Comparison Controls Bar */}
          <div className="flex flex-wrap items-center justify-between gap-3 p-3 rounded-2xl bg-[#121217] border border-zinc-800">
            <div className="flex items-center gap-1.5">
              <span className="text-xs font-semibold text-zinc-400 px-2">Mode:</span>
              
              <button
                onClick={() => setViewMode('side-by-side')}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                  viewMode === 'side-by-side'
                    ? 'bg-orange-500 text-white'
                    : 'bg-zinc-900 text-zinc-400 hover:text-white'
                }`}
              >
                Side-by-Side Dual
              </button>

              <button
                onClick={() => setViewMode('slider')}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                  viewMode === 'slider'
                    ? 'bg-orange-500 text-white'
                    : 'bg-zinc-900 text-zinc-400 hover:text-white'
                }`}
              >
                Split Scrubber Slider
              </button>

              <button
                onClick={() => setViewMode('seed-b')}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                  viewMode === 'seed-b'
                    ? 'bg-cyan-600 text-white'
                    : 'bg-zinc-900 text-zinc-400 hover:text-white'
                }`}
              >
                Seed B (Newest)
              </button>
            </div>

            <div className="text-xs text-zinc-400 flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-orange-400" />
              <span>Click anywhere on canvas to drop inpaint pin</span>
            </div>
          </div>

          {/* Interactive Artwork Display Area */}
          <div 
            ref={canvasRef}
            onClick={handleCanvasClick}
            className="relative w-full aspect-[16/10] rounded-3xl overflow-hidden bg-black border border-zinc-700/80 cursor-crosshair shadow-2xl select-none"
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
                  <div className="absolute top-4 left-4 px-2.5 py-1 rounded-lg bg-cyan-950/80 border border-cyan-500/40 text-cyan-300 text-xs font-bold font-mono backdrop-blur-md">
                    Seed B (Refined LoRA)
                  </div>
                </div>

                {/* Slider Handle */}
                <div 
                  className="absolute top-0 bottom-0 w-1 bg-white shadow-2xl cursor-ew-resize flex items-center justify-center"
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
                  <div className="w-7 h-7 rounded-full bg-white text-zinc-900 shadow-xl flex items-center justify-center text-[10px] font-bold">
                    ⟷
                  </div>
                </div>

                <div className="absolute top-4 right-4 px-2.5 py-1 rounded-lg bg-zinc-950/80 border border-zinc-700 text-zinc-300 text-xs font-mono font-bold backdrop-blur-md">
                  Seed A (Baseline)
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
                  <div className="absolute top-3 right-3 px-2 py-0.5 rounded bg-cyan-950/80 text-[11px] font-mono text-cyan-300 backdrop-blur-md border border-cyan-500/40">
                    Seed B: {seedB.seedId} (LoRA 0.92)
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
                <div className="absolute top-4 left-4 px-3 py-1 rounded-lg bg-cyan-950/80 text-cyan-300 text-xs font-mono font-bold border border-cyan-500/40">
                  Seed B Iteration ({seedB.seedId}) • Locked
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
                className={`absolute -translate-x-1/2 -translate-y-1/2 group cursor-pointer z-20 transition-transform ${
                  selectedPin?.id === pin.id ? 'scale-125' : 'hover:scale-110'
                }`}
                style={{ left: `${pin.x}%`, top: `${pin.y}%` }}
              >
                <div className={`relative flex items-center justify-center w-7 h-7 rounded-full shadow-xl font-bold text-xs ${
                  pin.status === 'Resolved' 
                    ? 'bg-emerald-500 text-white' 
                    : 'bg-orange-500 text-white ring-4 ring-orange-500/30 animate-pulse'
                }`}>
                  {idx + 1}
                </div>
              </div>
            ))}

            {/* Pending Click Pin Placement */}
            {newPinCoords && (
              <div
                className="absolute -translate-x-1/2 -translate-y-1/2 z-30"
                style={{ left: `${newPinCoords.x}%`, top: `${newPinCoords.y}%` }}
              >
                <div className="w-8 h-8 rounded-full bg-white text-zinc-900 font-extrabold flex items-center justify-center ring-4 ring-orange-500 animate-bounce text-xs">
                  +
                </div>
              </div>
            )}

          </div>

          {/* New Pin Input Modal / Drawer when user clicks */}
          {newPinCoords && (
            <div className="p-4 rounded-2xl bg-zinc-900 border border-orange-500/50 space-y-3 animate-fadeIn shadow-xl">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-orange-400" />
                  <span className="text-xs font-bold text-white">
                    Drop Feedback Pin at ({newPinCoords.x}%, {newPinCoords.y}%)
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
                  placeholder="e.g. 'Inpaint: Soften amber neon reflection by 15%', 'Align jawline with moodboard'..."
                  className="w-full px-3 py-2 rounded-xl bg-zinc-950 border border-zinc-700 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-orange-500"
                />
                
                <div className="flex items-center justify-between">
                  <span className="text-[11px] text-zinc-400">
                    Adds pin to creator iteration queue with coordinate metadata.
                  </span>
                  <button
                    type="submit"
                    className="px-4 py-1.5 rounded-xl bg-orange-500 hover:bg-orange-600 text-white text-xs font-bold transition-all shadow-md"
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
                <GitCompare className="w-4 h-4 text-orange-400" />
                <h3 className="font-bold text-sm text-white">
                  Version History & Neural Prompt Diff (v1.0 ➔ v2.0)
                </h3>
              </div>
              <span className="text-[11px] font-mono text-zinc-400">
                Euler A • CFG 6.8 • Seed Locked
              </span>
            </div>

            {/* Added & Removed Tokens pills */}
            <div className="space-y-3 text-xs">
              <div>
                <span className="text-[10px] uppercase font-bold text-emerald-400 block mb-1.5 flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                  Added Prompt Tokens (v2 Refinements):
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
              <span className="text-zinc-500 block text-[10px] uppercase mb-1">Active v2 Production Prompt:</span>
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
                <MapPin className="w-4 h-4 text-orange-400" />
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
                      ? 'bg-zinc-800 border-orange-500 shadow-md'
                      : 'bg-zinc-950/70 border-zinc-800 hover:border-zinc-700'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold ${
                        pin.status === 'Resolved' ? 'bg-emerald-500 text-white' : 'bg-orange-500 text-white'
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
                </div>
              ))}
            </div>
          </div>

          {/* Seed Comparison Metadata Card */}
          <div className="rounded-3xl bg-[#121217] border border-zinc-800 p-5 space-y-3 shadow-xl text-xs">
            <h4 className="font-bold text-white uppercase tracking-wider text-[11px] flex items-center gap-1.5">
              <Lock className="w-3.5 h-3.5 text-amber-400" />
              Seed Lock Registry
            </h4>

            <div className="space-y-2">
              <div className="p-3 rounded-xl bg-zinc-950 border border-zinc-800 space-y-1">
                <div className="flex items-center justify-between font-mono">
                  <span className="text-zinc-400">Seed A:</span>
                  <span className="text-zinc-200 font-bold">{seedA.seedId}</span>
                </div>
                <p className="text-[11px] text-zinc-400">{seedA.model}</p>
              </div>

              <div className="p-3 rounded-xl bg-zinc-950 border border-cyan-500/30 space-y-1">
                <div className="flex items-center justify-between font-mono">
                  <span className="text-cyan-400 font-bold">Seed B (Active):</span>
                  <span className="text-cyan-300 font-bold">{seedB.seedId}</span>
                </div>
                <p className="text-[11px] text-zinc-300">{seedB.model}</p>
                <div className="text-[10px] text-emerald-400 flex items-center gap-1 mt-1">
                  <CheckCircle2 className="w-3 h-3" />
                  LoRA Weight: 0.92 (Facial Drift: &lt; 0.8%)
                </div>
              </div>
            </div>
          </div>

        </div>

      </div>

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
              Submit your prompt parameter adjustments to {project.creator}. The creator will re-render seeds with updated weights.
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
                className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-600 text-zinc-950 font-bold text-xs"
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
              <div><strong>Manifest Version:</strong> 2.0 (C2PA ISO-Certified)</div>
              <div><strong>Asset Hash:</strong> SHA256: 8f92bd39a48f0291e9f029c7b94a821e</div>
              <div><strong>Generating Engine:</strong> Kling 1.5 Pro + ComfyUI LoRA Anchor</div>
              <div><strong>Commercial Clearance:</strong> Clear-to-Air™ Grade A+ Full Indemnity</div>
              <div><strong>Signing Authority:</strong> Synapse Protocol Underwriting Authority</div>
            </div>

            <div className="flex justify-end">
              <button
                onClick={() => setShowC2paModal(false)}
                className="px-4 py-2 rounded-xl bg-orange-500 hover:bg-orange-600 text-white font-bold text-xs"
              >
                Download Signed Certificate (.json)
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
