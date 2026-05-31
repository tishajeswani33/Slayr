import { motion } from 'framer-motion';

interface TrendCardProps {
  aesthetic: string;
  velocity: number;
  popularity: number;
  growth: number;
  status: string;
  viralScore: number;
  engagementRate: number;
  saveRate: number;
  onClick?: () => void;
}

const statusConfig: Record<string, { bg: string; text: string; border: string }> = {
  emerging: { bg: 'bg-blue-500/10', text: 'text-blue-400', border: 'border-blue-500/30' },
  trending: { bg: 'bg-green-500/10', text: 'text-green-400', border: 'border-green-500/30' },
  peak: { bg: 'bg-amber-500/10', text: 'text-amber-400', border: 'border-amber-500/30' },
  declining: { bg: 'bg-red-500/10', text: 'text-red-400', border: 'border-red-500/30' },
};

export default function TrendCard({
  aesthetic,
  velocity,
  popularity,
  growth,
  status,
  viralScore,
  engagementRate,
  saveRate,
  onClick,
}: TrendCardProps) {
  const statusStyle = statusConfig[status] || statusConfig.emerging;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      onClick={onClick}
      className="bg-neutral-900 rounded-3xl p-6 border border-neutral-800 hover:border-neutral-700 transition-all duration-300 cursor-pointer group relative overflow-hidden"
    >
      {/* Subtle glow on hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/[0.02] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

      {/* Header */}
      <div className="flex items-start justify-between mb-5 relative">
        <div>
          <h3 className="text-xl font-light text-white tracking-tight mb-1">{aesthetic}</h3>
          <p className="text-neutral-500 text-xs font-light">Popularity {popularity.toFixed(0)}%</p>
        </div>
        <span
          className={`px-3 py-1 ${statusStyle.bg} ${statusStyle.text} ${statusStyle.border} border rounded-full text-xs font-light capitalize`}
        >
          {status}
        </span>
      </div>

      {/* Trend Velocity Bar */}
      <div className="mb-5 relative">
        <div className="flex justify-between text-xs text-neutral-500 font-light mb-2">
          <span>Trend Velocity</span>
          <span>{velocity.toFixed(0)}/100</span>
        </div>
        <div className="h-2 bg-neutral-800 rounded-full overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${Math.min(velocity, 100)}%` }}
            transition={{ duration: 1.2, ease: 'easeOut' }}
            className="h-full bg-gradient-to-r from-green-500 to-emerald-400 rounded-full"
          />
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 gap-4 pt-4 border-t border-neutral-800 relative">
        <div>
          <p className="text-xs text-neutral-500 font-light mb-1">Viral Score</p>
          <p className="text-lg font-light text-white">{viralScore.toFixed(0)}</p>
        </div>
        <div>
          <p className="text-xs text-neutral-500 font-light mb-1">Engagement</p>
          <p className="text-lg font-light text-white">{(engagementRate * 100).toFixed(1)}%</p>
        </div>
        <div>
          <p className="text-xs text-neutral-500 font-light mb-1">Save Rate</p>
          <p className="text-lg font-light text-white">{(saveRate * 100).toFixed(1)}%</p>
        </div>
        <div>
          <p className="text-xs text-neutral-500 font-light mb-1">Growth</p>
          <p className="text-lg font-light text-green-400">+{growth.toFixed(0)}%</p>
        </div>
      </div>
    </motion.div>
  );
}
