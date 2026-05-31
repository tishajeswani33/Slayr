import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import UploadScreen from './screens/UploadScreen';
import ResultScreen from './screens/ResultScreen';
import AnalyzingScreen from './components/AnalyzingScreen';
import ExploreScreen from './screens/ExploreScreen';
import MoodboardDetailScreen from './screens/MoodboardDetailScreen';
import SavedCollectionsScreen from './screens/SavedCollectionsScreen';
import FeedScreen from './screens/FeedScreen';
import ProfileScreen from './screens/ProfileScreen';
import AIStylistScreen from './screens/AIStylistScreen';
import LoginScreen from './screens/LoginScreen';
import DiscoverScreen from './screens/DiscoverScreen';
import TrendRadarScreen from './screens/TrendRadarScreen';
import GenZFeedScreen from './screens/GenZFeedScreen';
import StyleDNAReportScreen from './screens/StyleDNAReportScreen';
import TrendingCreatorsScreen from './screens/TrendingCreatorsScreen';
import { useOutfitStore } from './store/useOutfitStore';
import { useAuthStore } from './store/useAuthStore';
import { Moodboard } from './types/moodboard';
import { LoginFormData } from './validation/authSchemas';

type Screen = 'feed' | 'explore' | 'upload' | 'analyzing' | 'result' | 'moodboard' | 'saved' | 'profile' | 'ai-stylist' | 'discover' | 'trend-radar' | 'genz-feed' | 'style-dna' | 'trending-creators';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('feed');
  const [selectedMoodboard, setSelectedMoodboard] = useState<Moodboard | null>(null);
  const { isAnalyzing, error, clearAnalysis } = useOutfitStore();
  const { isAuthenticated, login } = useAuthStore();

  const handleLogin = (data: LoginFormData) => {
    login(data.email, 'User'); // In production, get from Firebase
    setCurrentScreen('feed');
  };

  const handleAnalysisComplete = () => {
    setCurrentScreen('result');
  };

  const handleReset = () => {
    clearAnalysis();
    setCurrentScreen('explore');
  };

  const handleMoodboardClick = (moodboard: Moodboard) => {
    setSelectedMoodboard(moodboard);
    setCurrentScreen('moodboard');
  };

  const handleBackToExplore = () => {
    setCurrentScreen('explore');
    setSelectedMoodboard(null);
  };

  // Auto-transition to analyzing screen when analysis starts
  if (isAnalyzing && currentScreen !== 'analyzing') {
    setCurrentScreen('analyzing');
  }

  // Show login if not authenticated
  if (!isAuthenticated) {
    return <LoginScreen onLogin={handleLogin} onSignupClick={() => {}} />;
  }

  return (
    <div className="relative">
      <AnimatePresence mode="wait">
        {currentScreen === 'feed' && (
          <FeedScreen
            key="feed"
            onProfileClick={() => setCurrentScreen('profile')}
            onNotificationsClick={() => {}}
            onAIStylistClick={() => setCurrentScreen('ai-stylist')}
            onDiscoverClick={() => setCurrentScreen('discover')}
            onTrendRadarClick={() => setCurrentScreen('trend-radar')}
            onGenZFeedClick={() => setCurrentScreen('genz-feed')}
            onStyleDNAClick={() => setCurrentScreen('style-dna')}
            onTrendingCreatorsClick={() => setCurrentScreen('trending-creators')}
          />
        )}
        {currentScreen === 'profile' && (
          <ProfileScreen key="profile" onClose={() => setCurrentScreen('feed')} />
        )}
        {currentScreen === 'ai-stylist' && (
          <AIStylistScreen key="ai-stylist" onClose={() => setCurrentScreen('feed')} />
        )}
        {currentScreen === 'discover' && (
          <DiscoverScreen key="discover" onClose={() => setCurrentScreen('feed')} />
        )}
        {currentScreen === 'trend-radar' && (
          <TrendRadarScreen key="trend-radar" onClose={() => setCurrentScreen('feed')} />
        )}
        {currentScreen === 'genz-feed' && (
          <GenZFeedScreen key="genz-feed" onClose={() => setCurrentScreen('feed')} />
        )}
        {currentScreen === 'style-dna' && (
          <StyleDNAReportScreen key="style-dna" onClose={() => setCurrentScreen('feed')} />
        )}
        {currentScreen === 'trending-creators' && (
          <TrendingCreatorsScreen key="trending-creators" onClose={() => setCurrentScreen('feed')} />
        )}
        {currentScreen === 'explore' && (
          <ExploreScreen
            key="explore"
            onMoodboardClick={handleMoodboardClick}
            onSavedClick={() => setCurrentScreen('saved')}
          />
        )}
        {currentScreen === 'upload' && (
          <UploadScreen key="upload" onAnalysisComplete={handleAnalysisComplete} />
        )}
        {currentScreen === 'analyzing' && <AnalyzingScreen key="analyzing" />}
        {currentScreen === 'result' && <ResultScreen key="result" onReset={handleReset} />}
        {currentScreen === 'moodboard' && selectedMoodboard && (
          <MoodboardDetailScreen
            key="moodboard"
            moodboardId={selectedMoodboard.id}
            onClose={handleBackToExplore}
            onMoodboardClick={handleMoodboardClick}
          />
        )}
        {currentScreen === 'saved' && (
          <SavedCollectionsScreen
            key="saved"
            onMoodboardClick={handleMoodboardClick}
            onClose={handleBackToExplore}
          />
        )}
      </AnimatePresence>

      {/* Floating Action Button - Upload */}
      {(currentScreen === 'explore' || currentScreen === 'feed') && (
        <motion.button
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setCurrentScreen('upload')}
          className="fixed bottom-8 right-8 w-16 h-16 bg-white text-black rounded-full shadow-2xl flex items-center justify-center z-40 hover:shadow-white/20 transition-shadow"
        >
          <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
        </motion.button>
      )}

      {/* Bottom Navigation */}
      {(currentScreen === 'feed' || currentScreen === 'explore') && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="fixed bottom-0 left-0 right-0 z-30 bg-black/80 backdrop-blur-xl border-t border-neutral-900"
        >
          <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-around">
            <button
              onClick={() => setCurrentScreen('feed')}
              className={`flex flex-col items-center gap-1 transition-colors ${
                currentScreen === 'feed' ? 'text-white' : 'text-neutral-500'
              }`}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
              <span className="text-xs font-light">Home</span>
            </button>
            <button
              onClick={() => setCurrentScreen('explore')}
              className={`flex flex-col items-center gap-1 transition-colors ${
                currentScreen === 'explore' ? 'text-white' : 'text-neutral-500'
              }`}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <span className="text-xs font-light">Explore</span>
            </button>
            <div className="w-16" /> {/* Spacer for FAB */}
            <button
              onClick={() => setCurrentScreen('saved')}
              className="flex flex-col items-center gap-1 text-neutral-500 hover:text-white transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
              </svg>
              <span className="text-xs font-light">Saved</span>
            </button>
            <button
              onClick={() => setCurrentScreen('profile')}
              className="flex flex-col items-center gap-1 text-neutral-500 hover:text-white transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              <span className="text-xs font-light">Profile</span>
            </button>
          </div>
        </motion.div>
      )}

      {/* Error Toast */}
      {error && (
        <div className="fixed top-6 right-6 bg-red-500/10 border border-red-500/30 backdrop-blur-xl text-red-400 px-6 py-4 rounded-2xl max-w-md z-50">
          <div className="flex items-start gap-3">
            <svg
              className="w-5 h-5 flex-shrink-0 mt-0.5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <div className="flex-1">
              <p className="text-sm font-medium">Analysis Error</p>
              <p className="text-xs text-red-400/80 mt-1">{error}</p>
            </div>
            <button
              onClick={() => useOutfitStore.getState().setError(null)}
              className="text-red-400 hover:text-red-300"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
