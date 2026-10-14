import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Lock, 
  Unlock, 
  CheckCircle2, 
  XCircle, 
  UserCheck, 
  Briefcase, 
  Layers, 
  FileCheck, 
  Sliders, 
  ArrowRight, 
  Sparkles, 
  AlertTriangle,
  Building,
  Film,
  Key,
  X
} from 'lucide-react';

export const AccessManagementModal = ({ 
  isOpen, 
  onClose, 
  userRole, 
  onSetUserRole, 
  loggedInCreator 
}) => {
  const [activeTab, setActiveTab] = useState('matrix'); // 'matrix' | 'brand-scope' | 'creator-scope'

  if (!isOpen) return null;

  const permissions = [
    {
      feature: 'Commission Brief & Lock Escrow (₹ INR)',
      brand: { allowed: true, level: 'Full Write & Escrow Deposit' },
      creator: { allowed: false, level: 'Forbidden (403)' },
      governance: 'Only verified client corporations can fund smart escrow.'
    },
    {
      feature: 'Submit Video Treatment Pitch',
      brand: { allowed: false, level: 'Forbidden (403)' },
      creator: { allowed: true, level: 'Full Pitch & Deck Submission' },
      governance: 'Brand commissioners cannot pitch on their own briefs.'
    },
    {
      feature: 'Upload & Refine Neural Seeds (v1 / v2)',
      brand: { allowed: false, level: 'Read & Scrubber Preview Only' },
      creator: { allowed: true, level: 'Full Seed & Model Checkpoint Upload' },
      governance: 'AI Directors generate and commit ComfyUI / Kling seed variations.'
    },
    {
      feature: 'Drop Visual Inpaint Revision Pins',
      brand: { allowed: true, level: 'Full Coordinate Pin Placement' },
      creator: { allowed: false, level: 'Acknowledge & Inspect Only' },
      governance: 'Creative Directors pin (X%, Y%) coordinates for required inpainting.'
    },
    {
      feature: 'Mark Inpaint Revision Pins as Resolved',
      brand: { allowed: false, level: 'Review Pending Resolution' },
      creator: { allowed: true, level: 'Execute Resolution Post-Render' },
      governance: 'Creators mark pins resolved once inpaint passes are committed.'
    },
    {
      feature: 'Approve Milestone & Release Smart Escrow',
      brand: { allowed: true, level: 'Cryptographic Release Execution' },
      creator: { allowed: false, level: 'Strictly Forbidden (Dual-Key Security)' },
      governance: 'Conflict-of-interest prevention: Creators cannot release funds to themselves.'
    },
    {
      feature: 'Download Signed C2PA Provenance Manifest',
      brand: { allowed: true, level: 'Download ISO Certificate (.json)' },
      creator: { allowed: true, level: 'Download ISO Certificate (.json)' },
      governance: 'Both parties retain cryptographic chain-of-custody provenance.'
    },
    {
      feature: 'Commercial GST Tax Invoice (SAC 998311)',
      brand: { allowed: true, level: 'Full Input Tax Credit Invoice' },
      creator: { allowed: true, level: 'Director Payout Settlement Statement' },
      governance: 'Compliant with Indian GST Act 2017 & ASCI Synthetic Media Disclosure.'
    }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/80 backdrop-blur-md animate-fadeIn">
      <div className="w-full max-w-4xl bg-white border border-[#dfd5c4] rounded-[28px] sm:rounded-[36px] overflow-hidden shadow-2xl flex flex-col max-h-[92vh]">
        
        {/* Header */}
        <div className="bg-[#1c120c] text-white p-6 sm:p-7 flex items-start justify-between gap-4 border-b border-zinc-800 shrink-0">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="px-3 py-0.5 rounded-full text-[10px] font-mono font-bold bg-[#ff5522]/20 text-[#ff5522] border border-[#ff5522]/40 uppercase tracking-wider flex items-center gap-1">
                <Key className="w-3 h-3" />
                Access Management & RBAC Security Engine
              </span>
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-zinc-800 text-zinc-300">
                MeitY / Indian IT Act 2000 Compliant
              </span>
            </div>
            
            <h2 className="font-display font-black text-xl sm:text-2xl tracking-tight text-white mt-1">
              Role-Based Access Control & Dual-Key Escrow Governance
            </h2>
            <p className="text-xs text-zinc-400 font-medium">
              BRIVIO enforces strict cryptographic role separation between Brand Commissioners and AI Directors.
            </p>
          </div>

          <button 
            onClick={onClose}
            className="p-2 rounded-full bg-zinc-900 hover:bg-zinc-800 text-zinc-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Live Identity Banner & 1-Click Role Switcher */}
        <div className="bg-[#f5ede2] border-b border-[#dfd5c4] p-4 sm:px-7 flex flex-col sm:flex-row items-center justify-between gap-3 shrink-0">
          <div className="flex items-center gap-3">
            <div className={`w-9 h-9 rounded-xl flex items-center justify-center text-white ${
              userRole === 'brand' ? 'bg-black' : 'bg-[#ff5522]'
            }`}>
              {userRole === 'brand' ? <Building className="w-5 h-5" /> : <Film className="w-5 h-5" />}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-neutral-600">Active Authenticated Role:</span>
                <span className="px-2.5 py-0.5 rounded-full text-xs font-black bg-black text-white uppercase tracking-wider">
                  {userRole === 'brand' ? 'Brand / Agency Commissioner' : 'Verified AI Director'}
                </span>
              </div>
              <p className="text-[11px] text-neutral-500 font-medium mt-0.5">
                {userRole === 'brand' 
                  ? 'Authorized for campaign commissioning, ₹ INR smart escrow locks, inpaint direction, and milestone sign-off.' 
                  : `Signed in as ${loggedInCreator ? loggedInCreator.name : 'AI Director'}. Authorized for treatment pitches, seed uploads, and inpaint resolution.`}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-[11px] font-bold text-neutral-600">Switch Perspective:</span>
            <div className="flex items-center bg-white border border-[#dfd5c4] rounded-full p-1 shadow-sm">
              <button
                onClick={() => onSetUserRole('brand')}
                className={`px-3 py-1 rounded-full text-xs font-bold transition-all ${
                  userRole === 'brand' ? 'bg-black text-white shadow-sm' : 'text-neutral-600 hover:text-black'
                }`}
              >
                Brand Mode
              </button>
              <button
                onClick={() => onSetUserRole('creator')}
                className={`px-3 py-1 rounded-full text-xs font-bold transition-all ${
                  userRole === 'creator' ? 'bg-[#ff5522] text-white shadow-sm' : 'text-neutral-600 hover:text-black'
                }`}
              >
                Creator Mode
              </button>
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="px-6 sm:px-7 pt-4 pb-2 border-b border-[#dfd5c4] flex items-center gap-4 bg-[#faf6f0] shrink-0 text-xs font-bold">
          <button
            onClick={() => setActiveTab('matrix')}
            className={`pb-2 border-b-2 transition-colors ${
              activeTab === 'matrix' 
                ? 'border-[#ff5522] text-[#ff5522] font-black' 
                : 'border-transparent text-neutral-600 hover:text-black'
            }`}
          >
            RBAC Permission Matrix (Brand vs Creator)
          </button>
          <button
            onClick={() => setActiveTab('brand-scope')}
            className={`pb-2 border-b-2 transition-colors ${
              activeTab === 'brand-scope' 
                ? 'border-[#ff5522] text-[#ff5522] font-black' 
                : 'border-transparent text-neutral-600 hover:text-black'
            }`}
          >
            Brand Access Architecture
          </button>
          <button
            onClick={() => setActiveTab('creator-scope')}
            className={`pb-2 border-b-2 transition-colors ${
              activeTab === 'creator-scope' 
                ? 'border-[#ff5522] text-[#ff5522] font-black' 
                : 'border-transparent text-neutral-600 hover:text-black'
            }`}
          >
            Creator Access Architecture
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="p-6 sm:p-7 overflow-y-auto space-y-6 flex-1 text-neutral-800">

          {/* TAB 1: PERMISSION MATRIX */}
          {activeTab === 'matrix' && (
            <div className="space-y-5 animate-fadeIn">
              <div className="overflow-x-auto rounded-2xl border border-[#dfd5c4] shadow-sm">
                <table className="w-full text-left text-xs">
                  <thead className="bg-[#f0e6d8] text-neutral-800 uppercase font-bold text-[11px] border-b border-[#dfd5c4]">
                    <tr>
                      <th className="p-3.5">Platform Capability / Operation</th>
                      <th className="p-3.5 text-center">Brand / Agency</th>
                      <th className="p-3.5 text-center">AI Director / Creator</th>
                      <th className="p-3.5 hidden md:table-cell">Governance Policy</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#dfd5c4] bg-white">
                    {permissions.map((p, idx) => (
                      <tr key={idx} className="hover:bg-[#faf6f0] transition-colors">
                        <td className="p-3.5 font-bold text-neutral-900">
                          {p.feature}
                        </td>
                        
                        {/* Brand Column */}
                        <td className="p-3.5 text-center">
                          <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold ${
                            p.brand.allowed 
                              ? 'bg-emerald-100 text-emerald-800 border border-emerald-200' 
                              : 'bg-rose-100 text-rose-800 border border-rose-200'
                          }`}>
                            {p.brand.allowed ? <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> : <XCircle className="w-3.5 h-3.5 text-rose-500" />}
                            <span>{p.brand.level}</span>
                          </span>
                        </td>

                        {/* Creator Column */}
                        <td className="p-3.5 text-center">
                          <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold ${
                            p.creator.allowed 
                              ? 'bg-emerald-100 text-emerald-800 border border-emerald-200' 
                              : 'bg-rose-100 text-rose-800 border border-rose-200'
                          }`}>
                            {p.creator.allowed ? <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> : <XCircle className="w-3.5 h-3.5 text-rose-500" />}
                            <span>{p.creator.level}</span>
                          </span>
                        </td>

                        {/* Governance Policy */}
                        <td className="p-3.5 text-neutral-600 text-[11px] hidden md:table-cell font-medium">
                          {p.governance}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Dual-Key Smart Escrow Explanation Box */}
              <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-xs text-amber-900 space-y-2">
                <div className="flex items-center gap-2 font-black text-amber-950">
                  <AlertTriangle className="w-4 h-4 text-amber-600" />
                  <span>Dual-Key Escrow Consensus Architecture (Why Creators Cannot Self-Approve)</span>
                </div>
                <p className="text-[11px] leading-relaxed text-amber-800 font-medium">
                  Under the Indian Contract Act 1872 & RBI escrow regulations, funds locked in smart contract milestones can only be released upon unilateral sign-off by the funding principal (the Brand). If creators could authorize milestone payments to themselves, it would create an unmitigated conflict of interest. Brivio enforces this at both the UI layer (conditional button rendering) and API layer (403 Forbidden rejection).
                </p>
              </div>
            </div>
          )}

          {/* TAB 2: BRAND SCOPE */}
          {activeTab === 'brand-scope' && (
            <div className="space-y-4 animate-fadeIn text-xs">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                
                <div className="p-5 rounded-2xl bg-[#faf6f0] border border-[#dfd5c4] space-y-3">
                  <div className="flex items-center gap-2 text-black font-black text-sm">
                    <Building className="w-4 h-4 text-[#ff5522]" />
                    <span>Brand Commissioner Identity</span>
                  </div>
                  <p className="text-neutral-600 leading-relaxed font-medium">
                    Corporate accounts authenticated under enterprise GSTIN (e.g. Titan Company, Mahindra Automotive, CRED).
                  </p>
                  <ul className="space-y-1.5 text-neutral-700">
                    <li className="flex items-center gap-1.5 font-bold">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                      <span>Post AI Briefs with guaranteed ₹ INR Escrow</span>
                    </li>
                    <li className="flex items-center gap-1.5 font-bold">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                      <span>Set ASCI Clear-to-Air™ and MeitY Compliance Specs</span>
                    </li>
                    <li className="flex items-center gap-1.5 font-bold">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                      <span>Bookmark & Book Top-Tier AI Filmmakers</span>
                    </li>
                  </ul>
                </div>

                <div className="p-5 rounded-2xl bg-[#faf6f0] border border-[#dfd5c4] space-y-3">
                  <div className="flex items-center gap-2 text-black font-black text-sm">
                    <Sliders className="w-4 h-4 text-[#ff5522]" />
                    <span>Creative Review & Payout Power</span>
                  </div>
                  <p className="text-neutral-600 leading-relaxed font-medium">
                    Direct access to neural seed comparison and milestone financial authorization.
                  </p>
                  <ul className="space-y-1.5 text-neutral-700">
                    <li className="flex items-center gap-1.5 font-bold">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                      <span>Drop inpaint coordinate pins (X%, Y%) for revisions</span>
                    </li>
                    <li className="flex items-center gap-1.5 font-bold">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                      <span>Request neural seed re-rolls with custom CFG/weights</span>
                    </li>
                    <li className="flex items-center gap-1.5 font-bold">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                      <span>Sign milestone approval & trigger immediate escrow payout</span>
                    </li>
                  </ul>
                </div>

              </div>
            </div>
          )}

          {/* TAB 3: CREATOR SCOPE */}
          {activeTab === 'creator-scope' && (
            <div className="space-y-4 animate-fadeIn text-xs">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                
                <div className="p-5 rounded-2xl bg-[#faf6f0] border border-[#dfd5c4] space-y-3">
                  <div className="flex items-center gap-2 text-black font-black text-sm">
                    <Film className="w-4 h-4 text-[#ff5522]" />
                    <span>AI Director Profile & Recipe Showcase</span>
                  </div>
                  <p className="text-neutral-600 leading-relaxed font-medium">
                    Verified generative visual directors holding ASCI Clear-to-Air™ badges and custom LoRA recipes.
                  </p>
                  <ul className="space-y-1.5 text-neutral-700">
                    <li className="flex items-center gap-1.5 font-bold">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                      <span>Showcase ComfyUI nodes, Kling 1.5 & FLUX.1 workflows</span>
                    </li>
                    <li className="flex items-center gap-1.5 font-bold">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                      <span>Set commercial starting rates in ₹ INR per milestone</span>
                    </li>
                    <li className="flex items-center gap-1.5 font-bold">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                      <span>Register custom Indian ethnic character LoRAs</span>
                    </li>
                  </ul>
                </div>

                <div className="p-5 rounded-2xl bg-[#faf6f0] border border-[#dfd5c4] space-y-3">
                  <div className="flex items-center gap-2 text-black font-black text-sm">
                    <Layers className="w-4 h-4 text-[#ff5522]" />
                    <span>Pitching & Production Execution</span>
                  </div>
                  <p className="text-neutral-600 leading-relaxed font-medium">
                    Direct channel to pitch on live enterprise briefs and commit deliverables.
                  </p>
                  <ul className="space-y-1.5 text-neutral-700">
                    <li className="flex items-center gap-1.5 font-bold">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                      <span>Submit treatment decks and technical execution plans</span>
                    </li>
                    <li className="flex items-center gap-1.5 font-bold">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                      <span>Deliver neural Seed A / Seed B renders with prompt diffs</span>
                    </li>
                    <li className="flex items-center gap-1.5 font-bold">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                      <span>Resolve inpaint feedback pins after retouching passes</span>
                    </li>
                  </ul>
                </div>

              </div>
            </div>
          )}

        </div>

        {/* Footer */}
        <div className="bg-[#f0e6d8] border-t border-[#dfd5c4] p-4 sm:px-7 flex items-center justify-between gap-3 shrink-0">
          <div className="text-[11px] text-neutral-600 flex items-center gap-1.5 font-medium">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>Enforced via client RBAC state + Express backend middleware.</span>
          </div>

          <button
            onClick={onClose}
            className="px-6 py-2 rounded-xl bg-black hover:bg-neutral-800 text-white font-bold text-xs shadow-md transition-all"
          >
            Done
          </button>
        </div>

      </div>
    </div>
  );
};
