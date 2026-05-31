export const AESTHETIC_STYLES = [
  'Streetwear',
  'Old Money',
  'Clean Girl',
  'Y2K',
  'Dark Academia',
  'Minimal Luxury',
  'Techwear',
  'Vintage',
  'Scandinavian Minimal',
  'Korean Casual',
] as const;

export const AESTHETIC_DESCRIPTIONS: Record<string, string> = {
  'Streetwear': 'Urban, edgy, and trend-focused with bold graphics and sneakers',
  'Old Money': 'Timeless, refined, and understated luxury with classic silhouettes',
  'Clean Girl': 'Fresh, minimal, and effortlessly chic with neutral tones',
  'Y2K': 'Nostalgic early 2000s with bold colors, metallics, and playful details',
  'Dark Academia': 'Scholarly and romantic with vintage pieces and rich textures',
  'Minimal Luxury': 'Sophisticated simplicity with premium materials and clean lines',
  'Techwear': 'Functional and futuristic with technical fabrics and utility details',
  'Vintage': 'Retro-inspired with unique pieces from past decades',
  'Scandinavian Minimal': 'Clean, functional, and sustainable Nordic design',
  'Korean Casual': 'Trendy, layered, and comfortable with K-fashion influences',
};

export type AestheticStyle = typeof AESTHETIC_STYLES[number];
