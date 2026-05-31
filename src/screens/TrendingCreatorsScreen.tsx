import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';

interface TrendingCreatorsScreenProps {
  onClose: () => void;
}

interface Creator {
  id: string;
  name: string;
  username: string;
  avatarUrl: string;
  aesthetic: string;
  followers: number;
  posts: number;
  matchScore: number;
  isFollowing: boolean;
  bio: string;
}

// Demo creator data
const generateCreators = (): Creator[] => {
  const names = [
    'Aria Chen', 'Marcus Kim', 'Luna Rossi', 'Jae Park', 'Sofia Laurent',
    'Kai Tanaka', 'Nora Svensson', 'Leo Dumont', 'Mia Nakamura', 'Felix Rivera',
    'Zara Ahmed', 'Nico Blanc', 'Emma Lindqvist', 'Ravi Patel', 'Chloe Moreau',
    'Yuki Sato', 'Liam O\'Brien', 'Isla Bergström', 'Dante Cruz', 'Amara Okafor',
  ];

  const aesthetics = [
    'Minimal Luxury', 'Streetwear', 'Clean Girl', 'Korean Casual', 'Coquette',
    'Dark Academia', 'Y2K', 'Scandinavian Minimal', 'Techwear', 'Old Money',
  ];

  const bios = [
    'Curating quiet luxury for the modern era',
    'Street culture meets high fashion',
    'Less is more. Always.',
    'Layering is an art form',
    'Romanticizing every outfit',
    'Books, blazers, and burgundy',
    'Bringing back the future',
    'Nordic simplicity, global style',
    'Function meets form',
    'Inherited taste, modern execution',
  ];

  return names.map((name, i) => ({
    id: `creator-${i}`,
    name,
    username: name.toLowerCase().replace(/[^a-z]/g, '').slice(0, 12),
    avatarUrl: `https://images.unsplash.com/photo-${1494790108377 + (i * 73)}?w=200`,
    aesthetic: aesthetics[i % aesthetics.length],
    followers: Math.floor(Math.random() * 500000) + 5000,
    posts: Math.floor(Math.random() * 800) + 50,
    matchScore: Math.floor(Math.random() * 30) + 70,
    isFollowing: i < 3,
    bio: bios[i % bios.length],
  }));
};

