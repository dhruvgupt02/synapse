import React, { useState } from 'react';
import { 
  Search, 
  X, 
  SlidersHorizontal, 
  ShieldCheck, 
  Zap, 
  ChevronDown,
  RotateCcw
} from 'lucide-react';
import { 
  TOOL_OPTIONS, 
  SPECIALIZATION_OPTIONS, 
  VERIFICATION_OPTIONS, 
  TURNAROUND_OPTIONS 
} from '../data/mockData';

export const SmartFilterBar = ({ 
  searchQuery, 
  setSearchQuery, 
  selectedTools, 
  setSelectedTools,
  selectedSpecialization,
  setSelectedSpecialization,
  selectedVerification,
  setSelectedVerification,
  selectedTurnaround,
  setSelectedTurnaround,
  clearToAirOnly,
  setClearToAirOnly,
  totalResultsCount,
  onResetFilters
}) => {
  const [showAdvanced, setShowAdvanced] = useState(false);

  const toggleTool = (tool) => {
    if (selectedTools.includes(tool)) {
      setSelectedTools(selectedTools.filter(t => t !== tool));
    } else {
      setSelectedTools([...selectedTools, tool]);
    }
  };

  const hasActiveFilters = 
    searchQuery.trim() !== '' || 
    selectedTools.length > 0 || 
    selectedSpecialization !== 'All' || 
    selectedVerification !== 'All' || 
    selectedTurnaround !== 'All' || 
    clearToAirOnly;

  return (
    <div className="w-full space-y-4">
      {/* Search Input Bar + Quick Presets */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center gap-3">
        
        {/* Real-time Search Input */}
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by creator name, style ('anamorphic', 'photoreal'), or AI model..."
            className="w-full pl-11 pr-10 py-3 rounded-full bg-white border border-[#dfd5c4] text-sm text-black placeholder-neutral-400 focus:outline-none focus:border-[#ff5522] focus:ring-1 focus:ring-[#ff5522] transition-all shadow-sm"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-black"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Quick Filter Presets */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 md:pb-0">
          <button
            onClick={() => setClearToAirOnly(!clearToAirOnly)}
            className={`flex items-center gap-1.5 px-4 py-2.5 rounded-full text-xs font-bold whitespace-nowrap transition-all border ${
              clearToAirOnly
                ? 'bg-black text-white border-black shadow-sm'
                : 'bg-white/80 text-neutral-800 border-[#dfd5c4] hover:bg-white'
            }`}
          >
            <ShieldCheck className="w-3.5 h-3.5 text-[#ff5522]" />
            <span>Clear-to-Air™ Only</span>
          </button>

          <button
            onClick={() => {
              if (selectedTurnaround === '24h Rush') {
                setSelectedTurnaround('All');
              } else {
                setSelectedTurnaround('24h Rush');
              }
            }}
            className={`flex items-center gap-1.5 px-4 py-2.5 rounded-full text-xs font-bold whitespace-nowrap transition-all border ${
              selectedTurnaround === '24h Rush'
                ? 'bg-black text-white border-black shadow-sm'
                : 'bg-white/80 text-neutral-800 border-[#dfd5c4] hover:bg-white'
            }`}
          >
            <Zap className="w-3.5 h-3.5 text-amber-500" />
            <span>24h Rush</span>
          </button>

          <button
            onClick={() => setShowAdvanced(!showAdvanced)}
            className={`flex items-center gap-1.5 px-4 py-2.5 rounded-full text-xs font-bold whitespace-nowrap transition-all border ${
              showAdvanced
                ? 'bg-neutral-900 text-white border-neutral-900'
                : 'bg-white/80 text-neutral-800 border-[#dfd5c4] hover:bg-white'
            }`}
          >
            <SlidersHorizontal className="w-3.5 h-3.5" />
            <span>Filters</span>
            <ChevronDown className={`w-3 h-3 transition-transform ${showAdvanced ? 'rotate-180' : ''}`} />
          </button>

          {hasActiveFilters && (
            <button
              onClick={onResetFilters}
              className="p-2.5 rounded-full bg-white border border-[#dfd5c4] text-neutral-600 hover:text-[#ff5522] transition-colors"
              title="Reset all filters"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          )}
        </div>

      </div>

      {/* Model & Tool Chips Horizontal Scroll */}
      <div className="space-y-1.5">
        <div className="flex items-center justify-between text-[11px] text-neutral-600">
          <span className="font-bold uppercase tracking-wider text-neutral-500">Filter by AI Models & Engines:</span>
          <span className="font-semibold text-neutral-700">{totalResultsCount} Verified Creators found</span>
        </div>

        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar">
          {TOOL_OPTIONS.map((tool) => {
            const isSelected = selectedTools.includes(tool);
            return (
              <button
                key={tool}
                onClick={() => toggleTool(tool)}
                className={`px-3 py-1.5 rounded-full text-xs font-mono font-medium whitespace-nowrap transition-all border ${
                  isSelected
                    ? 'bg-[#ff5522] text-white border-[#ff5522] shadow-sm'
                    : 'bg-white/80 text-neutral-800 border-[#dfd5c4] hover:bg-white'
                }`}
              >
                {tool}
              </button>
            );
          })}
        </div>
      </div>

      {/* Advanced Filter Drawer */}
      {showAdvanced && (
        <div className="p-5 rounded-3xl bg-white border border-[#dfd5c4] shadow-md grid grid-cols-1 sm:grid-cols-3 gap-4 animate-fadeIn">
          
          {/* Specialization */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-neutral-700">Creative Specialization</label>
            <select
              value={selectedSpecialization}
              onChange={(e) => setSelectedSpecialization(e.target.value)}
              className="w-full px-3 py-2 rounded-xl bg-[#faf6f0] border border-[#dfd5c4] text-xs font-medium text-neutral-900 focus:outline-none focus:border-[#ff5522]"
            >
              <option value="All">All Creative Disciplines</option>
              {SPECIALIZATION_OPTIONS.map(spec => (
                <option key={spec} value={spec}>{spec}</option>
              ))}
            </select>
          </div>

          {/* Verification Tier */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-neutral-700">Verification & Safety Level</label>
            <select
              value={selectedVerification}
              onChange={(e) => setSelectedVerification(e.target.value)}
              className="w-full px-3 py-2 rounded-xl bg-[#faf6f0] border border-[#dfd5c4] text-xs font-medium text-neutral-900 focus:outline-none focus:border-[#ff5522]"
            >
              <option value="All">All Verification Tiers</option>
              {VERIFICATION_OPTIONS.map(v => (
                <option key={v} value={v}>{v}</option>
              ))}
            </select>
          </div>

          {/* Turnaround Time */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-neutral-700">Delivery SLA</label>
            <select
              value={selectedTurnaround}
              onChange={(e) => setSelectedTurnaround(e.target.value)}
              className="w-full px-3 py-2 rounded-xl bg-[#faf6f0] border border-[#dfd5c4] text-xs font-medium text-neutral-900 focus:outline-none focus:border-[#ff5522]"
            >
              <option value="All">All Turnaround Times</option>
              {TURNAROUND_OPTIONS.map(t => (
                <option key={t} value={t}>{t}</option>
              ))}
            </select>
          </div>

        </div>
      )}

      {/* Active Filter Badges */}
      {hasActiveFilters && (
        <div className="flex flex-wrap items-center gap-1.5 text-xs">
          <span className="text-[11px] text-neutral-500 font-semibold">Active:</span>
          {searchQuery && (
            <span className="px-3 py-1 rounded-full bg-black text-white text-[11px] font-medium flex items-center gap-1">
              "{searchQuery}"
              <X className="w-3 h-3 cursor-pointer" onClick={() => setSearchQuery('')} />
            </span>
          )}
          {selectedTools.map(tool => (
            <span key={tool} className="px-3 py-1 rounded-full bg-[#ff5522] text-white text-[11px] font-medium flex items-center gap-1">
              {tool}
              <X className="w-3 h-3 cursor-pointer" onClick={() => toggleTool(tool)} />
            </span>
          ))}
          {selectedSpecialization !== 'All' && (
            <span className="px-3 py-1 rounded-full bg-neutral-200 text-neutral-900 text-[11px] font-medium flex items-center gap-1">
              {selectedSpecialization}
              <X className="w-3 h-3 cursor-pointer" onClick={() => setSelectedSpecialization('All')} />
            </span>
          )}
          {selectedTurnaround !== 'All' && (
            <span className="px-3 py-1 rounded-full bg-neutral-200 text-neutral-900 text-[11px] font-medium flex items-center gap-1">
              {selectedTurnaround}
              <X className="w-3 h-3 cursor-pointer" onClick={() => setSelectedTurnaround('All')} />
            </span>
          )}
          {clearToAirOnly && (
            <span className="px-3 py-1 rounded-full bg-black text-white text-[11px] font-bold flex items-center gap-1">
              <span className="text-[#ff5522]">✓</span> Clear-to-Air™
              <X className="w-3 h-3 cursor-pointer" onClick={() => setClearToAirOnly(false)} />
            </span>
          )}
          <button
            onClick={onResetFilters}
            className="text-[11px] font-bold text-[#ff5522] hover:underline ml-2"
          >
            Clear all
          </button>
        </div>
      )}
    </div>
  );
};
