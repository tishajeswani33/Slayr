import { motion } from 'framer-motion';
import { useState } from 'react';

interface FeedHeroCardProps {
  title: string;
  subtitle: string;
  imageUrl: string;
  aesthetic: string;
  vibe: string;
  onExplore?: () => void;
}

export default function FeedHeroCard({
  title,
  subtitle,
  imageUrl,
  aesthetic,
  vibe,
  onExplore,
}: FeedHeroCardProps) {
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="relative w-full rounded-3xl overflow-hidden bg-neutral-900 border border-neutral-800 group cursor-pointer"
      onClick={onExplore}
    >
      <div className="relative aspect-[16/9] md:aspect-[21/9] overflow-hidden">
        {!imageLoaded && <div className="absolute inset-0 animate-pulse bg-neutral-800" />}
        <motion.img
          src={imageUrl}
          alt={title}
          onLoad={() => setImageLoaded(true)}
          className={`w-full h-full object-cover transition-all duration-700 ${
            imageLoaded ? 'opacity-100' : 'opacity-0'
          }`}
          whileHover={{ scale: 1.03 }}
          transition={{ duration: 0.8 }}
        />

        {/* Cinematic gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-transparent to-transparent" />

        {/* Content */}
        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
          <div className="flex items-center gap-2 mb-3">
            <span className="px-3 py-1 bg-white/10 backdrop-blur-xl rounded-full text-xs text-white font-light border border-white/20">
              {aesthetic}
            </span>
            <span className="text-neutral-400 text-xs font-light">{vibe}</span>
          </div>

          <h2 className="text-2xl md:text-4xl font-light text-white tracking-tight mb-2 max-w-xl">
            {title}
          </h2>
          <p className="text-neutral-300 font-light text-sm md:text-base mb-4 max-w-lg line-clamp-2">
            {subtitle}
          </p>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={(e) => {
              e.stopPropagation();
              onExplore?.();
            }}
            className="px-6 py-2.5 bg-white text-black rounded-full text-sm font-light hover:bg-neutral-200 transition-colors"
          >
            Explore Collection
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}
