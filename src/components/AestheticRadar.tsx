import { motion } from 'framer-motion';

interface AestheticRadarProps {
  dimensions: { label: string; value: number }[];
  size?: number;
}

export default function AestheticRadar({ dimensions, size = 280 }: AestheticRadarProps) {
  const cx = size / 2;
  const cy = size / 2;
  const radius = size * 0.35;
  const levels = 4;

  const angleStep = (2 * Math.PI) / dimensions.length;

  // Get point position for a given index and value (0-100)
  const getPoint = (index: number, value: number) => {
    const angle = angleStep * index - Math.PI / 2;
    const r = (value / 100) * radius;
    return {
      x: cx + r * Math.cos(angle),
      y: cy + r * Math.sin(angle),
    };
  };

  // Build the data polygon path
  const dataPoints = dimensions.map((dim, i) => getPoint(i, dim.value));
  const dataPath = dataPoints.map((p, i) => `${i === 0 ? 'M' : 'L'}${p.x},${p.y}`).join(' ') + ' Z';

  // Build level rings
  const levelRings = Array.from({ length: levels }, (_, level) => {
    const levelValue = ((level + 1) / levels) * 100;
    const points = dimensions.map((_, i) => getPoint(i, levelValue));
    return points.map((p, i) => `${i === 0 ? 'M' : 'L'}${p.x},${p.y}`).join(' ') + ' Z';
  });

  // Axis lines from center to outer ring
  const axisLines = dimensions.map((_, i) => {
    const outer = getPoint(i, 100);
    return { x1: cx, y1: cy, x2: outer.x, y2: outer.y };
  });

  // Label positions (slightly beyond outer ring)
  const labelPositions = dimensions.map((dim, i) => {
    const point = getPoint(i, 118);
    return { ...point, label: dim.label, value: dim.value };
  });

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
      className="flex flex-col items-center"
    >
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="overflow-visible">
        <defs>
          <linearGradient id="radarFill" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="rgba(255, 255, 255, 0.15)" />
            <stop offset="100%" stopColor="rgba(255, 255, 255, 0.05)" />
          </linearGradient>
          <linearGradient id="radarStroke" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="rgba(255, 255, 255, 0.6)" />
            <stop offset="100%" stopColor="rgba(255, 255, 255, 0.2)" />
          </linearGradient>
        </defs>

        {/* Level rings */}
        {levelRings.map((ring, i) => (
          <path
            key={`ring-${i}`}
            d={ring}
            fill="none"
            stroke="rgba(255, 255, 255, 0.06)"
            strokeWidth={1}
          />
        ))}

        {/* Axis lines */}
        {axisLines.map((line, i) => (
          <line
            key={`axis-${i}`}
            x1={line.x1}
            y1={line.y1}
            x2={line.x2}
            y2={line.y2}
            stroke="rgba(255, 255, 255, 0.06)"
            strokeWidth={1}
          />
        ))}

        {/* Data polygon */}
        <motion.path
          d={dataPath}
          fill="url(#radarFill)"
          stroke="url(#radarStroke)"
          strokeWidth={1.5}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.3 }}
        />

        {/* Data points */}
        {dataPoints.map((point, i) => (
          <motion.circle
            key={`point-${i}`}
            cx={point.x}
            cy={point.y}
            r={3}
            fill="white"
            initial={{ opacity: 0, r: 0 }}
            animate={{ opacity: 0.8, r: 3 }}
            transition={{ duration: 0.4, delay: 0.5 + i * 0.08 }}
          />
        ))}

        {/* Labels */}
        {labelPositions.map((pos, i) => (
          <text
            key={`label-${i}`}
            x={pos.x}
            y={pos.y}
            textAnchor="middle"
            dominantBaseline="middle"
            className="fill-neutral-400 text-[10px] font-light"
          >
            {pos.label}
          </text>
        ))}
      </svg>
    </motion.div>
  );
}
