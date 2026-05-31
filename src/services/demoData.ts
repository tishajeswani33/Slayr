import { OutfitAnalysis } from '../types/outfit';

export const DEMO_ANALYSIS: OutfitAnalysis = {
  imageUrl: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=800',
  score: 88,
  aesthetic: 'Minimal Luxury',
  vibe: 'Sophisticated and timeless with clean lines and premium materials',
  clothingItems: [
    {
      type: 'Tailored Blazer',
      color: 'Charcoal Gray',
      description: 'Double-breasted with structured shoulders',
    },
    {
      type: 'White Shirt',
      color: 'Crisp White',
      description: 'Classic button-down with subtle texture',
    },
    {
      type: 'Slim Trousers',
      color: 'Dark Navy',
      description: 'High-waisted with tapered leg',
    },
  ],
  colorPalette: [
    { hex: '#2C2C2C', name: 'Charcoal', dominance: 45 },
    { hex: '#FFFFFF', name: 'Crisp White', dominance: 30 },
    { hex: '#1A1A2E', name: 'Dark Navy', dominance: 25 },
  ],
  recommendations: [
    {
      category: 'Styling',
      suggestion: 'Add structured accessories',
      reasoning: 'Enhances the minimal luxury aesthetic with refined details',
    },
    {
      category: 'Balance',
      suggestion: 'Consider adding texture through fabrics',
      reasoning: 'Breaks up the solid colors while maintaining sophistication',
    },
    {
      category: 'Finishing Touch',
      suggestion: 'Layer with a premium coat',
      reasoning: 'Elevates the overall look for a more executive presence',
    },
  ],
  suggestedAccessories: [
    'Gold watch',
    'Leather belt',
    'Minimalist necklace',
    'Structured handbag',
    'Classic loafers',
  ],
  fashionTags: ['minimal', 'luxury', 'timeless', 'professional', 'sophisticated', 'classic'],
};

// Function to simulate API delay
export function getDemoAnalysis(): Promise<OutfitAnalysis> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(DEMO_ANALYSIS);
    }, 3000); // 3 second delay to simulate API call
  });
}
