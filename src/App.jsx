import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { RoleBanner } from './components/RoleBanner';
import { CreatorCard } from './components/CreatorCard';
import { SmartFilterBar } from './components/SmartFilterBar';
import { SmartEmptyState } from './components/SmartEmptyState';
import { CreatorProfileView } from './components/CreatorProfileView';
import { RecipeModal } from './components/RecipeModal';
import { BriefBuilderView } from './components/BriefBuilderView';
import { BriefsBoardView } from './components/BriefsBoardView';
import { DeliveryStudioView } from './components/DeliveryStudioView';
import { BookCreatorModal } from './components/BookCreatorModal';
import { CreatorLoginModal } from './components/CreatorLoginModal';
import { AccessManagementModal } from './components/AccessManagementModal';
import { WhereToNavigateNext } from './components/WhereToNavigateNext';

import { INITIAL_CREATORS } from './data/mockData';
import { 
  getStoredBriefs, 
  saveBriefToStorage, 
  getStoredDeliveryProjects, 
  saveDeliveryProjectsToStorage,
  getStoredUserRole, 
  saveUserRoleToStorage, 
  getSavedCreators, 
  toggleSaveCreator,
  getStoredLoggedInCreator,
  saveLoggedInCreatorToStorage
} from './utils/storage';

import { 
  fetchCreators, 
  fetchBriefs, 
  fetchDeliveryProjects, 
  createBrief,
  registerCreatorAPI
} from './utils/api';

import { Sparkles, ShieldCheck, Zap, ArrowRight, Film, CheckCircle2, Award, Globe, Grid } from 'lucide-react';

