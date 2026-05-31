// import { collection, addDoc, getDocs, query, where, orderBy, limit, doc, updateDoc, increment } from 'firebase/firestore';
// import { db } from '../config/firebase';
import { Moodboard } from '../types/moodboard';

// Demo moodboard data for development
const DEMO_MOODBOARDS: Moodboard[] = [
  {
    id: '1',
    title: 'Minimalist Elegance',
    imageUrl: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=800',
    aesthetic: 'Minimal Luxury',
    vibe: 'Clean lines, neutral tones, timeless sophistication',
    colorPalette: ['#F5F5F5', '#2C2C2C', '#FFFFFF'],
    tags: ['minimal', 'luxury', 'timeless', 'neutral'],
    savedCount: 1247,
    createdAt: new Date(),
    relatedAesthetics: ['Scandinavian Minimal', 'Old Money', 'Clean Girl'],
  },
  {
    id: '2',
    title: 'Urban Edge',
    imageUrl: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=800',
    aesthetic: 'Streetwear',
    vibe: 'Bold graphics, oversized fits, urban energy',
    colorPalette: ['#000000', '#FF6B6B', '#FFFFFF'],
    tags: ['streetwear', 'urban', 'bold', 'edgy'],
    savedCount: 2134,
    createdAt: new Date(),
    relatedAesthetics: ['Techwear', 'Y2K', 'Cyber Minimal'],
  },
  {
    id: '3',
    title: 'Seoul Aesthetics',
    imageUrl: 'https://images.unsplash.com/photo-1539533018447-63fcce2678e3?w=800',
    aesthetic: 'Korean Casual',
    vibe: 'Layered, trendy, effortlessly cool K-fashion',
    colorPalette: ['#E8D5C4', '#9B6B6B', '#F0F0F0'],
    tags: ['korean', 'trendy', 'layered', 'casual'],
    savedCount: 1892,
    createdAt: new Date(),
    relatedAesthetics: ['Clean Girl', 'Minimal Luxury'],
  },
  {
    id: '4',
    title: 'Academic Romance',
    imageUrl: 'https://images.unsplash.com/photo-1516762689617-e1cffcef479d?w=800',
    aesthetic: 'Dark Academia',
    vibe: 'Vintage, scholarly, rich textures and warm tones',
    colorPalette: ['#8B4513', '#2F1B1B', '#D4A574'],
    tags: ['vintage', 'academic', 'romantic', 'classic'],
    savedCount: 1654,
    createdAt: new Date(),
    relatedAesthetics: ['Old Money', 'Vintage'],
  },
  {
    id: '5',
    title: 'Scandinavian Simplicity',
    imageUrl: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=800',
    aesthetic: 'Scandinavian Minimal',
    vibe: 'Functional, sustainable, clean Nordic design',
    colorPalette: ['#FAFAFA', '#B8B8B8', '#4A4A4A'],
    tags: ['scandinavian', 'minimal', 'sustainable', 'clean'],
    savedCount: 987,
    createdAt: new Date(),
    relatedAesthetics: ['Minimal Luxury', 'Clean Girl'],
  },
  {
    id: '6',
    title: 'Timeless Wealth',
    imageUrl: 'https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=800',
    aesthetic: 'Old Money',
    vibe: 'Understated luxury, classic silhouettes, refined elegance',
    colorPalette: ['#1C1C1C', '#C9B896', '#FFFFFF'],
    tags: ['luxury', 'classic', 'elegant', 'timeless'],
    savedCount: 2456,
    createdAt: new Date(),
    relatedAesthetics: ['Minimal Luxury', 'Dark Academia'],
  },
  {
    id: '7',
    title: '2000s Revival',
    imageUrl: 'https://images.unsplash.com/photo-1492707892479-7bc8d5a4ee93?w=800',
    aesthetic: 'Y2K',
    vibe: 'Nostalgic, playful, metallic accents and bold colors',
    colorPalette: ['#FF1493', '#00FFFF', '#FFFFFF'],
    tags: ['y2k', 'nostalgic', 'bold', 'playful'],
    savedCount: 1765,
    createdAt: new Date(),
    relatedAesthetics: ['Cyber Minimal', 'Streetwear'],
  },
  {
    id: '8',
    title: 'Tech Utility',
    imageUrl: 'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=800',
    aesthetic: 'Techwear',
    vibe: 'Functional, futuristic, technical fabrics and utility',
    colorPalette: ['#0A0A0A', '#3D3D3D', '#FFFFFF'],
    tags: ['techwear', 'functional', 'futuristic', 'utility'],
    savedCount: 1432,
    createdAt: new Date(),
    relatedAesthetics: ['Cyber Minimal', 'Streetwear'],
  },
  {
    id: '9',
    title: 'Fresh Femininity',
    imageUrl: 'https://images.unsplash.com/photo-1467043237213-65f2da53396f?w=800',
    aesthetic: 'Clean Girl',
    vibe: 'Effortless, fresh, minimal makeup and neutral tones',
    colorPalette: ['#F8F8F8', '#D4B5A0', '#FFFFFF'],
    tags: ['clean', 'fresh', 'minimal', 'feminine'],
    savedCount: 2198,
    createdAt: new Date(),
    relatedAesthetics: ['Minimal Luxury', 'Scandinavian Minimal'],
  },
  {
    id: '10',
    title: 'Digital Future',
    imageUrl: 'https://images.unsplash.com/photo-1558769132-cb1aea3c9e87?w=800',
    aesthetic: 'Cyber Minimal',
    vibe: 'Sleek, digital, monochrome with tech accents',
    colorPalette: ['#000000', '#FFFFFF', '#00FF00'],
    tags: ['cyber', 'minimal', 'digital', 'sleek'],
    savedCount: 1089,
    createdAt: new Date(),
    relatedAesthetics: ['Techwear', 'Futuristic Editorial'],
  },
  {
    id: '11',
    title: 'Avant-Garde Vision',
    imageUrl: 'https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=800',
    aesthetic: 'Futuristic Editorial',
    vibe: 'Experimental, architectural, high-fashion forward',
    colorPalette: ['#FFFFFF', '#000000', '#C0C0C0'],
    tags: ['editorial', 'futuristic', 'avant-garde', 'fashion'],
    savedCount: 1567,
    createdAt: new Date(),
    relatedAesthetics: ['Cyber Minimal', 'Minimal Luxury'],
  },
  {
    id: '12',
    title: 'Monochrome Mastery',
    imageUrl: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800',
    aesthetic: 'Minimal Luxury',
    vibe: 'Black and white perfection, architectural silhouettes',
    colorPalette: ['#000000', '#FFFFFF', '#808080'],
    tags: ['monochrome', 'minimal', 'luxury', 'architectural'],
    savedCount: 1876,
    createdAt: new Date(),
    relatedAesthetics: ['Scandinavian Minimal', 'Futuristic Editorial'],
  },
];

