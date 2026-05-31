import { FashionOutfit, AestheticStyle, Gender, Season } from '../types/fashion';

// Fashion templates for each aesthetic
const AESTHETIC_TEMPLATES = {
  'Minimal Luxury': {
    male: {
      items: ['Tailored blazer', 'Premium tee', 'Slim trousers', 'Oxford shirt', 'Cashmere sweater'],
      accessories: ['Leather watch', 'Minimal belt', 'Designer loafers', 'Silver ring'],
      colors: ['#FFFFFF', '#2C2C2C', '#F5F5F5', '#1A1A1A'],
      vibes: ['Sophisticated', 'Timeless', 'Refined', 'Professional'],
    },
    female: {
      items: ['Silk blouse', 'Tailored pants', 'Cashmere cardigan', 'Midi skirt', 'Structured blazer'],
      accessories: ['Gold necklace', 'Leather handbag', 'Minimal earrings', 'Classic pumps'],
      colors: ['#FFFFFF', '#2C2C2C', '#F5F5F5', '#C9B896'],
      vibes: ['Elegant', 'Sophisticated', 'Chic', 'Timeless'],
    },
  },
  'Streetwear': {
    male: {
      items: ['Oversized hoodie', 'Cargo pants', 'Graphic tee', 'Bomber jacket', 'Track pants'],
      accessories: ['Sneakers', 'Baseball cap', 'Chain necklace', 'Crossbody bag'],
      colors: ['#000000', '#FF6B6B', '#FFFFFF', '#808080'],
      vibes: ['Urban', 'Bold', 'Edgy', 'Trendy'],
    },
    female: {
      items: ['Oversized hoodie', 'Baggy jeans', 'Crop top', 'Puffer jacket', 'Wide-leg pants'],
      accessories: ['Chunky sneakers', 'Bucket hat', 'Mini backpack', 'Hoop earrings'],
      colors: ['#000000', '#FF6B6B', '#FFFFFF', '#00FF00'],
      vibes: ['Urban', 'Cool', 'Edgy', 'Confident'],
    },
  },
  'Korean Casual': {
    male: {
      items: ['Oversized shirt', 'Wide pants', 'Knit vest', 'Long coat', 'Polo shirt'],
      accessories: ['Bucket hat', 'Crossbody bag', 'White sneakers', 'Round glasses'],
      colors: ['#E8D5C4', '#9B6B6B', '#F0F0F0', '#4A4A4A'],
      vibes: ['Trendy', 'Layered', 'Effortless', 'Modern'],
    },
    female: {
      items: ['Cardigan', 'Pleated skirt', 'Oversized sweater', 'High-waisted jeans', 'Crop cardigan'],
      accessories: ['Mary Janes', 'Mini bag', 'Hair clips', 'Leg warmers'],
      colors: ['#E8D5C4', '#9B6B6B', '#F0F0F0', '#FFB6C1'],
      vibes: ['Cute', 'Trendy', 'Youthful', 'Layered'],
    },
  },
  'Old Money': {
    male: {
      items: ['Polo shirt', 'Chinos', 'Cable-knit sweater', 'Blazer', 'Oxford shirt'],
      accessories: ['Leather loafers', 'Gold watch', 'Leather belt', 'Sunglasses'],
      colors: ['#1C1C1C', '#C9B896', '#FFFFFF', '#2F4F4F'],
      vibes: ['Classic', 'Refined', 'Understated', 'Elegant'],
    },
    female: {
      items: ['Cashmere sweater', 'Pleated skirt', 'Silk scarf', 'Blazer', 'Midi dress'],
      accessories: ['Pearl necklace', 'Leather loafers', 'Structured bag', 'Gold bracelet'],
      colors: ['#1C1C1C', '#C9B896', '#FFFFFF', '#8B4513'],
      vibes: ['Elegant', 'Classic', 'Sophisticated', 'Timeless'],
    },
  },
  'Clean Girl': {
    female: {
      items: ['White tank top', 'High-waisted jeans', 'Minimal dress', 'Slip dress', 'Ribbed tee'],
      accessories: ['Gold hoops', 'White sneakers', 'Minimal bag', 'Claw clip'],
      colors: ['#F8F8F8', '#D4B5A0', '#FFFFFF', '#FFE4E1'],
      vibes: ['Fresh', 'Natural', 'Minimal', 'Effortless'],
    },
  },
  'Techwear': {
    male: {
      items: ['Technical jacket', 'Cargo pants', 'Utility vest', 'Performance tee', 'Waterproof shell'],
      accessories: ['Technical sneakers', 'Utility bag', 'Face mask', 'Tactical backpack'],
      colors: ['#0A0A0A', '#3D3D3D', '#FFFFFF', '#00FF00'],
      vibes: ['Functional', 'Futuristic', 'Urban', 'Technical'],
    },
    female: {
      items: ['Technical jacket', 'Cargo pants', 'Sports bra', 'Utility vest', 'Performance leggings'],
      accessories: ['Technical sneakers', 'Utility bag', 'Sports watch', 'Crossbody bag'],
      colors: ['#0A0A0A', '#3D3D3D', '#FFFFFF', '#FF00FF'],
      vibes: ['Functional', 'Futuristic', 'Athletic', 'Modern'],
    },
  },
};