export function App() {
  // Navigation & Role State
  const [activeTab, setActiveTab] = useState('explore'); // 'explore' | 'profile' | 'brief-builder' | 'briefs' | 'delivery-room'
  const [userRole, setUserRole] = useState(getStoredUserRole()); // 'brand' | 'creator'
  
  // Data State with Server + LocalStorage Sync
  const [creators, setCreators] = useState(INITIAL_CREATORS);
  const [briefs, setBriefs] = useState(getStoredBriefs());
  const [deliveryProjects, setDeliveryProjects] = useState(getStoredDeliveryProjects());
  const [savedCreatorIds, setSavedCreatorIds] = useState(getSavedCreators());

  // Active Selections & Modals
  const [selectedCreator, setSelectedCreator] = useState(INITIAL_CREATORS[0]);
  const [inspectingRecipe, setInspectingRecipe] = useState(null);
  const [inspectingCreator, setInspectingCreator] = useState(null);
  const [bookingCreator, setBookingCreator] = useState(null);
  const [preloadedRecipeForBrief, setPreloadedRecipeForBrief] = useState(null);
  const [loggedInCreator, setLoggedInCreator] = useState(getStoredLoggedInCreator());
  const [isCreatorLoginOpen, setIsCreatorLoginOpen] = useState(false);
  const [isAccessModalOpen, setIsAccessModalOpen] = useState(false);

  // Filter States for 'explore' tab
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTools, setSelectedTools] = useState([]);
  const [selectedSpecialization, setSelectedSpecialization] = useState('All');
  const [selectedVerification, setSelectedVerification] = useState('All');
  const [selectedTurnaround, setSelectedTurnaround] = useState('All');
  const [clearToAirOnly, setClearToAirOnly] = useState(false);

  // Toast Notification
  const [toast, setToast] = useState(null);

  const showToast = (message, type = 'info') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3500);
  };

  // Load data from Express backend on mount
  useEffect(() => {
    loadBackendData();
  }, []);

  const loadBackendData = async () => {
    try {
      const serverCreators = await fetchCreators();
      if (serverCreators && serverCreators.length > 0) {
        setCreators(serverCreators);
        setSelectedCreator(serverCreators[0]);
      }

      const serverBriefs = await fetchBriefs();
      if (serverBriefs && serverBriefs.length > 0) {
        setBriefs(serverBriefs);
      }

      const serverProjects = await fetchDeliveryProjects();
      if (serverProjects && serverProjects.length > 0) {
        setDeliveryProjects(serverProjects);
      }
    } catch (e) {
      console.warn('Backend sync error, using local state:', e);
    }
  };

  // Sync user role
  const handleSetUserRole = (newRole) => {
    setUserRole(newRole);
    saveUserRoleToStorage(newRole);
    showToast(`Switched perspective to ${newRole === 'brand' ? 'Indian Brand / Agency' : 'Indian AI Creator'} Mode`, 'info');
  };

  // Creator Account Auth Handlers
  const handleLoginCreator = (creator) => {
    setLoggedInCreator(creator);
    saveLoggedInCreatorToStorage(creator);
    setUserRole('creator');
    saveUserRoleToStorage('creator');
    showToast(`Signed in as ${creator.name} (Creator Studio) 🇮🇳`, 'success');
  };

  const handleLogoutCreator = () => {
    setLoggedInCreator(null);
    saveLoggedInCreatorToStorage(null);
    setUserRole('brand');
    saveUserRoleToStorage('brand');
    showToast('Switched back to Brand Mode', 'info');
  };

  const handleRegisterCreator = async (creatorData) => {
    try {
      const saved = await registerCreatorAPI(creatorData);
      setCreators(prev => [saved, ...prev]);
      handleLoginCreator(saved);
      showToast(`Welcome ${saved.name}! Your director profile is verified & live on Brivio India.`, 'success');
    } catch (e) {
      setCreators(prev => [creatorData, ...prev]);
      handleLoginCreator(creatorData);
    }
  };

  // Saved Creators Toggle
  const handleToggleSave = (creatorId) => {
    const updated = toggleSaveCreator(creatorId);
    setSavedCreatorIds(updated);
    const isNowSaved = updated.includes(creatorId);
    showToast(isNowSaved ? 'Creator bookmarked' : 'Removed from bookmarks', 'info');
  };

  // Recipe Inspection Trigger
  const handleInspectRecipe = (recipe, creator) => {
    setInspectingRecipe(recipe);
    setInspectingCreator(creator || selectedCreator);
  };

  // Fork Recipe to Brief Builder
  const handleForkRecipe = (recipe) => {
    setPreloadedRecipeForBrief(recipe);
    setActiveTab('brief-builder');
    showToast(`Recipe architecture imported to Brief Wizard!`, 'success');
  };

  // Book Creator Trigger
  const handleOpenBooking = (creator, recipe = null) => {
    setBookingCreator(creator);
    setInspectingRecipe(recipe || null);
  };

  // Publish Brief from Brief Builder
  const handlePublishBrief = async (newBrief) => {
    const updatedLocal = saveBriefToStorage(newBrief);
    if (updatedLocal) setBriefs(updatedLocal);

    try {
      await createBrief(newBrief);
    } catch (e) {}

    setActiveTab('briefs');
    showToast(`Brief published successfully to India Marketplace with locked escrow!`, 'success');
  };

  // View specific creator in profile tab
  const handleSelectCreator = (creator) => {
    setSelectedCreator(creator);
    setActiveTab('profile');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Filter Execution
  const filteredCreators = creators.filter((creator) => {
    if (searchQuery.trim() !== '') {
      const q = searchQuery.toLowerCase();
      const matchName = creator.name.toLowerCase().includes(q);
      const matchBio = creator.bio.toLowerCase().includes(q);
      const matchTitle = creator.title.toLowerCase().includes(q);
      const matchLoc = creator.location.toLowerCase().includes(q);
      const matchTools = creator.primaryTools.some(t => t.toLowerCase().includes(q));
      const matchSpec = creator.specializations.some(s => s.toLowerCase().includes(q));
      const matchPortfolio = creator.portfolio?.some(p => 
        p.title.toLowerCase().includes(q) || 
        p.recipe?.tokens?.some(tok => tok.toLowerCase().includes(q))
      );
      if (!matchName && !matchBio && !matchTitle && !matchLoc && !matchTools && !matchSpec && !matchPortfolio) {
        return false;
      }
    }

    if (selectedTools.length > 0) {
      const hasTool = selectedTools.some(tool => creator.primaryTools.includes(tool));
      if (!hasTool) return false;
    }

    if (selectedSpecialization !== 'All') {
      if (!creator.specializations.includes(selectedSpecialization)) return false;
    }

    if (selectedVerification !== 'All') {
      if (selectedVerification === 'Commercial Safety Certified' && !creator.clearToAirCertified) {
        return false;
      }
      if (selectedVerification !== 'Commercial Safety Certified' && creator.verificationTier !== selectedVerification) {
        return false;
      }
    }

    if (selectedTurnaround !== 'All') {
      if (creator.turnaround !== selectedTurnaround) return false;
    }

    if (clearToAirOnly && !creator.clearToAirCertified) {
      return false;
    }

    return true;
  });

  const handleResetFilters = () => {
    setSearchQuery('');
    setSelectedTools([]);
    setSelectedSpecialization('All');
    setSelectedVerification('All');
    setSelectedTurnaround('All');
    setClearToAirOnly(false);
  };

  const handleApplyAlternativeTool = (toolName) => {
    setSelectedTools([toolName]);
    setSelectedSpecialization('All');
    setClearToAirOnly(false);
  };

  return (
    <div className="min-h-screen bg-[#f3efe8] p-2 sm:p-5 md:p-8 flex justify-center items-start font-sans selection:bg-[#ff5522] selection:text-white">
      
      {/* Outer Enterprise Studio Canvas */}
      <div className="w-full max-w-[1420px] paper-canvas rounded-[24px] sm:rounded-[36px] overflow-hidden border border-[#d8ccbb]/80 shadow-2xl relative flex flex-col min-h-[96vh]">

        {/* Top Navbar */}
        <Navbar 
          activeTab={activeTab}
          setActiveTab={(tab) => {
            setActiveTab(tab);
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          userRole={userRole}
          setUserRole={handleSetUserRole}
          onOpenBriefModal={() => setActiveTab('brief-builder')}
          loggedInCreator={loggedInCreator}
          onOpenCreatorLogin={() => setIsCreatorLoginOpen(true)}
          onOpenAccessModal={() => setIsAccessModalOpen(true)}
        />

        {/* Dynamic Role Banner */}
        <RoleBanner 
          userRole={userRole}
          setUserRole={handleSetUserRole}
          onActionClick={() => setActiveTab(userRole === 'brand' ? 'brief-builder' : 'briefs')}
          loggedInCreator={loggedInCreator}
          onOpenCreatorLogin={() => setIsCreatorLoginOpen(true)}
          onOpenAccessModal={() => setIsAccessModalOpen(true)}
        />

        {/* Toast Notification Floating */}
        {toast && (
          <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2.5 px-4 py-3 rounded-2xl bg-black border border-[#ff5522]/60 text-white text-xs font-semibold shadow-2xl shadow-black/40 animate-fadeIn">
            <Sparkles className="w-4 h-4 text-[#ff5522]" />
            <span>{toast.message}</span>
          </div>
        )}

        {/* Main Content Viewport */}
        <main className="flex-1 w-full px-5 sm:px-10 py-6 sm:py-8 relative z-10">
          
          {/* VIEW 1: EXPLORE CREATORS & DISCOVERY */}
          {activeTab === 'explore' && (
            <div className="space-y-12 animate-fadeIn">
              
              {/* HERO SECTION: SOPHISTICATED ENTERPRISE HEADLINE */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center pt-2 pb-6">
                
                {/* Left Column: Clean High-Conversion Headline & Subtext */}
                <div className="lg:col-span-7 space-y-6">
                  
                  <div className="space-y-4">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#ff5522]/10 border border-[#ff5522]/20 text-[#ff5522] text-xs font-bold uppercase tracking-wider">
                      <span className="w-2 h-2 rounded-full bg-[#ff5522] animate-pulse" />
                      Commercial AI Creative Operations • India 🇮🇳
                    </div>

                    <h1 className="font-display font-extrabold text-4xl sm:text-6xl lg:text-[4.75rem] tracking-tight leading-[1.04] text-neutral-900 select-none">
                      COMMERCIAL AI <br className="hidden sm:inline" />
                      <span className="text-[#ff5522]">PRODUCTION</span> & <br className="hidden sm:inline" />
                      SMART ESCROW.
                    </h1>

                    <p className="text-sm sm:text-base font-medium text-neutral-600 max-w-xl leading-relaxed">
                      Connect with verified Indian generative filmmakers and AI directors under <strong>ASCI Synthetic Media Disclosure</strong>, inspectable model recipes, and milestone-locked ₹ INR escrow protection.
                    </p>
                  </div>

                  {/* Clean, Modern Enterprise Actions */}
                  <div className="flex flex-wrap items-center gap-4 pt-2">
                    <button 
                      onClick={() => setActiveTab('brief-builder')}
                      className="flex items-center gap-2.5 px-7 py-3.5 rounded-full bg-[#ff5522] hover:bg-[#e04413] text-white text-sm sm:text-base font-bold shadow-lg shadow-[#ff5522]/25 transition-all hover:scale-[1.02] active:scale-[0.98]"
                    >
                      <Sparkles className="w-4 h-4" />
                      <span>Commission a Campaign</span>
                    </button>

                    <button 
                      onClick={() => {
                        const el = document.getElementById('marketplace-creators');
                        if (el) el.scrollIntoView({ behavior: 'smooth' });
                      }}
                      className="flex items-center gap-2 px-6 py-3.5 rounded-full bg-white hover:bg-neutral-50 text-neutral-800 border border-[#dfd5c4] text-sm font-bold shadow-sm transition-all hover:border-black/30"
                    >
                      <span>Explore AI Directors ↗</span>
                    </button>
                  </div>
                </div>

                {/* Right Column: Fashion Creator Card with Clean Verified Badge */}
                <div className="lg:col-span-5 flex justify-center lg:justify-end">
                  <div className="relative w-full max-w-[380px] sm:max-w-[420px] rounded-[32px] overflow-visible bg-white p-3.5 shadow-xl border border-[#e2d7c9]">
                    
                    {/* Creator Photo */}
                    <div className="relative rounded-[24px] overflow-hidden bg-[#faf6f0] aspect-[4/4.5]">
                      <img 
                        src="/images/hero-creator.jpg" 
                        alt="Creator & Platform"
                        className="w-full h-full object-cover object-top hover:scale-105 transition-transform duration-700" 
                      />
                      
                      {/* Dark Bottom Badge on Card: CREATOR + PLATFORM */}
                      <div className="absolute bottom-3 left-3 bg-black/90 backdrop-blur-md text-white px-4 py-2.5 rounded-2xl flex flex-col shadow-lg z-10 border border-white/10">
                        <span className="font-display font-extrabold text-xs tracking-wider uppercase">
                          AI Director Showcase
                        </span>
                        <span className="text-[10px] text-neutral-400 font-mono">
                          Kling 1.5 • ComfyUI • 4K
                        </span>
                      </div>
                    </div>

                    {/* Certified Commercial Director Badge */}
                    <div className="absolute -bottom-3 -right-2 sm:right-2 px-4 py-3 rounded-2xl bg-white border border-[#dfd5c4] shadow-xl flex items-center gap-3 z-20">
                      <div className="w-9 h-9 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-600">
                        <ShieldCheck className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="text-xs font-bold text-neutral-900 leading-tight">Clear-to-Air™ Certified</div>
                        <div className="text-[10px] font-mono text-neutral-500 mt-0.5">C2PA Provenance Grade A+</div>
                      </div>
                    </div>

                  </div>
                </div>

              </div>


              {/* HORIZONTAL FEATURE ROW MATCHING REFERENCE IMAGE */}
              <div className="pt-6 border-t border-[#dfd5c4] space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-5 items-stretch">
                  
                  {/* Left Column (Span 4): Vintage Camera Card + Dark Celebration Card */}
                  <div className="md:col-span-4 flex flex-col justify-between gap-5">
                    
                    {/* Top Item: Vintage Camera Card */}
                    <div className="flex items-center gap-4 p-4 rounded-3xl bg-white/90 border border-[#e3d7c8] shadow-sm">
                      <img 
                        src="/images/vintage-camera.jpg" 
                        alt="Vintage Camera" 
                        className="w-16 h-16 rounded-2xl object-cover border border-[#e3d7c8]"
                      />
                      <div>
                        <h4 className="font-display font-extrabold text-sm text-black leading-tight">
                          Honoring visionary digital creators
                        </h4>
                        <p className="text-[11px] text-neutral-600 font-medium mt-0.5">
                          India's top generative artists & AI directors
                        </p>
                      </div>
                    </div>

                    {/* Bottom Item: Dark Card with [System] [Clarity] [Consistency] Pills */}
                    <div className="paper-card-dark rounded-3xl p-6 flex flex-col justify-between flex-1 relative overflow-hidden">
                      <div className="flex items-center justify-between gap-2">
                        <div className="flex items-center gap-1.5 flex-wrap">
                          <span className="px-3 py-1 rounded-full bg-[#2563eb] text-white text-[11px] font-bold">
                            System
                          </span>
                          <span className="px-3 py-1 rounded-full bg-white text-black text-[11px] font-bold">
                            Clarity
                          </span>
                          <span className="px-3 py-1 rounded-full bg-[#ff5522] text-white text-[11px] font-bold">
                            Consistency
                          </span>
                        </div>
                        {/* Matrix Grid graphic */}
                        <div className="grid grid-cols-3 gap-1">
                          {Array.from({ length: 9 }).map((_, i) => (
                            <span key={i} className="w-1 h-1 rounded-[1px] bg-[#ff5522]" />
                          ))}
                        </div>
                      </div>

                      <div className="mt-6">
                        <h3 className="font-display font-black text-lg sm:text-xl text-white tracking-tight uppercase leading-snug">
                          THE ULTIMATE CELEBRATION OF DIGITAL CREATIVITY
                        </h3>
                        <p className="text-xs text-neutral-400 font-medium mt-1">
                          Locked seeds, LoRA consistency matrices, and C2PA provenance.
                        </p>
                      </div>
                    </div>

                  </div>

                  {/* Center Column (Span 4): Elevated Upload Dropzone Card */}
                  <div className="md:col-span-4">
                    <div className="h-full rounded-3xl bg-white border border-[#dfd5c4] p-6 shadow-lg flex flex-col justify-between space-y-5">
                      
                      {/* Notch Header */}
                      <div className="text-center space-y-0.5 border-b border-[#f1e8db] pb-3">
                        <span className="font-display font-black text-sm tracking-wider uppercase text-black">
                          UPLOAD YOUR CONTENT
                        </span>
                        <p className="text-[11px] text-neutral-500 font-medium">Drag & drop</p>
                      </div>

                      {/* Avatar with Glow Halo */}
                      <div className="flex justify-center my-2">
                        <div className="relative p-2 rounded-full bg-gradient-to-tr from-[#ff5522]/30 via-[#ff5522]/10 to-amber-400/20">
                          <img 
                            src="/images/avatar-upload.jpg" 
                            alt="Creator Avatar" 
                            className="w-20 h-20 rounded-full object-cover border-2 border-white shadow-md"
                          />
                        </div>
                      </div>

                      {/* Progress Bars */}
                      <div className="space-y-3">
                        <div className="p-3 rounded-2xl bg-[#faf6f0] border border-[#eee4d6] space-y-1.5">
                          <div className="flex items-center justify-between text-xs font-bold text-neutral-900">
                            <span className="flex items-center gap-1.5">
                              <Film className="w-3.5 h-3.5 text-[#ff5522]" />
                              Turn ideas into motion
                            </span>
                            <span className="font-mono text-[#ff5522]">90%</span>
                          </div>
                          <div className="w-full h-1.5 rounded-full bg-[#e8ded0] overflow-hidden">
                            <div className="h-full bg-[#ff5522] rounded-full transition-all duration-1000" style={{ width: '90%' }} />
                          </div>
                        </div>

                        <div className="p-3 rounded-2xl bg-[#faf6f0] border border-[#eee4d6] space-y-1.5">
                          <div className="flex items-center justify-between text-xs font-bold text-neutral-900">
                            <span className="flex items-center gap-1.5">
                              <Film className="w-3.5 h-3.5 text-neutral-500" />
                              Ethereal flower close-up
                            </span>
                            <span className="font-mono text-neutral-700">65%</span>
                          </div>
                          <div className="w-full h-1.5 rounded-full bg-[#e8ded0] overflow-hidden">
                            <div className="h-full bg-neutral-800 rounded-full transition-all duration-1000" style={{ width: '65%' }} />
                          </div>
                        </div>
                      </div>

                      <button
                        onClick={() => setActiveTab('brief-builder')}
                        className="w-full py-2.5 rounded-full bg-[#f1e8dc] hover:bg-[#eae0d2] text-neutral-900 text-xs font-bold transition-colors"
                      >
                        Launch Direct Ingestion ⚡
                      </button>

                    </div>
                  </div>

                  {/* Right Column (Span 4): Trophy Card + Smartphone Mockup Card */}
                  <div className="md:col-span-4 flex flex-col justify-between gap-5">
                    
                    {/* Top Item: Laurel Trophy Card */}
                    <div className="flex items-center gap-4 p-4 rounded-3xl bg-white/90 border border-[#e3d7c8] shadow-sm">
                      <div className="w-16 h-16 rounded-2xl bg-[#faf4ec] border border-[#e3d7c8] flex items-center justify-center text-[#ff5522]">
                        <Award className="w-8 h-8" />
                      </div>
                      <div>
                        <h4 className="font-display font-extrabold text-sm text-black leading-tight">
                          Celebrating creative excellence 2026
                        </h4>
                        <p className="text-[11px] text-neutral-600 font-medium mt-0.5">
                          ASCI Certified Commercial Standards
                        </p>
                      </div>
                    </div>

                    {/* Bottom Item: Smartphone Hand Card + Excellence in Modern Creation */}
                    <div className="rounded-3xl bg-white border border-[#dfd5c4] p-5 shadow-sm flex items-center gap-4 flex-1">
                      <img 
                        src="/images/phone-creation.jpg" 
                        alt="Phone Creation" 
                        className="w-24 h-32 rounded-2xl object-cover border border-[#e3d7c8] shadow-sm flex-shrink-0"
                      />
                      <div className="flex flex-col justify-between h-full space-y-2">
                        <div>
                          <h4 className="font-display font-black text-sm sm:text-base text-black uppercase leading-tight">
                            EXCELLENCE IN MODERN CONTENT CREATION
                          </h4>
                          <p className="text-[11px] text-neutral-600 font-medium mt-1 leading-snug">
                            Scale generative campaigns with certified Indian directors.
                          </p>
                        </div>
                        <button
                          onClick={() => {
                            const el = document.getElementById('marketplace-creators');
                            if (el) el.scrollIntoView({ behavior: 'smooth' });
                          }}
                          className="inline-flex items-center gap-1 text-xs font-bold text-black hover:text-[#ff5522] transition-colors"
                        >
                          <span>Build Audience</span>
                          <span className="text-base font-bold">↳</span>
                        </button>
                      </div>
                    </div>

                  </div>

                </div>
              </div>

              {/* MARKETPLACE SEARCH & CREATORS SECTION */}
              <div id="marketplace-creators" className="pt-8 space-y-6">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-[#dfd5c4] pb-4">
                  <div>
                    <h2 className="font-display font-extrabold text-2xl sm:text-3xl text-neutral-900 tracking-tight">
                      Curated AI Creators & Recipe Portfolios
                    </h2>
                    <p className="text-xs sm:text-sm text-neutral-600 font-medium">
                      Filter by ComfyUI workflows, custom LoRAs, turnaround SLAs, and Clear-to-Air™ commercial safety.
                    </p>
                  </div>
                  <button
                    onClick={() => setActiveTab('brief-builder')}
                    className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-black text-white text-xs font-bold hover:bg-neutral-800 transition-colors shadow-sm"
                  >
                    <Zap className="w-3.5 h-3.5 text-[#ff5522]" />
                    <span>Create Brief Wizard</span>
                  </button>
                </div>

                {/* Smart Filter Bar */}
                <SmartFilterBar 
                  searchQuery={searchQuery}
                  setSearchQuery={setSearchQuery}
                  selectedTools={selectedTools}
                  setSelectedTools={setSelectedTools}
                  selectedSpecialization={selectedSpecialization}
                  setSelectedSpecialization={setSelectedSpecialization}
                  selectedVerification={selectedVerification}
                  setSelectedVerification={setSelectedVerification}
                  selectedTurnaround={selectedTurnaround}
                  setSelectedTurnaround={setSelectedTurnaround}
                  clearToAirOnly={clearToAirOnly}
                  setClearToAirOnly={setClearToAirOnly}
                  totalResultsCount={filteredCreators.length}
                  onResetFilters={handleResetFilters}
                />

                {/* Creators Grid OR Smart Empty State */}
                {filteredCreators.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-2">
                    {filteredCreators.map((creator) => (
                      <CreatorCard 
                        key={creator.id}
                        creator={creator}
                        onSelectCreator={handleSelectCreator}
                        onInspectRecipe={handleInspectRecipe}
                        isSaved={savedCreatorIds.includes(creator.id)}
                        onToggleSave={handleToggleSave}
                        onBookCreator={(c) => handleOpenBooking(c)}
                      />
                    ))}
                  </div>
                ) : (
                  <SmartEmptyState 
                    selectedTools={selectedTools}
                    selectedSpecialization={selectedSpecialization}
                    onApplyAlternativeTool={handleApplyAlternativeTool}
                    onResetFilters={handleResetFilters}
                    onSelectCreator={handleSelectCreator}
                  />
                )}

                {/* Where to Navigate Next */}
                <WhereToNavigateNext 
                  currentView="explore"
                  onNavigate={(tab) => {
                    setActiveTab(tab);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  onInspectRecipe={() => {
                    const aarav = INITIAL_CREATORS[0];
                    const recipe = aarav?.portfolio?.[0]?.recipe || aarav?.featuredRecipe;
                    handleInspectRecipe(recipe, aarav);
                  }}
                />
              </div>

            </div>
          )}

          {/* VIEW 2: CREATOR PROFILE & RECIPE-FIRST PORTFOLIO */}
          {activeTab === 'profile' && (
            <CreatorProfileView 
              creator={selectedCreator}
              onBack={() => setActiveTab('explore')}
              onInspectRecipe={handleInspectRecipe}
              onBookCreator={(c) => handleOpenBooking(c)}
              isSaved={savedCreatorIds.includes(selectedCreator?.id)}
              onToggleSave={handleToggleSave}
              onNavigate={(tab) => {
                setActiveTab(tab);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            />
          )}

          {/* VIEW 3: AI-ASSISTED BRIEF BUILDER */}
          {activeTab === 'brief-builder' && (
            <BriefBuilderView 
              userRole={userRole}
              onPublishBrief={handlePublishBrief}
              preloadedRecipe={preloadedRecipeForBrief}
              onNavigate={(tab) => {
                setActiveTab(tab);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            />
          )}

          {/* VIEW 4: BRIEFS BOARD */}
          {activeTab === 'briefs' && (
            <BriefsBoardView 
              briefs={briefs}
              userRole={userRole}
              onOpenBriefBuilder={() => setActiveTab('brief-builder')}
              onOpenDeliveryStudio={(brief) => setActiveTab('delivery-room')}
              onNavigate={(tab) => {
                setActiveTab(tab);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            />
          )}

          {/* VIEW 5: THE SEED BOARD DELIVERY & REVISION STUDIO */}
          {activeTab === 'delivery-room' && (
            <DeliveryStudioView 
              userRole={userRole}
              deliveryProjects={deliveryProjects}
              onUpdateProjects={(updated) => setDeliveryProjects(updated)}
              onNavigate={(tab) => {
                setActiveTab(tab);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            />
          )}

        </main>

        {/* INSPECTABLE PRODUCTION RECIPE MODAL */}
        <RecipeModal 
          recipe={inspectingRecipe}
          creator={inspectingCreator}
          isOpen={!!inspectingRecipe}
          onClose={() => setInspectingRecipe(null)}
          onForkRecipe={handleForkRecipe}
          onBookCreator={(creator, recipe) => handleOpenBooking(creator, recipe)}
        />

        {/* BOOK CREATOR DIRECT MODAL */}
        <BookCreatorModal 
          creator={bookingCreator}
          recipe={inspectingRecipe}
          isOpen={!!bookingCreator}
          onClose={() => setBookingCreator(null)}
          onBookingSuccess={() => {
            showToast(`Commission sent to ${bookingCreator?.name} with ₹ INR escrow lock!`, 'success');
            setActiveTab('delivery-room');
          }}
        />

        {/* CREATOR SIGN-IN & PERSONA SWITCHER MODAL */}
        <CreatorLoginModal 
          isOpen={isCreatorLoginOpen}
          onClose={() => setIsCreatorLoginOpen(false)}
          loggedInCreator={loggedInCreator}
          onLoginCreator={handleLoginCreator}
          onLogoutCreator={handleLogoutCreator}
          onRegisterCreator={handleRegisterCreator}
        />

        {/* ACCESS MANAGEMENT & RBAC GOVERNANCE MODAL */}
        <AccessManagementModal 
          isOpen={isAccessModalOpen}
          onClose={() => setIsAccessModalOpen(false)}
          userRole={userRole}
          onSetUserRole={handleSetUserRole}
          loggedInCreator={loggedInCreator}
        />

        {/* Footer */}
        <footer className="mt-auto border-t border-[#dfd5c4] bg-[#eae0d2]/70 py-6 text-xs text-neutral-600 px-5 sm:px-10">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-neutral-700">
              <span className="font-display font-extrabold text-neutral-900 text-sm">BRIVIO.</span>
              <span className="font-medium">• The AI-Native Creative Marketplace for India 🇮🇳</span>
            </div>

            <div className="flex items-center gap-3 text-neutral-600 flex-wrap">
              <span className="flex items-center gap-1 font-bold text-black">
                <ShieldCheck className="w-3.5 h-3.5 text-[#ff5522]" />
                ASCI Synthetic Media Disclosure
              </span>
              <span>•</span>
              <span className="font-mono">MeitY C2PA Provenance</span>
              <span>•</span>
              <span className="font-bold text-neutral-800">Smart Escrow (₹ INR)</span>
            </div>
          </div>
        </footer>

      </div>
    </div>
  );
}

export default App;
