import { useState, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import { generateMassiveGenZDataset, getTrendingOutfits, getViralGenZOutfits } from '../data/genzFashionDataset';
import FeedHeroCard from '../components/FeedHeroCard';
import RecommendationCarousel from '../components/RecommendationCarousel';

interface DiscoverScreenProps {
  onClose: () => void;
}

export default function DiscoverScreen({ onClose }: DiscoverScreenProps) {
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState('For You');
  const [searchQuery, setSearchQuery] = useState('');
  const [visibleCount, setVisibleCount] = useState(30);

  const massiveDataset = useMemo(() => generateMassiveGenZDataset(100000), []);
  const trendingOutfits = useMemo(() => getTrendingOutfits(massiveDataset, 50), [massiveDataset]);
  const viralOutfits = useMemo(() => getViralGenZOutfits(massiveDataset, 30), [massiveDataset]);

  useEffect(() => {
    setTimeout(() => setLoading(false), 800);
  }, []);

  const categories = ['For You', 'Trending', 'Viral', 'Rising', 'New', 'Saved'];

  const displayOutfits = useMemo(() => {
    let outfits;
    switch (activeCategory) {
      case 'Trending':
        outfits = trendingOutfits;
        break;
      case 'Viral':
        outfits = viralOutfits;
        break;
      case 'Rising':
        outfits = massiveDataset.filter(o => o.popularityScore > 60 && o.popularityScore < 85).slice(0, 50);
        break;
      case 'New':
        outfits = massiveDataset.slice(-50);
        break;
      case 'Saved':
        outfits = massiveDataset.filter(o => o.popularityScore > 90).slice(0, 20);
        break;
      case 'For You':
      default:
        outfits = massiveDataset.slice(0, 50);
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      outfits = outfits.filter(
        o =>
          o.title.toLowerCase().includes(q) ||
          o.aesthetic.toLowerCase().includes(q) ||
          o.vibe.toLowerCase().includes(q)
      );
    }

    return outfits;
  }, [activeCategory, massiveDataset, trendingOutfits, viralOutfits, searchQuery]);

  // Featured outfit for hero card
  const heroOutfit = trendingOutfits[0];

  // Carousel data
  const trendingCarouselItems = useMemo(
    () =>
      trendingOutfits.slice(0, 15).map(o => ({
        id: o.id,
        title: o.title,
        imageUrl: o.imageUrl,
        aesthetic: o.aesthetic,
        popularity: o.popularityScore,
      })),
    [trendingOutfits]
  );

  const risingCarouselItems = useMemo(
    () =>
      massiveDataset
        .filter(o => o.popularityScore > 50 && o.popularityScore < 80)
        .slice(0, 15)
        .map(o => ({
          id: o.id,
          title: o.title,
          imageUrl: o.imageUrl,
          aesthetic: o.aesthetic,
          popularity: o.popularityScore,
        })),
    [massiveDataset]
  );

  const personalizedItems = useMemo(
    () =>
      massiveDataset
        .filter(o => ['Minimal Luxury', 'Clean Girl', 'Korean Casual'].includes(o.aesthetic))
        .slice(0, 15)
        .map(o => ({
          id: o.id,
          title: o.title,
          imageUrl: o.imageUrl,
          aesthetic: o.aesthetic,
          popularity: o.popularityScore,
        })),
    [massiveDataset]
  );

  // Aesthetic collections for grid
  const aestheticCollections = useMemo(() => {
    const groups: Record<string, { count: number; image: string; vibe: string }> = {};
    massiveDataset.slice(0, 5000).forEach(o => {
      if (!groups[o.aesthetic]) {
        groups[o.aesthetic] = { count: 0, image: o.imageUrl, vibe: o.vibe };
      }
      groups[o.aesthetic].count++;
    });
    return Object.entries(groups).map(([name, data]) => ({
      name,
      ...data,
    }));
  }, [massiveDataset]);

  return (
    <div className="fixed inset-0 bg-black z-50 overflow-y-auto">
      {/* Sticky Header */}
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
              <h1 className="text-2xl font-light text-white tracking-tight">Discover</h1>
            </div>
            <div className="text-xs text-neutral-600 font-light">
              {massiveDataset.length.toLocaleString()} outfits
            </div>
          </div>

          {/* Search */}
          <div className="relative mb-4">
            <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              type="text"
              placeholder="Search aesthetics, vibes, styles..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-11 pr-4 py-3 bg-neutral-900 border border-neutral-800 rounded-2xl text-white text-sm font-light placeholder:text-neutral-600 focus:outline-none focus:border-neutral-700 transition-colors"
            />
          </div>

          {/* Category Pills */}
          <div className="flex gap-3 overflow-x-auto scrollbar-hide pb-2">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => {
                  setActiveCategory(category);
                  setVisibleCount(30);
                }}
                className={`px-5 py-2 rounded-full text-sm font-light whitespace-nowrap transition-all ${
                  activeCategory === category
                    ? 'bg-white text-black'
                    : 'bg-neutral-900 text-neutral-400 border border-neutral-800 hover:border-neutral-700'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        {loading ? (
          <div className="space-y-6">
            {/* Hero shimmer */}
            <div className="aspect-[21/9] bg-neutral-900 rounded-3xl animate-pulse" />
            {/* Grid shimmer */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
              {[...Array(20)].map((_, i) => (
                <div key={i} className="aspect-[3/4] bg-neutral-900 rounded-2xl animate-pulse" />
              ))}
            </div>
          </div>
        ) : (
          <>
            {/* Hero Card */}
            {heroOutfit && activeCategory === 'For You' && (
              <div className="mb-10">
                <FeedHeroCard
                  title="This Season's Defining Aesthetic"
                  subtitle="Curated editorial picks blending minimalism with Gen Z expression — discover what defines style right now."
                  imageUrl={heroOutfit.imageUrl}
                  aesthetic={heroOutfit.aesthetic}
                  vibe={heroOutfit.vibe}
                />
              </div>
            )}

            {/* Carousel Sections (For You only) */}
            {activeCategory === 'For You' && (
              <div className="space-y-10 mb-12">
                <RecommendationCarousel
                  title="Trending Right Now"
                  items={trendingCarouselItems}
                />
                <RecommendationCarousel
                  title="Rising Aesthetics"
                  items={risingCarouselItems}
                />
                <RecommendationCarousel
                  title="Your Style Match"
                  items={personalizedItems}
                />
              </div>
            )}

            {/* Section Title */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-6"
            >
              <h2 className="text-3xl font-light text-white tracking-tight mb-2">
                {activeCategory === 'For You' ? 'Curated for your style' : `${activeCategory} Now`}
              </h2>
              <p className="text-neutral-400 font-light text-base">
                {activeCategory === 'For You'
                  ? 'Personalized outfit inspiration based on your Style DNA'
                  : `Discover what's ${activeCategory.toLowerCase()} in Gen Z fashion`}
              </p>
            </motion.div>

            {/* Aesthetic Collections Grid (For You only) */}
            {activeCategory === 'For You' && (
              <div className="mb-10">
                <h3 className="text-xl font-light text-white mb-4 tracking-tight">Aesthetic Collections</h3>
                <div className="grid grid-cols-2 gap-4">
                  {aestheticCollections.map((collection, index) => (
                    <motion.div
                      key={collection.name}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.06 }}
                      className="relative rounded-2xl overflow-hidden aspect-[4/3] bg-neutral-900 border border-neutral-800 hover:border-neutral-700 transition-all cursor-pointer group"
                      onClick={() => {
                        setSearchQuery(collection.name);
                        setActiveCategory('For You');
                      }}
                    >
                      <img
                        src={collection.image}
                        alt={collection.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                      <div className="absolute bottom-0 left-0 right-0 p-4">
                        <h4 className="text-white text-sm font-light mb-0.5">{collection.name}</h4>
                        <p className="text-neutral-400 text-xs font-light">{collection.count.toLocaleString()} outfits</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}

            {/* Main Outfit Grid */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
              {displayOutfits.slice(0, visibleCount).map((outfit, index) => (
                <motion.div
                  key={outfit.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.02 }}
                  className="group cursor-pointer"
                >
                  <div className="relative aspect-[3/4] overflow-hidden rounded-2xl bg-neutral-900 border border-neutral-800 hover:border-neutral-700 transition-all">
                    <img
                      src={outfit.imageUrl}
                      alt={outfit.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                    <div className="absolute bottom-0 left-0 right-0 p-3 transform translate-y-4 group-hover:translate-y-0 transition-transform">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="px-2 py-1 bg-white/10 backdrop-blur-xl rounded-full text-xs text-white font-light border border-white/20">
                          {outfit.aesthetic}
                        </span>
                      </div>
                      <p className="text-white text-sm font-light line-clamp-1">{outfit.title}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Load More */}
            {visibleCount < displayOutfits.length && (
              <div className="flex justify-center mt-8">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setVisibleCount((prev) => prev + 20)}
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
