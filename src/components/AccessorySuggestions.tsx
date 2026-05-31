import { motion } from 'framer-motion';

interface AccessorySuggestionsProps {
  accessories: string[];
}

export default function AccessorySuggestions({ accessories }: AccessorySuggestionsProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.35 }}
      className="bg-neutral-900 rounded-3xl p-8 border border-neutral-800"
    >
      <div className="flex items-center gap-3 mb-6">
        <div className="w-2 h-2 rounded-full bg-white animate-pulse" />
        <span className="text-xs text-neutral-500 font-light tracking-widest uppercase">
          Suggested Accessories
        </span>
      </div>
      <div className="flex flex-wrap gap-3">
        {accessories.map((accessory, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, delay: 0.4 + index * 0.06 }}
            className="px-5 py-2.5 bg-neutral-800/50 border border-neutral-700 rounded-full text-sm text-neutral-300 font-light hover:bg-neutral-800 hover:border-neutral-600 transition-all"
          >
            {accessory}
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
