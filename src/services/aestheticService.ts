import { AestheticCategory } from '../types/moodboard';

export const AESTHETIC_CATEGORIES: AestheticCategory[] = [
  'Minimal Luxury',
  'Streetwear',
  'Korean Casual',
  'Scandinavian Minimal',
  'Dark Academia',
  'Old Money',
  'Y2K',
  'Techwear',
  'Clean Girl',
  'Cyber Minimal',
  'Futuristic Editorial',
];

export const AESTHETIC_DESCRIPTIONS: Record<AestheticCategory, string> = {
  'Minimal Luxury': 'Clean lines, premium materials, timeless sophistication',
  'Streetwear': 'Urban edge, bold graphics, sneaker culture',
  'Korean Casual': 'Trendy layers, K-fashion influences, effortlessly cool',
  'Scandinavian Minimal': 'Functional design, sustainable, Nordic simplicity',
  'Dark Academia': 'Scholarly romance, vintage pieces, rich textures',
  'Old Money': 'Understated wealth, classic silhouettes, refined elegance',
  'Y2K': 'Early 2000s nostalgia, metallics, playful boldness',
  'Techwear': 'Technical fabrics, utility focused, futuristic function',
  'Clean Girl': 'Fresh femininity, minimal makeup, neutral tones',
  'Cyber Minimal': 'Digital sleekness, monochrome, tech accents',
  'Futuristic Editorial': 'Avant-garde vision, architectural, high fashion',
};

export const AESTHETIC_COLORS: Record<AestheticCategory, string[]> = {
  'Minimal Luxury': ['#FFFFFF', '#2C2C2C', '#F5F5F5'],
  'Streetwear': ['#000000', '#FF6B6B', '#FFFFFF'],
  'Korean Casual': ['#E8D5C4', '#9B6B6B', '#F0F0F0'],
  'Scandinavian Minimal': ['#FAFAFA', '#B8B8B8', '#4A4A4A'],
  'Dark Academia': ['#8B4513', '#2F1B1B', '#D4A574'],
  'Old Money': ['#1C1C1C', '#C9B896', '#FFFFFF'],
  'Y2K': ['#FF1493', '#00FFFF', '#FFFFFF'],
  'Techwear': ['#0A0A0A', '#3D3D3D', '#FFFFFF'],
  'Clean Girl': ['#F8F8F8', '#D4B5A0', '#FFFFFF'],
  'Cyber Minimal': ['#000000', '#FFFFFF', '#00FF00'],
  'Futuristic Editorial': ['#FFFFFF', '#000000', '#C0C0C0'],
};

export function getAestheticColor(aesthetic: string): string {
  const colors = AESTHETIC_COLORS[aesthetic as AestheticCategory];
  return colors ? colors[0] : '#FFFFFF';
}

export function getAestheticDescription(aesthetic: string): string {
  return AESTHETIC_DESCRIPTIONS[aesthetic as AestheticCategory] || '';
}
