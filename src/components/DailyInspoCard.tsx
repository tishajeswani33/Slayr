import { motion } from 'framer-motion';
import { useState } from 'react';

interface DailyInspoCardProps {
  title: string;
  description: string;
  imageUrl: string;
  aesthetic: string;
}

export default function DailyInspoCard({ title, description, imageUrl, aesthetic }: DailyInspoCardProps) {
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6 }}
      className="relative overflow-hidden rounded-3xl bg-neutral-900 border border-neutral-800 cursor-pointer group"
    >
      <div className="relative aspect-[16/9] overflow-hidden">
        {!imageLoaded && <div className="absolute inset-0 animate-pulse bg-neutral-800" />}
        <img
          src={imageUrl}
          alt={title}
          onLoad={() => setImageLoaded(true)}
          className={`w-full h-full object-cover transition-all duration-700 ${
            imageLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-105'
          } group-hover:scale-110`}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />

        <div className="absolute inset-0 p-6 flex flex-col justify-end">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
            <span className="text-xs text-white/80 font-light tracking-widest uppercase">
              Daily Inspiration
            </span>
          </div>
          <h3 className="text-white text-2xl font-light mb-2 tracking-tight">{title}</h3>
          <p className="text-white/80 text-sm font-light mb-4">{description}</p>
          <div className="flex items-center gap-3">
            <span className="px-4 py-1.5 bg-white/10 backdrop-blur-xl rounded-full text-xs text-white font-light border border-white/20">
              {aesthetic}
            </span>
            <motion.button
              whileHover={{ x: 4 }}
              className="text-white text-sm font-light flex items-center gap-2"
            >
              Explore
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </motion.button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
