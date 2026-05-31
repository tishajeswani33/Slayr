import { motion } from 'framer-motion';

interface AestheticPillProps {
  aesthetic: string;
  isActive?: boolean;
  onClick?: () => void;
}

export default function AestheticPill({ aesthetic, isActive = false, onClick }: AestheticPillProps) {
  return (
    <motion.button
      onClick={onClick}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className={`px-6 py-2.5 rounded-full text-sm font-light transition-all duration-300 whitespace-nowrap ${
        isActive
          ? 'bg-white text-black border border-white'
          : 'bg-neutral-900 text-neutral-300 border border-neutral-800 hover:border-neutral-700'
      }`}
    >
      {aesthetic}
    </motion.button>
  );
}