export default function TrendingCreatorsScreen({ onClose }: TrendingCreatorsScreenProps) {
  const creators = useMemo(() => generateCreators(), []);
  const [followState, setFollowState] = useState<Record<string, boolean>>(() => {
    const state: Record<string, boolean> = {};
    creators.forEach(c => { state[c.id] = c.isFollowing; });
    return state;
  });
  const [activeAesthetic, setActiveAesthetic] = useState('All');

  const aestheticFilters = useMemo(() => {
    const unique = Array.from(new Set(creators.map(c => c.aesthetic)));
    return ['All', ...unique];
  }, [creators]);

  const filteredCreators = useMemo(() => {
    if (activeAesthetic === 'All') return creators;
    return creators.filter(c => c.aesthetic === activeAesthetic);
  }, [creators, activeAesthetic]);

  const featuredCreator = creators[0];

  const formatFollowers = (n: number) => {
    if (n >= 1000000) return `${(n / 1000000).toFixed(1)}M`;
    if (n >= 1000) return `${(n / 1000).toFixed(1)}K`;
    return n.toString();
  };

  const toggleFollow = (id: string) => {
    setFollowState(prev => ({ ...prev, [id]: !prev[id] }));
  };

  // "Creators You Might Like" — high match, not following
  const suggestedCreators = useMemo(
    () =>
      creators
        .filter(c => !followState[c.id])
        .sort((a, b) => b.matchScore - a.matchScore)
        .slice(0, 6),
    [creators, followState]
  );

  return (
    <div className="fixed inset-0 bg-black z-50 overflow-y-auto">
      {/* Header */}
      <div className="sticky top-0 z-20 bg-black/80 backdrop-blur-xl border-b border-neutral-900">
        <div className="max-w-5xl mx-auto px-6 py-4">
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
              <h1 className="text-2xl font-light text-white tracking-tight">Trending Creators</h1>
            </div>
            <div className="text-xs text-neutral-600 font-light">
              {creators.length} creators
            </div>
          </div>

          {/* Aesthetic Filter Pills */}
          <div className="flex gap-3 overflow-x-auto scrollbar-hide pb-2">
            {aestheticFilters.map(aesthetic => (
              <button
                key={aesthetic}
                onClick={() => setActiveAesthetic(aesthetic)}
                className={`px-5 py-2 rounded-full text-sm font-light whitespace-nowrap transition-all ${
                  activeAesthetic === aesthetic
                    ? 'bg-white text-black'
                    : 'bg-neutral-900 text-neutral-400 border border-neutral-800 hover:border-neutral-700'
                }`}
              >
                {aesthetic}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 py-8">
        {/* Featured Creator Hero */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-neutral-900 rounded-3xl border border-neutral-800 overflow-hidden mb-10"
        >
          <div className="relative h-40 md:h-52 overflow-hidden">
            <img
              src={featuredCreator.avatarUrl}
              alt={featuredCreator.name}
              className="w-full h-full object-cover blur-2xl scale-110 opacity-30"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-neutral-900 via-neutral-900/80 to-transparent" />
          </div>
          <div className="px-6 pb-6 -mt-16 relative">
            <div className="flex items-end gap-5 mb-4">
              <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-neutral-900 bg-neutral-800">
                <img
                  src={featuredCreator.avatarUrl}
                  alt={featuredCreator.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-1 mb-1">
                <div className="flex items-center gap-3 mb-1">
                  <h2 className="text-2xl font-light text-white tracking-tight">{featuredCreator.name}</h2>
                  <span className="px-3 py-1 bg-amber-500/10 border border-amber-500/30 rounded-full text-xs text-amber-400 font-light">
                    Featured
                  </span>
                </div>
                <p className="text-neutral-500 text-sm font-light">@{featuredCreator.username}</p>
              </div>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => toggleFollow(featuredCreator.id)}
                className={`px-6 py-2 rounded-full text-sm font-light transition-colors ${
                  followState[featuredCreator.id]
                    ? 'bg-neutral-800 text-white border border-neutral-700'
                    : 'bg-white text-black hover:bg-neutral-200'
                }`}
              >
                {followState[featuredCreator.id] ? 'Following' : 'Follow'}
              </motion.button>
            </div>

            <p className="text-neutral-400 text-sm font-light mb-4 max-w-lg">{featuredCreator.bio}</p>

            <div className="flex items-center gap-6">
              <div>
                <p className="text-white text-lg font-light">{formatFollowers(featuredCreator.followers)}</p>
                <p className="text-xs text-neutral-500 font-light">followers</p>
              </div>
              <div>
                <p className="text-white text-lg font-light">{featuredCreator.posts}</p>
                <p className="text-xs text-neutral-500 font-light">posts</p>
              </div>
              <div>
                <span className="px-3 py-1 bg-white/5 rounded-full text-xs text-neutral-400 font-light border border-neutral-800">
                  {featuredCreator.aesthetic}
                </span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Creator Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-12"
        >
          <h3 className="text-xl font-light text-white mb-6 tracking-tight">
            {activeAesthetic === 'All' ? 'All Creators' : `${activeAesthetic} Creators`}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredCreators.map((creator, index) => (
              <motion.div
                key={creator.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15 + index * 0.05 }}
                className="bg-neutral-900 rounded-2xl p-4 border border-neutral-800 hover:border-neutral-700 transition-all flex items-center gap-4"
              >
                <div className="w-14 h-14 rounded-full overflow-hidden bg-neutral-800 border border-neutral-700 flex-shrink-0">
                  <img
                    src={creator.avatarUrl}
                    alt={creator.name}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-0.5">
                    <h4 className="text-white text-sm font-light truncate">{creator.name}</h4>
                  </div>
                  <p className="text-neutral-500 text-xs font-light mb-1">@{creator.username}</p>
                  <div className="flex items-center gap-3">
                    <span className="px-2 py-0.5 bg-white/5 rounded-full text-[10px] text-neutral-400 font-light border border-neutral-800">
                      {creator.aesthetic}
                    </span>
                    <span className="text-neutral-600 text-[10px] font-light">
                      {formatFollowers(creator.followers)} followers
                    </span>
                  </div>
                </div>

                <motion.button
                  whileTap={{ scale: 0.95 }}
                  onClick={() => toggleFollow(creator.id)}
                  className={`px-4 py-1.5 rounded-full text-xs font-light transition-colors flex-shrink-0 ${
                    followState[creator.id]
                      ? 'bg-neutral-800 text-white border border-neutral-700'
                      : 'bg-white text-black hover:bg-neutral-200'
                  }`}
                >
                  {followState[creator.id] ? 'Following' : 'Follow'}
                </motion.button>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Creators You Might Like */}
        {suggestedCreators.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <h3 className="text-xl font-light text-white mb-6 tracking-tight">Creators You Might Like</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {suggestedCreators.map((creator, index) => (
                <motion.div
                  key={creator.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.35 + index * 0.06 }}
                  className="bg-neutral-900 rounded-2xl p-5 border border-neutral-800 hover:border-neutral-700 transition-all text-center"
                >
                  <div className="w-16 h-16 rounded-full overflow-hidden bg-neutral-800 border border-neutral-700 mx-auto mb-3">
                    <img
                      src={creator.avatarUrl}
                      alt={creator.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h4 className="text-white text-sm font-light mb-0.5">{creator.name}</h4>
                  <p className="text-neutral-500 text-[10px] font-light mb-2">@{creator.username}</p>
                  <span className="inline-block px-2 py-0.5 bg-white/5 rounded-full text-[10px] text-neutral-400 font-light border border-neutral-800 mb-2">
                    {creator.aesthetic}
                  </span>
                  <div className="flex items-center justify-center gap-1 mb-3">
                    <span className="text-green-400 text-xs font-light">{creator.matchScore}%</span>
                    <span className="text-neutral-600 text-[10px] font-light">match</span>
                  </div>
                  <motion.button
                    whileTap={{ scale: 0.95 }}
                    onClick={() => toggleFollow(creator.id)}
                    className={`w-full px-4 py-2 rounded-full text-xs font-light transition-colors ${
                      followState[creator.id]
                        ? 'bg-neutral-800 text-white border border-neutral-700'
                        : 'bg-white text-black hover:bg-neutral-200'
                    }`}
                  >
                    {followState[creator.id] ? 'Following' : 'Follow'}
                  </motion.button>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
