import { motion } from 'framer-motion';
import { Moodboard } from '../types/moodboard';
import { useMoodboardStore } from '../store/useMoodboardStore';
import { useState } from 'react';

interface MoodboardCardProps {
  moodboard: Moodboard;
  onClick?: () => void;
  index?: number;
}

export default function MoodboardCard({ moodboard, onClick, index = 0 }: MoodboardCardProps) {
  const [imageLoaded, setImageLoaded] = useState(false);
  const { isSaved, saveMoodboard, unsaveMoodboard } = useMoodboardStore();
  const saved = isSaved(moodboard.id);

  const handleSave = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (saved) {
      unsaveMoodboard(moodboard.id);
    } else {
      saveMoodboard(moodboard.id);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.05 }}
      whileHover={{ y: -4 }}
      onClick={onClick}
      className="group cursor-pointer mb-6"
    >
      <div className="relative overflow-hidden rounded-3xl bg-neutral-900 border border-neutral-800 hover:border-neutral-700 transition-all duration-300">
        {/* Image */}
        <div className="relative aspect-[3/4] overflow-hidden bg-neutral-800">
          {!imageLoaded && (
            <div className="absolute inset-0 animate-pulse bg-neutral-800" />
          )}
          <img
            src={moodboard.imageUrl}
            alt={moodboard.title}
            onLoad={() => setImageLoaded(true)}
            className={`w-full h-full object-cover transition-all duration-700 ${
              imageLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-105'
            } group-hover:scale-110`}
          />
          
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          
          {/* Save Button */}
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={handleSave}
            className={`absolute top-4 right-4 w-10 h-10 rounded-full backdrop-blur-xl flex items-center justify-center transition-all duration-300 ${
              saved
                ? 'bg-white/90 text-black'
                : 'bg-black/40 text-white hover:bg-black/60'
            }`}
          >
            <svg
              className="w-5 h-5"
              fill={saved ? 'currentColor' : 'none'}
              stroke="currentColor"
              strokeWidth={2}
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"
              />
            </svg>
          </motion.button>

          {/* Info Overlay */}
          <div className="absolute bottom-0 left-0 right-0 p-6 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
            <div className="flex items-center gap-2 mb-2">
              <span className="px-3 py-1 bg-white/10 backdrop-blur-xl rounded-full text-xs text-white font-light border border-white/20">
                {moodboard.aesthetic}
              </span>
            </div>
            <h3 className="text-white text-lg font-light mb-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              {moodboard.title}
            </h3>
            <p className="text-neutral-300 text-sm font-light opacity-0 group-hover:opacity-100 transition-opacity duration-300 line-clamp-2">
              {moodboard.vibe}
            </p>
          </div>
        </div>

        {/* Bottom Info Bar */}
        <div className="p-4 flex items-center justify-between">
          <div className="flex items-center gap-2 text-neutral-500 text-sm">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"
              />
            </svg>
            <span className="font-light">{moodboard.savedCount.toLocaleString()}</span>
          </div>
          <div className="flex gap-1">
            {moodboard.colorPalette.slice(0, 3).map((color, i) => (
              <div
                key={i}
                className="w-6 h-6 rounded-full border border-neutral-700"
                style={{ backgroundColor: color }}
              />
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
