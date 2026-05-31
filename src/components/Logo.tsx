import { motion } from 'framer-motion';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg';
  animated?: boolean;
}

export default function Logo({ size = 'md', animated = false }: LogoProps) {
  const sizes = {
    sm: 'text-2xl',
    md: 'text-4xl',
    lg: 'text-6xl',
  };

  const Component = animated ? motion.h1 : 'h1';

  const animationProps = animated
    ? {
        initial: { opacity: 0, y: 20 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.8, ease: 'easeOut' as const },
      }
    : {};

  return (
    <Component
      className={`${sizes[size]} font-light text-white tracking-tight`}
      {...animationProps}
    >
      slayr
    </Component>
  );
}
