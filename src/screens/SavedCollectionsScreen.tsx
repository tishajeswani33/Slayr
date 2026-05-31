import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useMoodboardStore } from '../store/useMoodboardStore';
import { getMoodboardById } from '../services/moodboardService';
import { Moodboard } from '../types/moodboard';
import MoodboardCard from '../components/MoodboardCard';

interface SavedCollectionsScreenProps {
  onMoodboardClick: (moodboard: Moodboard) => void;
  onClose: () => void;
}

export default function SavedCollectionsScreen({
  onMoodboardClick,
  onClose,
}: SavedCollectionsScreenProps) {
  const { savedMoodboards, collections } = useMoodboardStore();
  const [moodboards, setMoodboards] = useState<Moodboard[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadSavedMoodboards();
  }, [savedMoodboards]);

  const loadSavedMoodboards = async () => {
    setLoading(true);
    try {
      const promises = savedMoodboards.map((id) => getMoodboardById(id));
      const results = await Promise.all(promises);
      setMoodboards(results.filter((m) => m !== null) as Moodboard[]);
    } catch (error) {
      console.error('Error loading saved moodboards:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black z-50 overflow-y-auto">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-black/80 backdrop-blur-xl border-b border-neutral-900">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <motion.button
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              onClick={onClose}
              className="flex items-center gap-2 text-neutral-400 hover:text-white transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 19l-7-7 7-7" />
              </svg>
              <span className="text-sm font-light">Back</span>
            </motion.button>
            <h1 className="text-xl font-light text-white tracking-tight">Saved</h1>
          </div>

          <button className="px-6 py-2.5 rounded-full bg-white text-black text-sm font-light hover:bg-neutral-200 transition-colors">
            Create Collection
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Collections */}
        {collections.length > 0 && (
          <div className="mb-16">
            <h2 className="text-2xl font-light text-white mb-6">My Collections</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {collections.map((collection) => (
                <motion.div
                  key={collection.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-neutral-900 rounded-3xl p-6 border border-neutral-800 hover:border-neutral-700 transition-all duration-300 cursor-pointer group"
                >
                  <div className="aspect-video bg-neutral-800 rounded-2xl mb-4 overflow-hidden">
                    <div className="w-full h-full flex items-center justify-center text-neutral-600">
                      <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={1.5}
                          d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                        />
                      </svg>
                    </div>
                  </div>
                  <h3 className="text-lg font-light text-white mb-1">{collection.name}</h3>
                  <p className="text-sm text-neutral-500 font-light">
                    {collection.moodboards.length} items
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {/* Saved Moodboards */}
        <div>
          <h2 className="text-2xl font-light text-white mb-6">
            All Saved Moodboards
          </h2>

          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {[...Array(8)].map((_, i) => (
                <div
                  key={i}
                  className="aspect-[3/4] bg-neutral-900 rounded-3xl animate-pulse"
                />
              ))}
            </div>
          ) : moodboards.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {moodboards.map((moodboard, index) => (
                <MoodboardCard
                  key={moodboard.id}
                  moodboard={moodboard}
                  index={index}
                  onClick={() => onMoodboardClick(moodboard)}
                />
              ))}
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-20"
            >
              <div className="w-20 h-20 rounded-full bg-neutral-900 flex items-center justify-center mx-auto mb-6">
                <svg className="w-10 h-10 text-neutral-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"
                  />
                </svg>
              </div>
              <h3 className="text-2xl font-light text-white mb-3">No saved moodboards yet</h3>
              <p className="text-neutral-500 font-light mb-8">
                Start saving moodboards to build your collection
              </p>
              <button
                onClick={onClose}
                className="px-8 py-3 bg-white text-black rounded-full font-light hover:bg-neutral-200 transition-colors"
              >
                Explore Moodboards
              </button>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}
