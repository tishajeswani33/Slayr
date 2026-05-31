import { motion } from 'framer-motion';

interface OutfitClusterCardProps {
  clusterName: string;
  outfitCount: number;
  avgPopularity: number;
  images: string[];
  topColors: string[];
  onClick?: () => void;
}

export default function OutfitClusterCard({
  clusterName,
  outfitCount,
  avgPopularity,
  images,
  topColors,
  onClick,
}: OutfitClusterCardProps) {
  const gridImages = images.slice(0, 4);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      onClick={onClick}
      className="bg-neutral-900 rounded-3xl border border-neutral-800 overflow-hidden hover:border-neutral-700 transition-all duration-300 cursor-pointer group"
    >
      {/* 2x2 Image Grid */}
      <div className="relative aspect-square">
        <div className="grid grid-cols-2 grid-rows-2 w-full h-full">
          {gridImages.map((img, i) => (
            <div key={i} className="overflow-hidden">
              <img
                src={img}
                alt={`${clusterName} outfit ${i + 1}`}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>
          ))}
          {/* Fill remaining slots if less than 4 images */}
          {Array.from({ length: Math.max(0, 4 - gridImages.length) }).map((_, i) => (
            <div key={`placeholder-${i}`} className="bg-neutral-800" />
          ))}
        </div>

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

        {/* Cluster Name */}
        <div className="absolute bottom-0 left-0 right-0 p-4">
          <h3 className="text-white text-lg font-light tracking-tight">{clusterName}</h3>
        </div>

        {/* Outfit Count Badge */}
        <div className="absolute top-3 right-3 px-3 py-1 bg-black/60 backdrop-blur-xl rounded-full text-xs text-white font-light border border-white/20">
          {outfitCount} outfits
        </div>
      </div>

      {/* Bottom Info */}
      <div className="p-4">
        {/* Popularity Bar */}
        <div className="mb-3">
          <div className="flex justify-between text-xs text-neutral-500 font-light mb-1.5">
            <span>Avg. Popularity</span>
            <span>{avgPopularity.toFixed(0)}%</span>
          </div>
          <div className="h-1.5 bg-neutral-800 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${avgPopularity}%` }}
              transition={{ duration: 1, ease: 'easeOut' }}
              className="h-full bg-gradient-to-r from-white/40 to-white/20 rounded-full"
            />
          </div>
        </div>

        {/* Top Colors */}
        <div className="flex items-center gap-2">
          <span className="text-xs text-neutral-500 font-light">Colors</span>
          <div className="flex gap-1.5">
            {topColors.slice(0, 5).map((color, i) => (
              <div
                key={i}
                className="w-4 h-4 rounded-full border border-neutral-700"
                style={{ backgroundColor: color }}
              />
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
