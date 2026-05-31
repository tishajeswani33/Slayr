import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import FeedCard from '../components/FeedCard';
import DailyInspoCard from '../components/DailyInspoCard';
import CreatorCard from '../components/CreatorCard';
import { useSocialStore } from '../store/useSocialStore';
import { getPersonalizedFeed, getTrendingCreators } from '../services/feedService';
import { getDailyInspo } from '../services/stylistService';
import { User } from '../types/social';

interface FeedScreenProps {
  onProfileClick?: (userId: string) => void;
  onNotificationsClick?: () => void;
  onAIStylistClick?: () => void;
  onDiscoverClick?: () => void;
  onTrendRadarClick?: () => void;
  onGenZFeedClick?: () => void;
  onStyleDNAClick?: () => void;
  onTrendingCreatorsClick?: () => void;
}

export default function FeedScreen({
  onProfileClick,
  onNotificationsClick,
  onAIStylistClick,
  onDiscoverClick,
  onTrendRadarClick,
  onGenZFeedClick,
  onStyleDNAClick,
  onTrendingCreatorsClick,
}: FeedScreenProps) {
  const { feedItems, setFeedItems } = useSocialStore();
  const [trendingCreators, setTrendingCreators] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const dailyInspo = getDailyInspo();

  useEffect(() => {
    loadFeed();
  }, []);

  const loadFeed = async () => {
    setLoading(true);
    try {
      const [feed, creators] = await Promise.all([getPersonalizedFeed(), getTrendingCreators()]);
      setFeedItems(feed);
      setTrendingCreators(creators);
    } catch (error) {
      console.error('Error loading feed:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black">
      {/* Header */}
      <div className="sticky top-0 z-20 bg-black/80 backdrop-blur-xl border-b border-neutral-900">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <motion.h1
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="text-2xl font-light text-white tracking-tight"
            >
              slayr
            </motion.h1>

            <div className="flex items-center gap-3">
              {/* For You Button */}
              <button
                onClick={onGenZFeedClick}
                className="px-4 py-2 bg-neutral-900 border border-neutral-800 text-white rounded-full text-sm font-light hover:border-neutral-700 transition-colors"
              >
                For You
              </button>

              {/* Discover Button */}
              <button
                onClick={onDiscoverClick}
                className="px-4 py-2 bg-neutral-900 border border-neutral-800 text-white rounded-full text-sm font-light hover:border-neutral-700 transition-colors"
              >
                Discover
              </button>

              {/* Trend Radar Button */}
              <button
                onClick={onTrendRadarClick}
                className="px-4 py-2 bg-neutral-900 border border-neutral-800 text-white rounded-full text-sm font-light hover:border-neutral-700 transition-colors"
              >
                Trends
              </button>

              {/* Creators Button */}
              <button
                onClick={onTrendingCreatorsClick}
                className="px-4 py-2 bg-neutral-900 border border-neutral-800 text-white rounded-full text-sm font-light hover:border-neutral-700 transition-colors"
              >
                Creators
              </button>

              {/* Style DNA Button */}
              <button
                onClick={onStyleDNAClick}
                className="px-4 py-2 bg-neutral-900 border border-neutral-800 text-white rounded-full text-sm font-light hover:border-neutral-700 transition-colors"
              >
                Style DNA
              </button>

              {/* AI Stylist Button */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={onAIStylistClick}
                className="px-4 py-2 bg-white text-black rounded-full text-sm font-light flex items-center gap-2 hover:bg-neutral-200 transition-colors"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                  />
                </svg>
                AI Stylist
              </motion.button>

              {/* Notifications */}
              <button
                onClick={onNotificationsClick}
                className="w-10 h-10 rounded-full bg-neutral-900 border border-neutral-800 flex items-center justify-center text-neutral-400 hover:text-white hover:border-neutral-700 transition-all relative"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                  />
                </svg>
                <div className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full" />
              </button>

              {/* Profile */}
              <button
                onClick={() => onProfileClick?.('current')}
                className="w-10 h-10 rounded-full bg-neutral-900 border border-neutral-800 overflow-hidden hover:border-neutral-700 transition-all"
              >
                <img
                  src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400"
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Main Feed */}
          <div className="lg:col-span-8 space-y-6">
            {/* Daily Inspiration */}
            <DailyInspoCard
              title={dailyInspo.title}
              description={dailyInspo.description}
              imageUrl={dailyInspo.imageUrl}
              aesthetic={dailyInspo.aesthetic}
            />

            {/* Feed Items */}
            {loading ? (
              <div className="space-y-6">
                {[...Array(3)].map((_, i) => (
                  <div
                    key={i}
                    className="bg-neutral-900 rounded-3xl border border-neutral-800 overflow-hidden"
                  >
                    <div className="p-4 flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-neutral-800 animate-pulse" />
                      <div className="flex-1">
                        <div className="h-4 bg-neutral-800 rounded w-32 mb-2 animate-pulse" />
                        <div className="h-3 bg-neutral-800 rounded w-24 animate-pulse" />
                      </div>
                    </div>
                    <div className="aspect-[4/5] bg-neutral-800 animate-pulse" />
                    <div className="p-4">
                      <div className="h-4 bg-neutral-800 rounded w-3/4 mb-2 animate-pulse" />
                      <div className="h-3 bg-neutral-800 rounded w-full animate-pulse" />
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="space-y-6">
                {feedItems.map((item) => (
                  <FeedCard
                    key={item.id}
                    item={item}
                    onUserClick={onProfileClick}
                    onImageClick={(item) => console.log('Image clicked:', item)}
                  />
                ))}
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-4 space-y-6">
            {/* Trending Creators */}
            <div className="sticky top-24">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-light text-white">Trending Creators</h2>
                  <button className="text-sm text-neutral-400 hover:text-white transition-colors font-light">
                    See all
                  </button>
                </div>

                <div className="space-y-4">
                  {trendingCreators.map((creator, index) => (
                    <motion.div
                      key={creator.id}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.4, delay: index * 0.1 }}
                    >
                      <CreatorCard user={creator} onClick={onProfileClick} />
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
