import { motion } from 'framer-motion';
import { ClothingItem } from '../types/outfit';

interface ClothingItemsProps {
  items: ClothingItem[];
}

export default function ClothingItems({ items }: ClothingItemsProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.25 }}
      className="bg-neutral-900 rounded-3xl p-8 border border-neutral-800"
    >
      <div className="flex items-center gap-3 mb-6">
        <div className="w-2 h-2 rounded-full bg-white animate-pulse" />
        <span className="text-xs text-neutral-500 font-light tracking-widest uppercase">
          Detected Items
        </span>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {items.map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, delay: 0.35 + index * 0.08 }}
            className="bg-neutral-800/50 rounded-2xl p-5 border border-neutral-700/50 hover:border-neutral-600 transition-colors"
          >
            <div className="flex items-start gap-3">
              <div className="w-1.5 h-1.5 rounded-full bg-neutral-500 mt-2 flex-shrink-0" />
              <div className="flex-1 min-w-0">
                <h4 className="text-sm font-medium text-white mb-1">
                  {item.type}
                </h4>
                <p className="text-xs text-neutral-400 mb-2">
                  {item.color}
                </p>
                <p className="text-xs text-neutral-500 font-light leading-relaxed">
                  {item.description}
                </p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
