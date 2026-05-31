import { motion } from 'framer-motion';
import { User } from '../types/social';
import { useState } from 'react';

interface CreatorCardProps {
  user: User;
  onFollow?: (userId: string) => void;
  onClick?: (userId: string) => void;
}

export default function CreatorCard({ user, onFollow, onClick }: CreatorCardProps) {
  const [isFollowing, setIsFollowing] = useState(user.isFollowing || false);

  const handleFollow = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsFollowing(!isFollowing);
    onFollow?.(user.id);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -4 }}
      onClick={() => onClick?.(user.id)}
      className="bg-neutral-900 rounded-3xl p-6 border border-neutral-800 hover:border-neutral-700 transition-all duration-300 cursor-pointer"
    >
      <div className="flex items-start gap-4">
        <div className="w-16 h-16 rounded-full overflow-hidden bg-neutral-800 border-2 border-neutral-700 flex-shrink-0">
          <img src={user.avatarUrl} alt={user.displayName} className="w-full h-full object-cover" />
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between mb-2">
            <div>
              <h3 className="text-white text-base font-light mb-0.5">{user.displayName}</h3>
              <p className="text-neutral-500 text-sm font-light">@{user.username}</p>
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleFollow}
              className={`px-4 py-1.5 rounded-full text-xs font-light transition-all ${
                isFollowing
                  ? 'bg-neutral-800 text-neutral-400 border border-neutral-700'
                  : 'bg-white text-black'
              }`}
            >
              {isFollowing ? 'Following' : 'Follow'}
            </motion.button>
          </div>

          <p className="text-neutral-400 text-sm font-light mb-3 line-clamp-2">{user.bio}</p>

          <div className="flex items-center gap-4 text-xs text-neutral-500">
            <span>
              <span className="text-white font-medium">{user.followersCount.toLocaleString()}</span>{' '}
              followers
            </span>
            <span>•</span>
            <span className="px-2 py-1 bg-white/5 rounded-full">{user.dominantAesthetic}</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
