import { motion } from 'framer-motion';

interface AestheticBadgeProps {
  aesthetic: string;
  vibe: string;
}

export default function AestheticBadge({ aesthetic, vibe }: AestheticBadgeProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.1 }}
      className="bg-neutral-900 rounded-3xl p-8 border border-neutral-800"
    >
      <div className="flex items-center gap-3 mb-4">
        <div className="w-2 h-2 rounded-full bg-white animate-pulse" />
        <span className="text-xs text-neutral-500 font-light tracking-widest uppercase">
          Aesthetic
        </span>
      </div>
      <h3 className="text-2xl font-light text-white mb-3 tracking-tight">
        {aesthetic}
      </h3>
      <p className="text-sm text-neutral-400 font-light leading-relaxed">
        {vibe}
      </p>
    </motion.div>
  );
}
