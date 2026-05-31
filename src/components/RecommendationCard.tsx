import { motion } from 'framer-motion';
import { Recommendation } from '../types/outfit';

interface RecommendationCardProps {
  recommendations: Recommendation[];
}

export default function RecommendationCard({ recommendations }: RecommendationCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.3 }}
      className="bg-neutral-900 rounded-3xl p-8 border border-neutral-800"
    >
      <div className="flex items-center gap-3 mb-6">
        <div className="w-2 h-2 rounded-full bg-white animate-pulse" />
        <span className="text-xs text-neutral-500 font-light tracking-widest uppercase">
          AI Recommendations
        </span>
      </div>
      <div className="space-y-6">
        {recommendations.map((rec, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.4 + index * 0.1 }}
            className="space-y-2"
          >
            <div className="flex items-baseline gap-2">
              <span className="text-xs text-neutral-600 font-mono">
                {String(index + 1).padStart(2, '0')}
              </span>
              <h4 className="text-sm font-medium text-white tracking-tight">
                {rec.category}
              </h4>
            </div>
            <p className="text-sm text-neutral-300 font-light leading-relaxed pl-7">
              {rec.suggestion}
            </p>
            <p className="text-xs text-neutral-500 font-light italic pl-7">
              {rec.reasoning}
            </p>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
