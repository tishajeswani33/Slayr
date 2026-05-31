import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import SearchBar from '../components/SearchBar';
import AestheticPill from '../components/AestheticPill';
import TrendingCarousel from '../components/TrendingCarousel';
import MasonryGrid from '../components/MasonryGrid';
import { getMoodboards, getTrendingMoodboards, searchMoodboards } from '../services/moodboardService';
import { AESTHETIC_CATEGORIES } from '../services/aestheticService';
import { useMoodboardStore } from '../store/useMoodboardStore';
import { Moodboard } from '../types/moodboard';

interface ExploreScreenProps {
  onMoodboardClick: (moodboard: Moodboard) => void;
  onSavedClick?: () => void;
}

export default function ExploreScreen({ onMoodboardClick, onSavedClick }: ExploreScreenProps) {
  const [moodboards, setMoodboards] = useState<Moodboard[]>([]);
  const [trending, setTrending] = useState<Moodboard[]>([]);
  const [loading, setLoading] = useState(true);
  const { currentFilter, setFilter, searchQuery, setSearchQuery } = useMoodboardStore();

  useEffect(() => {
    loadMoodboards();
    loadTrending();
  }, [currentFilter]);

  const loadMoodboards = async () => {
    setLoading(true);
    try {
      const filter = currentFilter === 'All' ? undefined : currentFilter;
      const data = await getMoodboards(filter);
      setMoodboards(data);
    } catch (error) {
      console.error('Error loading moodboards:', error);
    } finally {
      setLoading(false);
    }
  };

  const loadTrending = async () => {
    try {
      const data = await getTrendingMoodboards();
      setTrending(data);
    } catch (error) {
      console.error('Error loading trending:', error);
    }
  };

  const handleSearch = async (query: string) => {
    setSearchQuery(query);
    if (query.trim()) {
      const results = await searchMoodboards(query);
      setMoodboards(results);
    } else {
      loadMoodboards();
    }
  };

  const aestheticFilters = ['All', ...AESTHETIC_CATEGORIES];

  return (
    <div className="min-h-screen bg-black">
      {/* Header */}
      <div className="sticky top-0 z-20 bg-black/80 backdrop-blur-xl border-b border-neutral-900">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex items-center justify-between mb-6">
            <motion.h1
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="text-3xl font-light text-white tracking-tight"
            >
              slayr
            </motion.h1>
            <div className="flex items-center gap-4">
              <button
                onClick={onSavedClick}
                className="text-sm text-neutral-400 hover:text-white transition-colors font-light"
              >
                Saved
              </button>
              <button className="w-10 h-10 rounded-full bg-neutral-900 border border-neutral-800 flex items-center justify-center text-white hover:border-neutral-700 transition-colors">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
              </button>
            </div>
          </div>

          {/* Search Bar */}
          <SearchBar onSearch={handleSearch} />

          {/* Aesthetic Filters */}
          <div className="mt-6 overflow-x-auto scrollbar-hide -mx-6 px-6">
            <div className="flex gap-3 pb-2">
              {aestheticFilters.map((aesthetic) => (
                <AestheticPill
                  key={aesthetic}
                  aesthetic={aesthetic}
                  isActive={currentFilter === aesthetic}
                  onClick={() => setFilter(aesthetic)}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Hero Section */}
        {!searchQuery && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-12"
          >
            <h2 className="text-4xl font-light text-white mb-3 tracking-tight">
              Discover Your Aesthetic
            </h2>
            <p className="text-neutral-400 font-light text-lg">
              Explore AI-curated moodboards and fashion inspiration
            </p>
          </motion.div>
        )}

        {/* Trending Carousel */}
        {!searchQuery && trending.length > 0 && (
          <div className="mb-16">
            <TrendingCarousel moodboards={trending} onCardClick={onMoodboardClick} />
          </div>
        )}

        {/* Section Title */}
        {searchQuery ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mb-8"
          >
            <h3 className="text-xl font-light text-white">
              Results for "{searchQuery}"
            </h3>
            <p className="text-sm text-neutral-500 font-light mt-1">
              {moodboards.length} moodboards found
            </p>
          </motion.div>
        ) : (
          <motion.h3
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-2xl font-light text-white mb-8"
          >
            {currentFilter === 'All' ? 'All Moodboards' : currentFilter}
          </motion.h3>
        )}

        {/* Masonry Grid */}
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
          <MasonryGrid moodboards={moodboards} onCardClick={onMoodboardClick} />
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20"
          >
            <div className="w-16 h-16 rounded-full bg-neutral-900 flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-neutral-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
            <h3 className="text-xl font-light text-white mb-2">No moodboards found</h3>
            <p className="text-neutral-500 font-light">Try adjusting your search or filters</p>
          </motion.div>
        )}
      </div>
    </div>
  );
}
