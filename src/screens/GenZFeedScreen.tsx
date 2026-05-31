import { useState, useMemo, useCallback } from 'react';
import { motion } from 'framer-motion';
import { generateMassiveGenZDataset } from '../data/genzFashionDataset';

interface GenZFeedScreenProps {
  onClose: () => void;
}

const ITEMS_PER_PAGE = 24;

export default function GenZFeedScreen({ onClose }: GenZFeedScreenProps) {
  const [activeFilter, setActiveFilter] = useState('All');
  const [sortBy, setSortBy] = useState<'trending' | 'newest' | 'popular'>('trending');
  const [savedItems, setSavedItems] = useState<Set<string>>(new Set());
  const [visibleCount, setVisibleCount] = useState(ITEMS_PER_PAGE);
  const [showSort, setShowSort] = useState(false);

  const dataset = useMemo(() => generateMassiveGenZDataset(10000), []);

  const filterOptions = ['All', 'Minimal Luxury', 'Streetwear', 'Clean Girl', 'Coquette', 'Korean Casual'];

  const filteredOutfits = useMemo(() => {
    let outfits = [...dataset];

    if (activeFilter !== 'All') {
      outfits = outfits.filter(o => o.aesthetic === activeFilter);
    }

    switch (sortBy) {
      case 'trending':
        outfits.sort((a, b) => {
          const aViral = a.moodTags.includes('viral') ? 1 : 0;
          const bViral = b.moodTags.includes('viral') ? 1 : 0;
          return bViral - aViral || b.popularityScore - a.popularityScore;
        });
        break;
      case 'popular':
        outfits.sort((a, b) => b.popularityScore - a.popularityScore);
        break;
      case 'newest':
        outfits.reverse();
        break;
    }

    return outfits;
  }, [dataset, activeFilter, sortBy]);

  const toggleSave = useCallback((id: string) => {
    setSavedItems(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }, []);

  // AI explanation based on filter
  const aiExplanation = useMemo(() => {
    const explanations: Record<string, string> = {
      All: 'Curated from 10K+ outfits across every aesthetic — personalized to your vibe.',
      'Minimal Luxury': 'Based on your love for Minimal Luxury — quiet confidence, premium fabrics, effortless elegance.',
      Streetwear: 'Because you gravitate toward Streetwear — bold, urban, unapologetic self-expression.',
      'Clean Girl': 'Your Clean Girl energy is showing — fresh, natural, and effortlessly put together.',
      Coquette: 'Leaning into Coquette — delicate femininity, bows, lace, and romantic silhouettes.',
      'Korean Casual': 'Your Korean Casual picks — layered, relaxed, and endlessly stylish.',
    };
    return explanations[activeFilter] || explanations.All;
  }, [activeFilter]);

  return (
    <div className="fixed inset-0 bg-black z-50 overflow-y-auto">
      {/* Header */}
      <div className="sticky top-0 z-20 bg-black/80 backdrop-blur-xl border-b border-neutral-900">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-4">
              <motion.button
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                onClick={onClose}
                className="text-neutral-400 hover:text-white transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 19l-7-7 7-7" />
                </svg>
              </motion.button>
              <h1 className="text-2xl font-light text-white tracking-tight">For You</h1>
            </div>

            <div className="flex items-center gap-3">
              {/* Sort Dropdown */}
              <div className="relative">
                <button
                  onClick={() => setShowSort(!showSort)}
                  className="px-4 py-2 bg-neutral-900 border border-neutral-800 text-neutral-400 rounded-full text-sm font-light hover:border-neutral-700 transition-colors flex items-center gap-2"
                >
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 4h13M3 8h9m-9 4h6m4 0l4-4m0 0l4 4m-4-4v12" />
                  </svg>
                  {sortBy === 'trending' ? 'Trending' : sortBy === 'popular' ? 'Popular' : 'Newest'}
                </button>
                {showSort && (
                  <motion.div
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="absolute right-0 top-full mt-2 bg-neutral-900 border border-neutral-800 rounded-2xl overflow-hidden z-30 min-w-[140px]"
                  >
                    {(['trending', 'popular', 'newest'] as const).map(option => (
                      <button
                        key={option}
                        onClick={() => {
                          setSortBy(option);
                          setShowSort(false);
                        }}
                        className={`w-full px-4 py-2.5 text-left text-sm font-light transition-colors ${
                          sortBy === option ? 'text-white bg-neutral-800' : 'text-neutral-400 hover:text-white hover:bg-neutral-800/50'
                        }`}
                      >
                        {option.charAt(0).toUpperCase() + option.slice(1)}
                      </button>
                    ))}
                  </motion.div>
                )}
              </div>
            </div>
          </div>

          {/* Filter Pills */}
          <div className="flex gap-3 overflow-x-auto scrollbar-hide pb-2">
            {filterOptions.map(filter => (
              <button
                key={filter}
                onClick={() => {
                  setActiveFilter(filter);
                  setVisibleCount(ITEMS_PER_PAGE);
                }}
                className={`px-5 py-2 rounded-full text-sm font-light whitespace-nowrap transition-all ${
                  activeFilter === filter
                    ? 'bg-white text-black'
                    : 'bg-neutral-900 text-neutral-400 border border-neutral-800 hover:border-neutral-700'
                }`}
              >
                {filter}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-6 py-6">
        {/* AI Explanation Banner */}
        <motion.div
          key={activeFilter}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="mb-6 p-4 bg-neutral-900/60 rounded-2xl border border-neutral-800"
        >
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center flex-shrink-0 mt-0.5">
              <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <div>
              <p className="text-white text-sm font-light mb-0.5">AI-Curated Feed</p>
              <p className="text-neutral-400 text-xs font-light">{aiExplanation}</p>
            </div>
          </div>
        </motion.div>

        {/* Masonry Grid */}
        {filteredOutfits.length === 0 ? (
          /* Empty State */
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col items-center justify-center py-24"
          >
            <div className="w-16 h-16 rounded-full bg-neutral-900 border border-neutral-800 flex items-center justify-center mb-4">
              <svg className="w-7 h-7 text-neutral-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <h3 className="text-white text-lg font-light mb-1">No outfits found</h3>
            <p className="text-neutral-500 text-sm font-light">Try adjusting your filters</p>
          </motion.div>
        ) : (
          <>
            <div className="columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4">
              {filteredOutfits.slice(0, visibleCount).map((outfit, index) => {
                const isWide = index % 7 === 0;
                return (
                  <motion.div
                    key={outfit.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: (index % ITEMS_PER_PAGE) * 0.03 }}
                    className="break-inside-avoid group cursor-pointer"
                  >
                    <div className="relative overflow-hidden rounded-2xl bg-neutral-900 border border-neutral-800 hover:border-neutral-700 transition-all duration-300">
                      {/* Image */}
                      <div className={`relative overflow-hidden ${isWide ? 'aspect-[3/4]' : 'aspect-[2/3]'}`}>
                        <img
                          src={outfit.imageUrl}
                          alt={outfit.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                        {/* Save Button */}
                        <motion.button
                          whileTap={{ scale: 0.85 }}
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleSave(outfit.id);
                          }}
                          className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/40 backdrop-blur-xl border border-white/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <svg
                            className={`w-3.5 h-3.5 ${
                              savedItems.has(outfit.id) ? 'fill-white stroke-white' : 'fill-none stroke-white'
                            }`}
                            viewBox="0 0 24 24"
                            strokeWidth={2}
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"
                            />
                          </svg>
                        </motion.button>

                        {/* Bottom overlay */}
                        <div className="absolute bottom-0 left-0 right-0 p-3 transform translate-y-2 group-hover:translate-y-0 transition-transform">
                          <span className="inline-block px-2 py-1 bg-white/10 backdrop-blur-xl rounded-full text-[10px] text-white font-light border border-white/20 mb-1">
                            {outfit.aesthetic}
                          </span>
                        </div>
                      </div>

                      {/* Card Footer */}
                      <div className="p-3">
                        <p className="text-white text-xs font-light line-clamp-1 mb-1">{outfit.title}</p>
                        <div className="flex items-center justify-between">
                          <span className="text-neutral-500 text-[10px] font-light">
                            @{outfit.aesthetic.toLowerCase().replace(/\s/g, '')}
                          </span>
                          <span className="text-neutral-600 text-[10px] font-light">
                            {outfit.popularityScore}% match
                          </span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* Load More */}
            {visibleCount < filteredOutfits.length && (
              <div className="flex justify-center mt-10">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setVisibleCount(prev => prev + ITEMS_PER_PAGE)}
                  className="px-8 py-3 bg-neutral-900 border border-neutral-800 text-white rounded-full text-sm font-light hover:border-neutral-700 transition-colors"
                >
                  Load More
                </motion.button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
