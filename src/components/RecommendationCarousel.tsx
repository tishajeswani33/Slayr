import { motion } from 'framer-motion';
import { useRef } from 'react';

interface CarouselItem {
  id: string;
  title: string;
  imageUrl: string;
  aesthetic: string;
  popularity: number;
}

interface RecommendationCarouselProps {
  title: string;
  items: CarouselItem[];
  onItemClick?: (id: string) => void;
  onSeeAll?: () => void;
}

export default function RecommendationCarousel({
  title,
  items,
  onItemClick,
  onSeeAll,
}: RecommendationCarouselProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="relative"
    >
      {/* Section Header */}
      <div className="flex items-center justify-between mb-5">
        <h2 className="text-xl font-light text-white tracking-tight">{title}</h2>
        {onSeeAll && (
          <button
            onClick={onSeeAll}
            className="text-sm text-neutral-400 hover:text-white transition-colors font-light"
          >
            See All
          </button>
        )}
      </div>

      {/* Scrollable Cards */}
      <div
        ref={scrollRef}
        className="overflow-x-auto scrollbar-hide -mx-6 px-6"
      >
        <div className="flex gap-4 pb-4" style={{ scrollSnapType: 'x mandatory' }}>
          {items.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: index * 0.06 }}
              onClick={() => onItemClick?.(item.id)}
              className="flex-shrink-0 w-44 cursor-pointer group"
              style={{ scrollSnapAlign: 'start' }}
            >
              <div className="relative overflow-hidden rounded-2xl bg-neutral-900 border border-neutral-800 hover:border-neutral-700 transition-all duration-300">
                {/* Image */}
                <div className="relative aspect-[3/4] overflow-hidden">
                  <img
                    src={item.imageUrl}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>

                {/* Info */}
                <div className="p-3">
                  <span className="inline-block px-2 py-0.5 bg-neutral-800 rounded-full text-[10px] text-neutral-400 font-light border border-neutral-700 mb-1.5">
                    {item.aesthetic}
                  </span>
                  <p className="text-white text-xs font-light line-clamp-1 mb-1">{item.title}</p>
                  <div className="flex items-center gap-1">
                    <div className="flex-1 h-1 bg-neutral-800 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-white/30 rounded-full"
                        style={{ width: `${item.popularity}%` }}
                      />
                    </div>
                    <span className="text-[10px] text-neutral-500 font-light">{item.popularity}%</span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}

          {/* Peek spacer */}
          <div className="flex-shrink-0 w-4" />
        </div>
      </div>
    </motion.div>
  );
}
