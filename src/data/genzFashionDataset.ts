import { FashionOutfit, AestheticStyle, Gender, Season } from '../types/fashion';
import { getAestheticImage } from '../utils/imageUrls';

// Gen Z Trend Tags
// const GEN_Z_TRENDS = [
//   'viral', 'trending', 'pinterest-core', 'tiktok-approved', 'aesthetic', 
//   'main-character', 'clean', 'effortless', 'layered', 'oversized',
//   'vintage-inspired', 'quiet-luxury', 'dopamine-dressing', 'grunge-revival',
//   'coastal-grandmother', 'cottage-core', 'dark-feminine', 'light-feminine'
// ];

// Expanded Aesthetic Templates for Gen Z
const GEN_Z_AESTHETICS = {
  'Minimal Luxury': {
    male: {
      items: ['Tailored blazer', 'Premium tee', 'Slim trousers', 'Cashmere sweater', 'Oxford shirt', 'Wool coat', 'Knit polo'],
      accessories: ['Leather watch', 'Minimal belt', 'Designer loafers', 'Silver ring', 'Leather bag', 'Sunglasses'],
      colors: ['#FFFFFF', '#2C2C2C', '#F5F5F5', '#E8E8E8', '#1A1A1A'],
      vibes: ['Sophisticated', 'Timeless', 'Refined', 'Premium', 'Elevated'],
      trends: ['quiet-luxury', 'clean', 'effortless', 'main-character'],
    },
    female: {
      items: ['Silk blouse', 'Tailored pants', 'Cashmere cardigan', 'Midi skirt', 'Structured blazer', 'Slip dress', 'Knit dress'],
      accessories: ['Gold necklace', 'Leather handbag', 'Minimal earrings', 'Classic pumps', 'Silk scarf', 'Pearl studs'],
      colors: ['#FFFFFF', '#2C2C2C', '#F5F5F5', '#C9B896', '#E8D5C4'],
      vibes: ['Elegant', 'Sophisticated', 'Chic', 'Timeless', 'Refined'],
      trends: ['quiet-luxury', 'clean-girl', 'pinterest-core', 'effortless'],
    },
  },
  'Streetwear': {
    male: {
      items: ['Oversized hoodie', 'Cargo pants', 'Graphic tee', 'Bomber jacket', 'Track pants', 'Denim jacket', 'Puffer vest'],
      accessories: ['Chunky sneakers', 'Baseball cap', 'Chain necklace', 'Crossbody bag', 'Beanie', 'Statement watch'],
      colors: ['#000000', '#FF6B6B', '#FFFFFF', '#808080', '#00FF00', '#FF00FF'],
      vibes: ['Urban', 'Bold', 'Edgy', 'Trendy', 'Cool'],
      trends: ['viral', 'tiktok-approved', 'oversized', 'layered', 'trending'],
    },
    female: {
      items: ['Oversized hoodie', 'Baggy jeans', 'Crop top', 'Puffer jacket', 'Cargo skirt', 'Oversized tee', 'Windbreaker'],
      accessories: ['Chunky sneakers', 'Bucket hat', 'Mini backpack', 'Hoop earrings', 'Platform shoes', 'Chain bag'],
      colors: ['#000000', '#FF6B6B', '#FFFFFF', '#FFB6C1', '#00FFFF'],
      vibes: ['Urban', 'Cool', 'Edgy', 'Confident', 'Bold'],
      trends: ['viral', 'tiktok-approved', 'oversized', 'layered', 'aesthetic'],
    },
  },
  'Clean Girl': {
    female: {
      items: ['White tank top', 'High-waisted jeans', 'Minimal dress', 'Slip dress', 'Ribbed tee', 'Linen pants', 'Bodysuit'],
      accessories: ['Gold hoops', 'White sneakers', 'Minimal bag', 'Claw clip', 'Dainty necklace', 'Canvas tote'],
      colors: ['#F8F8F8', '#D4B5A0', '#FFFFFF', '#FFE4E1', '#FFF5EE'],
      vibes: ['Fresh', 'Natural', 'Minimal', 'Effortless', 'Clean'],
      trends: ['clean-girl', 'viral', 'pinterest-core', 'main-character', 'effortless'],
    },
  },
  'Coquette': {
    female: {
      items: ['Lace top', 'Mini skirt', 'Ribbon cardigan', 'Ballet flat', 'Corset top', 'Ruffle dress', 'Pearl cardigan'],
      accessories: ['Bow clips', 'Mary janes', 'Pearl necklace', 'Mini bag', 'Lace gloves', 'Ballet flats'],
      colors: ['#FFB6C1', '#FFFFFF', '#FFC0CB', '#FFE4E1', '#F8F8F8'],
      vibes: ['Feminine', 'Romantic', 'Delicate', 'Sweet', 'Soft'],
      trends: ['viral', 'tiktok-approved', 'aesthetic', 'pinterest-core', 'light-feminine'],
    },
  },
  'Korean Casual': {
    male: {
      items: ['Oversized shirt', 'Wide pants', 'Knit vest', 'Long coat', 'Polo shirt', 'Cardigan', 'Loose tee'],
      accessories: ['Bucket hat', 'Crossbody bag', 'White sneakers', 'Round glasses', 'Tote bag', 'Cap'],
      colors: ['#E8D5C4', '#9B6B6B', '#F0F0F0', '#4A4A4A', '#C9B896'],
      vibes: ['Trendy', 'Layered', 'Effortless', 'Modern', 'Relaxed'],
      trends: ['korean-fashion', 'oversized', 'layered', 'pinterest-core', 'aesthetic'],
    },
    female: {
      items: ['Cardigan', 'Pleated skirt', 'Oversized sweater', 'High-waisted jeans', 'Crop cardigan', 'Tennis skirt', 'Knit top'],
      accessories: ['Mary Janes', 'Mini bag', 'Hair clips', 'Leg warmers', 'Platform shoes', 'Canvas bag'],
      colors: ['#E8D5C4', '#9B6B6B', '#F0F0F0', '#FFB6C1', '#FFFFFF'],
      vibes: ['Cute', 'Trendy', 'Youthful', 'Layered', 'Sweet'],
      trends: ['korean-fashion', 'viral', 'tiktok-approved', 'pinterest-core', 'aesthetic'],
    },
  },
};

