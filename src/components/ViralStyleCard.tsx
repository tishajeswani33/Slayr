import { motion } from 'framer-motion';
import { useState } from 'react';

interface ViralStyleCardProps {
  title: string;
  imageUrl: string;
  aesthetic: string;
  likes: number;
  saves: number;
  creator: string;
  platform: string;
  trendVelocity: number;
  onClick?: () => void;
}

const platformIcons: Record<string, string> = {
  TikTok: '♪',
  Pinterest: '📌',
  Instagram: '◎',
};

const platformColors: Record<string, string> = {
  TikTok: 'bg-pink-500/20 text-pink-400 border-pink-500/30',
  Pinterest: 'bg-red-500/20 text-red-400 border-red-500/30',
  Instagram: 'bg-purple-500/20 text-purple-400 border-purple-500/30',
};

export default function ViralStyleCard({
  title,
  imageUrl,
  aesthetic,
  likes,
  saves,
  creator,
  platform,
  trendVelocity,
  onClick,
}: ViralStyleCardProps) {
  const [saved, setSaved] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  const formatNumber = (n: number) => {
    if (n >= 1000000) return `${(n / 1000000).toFixed(1)}M`;
    if (n >= 1000) return `${(n / 1000).toFixed(1)}K`;
    return n.toString();
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      onClick={onClick}
      className="relative rounded-3xl overflow-hidden bg-neutral-900 border border-neutral-800 hover:border-neutral-700 transition-all duration-300 cursor-pointer group"
    >
      {/* Image */}
      <div className="relative aspect-[3/4] overflow-hidden">
        {!imageLoaded && <div className="absolute inset-0 animate-pulse bg-neutral-800" />}
        <img
          src={imageUrl}
          alt={title}
          onLoad={() => setImageLoaded(true)}
          className={`w-full h-full object-cover transition-all duration-700 ${
            imageLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-105'
          } group-hover:scale-105`}
        />

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />

        {/* Platform Badge */}
        <div className="absolute top-3 left-3">
          <span
            className={`px-3 py-1.5 rounded-full text-xs font-light border ${
              platformColors[platform] || 'bg-neutral-800 text-neutral-400 border-neutral-700'
            }`}
          >
            {platformIcons[platform] || '•'} {platform}
          </span>
        </div>

        {/* Save Button */}
        <motion.button
          whileTap={{ scale: 0.85 }}
          onClick={(e) => {
            e.stopPropagation();
            setSaved(!saved);
          }}
          className="absolute top-3 right-3 w-9 h-9 rounded-full bg-black/40 backdrop-blur-xl border border-white/20 flex items-center justify-center"
        >
          <motion.svg
            animate={{ scale: saved ? [1, 1.3, 1] : 1 }}
            transition={{ duration: 0.3 }}
            className={`w-4 h-4 ${saved ? 'fill-white stroke-white' : 'fill-none stroke-white'}`}
            viewBox="0 0 24 24"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"
            />
          </motion.svg>
        </motion.button>

        {/* Bottom Content */}
        <div className="absolute bottom-0 left-0 right-0 p-4">
          {/* Fire + Velocity */}
          <div className="flex items-center gap-2 mb-2">
            <span className="text-sm">🔥</span>
            <div className="flex-1 h-1 bg-white/10 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${trendVelocity}%` }}
                transition={{ duration: 1, delay: 0.3 }}
                className="h-full bg-gradient-to-r from-orange-500 to-red-500 rounded-full"
              />
            </div>
            <span className="text-xs text-neutral-300 font-light">{trendVelocity.toFixed(0)}</span>
          </div>

          {/* Aesthetic Badge */}
          <span className="inline-block px-3 py-1 bg-white/10 backdrop-blur-xl rounded-full text-xs text-white font-light border border-white/20 mb-2">
            {aesthetic}
          </span>

          {/* Title */}
          <h3 className="text-white text-base font-light tracking-tight mb-2 line-clamp-2">{title}</h3>

          {/* Creator + Stats */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-full bg-neutral-700 border border-neutral-600 flex items-center justify-center">
                <span className="text-[10px] text-white font-light">{creator.charAt(0).toUpperCase()}</span>
              </div>
              <span className="text-neutral-300 text-xs font-light">{creator}</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-neutral-400 text-xs font-light flex items-center gap-1">
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                  />
                </svg>
                {formatNumber(likes)}
              </span>
              <span className="text-neutral-400 text-xs font-light flex items-center gap-1">
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                </svg>
                {formatNumber(saves)}
              </span>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
