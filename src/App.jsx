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
import { ApiKeysModal } from './components/ApiKeysModal';

import { INITIAL_CREATORS } from './data/mockData';
import { 
  getStoredBriefs, 
  saveBriefToStorage, 
  getStoredDeliveryProjects, 
  saveDeliveryProjectsToStorage,
  getStoredUserRole, 
  saveUserRoleToStorage, 
  getSavedCreators, 
  toggleSaveCreator 
} from './utils/storage';

import { 
  fetchCreators, 
  fetchBriefs, 
  fetchDeliveryProjects, 
  createBrief, 
  getApiKeysStatus 
} from './utils/api';

import { Sparkles, ShieldCheck, Zap, ArrowRight, Film, CheckCircle2, Award, Key } from 'lucide-react';

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
  const [isKeysModalOpen, setIsKeysModalOpen] = useState(false);
  const [hasApiKey, setHasApiKey] = useState(false);

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

      const keyStatus = await getApiKeysStatus();
      setHasApiKey(Boolean(keyStatus.hasGeminiKey || keyStatus.hasOpenaiKey));
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
    // 1. Save to local storage
    const updatedLocal = saveBriefToStorage(newBrief);
    if (updatedLocal) setBriefs(updatedLocal);

    // 2. Persist to Express backend
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
    // 1. Search query
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

    // 2. Tools
    if (selectedTools.length > 0) {
      const hasTool = selectedTools.some(tool => creator.primaryTools.includes(tool));
      if (!hasTool) return false;
    }

    // 3. Specialization
    if (selectedSpecialization !== 'All') {
      if (!creator.specializations.includes(selectedSpecialization)) return false;
    }

    // 4. Verification
    if (selectedVerification !== 'All') {
      if (selectedVerification === 'Commercial Safety Certified' && !creator.clearToAirCertified) {
        return false;
      }
      if (selectedVerification !== 'Commercial Safety Certified' && creator.verificationTier !== selectedVerification) {
        return false;
      }
    }

    // 5. Turnaround
    if (selectedTurnaround !== 'All') {
      if (creator.turnaround !== selectedTurnaround) return false;
    }

    // 6. Clear-to-Air Only
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
    <div className="min-h-screen bg-[#09090b] text-zinc-100 flex flex-col font-sans selection:bg-orange-500/30 selection:text-orange-200">
      
      {/* Top Navbar */}
      <Navbar 
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        userRole={userRole}
        setUserRole={handleSetUserRole}
        onOpenBriefModal={() => setActiveTab('brief-builder')}
        onOpenKeysModal={() => setIsKeysModalOpen(true)}
        hasApiKey={hasApiKey}
      />

      {/* Dynamic Role Banner */}
      <RoleBanner 
        userRole={userRole}
        setUserRole={handleSetUserRole}
        onActionClick={() => setActiveTab(userRole === 'brand' ? 'brief-builder' : 'briefs')}
      />

      {/* Toast Notification Floating */}
      {toast && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2.5 px-4 py-3 rounded-2xl bg-zinc-900 border border-orange-500/50 text-white text-xs font-semibold shadow-2xl shadow-orange-500/20 animate-fadeIn">
          <Sparkles className="w-4 h-4 text-orange-400" />
          <span>{toast.message}</span>
        </div>
      )}

      {/* Main Content Viewport */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        
        {/* VIEW 1: EXPLORE CREATORS & DISCOVERY */}
        {activeTab === 'explore' && (
          <div className="space-y-8 animate-fadeIn">
            
            {/* Hero Intro Header with Indian Context */}
            <div className="relative rounded-3xl bg-gradient-to-r from-zinc-950 via-zinc-900 to-zinc-950 border border-zinc-800/80 p-6 sm:p-10 overflow-hidden shadow-2xl">
              <div className="relative z-10 max-w-3xl space-y-4">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/10 text-orange-400 border border-orange-500/20 text-xs font-semibold">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>ASCI Synthetic Media Disclosure & Clear-to-Air™ Protocol</span>
                </div>
                
                <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white leading-tight">
                  Direct the Future with India's <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-amber-300 to-emerald-400">
                    Recipe-First AI Creators
                  </span>
                </h1>

                <p className="text-sm sm:text-base text-zinc-300 max-w-2xl leading-relaxed">
                  Connect with elite Indian generative directors, Bollywood VFX leads, and virtual bridal couture specialists. Inspect real ComfyUI node workflows, custom LoRA consistency indices, and locked seed architectures before commissioning in ₹ INR.
                </p>

                <div className="flex flex-wrap items-center gap-3 pt-2">
                  <button
                    onClick={() => setActiveTab('brief-builder')}
                    className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-orange-500 to-amber-500 hover:brightness-110 text-white font-bold text-xs shadow-lg shadow-orange-500/25 transition-all"
                  >
                    <Zap className="w-4 h-4" />
                    <span>Launch AI Brief Wizard</span>
                  </button>

                  <button
                    onClick={() => setActiveTab('delivery-room')}
                    className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-200 border border-zinc-700 font-bold text-xs transition-colors"
                  >
                    <span>View Seed Studio Milestone Review</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Decorative background glow circle */}
              <div className="absolute -right-20 -bottom-20 w-96 h-96 rounded-full bg-orange-500/10 blur-3xl pointer-events-none" />
              <div className="absolute right-40 -top-20 w-80 h-80 rounded-full bg-emerald-600/10 blur-3xl pointer-events-none" />
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
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
          />
        )}

        {/* VIEW 3: AI-ASSISTED BRIEF BUILDER */}
        {activeTab === 'brief-builder' && (
          <BriefBuilderView 
            onPublishBrief={handlePublishBrief}
            preloadedRecipe={preloadedRecipeForBrief}
          />
        )}

        {/* VIEW 4: BRIEFS BOARD */}
        {activeTab === 'briefs' && (
          <BriefsBoardView 
            briefs={briefs}
            userRole={userRole}
            onOpenBriefBuilder={() => setActiveTab('brief-builder')}
            onOpenDeliveryStudio={(brief) => setActiveTab('delivery-room')}
          />
        )}

        {/* VIEW 5: THE SEED BOARD DELIVERY & REVISION STUDIO */}
        {activeTab === 'delivery-room' && (
          <DeliveryStudioView 
            userRole={userRole}
            deliveryProjects={deliveryProjects}
            onUpdateProjects={(updated) => setDeliveryProjects(updated)}
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

      {/* AI KEYS & BACKEND SETTINGS MODAL */}
      <ApiKeysModal 
        isOpen={isKeysModalOpen}
        onClose={() => setIsKeysModalOpen(false)}
        onKeysUpdated={() => {
          loadBackendData();
          showToast('AI engine settings updated!', 'success');
        }}
      />

      {/* Footer */}
      <footer className="mt-auto border-t border-zinc-800/80 bg-[#09090b] py-8 text-xs text-zinc-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-zinc-400">
            <span className="font-extrabold text-white">SYNAPSE</span>
            <span>• The AI-Native Creative Marketplace for India 🇮🇳</span>
          </div>

          <div className="flex items-center gap-4 text-zinc-400">
            <span className="flex items-center gap-1 text-emerald-400">
              <ShieldCheck className="w-3.5 h-3.5" />
              ASCI Synthetic Media Disclosure
            </span>
            <span>•</span>
            <span className="font-mono">MeitY C2PA Provenance</span>
            <span>•</span>
            <span>Smart Escrow (₹ INR)</span>
          </div>
        </div>
      </footer>

    </div>
  );
}

export default App;
