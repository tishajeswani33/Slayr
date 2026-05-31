import { motion } from 'framer-motion';

interface TrendPillProps {
  status: 'emerging' | 'trending' | 'peak' | 'declining';
  velocity?: number;
  compact?: boolean;
}

const pillConfig = {
  emerging: {
    bg: 'bg-blue-500/10',
    text: 'text-blue-400',
    border: 'border-blue-500/30',
    label: 'Emerging',
    arrow: '↗',
  },
  trending: {
    bg: 'bg-green-500/10',
    text: 'text-green-400',
    border: 'border-green-500/30',
    label: 'Trending',
    arrow: '↑',
  },
  peak: {
    bg: 'bg-amber-500/10',
    text: 'text-amber-400',
    border: 'border-amber-500/30',
    label: 'Peak',
    arrow: '→',
  },
  declining: {
    bg: 'bg-red-500/10',
    text: 'text-red-400',
    border: 'border-red-500/30',
    label: 'Declining',
    arrow: '↓',
  },
};

export default function TrendPill({ status, velocity, compact }: TrendPillProps) {
  const config = pillConfig[status];

  return (
    <motion.span
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className={`inline-flex items-center gap-1 ${config.bg} ${config.text} ${config.border} border rounded-full font-light ${
        compact ? 'px-2 py-0.5 text-[10px]' : 'px-3 py-1 text-xs'
      }`}
    >
      <span>{config.arrow}</span>
      {!compact && <span>{config.label}</span>}
      {velocity !== undefined && (
        <span className="opacity-70">{velocity.toFixed(0)}</span>
      )}
    </motion.span>
  );
}