// Generate a single outfit
function generateOutfit(
  id: number,
  aesthetic: AestheticStyle,
  gender: Gender
): FashionOutfit {
  const template = AESTHETIC_TEMPLATES[aesthetic as keyof typeof AESTHETIC_TEMPLATES];
  const genderTemplate = template[gender as keyof typeof template];
  
  if (!genderTemplate) {
    // Fallback for unisex or missing gender
    const fallback = ('male' in template ? template.male : template.female) as { items: string[]; accessories: string[]; colors: string[]; vibes: string[] };
    return createOutfit(id, aesthetic, gender, fallback);
  }

  return createOutfit(id, aesthetic, gender, genderTemplate);
}

function createOutfit(
  id: number,
  aesthetic: AestheticStyle,
  gender: Gender,
  template: { items: string[]; accessories: string[]; colors: string[]; vibes: string[] }
): FashionOutfit {
  const randomItems = getRandomItems(template.items, 3);
  const randomAccessories = getRandomItems(template.accessories, 2);
  const randomColors = getRandomItems(template.colors, 3);
  const randomVibe = template.vibes[Math.floor(Math.random() * template.vibes.length)];
  const seasons: Season[] = ['spring', 'summer', 'fall', 'winter', 'all-season'];
  const randomSeason = seasons[Math.floor(Math.random() * seasons.length)];

  return {
    id: `outfit-${id}`,
    title: `${aesthetic} ${randomVibe} Look #${id}`,
    gender,
    aesthetic,
    colors: randomColors,
    clothingItems: randomItems,
    accessories: randomAccessories,
    vibe: randomVibe,
    popularityScore: Math.floor(Math.random() * 100) + 1,
    season: randomSeason,
    moodTags: [randomVibe.toLowerCase(), aesthetic.toLowerCase().replace(' ', '-')],
    recommendationWeight: Math.random(),
    imageUrl: `https://images.unsplash.com/photo-${1490481651871 + id}?w=800`,
  };
}

function getRandomItems<T>(array: T[], count: number): T[] {
  const shuffled = [...array].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
}

// Generate massive dataset
export function generateFashionDataset(count: number = 10000): FashionOutfit[] {
  const outfits: FashionOutfit[] = [];
  const aesthetics = Object.keys(AESTHETIC_TEMPLATES) as AestheticStyle[];
  const genders: Gender[] = ['male', 'female'];

  for (let i = 0; i < count; i++) {
    const aesthetic = aesthetics[i % aesthetics.length];
    const gender = genders[i % genders.length];
    outfits.push(generateOutfit(i, aesthetic, gender));
  }

  return outfits;
}

// Get outfits by gender
export function getOutfitsByGender(gender: Gender, count: number = 1000): FashionOutfit[] {
  return generateFashionDataset(count).filter(outfit => outfit.gender === gender);
}

// Get outfits by aesthetic
export function getOutfitsByAesthetic(aesthetic: AestheticStyle, count: number = 500): FashionOutfit[] {
  return generateFashionDataset(count).filter(outfit => outfit.aesthetic === aesthetic);
}
