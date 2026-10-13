import React, { useState } from 'react';
import { 
  Search, 
  X, 
  Filter, 
  SlidersHorizontal, 
  ShieldCheck, 
  Zap, 
  Sparkles,
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
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by creator name, style ('anamorphic', 'photoreal'), or AI model..."
            className="w-full pl-10 pr-10 py-3 rounded-xl bg-zinc-900/90 border border-zinc-800 text-sm text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-orange-500/70 focus:ring-1 focus:ring-orange-500/50 transition-all shadow-inner"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-zinc-300"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Quick Filter Presets */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 md:pb-0">
          <button
            onClick={() => setClearToAirOnly(!clearToAirOnly)}
            className={`flex items-center gap-1.5 px-3 py-2.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all border ${
              clearToAirOnly
                ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/50 shadow-md shadow-emerald-500/20'
                : 'bg-zinc-900/80 text-zinc-300 border-zinc-800 hover:border-zinc-700'
            }`}
          >
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
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
            className={`flex items-center gap-1.5 px-3 py-2.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all border ${
              selectedTurnaround === '24h Rush'
                ? 'bg-amber-500/20 text-amber-300 border-amber-500/50 shadow-md shadow-amber-500/20'
                : 'bg-zinc-900/80 text-zinc-300 border-zinc-800 hover:border-zinc-700'
            }`}
          >
            <Zap className="w-3.5 h-3.5 text-amber-400" />
            <span>⚡ 24h Rush</span>
          </button>

          <button
            onClick={() => setShowAdvanced(!showAdvanced)}
            className={`flex items-center gap-1.5 px-3 py-2.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all border ${
              showAdvanced
                ? 'bg-zinc-800 text-white border-zinc-700'
                : 'bg-zinc-900/80 text-zinc-400 border-zinc-800 hover:text-zinc-200'
            }`}
          >
            <SlidersHorizontal className="w-3.5 h-3.5" />
            <span>Filters</span>
            <ChevronDown className={`w-3 h-3 transition-transform ${showAdvanced ? 'rotate-180' : ''}`} />
          </button>

          {hasActiveFilters && (
            <button
              onClick={onResetFilters}
              className="p-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-orange-400 transition-colors"
              title="Reset all filters"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          )}
        </div>

      </div>

      {/* Model & Tool Chips Horizontal Scroll */}
      <div className="space-y-1.5">
        <div className="flex items-center justify-between text-[11px] text-zinc-400">
          <span className="font-semibold uppercase tracking-wider text-zinc-500">Filter by AI Models & Engines:</span>
          <span>{totalResultsCount} Verified Creators found</span>
        </div>

        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar">
          {TOOL_OPTIONS.map((tool) => {
            const isSelected = selectedTools.includes(tool);
            return (
              <button
                key={tool}
                onClick={() => toggleTool(tool)}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono font-medium whitespace-nowrap transition-all border ${
                  isSelected
                    ? 'bg-orange-500 text-white border-orange-400 shadow-sm shadow-orange-500/30'
                    : 'bg-zinc-900/80 text-zinc-400 border-zinc-800 hover:text-zinc-200 hover:border-zinc-700'
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
        <div className="p-4 rounded-2xl bg-zinc-900/70 border border-zinc-800 grid grid-cols-1 sm:grid-cols-3 gap-4 animate-fadeIn">
          
          {/* Specialization */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-zinc-400">Creative Specialization</label>
            <select
              value={selectedSpecialization}
              onChange={(e) => setSelectedSpecialization(e.target.value)}
              className="w-full px-3 py-2 rounded-xl bg-zinc-950 border border-zinc-800 text-xs text-zinc-200 focus:outline-none focus:border-orange-500"
            >
              <option value="All">All Creative Disciplines</option>
              {SPECIALIZATION_OPTIONS.map(spec => (
                <option key={spec} value={spec}>{spec}</option>
              ))}
            </select>
          </div>

          {/* Verification Tier */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-zinc-400">Verification & Safety Level</label>
            <select
              value={selectedVerification}
              onChange={(e) => setSelectedVerification(e.target.value)}
              className="w-full px-3 py-2 rounded-xl bg-zinc-950 border border-zinc-800 text-xs text-zinc-200 focus:outline-none focus:border-orange-500"
            >
              <option value="All">All Verification Tiers</option>
              {VERIFICATION_OPTIONS.map(v => (
                <option key={v} value={v}>{v}</option>
              ))}
            </select>
          </div>

          {/* Turnaround Time */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-zinc-400">Delivery SLA</label>
            <select
              value={selectedTurnaround}
              onChange={(e) => setSelectedTurnaround(e.target.value)}
              className="w-full px-3 py-2 rounded-xl bg-zinc-950 border border-zinc-800 text-xs text-zinc-200 focus:outline-none focus:border-orange-500"
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
          <span className="text-[11px] text-zinc-500">Active filters:</span>
          {searchQuery && (
            <span className="px-2 py-0.5 rounded-full bg-zinc-800 text-zinc-300 text-[11px] flex items-center gap-1">
              "{searchQuery}"
              <X className="w-3 h-3 cursor-pointer" onClick={() => setSearchQuery('')} />
            </span>
          )}
          {selectedTools.map(tool => (
            <span key={tool} className="px-2 py-0.5 rounded-full bg-orange-500/20 text-orange-300 border border-orange-500/30 text-[11px] flex items-center gap-1">
              {tool}
              <X className="w-3 h-3 cursor-pointer" onClick={() => toggleTool(tool)} />
            </span>
          ))}
          {selectedSpecialization !== 'All' && (
            <span className="px-2 py-0.5 rounded-full bg-zinc-800 text-zinc-300 text-[11px] flex items-center gap-1">
              {selectedSpecialization}
              <X className="w-3 h-3 cursor-pointer" onClick={() => setSelectedSpecialization('All')} />
            </span>
          )}
          {selectedTurnaround !== 'All' && (
            <span className="px-2 py-0.5 rounded-full bg-zinc-800 text-zinc-300 text-[11px] flex items-center gap-1">
              {selectedTurnaround}
              <X className="w-3 h-3 cursor-pointer" onClick={() => setSelectedTurnaround('All')} />
            </span>
          )}
          {clearToAirOnly && (
            <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-[11px] flex items-center gap-1">
              Clear-to-Air™
              <X className="w-3 h-3 cursor-pointer" onClick={() => setClearToAirOnly(false)} />
            </span>
          )}
          <button
            onClick={onResetFilters}
            className="text-[11px] text-orange-400 hover:underline ml-2"
          >
            Clear all
          </button>
        </div>
      )}
    </div>
  );
};
