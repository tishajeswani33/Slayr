import { motion } from 'framer-motion';
import { User } from '../types/social';

interface ProfileScreenProps {
  onClose: () => void;
}

const DEMO_USER: User = {
  id: 'current',
  username: 'sophiarose',
  displayName: 'Sophia Rose',
  bio: 'Minimal luxury enthusiast • Curating timeless aesthetics',
  avatarUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400',
  coverImageUrl: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=1200',
  dominantAesthetic: 'Minimal Luxury',
  followersCount: 12400,
  followingCount: 342,
  savedCount: 891,
  joinedAt: new Date(),
  styleStats: {
    dominantAesthetic: 'Minimal Luxury',
    secondaryAesthetic: 'Scandinavian Minimal',
    favoriteColors: ['#FFFFFF', '#2C2C2C', '#F5F5F5'],
    vibeScore: 92,
    monthlyEvolution: ['Minimal', 'Luxury', 'Classic'],
    totalOutfitsAnalyzed: 47,
    averageScore: 88,
  },
};

export default function ProfileScreen({ onClose }: ProfileScreenProps) {
  const user = DEMO_USER;

  return (
    <div className="fixed inset-0 bg-black z-50 overflow-y-auto">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-black/80 backdrop-blur-xl border-b border-neutral-900">
        <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
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

          <button className="px-6 py-2 bg-neutral-900 border border-neutral-800 text-white rounded-full text-sm font-light hover:border-neutral-700 transition-all">
            Edit Profile
          </button>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 py-8">
        {/* Cover Image */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative h-64 rounded-3xl overflow-hidden mb-8 bg-neutral-900"
        >
          <img src={user.coverImageUrl} alt="Cover" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        </motion.div>

        {/* Profile Info */}
        <div className="flex items-start gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="w-32 h-32 rounded-full overflow-hidden border-4 border-black bg-neutral-900 -mt-24 relative z-10"
          >
            <img src={user.avatarUrl} alt={user.displayName} className="w-full h-full object-cover" />
          </motion.div>

          <div className="flex-1">
            <h1 className="text-3xl font-light text-white mb-2">{user.displayName}</h1>
            <p className="text-neutral-400 text-base font-light mb-4">@{user.username}</p>
            <p className="text-neutral-300 font-light mb-6">{user.bio}</p>

            <div className="flex items-center gap-8 text-sm">
              <div>
                <span className="text-white font-medium">{user.followersCount.toLocaleString()}</span>
                <span className="text-neutral-500 font-light ml-1">followers</span>
              </div>
              <div>
                <span className="text-white font-medium">{user.followingCount.toLocaleString()}</span>
                <span className="text-neutral-500 font-light ml-1">following</span>
              </div>
              <div>
                <span className="text-white font-medium">{user.savedCount.toLocaleString()}</span>
                <span className="text-neutral-500 font-light ml-1">saved</span>
              </div>
            </div>
          </div>
        </div>

        {/* Style Stats */}
        {user.styleStats && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-neutral-900 rounded-3xl p-6 border border-neutral-800"
            >
              <p className="text-xs text-neutral-500 uppercase tracking-widest mb-4">Vibe Score</p>
              <div className="flex items-end gap-2 mb-2">
                <span className="text-5xl font-light text-white">{user.styleStats.vibeScore}</span>
                <span className="text-neutral-500 text-lg font-light mb-2">/100</span>
              </div>
              <p className="text-sm text-neutral-400 font-light">Based on {user.styleStats.totalOutfitsAnalyzed} analyses</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-neutral-900 rounded-3xl p-6 border border-neutral-800"
            >
              <p className="text-xs text-neutral-500 uppercase tracking-widest mb-4">Dominant Aesthetic</p>
              <p className="text-2xl font-light text-white mb-2">{user.styleStats.dominantAesthetic}</p>
              <p className="text-sm text-neutral-400 font-light">with hints of {user.styleStats.secondaryAesthetic}</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-neutral-900 rounded-3xl p-6 border border-neutral-800"
            >
              <p className="text-xs text-neutral-500 uppercase tracking-widest mb-4">Color Palette</p>
              <div className="flex gap-3 mb-2">
                {user.styleStats.favoriteColors.map((color, i) => (
                  <div
                    key={i}
                    className="w-12 h-12 rounded-full border-2 border-neutral-800"
                    style={{ backgroundColor: color }}
                  />
                ))}
              </div>
              <p className="text-sm text-neutral-400 font-light">Your signature colors</p>
            </motion.div>
          </div>
        )}

        {/* Collections Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <h2 className="text-xl font-light text-white mb-6">Saved Collections</h2>
          <div className="grid grid-cols-3 gap-4">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="aspect-square bg-neutral-900 rounded-2xl border border-neutral-800 animate-pulse" />
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
