import { motion } from 'framer-motion';

interface LoadingShimmerProps {
  className?: string;
}

export default function LoadingShimmer({ className = 'h-20' }: LoadingShimmerProps) {
  return (
    <div className={`relative overflow-hidden bg-neutral-900 rounded-2xl ${className}`}>
      <motion.div
        className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-neutral-800 to-transparent"
        animate={{
          translateX: ['100%', '100%'],
        }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          ease: 'linear',
        }}
      />
    </div>
  );
}
