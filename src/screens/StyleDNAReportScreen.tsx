import { useMemo } from 'react';
import { motion } from 'framer-motion';
import AestheticRadar from '../components/AestheticRadar';
import StyleDNAChart from '../components/StyleDNAChart';

interface StyleDNAReportScreenProps {
  onClose: () => void;
}

// Demo style DNA data
const radarDimensions = [
  { label: 'Minimal', value: 82 },
  { label: 'Bold', value: 45 },
  { label: 'Classic', value: 70 },
  { label: 'Trendy', value: 88 },
  { label: 'Edgy', value: 35 },
  { label: 'Romantic', value: 55 },
  { label: 'Casual', value: 68 },
  { label: 'Refined', value: 78 },
];

const aestheticBreakdown = [
  { aesthetic: 'Minimal Luxury', percentage: 34, color: '#E8E8E8' },
  { aesthetic: 'Clean Girl', percentage: 22, color: '#D4B5A0' },
  { aesthetic: 'Korean Casual', percentage: 18, color: '#9B6B6B' },
  { aesthetic: 'Coquette', percentage: 12, color: '#FFB6C1' },
  { aesthetic: 'Streetwear', percentage: 8, color: '#FF6B6B' },
  { aesthetic: 'Dark Academia', percentage: 6, color: '#4A4A4A' },
];

const statsCards = [
  { label: 'Fashion IQ', value: '94', subtitle: 'Top 6%', icon: '🧠' },
  { label: 'Trend Score', value: '87', subtitle: 'Ahead of curve', icon: '📈' },
  { label: 'Style Maturity', value: '8.2', subtitle: 'Advanced', icon: '💎' },
  { label: 'Vibe Score', value: '91', subtitle: 'Iconic energy', icon: '✨' },
];

const colorAffinities = [
  { color: '#FFFFFF', name: 'White', percentage: 28 },
  { color: '#2C2C2C', name: 'Charcoal', percentage: 22 },
  { color: '#F5F0EB', name: 'Cream', percentage: 18 },
  { color: '#D4B5A0', name: 'Warm Sand', percentage: 14 },
  { color: '#C9B896', name: 'Gold Mist', percentage: 10 },
  { color: '#9B6B6B', name: 'Dusty Rose', percentage: 8 },
];

const styleTimeline = [
  { period: '6 months ago', aesthetic: 'Streetwear', note: 'Bold, expressive phase' },
  { period: '4 months ago', aesthetic: 'Korean Casual', note: 'Discovered layered styling' },
  { period: '2 months ago', aesthetic: 'Clean Girl', note: 'Minimalism awakening' },
  { period: 'Now', aesthetic: 'Minimal Luxury', note: 'Peak sophistication' },
];

const recommendations = [
  { aesthetic: 'Scandinavian Minimal', match: 92, reason: 'Complements your love for clean lines' },
  { aesthetic: 'Old Money', match: 88, reason: 'Aligns with your refined taste' },
  { aesthetic: 'Quiet Luxury', match: 85, reason: 'Natural evolution of your style' },
];

