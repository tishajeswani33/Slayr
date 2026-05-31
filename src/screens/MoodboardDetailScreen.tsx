import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Moodboard } from '../types/moodboard';
import { getMoodboardById, getMoodboards } from '../services/moodboardService';
import { useMoodboardStore } from '../store/useMoodboardStore';

interface MoodboardDetailScreenProps {
  moodboardId: string;
  onClose: () => void;
  onMoodboardClick: (moodboard: Moodboard) => void;
}

export default function MoodboardDetailScreen({
  moodboardId,
  onClose,
  onMoodboardClick,
}: MoodboardDetailScreenProps) {
  const [moodboard, setMoodboard] = useState<Moodboard | null>(null);
  const [related, setRelated] = useState<Moodboard[]>([]);
  const [imageLoaded, setImageLoaded] = useState(false);
  const { isSaved, saveMoodboard, unsaveMoodboard } = useMoodboardStore();
  const saved = moodboard ? isSaved(moodboard.id) : false;

  useEffect(() => {
    loadMoodboard();
  }, [moodboardId]);

  const loadMoodboard = async () => {
    const data = await getMoodboardById(moodboardId);
    if (data) {
      setMoodboard(data);
      // Load related moodboards from same aesthetic
      const relatedData = await getMoodboards(data.aesthetic, 4);
      setRelated(relatedData.filter((m) => m.id !== data.id).slice(0, 3));
    }
  };

  const handleSave = () => {
    if (moodboard) {
      if (saved) {
        unsaveMoodboard(moodboard.id);
      } else {
        saveMoodboard(moodboard.id);
      }
    }
  };

  if (!moodboard) {
    return (
      <div className="fixed inset-0 bg-black flex items-center justify-center z-50">
        <div className="animate-pulse flex gap-2">
          {[0, 1, 2, 3].map((i) => (
            <div key={i} className="w-2 h-2 bg-white rounded-full" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black z-50 overflow-y-auto"
      >
        {/* Header */}
        <div className="sticky top-0 z-10 bg-black/80 backdrop-blur-xl border-b border-neutral-900">
          <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
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

            <motion.button
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleSave}
              className={`px-6 py-2.5 rounded-full text-sm font-light transition-all duration-300 ${
                saved
                  ? 'bg-white text-black'
                  : 'bg-neutral-900 text-white border border-neutral-800 hover:border-neutral-700'
              }`}
            >
              {saved ? 'Saved' : 'Save'}
            </motion.button>
          </div>
        </div>

        {/* Content */}
        <div className="max-w-5xl mx-auto px-6 py-12">
          {/* Hero Image */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-12"
          >
            <div className="relative overflow-hidden rounded-3xl bg-neutral-900">
              <div className="aspect-[16/9] relative">
                {!imageLoaded && (
                  <div className="absolute inset-0 animate-pulse bg-neutral-800" />
                )}
                <img
                  src={moodboard.imageUrl}
                  alt={moodboard.title}
                  onLoad={() => setImageLoaded(true)}
                  className={`w-full h-full object-cover transition-opacity duration-700 ${
                    imageLoaded ? 'opacity-100' : 'opacity-0'
                  }`}
                />
              </div>
            </div>
          </motion.div>

          {/* Info Section */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 mb-12">
            <div className="lg:col-span-2">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
              >
                <div className="flex items-center gap-3 mb-4">
                  <span className="px-4 py-1.5 bg-white/10 backdrop-blur-xl rounded-full text-sm text-white font-light border border-white/20">
                    {moodboard.aesthetic}
                  </span>
                  <div className="flex items-center gap-2 text-neutral-500 text-sm">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"
                      />
                    </svg>
                    <span className="font-light">{moodboard.savedCount.toLocaleString()} saves</span>
                  </div>
                </div>
                <h1 className="text-4xl font-light text-white mb-4 tracking-tight">
                  {moodboard.title}
                </h1>
                <p className="text-neutral-400 font-light text-lg leading-relaxed">
                  {moodboard.vibe}
                </p>
              </motion.div>

              {/* Tags */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="mt-8"
              >
                <h3 className="text-sm text-neutral-500 font-light tracking-widest uppercase mb-4">
                  Tags
                </h3>
                <div className="flex flex-wrap gap-2">
                  {moodboard.tags.map((tag, i) => (
                    <span
                      key={i}
                      className="px-4 py-1.5 bg-neutral-900 border border-neutral-800 rounded-full text-sm text-neutral-400 font-light"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </motion.div>
            </div>

            {/* Color Palette */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="bg-neutral-900 rounded-3xl p-8 border border-neutral-800 h-fit"
            >
              <h3 className="text-sm text-neutral-500 font-light tracking-widest uppercase mb-6">
                Color Palette
              </h3>
              <div className="space-y-4">
                {moodboard.colorPalette.map((color, i) => (
                  <div key={i} className="flex items-center gap-4">
                    <div
                      className="w-12 h-12 rounded-full border-2 border-neutral-800 flex-shrink-0"
                      style={{ backgroundColor: color }}
                    />
                    <span className="text-sm text-neutral-400 font-mono">{color}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Related Aesthetics */}
          {moodboard.relatedAesthetics && moodboard.relatedAesthetics.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="mb-12"
            >
              <h3 className="text-sm text-neutral-500 font-light tracking-widest uppercase mb-4">
                Related Aesthetics
              </h3>
              <div className="flex flex-wrap gap-3">
                {moodboard.relatedAesthetics.map((aesthetic, i) => (
                  <button
                    key={i}
                    className="px-5 py-2.5 bg-neutral-900 border border-neutral-800 hover:border-neutral-700 rounded-full text-sm text-neutral-300 font-light transition-colors"
                  >
                    {aesthetic}
                  </button>
                ))}
              </div>
            </motion.div>
          )}

          {/* Related Moodboards */}
          {related.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <h3 className="text-2xl font-light text-white mb-6">More Like This</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {related.map((relatedMoodboard) => (
                  <div
                    key={relatedMoodboard.id}
                    onClick={() => onMoodboardClick(relatedMoodboard)}
                    className="cursor-pointer group"
                  >
                    <div className="relative overflow-hidden rounded-2xl bg-neutral-900 border border-neutral-800 hover:border-neutral-700 transition-all duration-300">
                      <div className="aspect-[3/4] relative overflow-hidden">
                        <img
                          src={relatedMoodboard.imageUrl}
                          alt={relatedMoodboard.title}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        <div className="absolute bottom-0 left-0 right-0 p-4 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                          <span className="inline-block px-3 py-1 bg-white/10 backdrop-blur-xl rounded-full text-xs text-white font-light border border-white/20 mb-2">
                            {relatedMoodboard.aesthetic}
                          </span>
                          <h4 className="text-white text-sm font-light">
                            {relatedMoodboard.title}
                          </h4>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
