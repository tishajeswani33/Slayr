import { motion } from 'framer-motion';

interface FashionTagsProps {
  tags: string[];
}

export default function FashionTags({ tags }: FashionTagsProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.4 }}
      className="bg-neutral-900 rounded-3xl p-8 border border-neutral-800"
    >
      <div className="flex items-center gap-3 mb-6">
        <div className="w-2 h-2 rounded-full bg-white animate-pulse" />
        <span className="text-xs text-neutral-500 font-light tracking-widest uppercase">
          Fashion Tags
        </span>
      </div>
      <div className="flex flex-wrap gap-2">
        {tags.map((tag, index) => (
          <motion.span
            key={index}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.45 + index * 0.05 }}
            className="px-4 py-1.5 bg-white/5 border border-neutral-800 rounded-full text-xs text-neutral-400 font-light tracking-wide"
          >
            #{tag}
          </motion.span>
        ))}
      </div>
    </motion.div>
  );
}
