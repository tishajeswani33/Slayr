import { motion } from 'framer-motion';
import { ColorPalette as ColorPaletteType } from '../types/outfit';

interface ColorPaletteProps {
  colors: ColorPaletteType[];
}

export default function ColorPalette({ colors }: ColorPaletteProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      className="bg-neutral-900 rounded-3xl p-8 border border-neutral-800"
    >
      <div className="flex items-center gap-3 mb-6">
        <div className="w-2 h-2 rounded-full bg-white animate-pulse" />
        <span className="text-xs text-neutral-500 font-light tracking-widest uppercase">
          Color Palette
        </span>
      </div>
      <div className="space-y-4">
        {colors.map((color, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
            className="flex items-center gap-4"
          >
            <div
              className="w-12 h-12 rounded-full border-2 border-neutral-800 shadow-lg flex-shrink-0"
              style={{ backgroundColor: color.hex }}
            />
            <div className="flex-1 min-w-0">
              <p className="text-sm font-light text-white">{color.name}</p>
              <p className="text-xs text-neutral-500 font-mono">{color.hex}</p>
            </div>
            <div className="text-xs text-neutral-400 font-light tabular-nums">
              {color.dominance}%
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