export async function getMoodboards(
  aesthetic?: string,
  limitCount: number = 20
): Promise<Moodboard[]> {
  try {
    // In production, fetch from Firestore
    // For demo, return mock data
    let moodboards = [...DEMO_MOODBOARDS];

    if (aesthetic && aesthetic !== 'All') {
      moodboards = moodboards.filter((m) => m.aesthetic === aesthetic);
    }

    return moodboards.slice(0, limitCount);
  } catch (error) {
    console.error('Error fetching moodboards:', error);
    return DEMO_MOODBOARDS.slice(0, limitCount);
  }
}

export async function getTrendingMoodboards(): Promise<Moodboard[]> {
  try {
    // Sort by savedCount for trending
    const trending = [...DEMO_MOODBOARDS].sort((a, b) => b.savedCount - a.savedCount);
    return trending.slice(0, 6);
  } catch (error) {
    console.error('Error fetching trending moodboards:', error);
    return [];
  }
}

export async function getMoodboardById(id: string): Promise<Moodboard | null> {
  try {
    const moodboard = DEMO_MOODBOARDS.find((m) => m.id === id);
    return moodboard || null;
  } catch (error) {
    console.error('Error fetching moodboard:', error);
    return null;
  }
}

export async function searchMoodboards(query: string): Promise<Moodboard[]> {
  try {
    const searchTerm = query.toLowerCase();
    const results = DEMO_MOODBOARDS.filter(
      (m) =>
        m.title.toLowerCase().includes(searchTerm) ||
        m.aesthetic.toLowerCase().includes(searchTerm) ||
        m.vibe.toLowerCase().includes(searchTerm) ||
        m.tags.some((tag) => tag.toLowerCase().includes(searchTerm))
    );
    return results;
  } catch (error) {
    console.error('Error searching moodboards:', error);
    return [];
  }
}

export async function saveMoodboard(moodboardId: string, userId: string): Promise<void> {
  try {
    // In production, save to Firestore user collections
    console.log(`Saved moodboard ${moodboardId} for user ${userId}`);
  } catch (error) {
    console.error('Error saving moodboard:', error);
    throw error;
  }
}
