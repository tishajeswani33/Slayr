import { motion } from 'framer-motion';
import { FeedItem } from '../types/social';
import { useSocialStore } from '../store/useSocialStore';
import { useState } from 'react';

interface FeedCardProps {
  item: FeedItem;
  onUserClick?: (userId: string) => void;
  onImageClick?: (item: FeedItem) => void;
}

export default function FeedCard({ item, onUserClick, onImageClick }: FeedCardProps) {
  const [imageLoaded, setImageLoaded] = useState(false);
  const { likeFeedItem, saveFeedItem, followUser } = useSocialStore();

  const formatTimeAgo = (date: Date) => {
    const hours = Math.floor((Date.now() - date.getTime()) / (1000 * 60 * 60));
    if (hours < 1) return 'Just now';
    if (hours < 24) return `${hours}h ago`;
    const days = Math.floor(hours / 24);
    return `${days}d ago`;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-neutral-900 rounded-3xl border border-neutral-800 overflow-hidden hover:border-neutral-700 transition-all duration-300"
    >
      {/* User Header */}
      <div className="p-4 flex items-center justify-between">
        <div
          className="flex items-center gap-3 cursor-pointer"
          onClick={() => onUserClick?.(item.userId)}
        >
          <div className="w-10 h-10 rounded-full overflow-hidden bg-neutral-800 border border-neutral-700">
            <img
              src={item.user.avatarUrl}
              alt={item.user.displayName}
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <p className="text-white text-sm font-light">{item.user.displayName}</p>
            <p className="text-neutral-500 text-xs font-light">@{item.user.username}</p>
          </div>
        </div>

        {!item.user.isFollowing && (
          <button
            onClick={() => followUser(item.userId)}
            className="px-4 py-1.5 bg-white text-black text-xs font-light rounded-full hover:bg-neutral-200 transition-colors"
          >
            Follow
          </button>
        )}
      </div>

      {/* Image */}
      <div
        className="relative aspect-[4/5] overflow-hidden bg-neutral-800 cursor-pointer group"
        onClick={() => onImageClick?.(item)}
      >
        {!imageLoaded && <div className="absolute inset-0 animate-pulse bg-neutral-800" />}
        <img
          src={item.imageUrl}
          alt={item.title}
          onLoad={() => setImageLoaded(true)}
          className={`w-full h-full object-cover transition-all duration-700 ${
            imageLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-105'
          } group-hover:scale-105`}
        />

        {/* Type Badge */}
        {item.type === 'ai-suggestion' && (
          <div className="absolute top-4 left-4 px-3 py-1.5 bg-black/60 backdrop-blur-xl rounded-full text-xs text-white font-light border border-white/20 flex items-center gap-1.5">
            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 10V3L4 14h7v7l9-11h-7z"
              />
            </svg>
            AI Curated
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-4">
        <div className="flex items-center gap-2 mb-2">
          <span className="px-3 py-1 bg-white/5 backdrop-blur-xl rounded-full text-xs text-neutral-400 font-light border border-neutral-800">
            {item.aesthetic}
          </span>
          <span className="text-neutral-600 text-xs font-light">{formatTimeAgo(item.createdAt)}</span>
        </div>

        <h3 className="text-white text-base font-light mb-1">{item.title}</h3>
        <p className="text-neutral-400 text-sm font-light line-clamp-2 mb-3">{item.description}</p>

        {/* Tags */}
        {item.tags && item.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {item.tags.map((tag, i) => (
              <span key={i} className="text-neutral-600 text-xs font-light">
                #{tag}
              </span>
            ))}
          </div>
        )}

        {/* Actions */}
        <div className="flex items-center justify-between pt-3 border-t border-neutral-800">
          <div className="flex items-center gap-6">
            <button
              onClick={() => likeFeedItem(item.id)}
              className="flex items-center gap-2 text-neutral-400 hover:text-white transition-colors group"
            >
              <svg
                className={`w-5 h-5 transition-all ${
                  item.isLiked ? 'fill-red-500 stroke-red-500' : 'fill-none'
                }`}
                stroke="currentColor"
                strokeWidth={2}
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                />
              </svg>
              <span className="text-sm font-light">{item.likes.toLocaleString()}</span>
            </button>

            <button
              onClick={() => saveFeedItem(item.id)}
              className="flex items-center gap-2 text-neutral-400 hover:text-white transition-colors"
            >
              <svg
                className={`w-5 h-5 ${item.isSaved ? 'fill-current' : 'fill-none'}`}
                stroke="currentColor"
                strokeWidth={2}
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"
                />
              </svg>
              <span className="text-sm font-light">{item.saves.toLocaleString()}</span>
            </button>
          </div>

          <button className="text-neutral-400 hover:text-white transition-colors">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"
              />
            </svg>
          </button>
        </div>
      </div>
    </motion.div>
  );
}
