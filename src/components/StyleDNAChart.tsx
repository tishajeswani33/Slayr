import { motion } from 'framer-motion';

interface StyleDNAChartProps {
  data: { aesthetic: string; percentage: number; color: string }[];
}

export default function StyleDNAChart({ data }: StyleDNAChartProps) {
  const sorted = [...data].sort((a, b) => b.percentage - a.percentage);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-4"
    >
      {sorted.map((item, index) => (
        <div key={item.aesthetic} className="group">
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-sm text-neutral-300 font-light">{item.aesthetic}</span>
            <span className="text-sm text-neutral-500 font-light">{item.percentage.toFixed(0)}%</span>
          </div>
          <div className="h-2 bg-neutral-800 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${item.percentage}%` }}
              transition={{
                duration: 1,
                delay: index * 0.1,
                ease: 'easeOut',
              }}
              className="h-full rounded-full"
              style={{ backgroundColor: item.color }}
            />
          </div>
        </div>
      ))}
    </motion.div>
  );
}
