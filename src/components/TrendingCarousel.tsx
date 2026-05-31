import { motion } from 'framer-motion';
import { Moodboard } from '../types/moodboard';
import { useState } from 'react';

interface TrendingCarouselProps {
  moodboards: Moodboard[];
  onCardClick?: (moodboard: Moodboard) => void;
}

export default function TrendingCarousel({ moodboards, onCardClick }: TrendingCarouselProps) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <div className="relative">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-light text-white">Trending Now</h2>
        <button className="text-sm text-neutral-400 hover:text-white transition-colors font-light">
          View All
        </button>
      </div>

      <div className="overflow-x-auto scrollbar-hide -mx-6 px-6">
        <div className="flex gap-4 pb-4">
          {moodboards.map((moodboard, index) => (
            <motion.div
              key={moodboard.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              onHoverStart={() => setHoveredIndex(index)}
              onHoverEnd={() => setHoveredIndex(null)}
              onClick={() => onCardClick?.(moodboard)}
              className="flex-shrink-0 w-64 cursor-pointer group"
            >
              <div className="relative overflow-hidden rounded-2xl bg-neutral-900 border border-neutral-800 hover:border-neutral-700 transition-all duration-300">
                <div className="relative aspect-[3/4] overflow-hidden">
                  <motion.img
                    src={moodboard.imageUrl}
                    alt={moodboard.title}
                    className="w-full h-full object-cover"
                    animate={{
                      scale: hoveredIndex === index ? 1.1 : 1,
                    }}
                    transition={{ duration: 0.6 }}
                  />
                  <div
                    className={`absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent transition-opacity duration-300 ${
                      hoveredIndex === index ? 'opacity-100' : 'opacity-0'
                    }`}
                  />
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <motion.div
                      initial={false}
                      animate={{
                        y: hoveredIndex === index ? 0 : 20,
                        opacity: hoveredIndex === index ? 1 : 0,
                      }}
                      transition={{ duration: 0.3 }}
                    >
                      <span className="inline-block px-3 py-1 bg-white/10 backdrop-blur-xl rounded-full text-xs text-white font-light border border-white/20 mb-2">
                        {moodboard.aesthetic}
                      </span>
                      <h3 className="text-white text-sm font-light mb-1">
                        {moodboard.title}
                      </h3>
                      <p className="text-neutral-300 text-xs font-light line-clamp-2">
                        {moodboard.vibe}
                      </p>
                    </motion.div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
