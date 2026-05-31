import { useState, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import { generateMassiveGenZDataset } from '../data/genzFashionDataset';
import { detectTrendingAesthetics, getRisingTrends, getViralAesthetics, TrendSignal, predictTrendStatus } from '../services/trendPredictionEngine';
import TrendCard from '../components/TrendCard';
import ViralStyleCard from '../components/ViralStyleCard';
import TrendPill from '../components/TrendPill';

interface TrendRadarScreenProps {
  onClose: () => void;
}

const trendColorPalettes = [
  { name: 'Quiet Luxury', colors: ['#F5F0EB', '#D4C5B2', '#A69279', '#2C2C2C', '#1A1A1A'] },
  { name: 'Dopamine Rush', colors: ['#FF6B6B', '#FFE66D', '#4ECDC4', '#FF85A1', '#A855F7'] },
  { name: 'Dark Romantic', colors: ['#1A0A0A', '#4A1A2E', '#8B1538', '#C9B896', '#2C2C2C'] },
  { name: 'Coastal Clean', colors: ['#E8F4F8', '#B2D8E4', '#87CEEB', '#F5F5F5', '#DEB887'] },
  { name: 'Neo Grunge', colors: ['#000000', '#1C1C1C', '#8B4513', '#556B2F', '#708090'] },
  { name: 'Y2K Revival', colors: ['#FF69B4', '#00FFFF', '#C0C0C0', '#FF1493', '#7B68EE'] },
];

export default function TrendRadarScreen({ onClose }: TrendRadarScreenProps) {
  const [trendSignals, setTrendSignals] = useState<TrendSignal[]>([]);
  const [loading, setLoading] = useState(true);

  const dataset = useMemo(() => generateMassiveGenZDataset(50000), []);

  useEffect(() => {
    setLoading(true);
    const signals = detectTrendingAesthetics(dataset);
    setTrendSignals(signals);
    setLoading(false);
  }, [dataset]);

  const risingTrends = useMemo(() => getRisingTrends(trendSignals), [trendSignals]);
  const viralAesthetics = useMemo(() => getViralAesthetics(trendSignals), [trendSignals]);

  // Generate viral style cards from viral aesthetics
  const viralStyleCards = useMemo(() => {
    const platforms = ['TikTok', 'Pinterest', 'Instagram'];
    const creators = ['@stylevault', '@aestheticaly', '@vibecheck', '@fitarchive', '@looklab', '@trendwatch'];
    return viralAesthetics.map((signal, i) => ({
      title: `${signal.aesthetic} — the look everyone's saving`,
      imageUrl: `https://images.unsplash.com/photo-${1490481651871 + (i * 137)}?w=800`,
      aesthetic: signal.aesthetic,
      likes: Math.floor(signal.viralScore * 1200 + Math.random() * 50000),
      saves: Math.floor(signal.saveRate * 80000 + Math.random() * 20000),
      creator: creators[i % creators.length],
      platform: platforms[i % platforms.length],
      trendVelocity: signal.trendVelocity,
    }));
  }, [viralAesthetics]);

  return (
    <div className="fixed inset-0 bg-black z-50 overflow-y-auto">
      {/* Header */}
      <div className="sticky top-0 z-20 bg-black/80 backdrop-blur-xl border-b border-neutral-900">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
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
            <h1 className="text-2xl font-light text-white tracking-tight">Trend Radar</h1>
          </div>
          <div className="flex items-center gap-3">
            <div className="px-3 py-1.5 bg-green-500/10 border border-green-500/30 rounded-full text-xs text-green-400 font-light flex items-center gap-1.5">
              <div className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse" />
              Live
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-12">
        {loading ? (
          <div className="space-y-8">
            <div className="h-32 bg-neutral-900 rounded-3xl animate-pulse" />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="h-64 bg-neutral-900 rounded-3xl animate-pulse" />
              ))}
            </div>
          </div>
        ) : (
          <>
            {/* Hero */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-14"
            >
              <h2 className="text-5xl font-light text-white mb-4 tracking-tight">
                What's trending in Gen Z fashion
              </h2>
              <p className="text-neutral-400 font-light text-xl max-w-2xl">
                Real-time trend intelligence powered by AI — analyzing {dataset.length.toLocaleString()} outfits across aesthetics, platforms, and creators.
              </p>
            </motion.div>

            {/* Rising Trends */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="mb-14"
            >
              <div className="flex items-center gap-3 mb-6">
                <h3 className="text-2xl font-light text-white">Rising Trends</h3>
                <span className="text-xl">📈</span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {risingTrends.map((trend, index) => {
                  const prediction = predictTrendStatus(trend);
                  return (
                    <motion.div
                      key={trend.aesthetic}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 + index * 0.08 }}
                    >
                      <TrendCard
                        aesthetic={trend.aesthetic}
                        velocity={trend.trendVelocity}
                        popularity={trend.currentPopularity}
                        growth={trend.projectedGrowth}
                        status={prediction.status}
                        viralScore={trend.viralScore}
                        engagementRate={trend.engagementRate}
                        saveRate={trend.saveRate}
                      />
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>

            {/* Viral Aesthetics */}
            {viralStyleCards.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="mb-14"
              >
                <div className="flex items-center gap-3 mb-6">
                  <h3 className="text-2xl font-light text-white">Viral Aesthetics</h3>
                  <span className="text-xl">🔥</span>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {viralStyleCards.map((card, index) => (
                    <motion.div
                      key={card.aesthetic}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 + index * 0.06 }}
                    >
                      <ViralStyleCard {...card} />
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Trending Color Palettes */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="mb-14"
            >
              <div className="flex items-center gap-3 mb-6">
                <h3 className="text-2xl font-light text-white">Trending Color Palettes</h3>
                <span className="text-xl">🎨</span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {trendColorPalettes.map((palette, index) => (
                  <motion.div
                    key={palette.name}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.35 + index * 0.06 }}
                    className="bg-neutral-900 rounded-2xl p-5 border border-neutral-800 hover:border-neutral-700 transition-all"
                  >
                    <h4 className="text-sm font-light text-white mb-3">{palette.name}</h4>
                    <div className="flex gap-2">
                      {palette.colors.map((color, ci) => (
                        <div
                          key={ci}
                          className="flex-1 aspect-square rounded-full border border-neutral-700"
                          style={{ backgroundColor: color }}
                        />
                      ))}
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Full Trend Ranking */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <h3 className="text-2xl font-light text-white mb-6">Full Trend Ranking</h3>
              <div className="space-y-4">
                {trendSignals.slice(0, 12).map((signal, index) => {
                  const prediction = predictTrendStatus(signal);
                  return (
                    <motion.div
                      key={signal.aesthetic}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.45 + index * 0.05 }}
                      className="bg-neutral-900 rounded-2xl p-5 border border-neutral-800 hover:border-neutral-700 transition-all flex items-center gap-6"
                    >
                      <div className="text-2xl font-light text-neutral-600 w-12 text-center">
                        #{index + 1}
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-2">
                          <h4 className="text-lg font-light text-white">{signal.aesthetic}</h4>
                          <TrendPill status={prediction.status} compact />
                        </div>

                        {/* Velocity bar */}
                        <div className="flex items-center gap-3">
                          <div className="flex-1 h-1.5 bg-neutral-800 rounded-full overflow-hidden">
                            <motion.div
                              initial={{ width: 0 }}
                              animate={{ width: `${signal.trendVelocity}%` }}
                              transition={{ duration: 1, delay: 0.5 + index * 0.05 }}
                              className="h-full bg-gradient-to-r from-green-500 to-emerald-400 rounded-full"
                            />
                          </div>
                          <span className="text-xs text-neutral-500 font-light w-16 text-right">
                            {signal.trendVelocity.toFixed(0)} vel.
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center gap-6">
                        <div className="text-right">
                          <p className="text-xs text-neutral-500 mb-0.5">Viral</p>
                          <p className="text-base font-light text-white">{signal.viralScore.toFixed(0)}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-xs text-neutral-500 mb-0.5">Engagement</p>
                          <p className="text-base font-light text-white">{(signal.engagementRate * 100).toFixed(0)}%</p>
                        </div>
                        <div className="text-right">
                          <p className="text-xs text-neutral-500 mb-0.5">Growth</p>
                          <p className="text-base font-light text-green-400">+{signal.projectedGrowth.toFixed(0)}%</p>
                        </div>
                        {signal.isRising && (
                          <div className="w-8 h-8 rounded-full bg-green-500/10 flex items-center justify-center text-green-400">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                            </svg>
                          </div>
                        )}
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          </>
        )}
      </div>
    </div>
  );
}