// Generate massive dataset with trend velocity
export function generateMassiveGenZDataset(count: number = 100000): FashionOutfit[] {
  const outfits: FashionOutfit[] = [];
  const aesthetics = Object.keys(GEN_Z_AESTHETICS);
  const genders: Gender[] = ['male', 'female'];

  for (let i = 0; i < count; i++) {
    const aesthetic = aesthetics[i % aesthetics.length] as keyof typeof GEN_Z_AESTHETICS;
    const gender = genders[i % genders.length];
    const template = GEN_Z_AESTHETICS[aesthetic][gender as keyof typeof GEN_Z_AESTHETICS[typeof aesthetic]];

    if (!template) continue;

    const outfit = createGenZOutfit(i, aesthetic as AestheticStyle, gender, template);
    outfits.push(outfit);
  }

  return outfits;
}

interface Template {
  items: string[];
  accessories: string[];
  colors: string[];
  vibes: string[];
  trends: string[];
}

function createGenZOutfit(
  id: number,
  aesthetic: AestheticStyle,
  gender: Gender,
  template: Template
): FashionOutfit {
  const seasons: Season[] = ['spring', 'summer', 'fall', 'winter', 'all-season'];
  
  return {
    id: `genz-outfit-${id}`,
    title: `${aesthetic} ${randomItem(template.vibes)} Look #${id}`,
    gender,
    aesthetic,
    colors: randomItems(template.colors, 3),
    clothingItems: randomItems(template.items, Math.floor(Math.random() * 2) + 3),
    accessories: randomItems(template.accessories, Math.floor(Math.random() * 2) + 2),
    vibe: randomItem(template.vibes),
    popularityScore: Math.floor(Math.random() * 100) + 1,
    season: randomItem(seasons),
    moodTags: [
      ...randomItems(template.trends, 2),
      randomItem(template.vibes).toLowerCase(),
      aesthetic.toLowerCase().replace(' ', '-'),
    ],
    recommendationWeight: Math.random(),
    imageUrl: getAestheticImage(aesthetic, gender, id),
  };
}

function randomItem<T>(array: T[]): T {
  return array[Math.floor(Math.random() * array.length)];
}

function randomItems<T>(array: T[], count: number): T[] {
  const shuffled = [...array].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, Math.min(count, array.length));
}

// Optimized batch generation for performance
export function generateBatchedDataset(batchSize: number = 10000, totalBatches: number = 10) {
  const allOutfits: FashionOutfit[] = [];
  
  for (let batch = 0; batch < totalBatches; batch++) {
    const batchOutfits = generateMassiveGenZDataset(batchSize);
    allOutfits.push(...batchOutfits);
  }
  
  return allOutfits;
}

// Get trending outfits (high popularity + recent)
export function getTrendingOutfits(dataset: FashionOutfit[], count: number = 100): FashionOutfit[] {
  return dataset
    .sort((a, b) => b.popularityScore - a.popularityScore)
    .slice(0, count);
}

// Get viral Gen Z outfits (trending tags)
export function getViralGenZOutfits(dataset: FashionOutfit[], count: number = 50): FashionOutfit[] {
  return dataset
    .filter(outfit => 
      outfit.moodTags.some(tag => ['viral', 'tiktok-approved', 'trending'].includes(tag))
    )
    .sort((a, b) => b.popularityScore - a.popularityScore)
    .slice(0, count);
}
