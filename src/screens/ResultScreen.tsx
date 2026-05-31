import { motion } from 'framer-motion';
import { useOutfitStore } from '../store/useOutfitStore';
import ScoreCard from '../components/ScoreCard';
import AestheticBadge from '../components/AestheticBadge';
import ColorPalette from '../components/ColorPalette';
import ClothingItems from '../components/ClothingItems';
import RecommendationCard from '../components/RecommendationCard';
import AccessorySuggestions from '../components/AccessorySuggestions';
import FashionTags from '../components/FashionTags';

interface ResultScreenProps {
  onReset: () => void;
}

export default function ResultScreen({ onReset }: ResultScreenProps) {
  const { currentAnalysis } = useOutfitStore();

  if (!currentAnalysis) {
    return null;
  }

  const handleSaveMoodboard = () => {
    alert('Moodboard saved! (Feature coming soon)');
  };

  return (
    <div className="min-h-screen bg-black">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-black/80 backdrop-blur-xl border-b border-neutral-900">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <motion.button
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            onClick={onReset}
            className="flex items-center gap-2 text-neutral-400 hover:text-white transition-colors font-light"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M15 19l-7-7 7-7"
              />
            </svg>
            <span className="text-sm">New Analysis</span>
          </motion.button>
          <motion.h1
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-xl font-light text-white tracking-tight"
          >
            slayr
          </motion.h1>
          <div className="w-24" /> {/* Spacer for balance */}
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Hero Image */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-12 rounded-3xl overflow-hidden bg-neutral-900 border border-neutral-800"
        >
          <div className="aspect-[16/9] relative">
            <img
              src={currentAnalysis.imageUrl}
              alt="Outfit"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
          </div>
        </motion.div>

        {/* Score and Aesthetic Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <ScoreCard score={currentAnalysis.score} />
          <AestheticBadge
            aesthetic={currentAnalysis.aesthetic}
            vibe={currentAnalysis.vibe}
          />
        </div>

        {/* Clothing Items and Color Palette */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <ClothingItems items={currentAnalysis.clothingItems} />
          <ColorPalette colors={currentAnalysis.colorPalette} />
        </div>

        {/* Recommendations */}
        <div className="mb-6">
          <RecommendationCard recommendations={currentAnalysis.recommendations} />
        </div>

        {/* Accessories and Tags */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-12">
          <AccessorySuggestions accessories={currentAnalysis.suggestedAccessories} />
          <FashionTags tags={currentAnalysis.fashionTags} />
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4">
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            onClick={handleSaveMoodboard}
            className="flex-1 bg-white text-black py-4 rounded-full font-light text-lg hover:bg-neutral-200 transition-colors flex items-center justify-center gap-2"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"
              />
            </svg>
            Save to Moodboard
          </motion.button>
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.55 }}
            onClick={() => {
              if (navigator.share) {
                navigator.share({
                  title: 'My Outfit Analysis',
                  text: `Outfit Score: ${currentAnalysis.score}/100 - ${currentAnalysis.aesthetic}`,
                  url: window.location.href,
                });
              }
            }}
            className="flex-1 bg-neutral-900 border border-neutral-800 text-white py-4 rounded-full font-light text-lg hover:bg-neutral-800 transition-colors flex items-center justify-center gap-2"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"
              />
            </svg>
            Share
          </motion.button>
        </div>
      </div>

      {/* Footer */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.6 }}
        className="border-t border-neutral-900 py-8 mt-12"
      >
        <div className="max-w-7xl mx-auto px-6 text-center">
          <p className="text-xs text-neutral-600 font-light">
            Powered by Google Gemini Vision AI
          </p>
        </div>
      </motion.div>
    </div>
  );
}