export default function StyleDNAReportScreen({ onClose }: StyleDNAReportScreenProps) {
  const personalityDescription = useMemo(
    () =>
      "You're a Quiet Maximalist — someone who values quality over quantity, gravitates toward understated elegance, yet isn't afraid to push boundaries with unexpected silhouettes. Your style DNA reveals a strong preference for muted tones, premium textures, and pieces that whisper rather than shout. You dress with intention — every piece serves a purpose, and your aesthetic has matured significantly over the past six months.",
    []
  );

  return (
    <div className="fixed inset-0 bg-black z-50 overflow-y-auto">
      {/* Header */}
      <div className="sticky top-0 z-20 bg-black/80 backdrop-blur-xl border-b border-neutral-900">
        <div className="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <motion.button
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              onClick={onClose}
              className="text-neutral-400 hover:text-white transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 19l-7-7 7-7" />
              </svg>
            </motion.button>
            <h1 className="text-2xl font-light text-white tracking-tight">Your Style DNA</h1>
          </div>
          <div className="px-3 py-1.5 bg-white/5 border border-neutral-800 rounded-full text-xs text-neutral-400 font-light">
            Updated today
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-10">
        {/* Hero */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-light text-white tracking-tight mb-3">Style Intelligence Report</h2>
          <p className="text-neutral-400 font-light text-base max-w-lg mx-auto">
            Your personal fashion genome — decoded from your saves, likes, and aesthetic preferences.
          </p>
        </motion.div>

        {/* Aesthetic Radar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-neutral-900 rounded-3xl p-8 border border-neutral-800 mb-8"
        >
          <h3 className="text-xl font-light text-white mb-6 text-center tracking-tight">Style Dimensions</h3>
          <div className="flex justify-center">
            <AestheticRadar dimensions={radarDimensions} size={300} />
          </div>
        </motion.div>

        {/* Stats Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8"
        >
          {statsCards.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + index * 0.06 }}
              className="bg-neutral-900 rounded-2xl p-5 border border-neutral-800 text-center"
            >
              <span className="text-2xl mb-2 block">{stat.icon}</span>
              <p className="text-2xl font-light text-white mb-0.5">{stat.value}</p>
              <p className="text-xs text-neutral-500 font-light mb-0.5">{stat.label}</p>
              <p className="text-[10px] text-neutral-600 font-light">{stat.subtitle}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Aesthetic Breakdown */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-neutral-900 rounded-3xl p-6 border border-neutral-800 mb-8"
        >
          <h3 className="text-xl font-light text-white mb-6 tracking-tight">Aesthetic Breakdown</h3>
          <StyleDNAChart data={aestheticBreakdown} />
        </motion.div>

        {/* Color Affinity */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
          className="bg-neutral-900 rounded-3xl p-6 border border-neutral-800 mb-8"
        >
          <h3 className="text-xl font-light text-white mb-6 tracking-tight">Color Affinity</h3>
          <div className="grid grid-cols-3 md:grid-cols-6 gap-4">
            {colorAffinities.map((ca, index) => (
              <motion.div
                key={ca.name}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3 + index * 0.06 }}
                className="flex flex-col items-center"
              >
                <div
                  className="w-14 h-14 rounded-full border border-neutral-700 mb-2"
                  style={{ backgroundColor: ca.color }}
                />
                <p className="text-xs text-white font-light text-center">{ca.name}</p>
                <p className="text-[10px] text-neutral-500 font-light">{ca.percentage}%</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Style Evolution Timeline */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-neutral-900 rounded-3xl p-6 border border-neutral-800 mb-8"
        >
          <h3 className="text-xl font-light text-white mb-6 tracking-tight">Your Style Evolution</h3>
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-[15px] top-2 bottom-2 w-px bg-neutral-800" />

            <div className="space-y-6">
              {styleTimeline.map((entry, index) => (
                <motion.div
                  key={entry.period}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.35 + index * 0.08 }}
                  className="flex items-start gap-4 relative"
                >
                  <div
                    className={`w-[30px] h-[30px] rounded-full border flex items-center justify-center flex-shrink-0 z-10 ${
                      index === styleTimeline.length - 1
                        ? 'bg-white border-white'
                        : 'bg-neutral-900 border-neutral-700'
                    }`}
                  >
                    <div
                      className={`w-2 h-2 rounded-full ${
                        index === styleTimeline.length - 1 ? 'bg-black' : 'bg-neutral-500'
                      }`}
                    />
                  </div>
                  <div>
                    <p className="text-xs text-neutral-500 font-light mb-0.5">{entry.period}</p>
                    <p className="text-white text-sm font-light">{entry.aesthetic}</p>
                    <p className="text-neutral-400 text-xs font-light">{entry.note}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Recommendations */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35 }}
          className="bg-neutral-900 rounded-3xl p-6 border border-neutral-800 mb-8"
        >
          <h3 className="text-xl font-light text-white mb-6 tracking-tight">Aesthetic Recommendations</h3>
          <div className="space-y-4">
            {recommendations.map((rec, index) => (
              <motion.div
                key={rec.aesthetic}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 + index * 0.06 }}
                className="flex items-center justify-between p-4 bg-neutral-800/30 rounded-2xl border border-neutral-800 hover:border-neutral-700 transition-all cursor-pointer"
              >
                <div>
                  <p className="text-white text-sm font-light mb-0.5">{rec.aesthetic}</p>
                  <p className="text-neutral-500 text-xs font-light">{rec.reason}</p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-light text-green-400">{rec.match}%</span>
                  <span className="text-xs text-neutral-600">match</span>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Personality */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-neutral-900 rounded-3xl p-6 border border-neutral-800 mb-12"
        >
          <h3 className="text-xl font-light text-white mb-4 tracking-tight">Fashion Personality</h3>
          <div className="flex items-center gap-3 mb-4">
            <span className="px-4 py-1.5 bg-white text-black rounded-full text-sm font-light">Quiet Maximalist</span>
            <span className="text-neutral-500 text-xs font-light">Your archetype</span>
          </div>
          <p className="text-neutral-400 text-sm font-light leading-relaxed">{personalityDescription}</p>
        </motion.div>
      </div>
    </div>
  );
}
