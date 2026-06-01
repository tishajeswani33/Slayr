import { Moodboard } from '../types/moodboard';
import { apiRequest } from './api';

export async function getMoodboards(
  aesthetic?: string,
  limitCount: number = 20
): Promise<Moodboard[]> {
  try {
    const queryParams = new URLSearchParams();
    if (aesthetic && aesthetic !== 'All') queryParams.append('aesthetic', aesthetic);
    queryParams.append('limit', limitCount.toString());

    const res = await apiRequest<{ moodboards: any[] }>(`/api/moodboards?${queryParams.toString()}`);
    
    return res.moodboards.map((m) => ({
      id: m.id,
      title: m.title,
      imageUrl: m.imageUrl,
      aesthetic: m.aesthetic,
      vibe: m.vibe,
      colorPalette: m.colorPalette,
      tags: m.tags,
      savedCount: m.savedCount,
      createdAt: new Date(m.createdAt),
      relatedAesthetics: m.relatedAesthetics,
    }));
  } catch {
    return getMockMoodboards();
  }
}

export async function getTrendingMoodboards(): Promise<Moodboard[]> {
  // Sort from our database collection
  const all = await getMoodboards(undefined, 6);
  return all.sort((a, b) => b.savedCount - a.savedCount);
}

function getMockMoodboards(): Moodboard[] {
  return [
    {
      id: 'mock-mb-1',
      title: 'Minimalist Elegance',
      imageUrl: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=800',
      aesthetic: 'Minimal Luxury',
      vibe: 'Clean lines, neutral tones, timeless sophistication',
      colorPalette: ['#F5F5F5', '#2C2C2C', '#FFFFFF'],
      tags: ['minimal', 'luxury', 'timeless'],
      savedCount: 1247,
      createdAt: new Date(),
      relatedAesthetics: ['Scandinavian Minimal', 'Old Money'],
    }
  ];
}

export async function getMoodboardById(id: string): Promise<Moodboard | null> {
  try {
    const res = await apiRequest<{ moodboard: any }>(`/api/moodboards/${id}`);
    const m = res.moodboard;
    return {
      id: m.id,
      title: m.title,
      imageUrl: m.imageUrl,
      aesthetic: m.aesthetic,
      vibe: m.vibe,
      colorPalette: m.colorPalette,
      tags: m.tags,
      savedCount: m.savedCount,
      createdAt: new Date(m.createdAt),
      relatedAesthetics: m.relatedAesthetics,
    };
  } catch {
    return getMockMoodboards()[0] || null;
  }
}

export async function searchMoodboards(query: string): Promise<Moodboard[]> {
  try {
    const res = await getMoodboards();
    const term = query.toLowerCase();
    return res.filter(
      (m) =>
        m.title.toLowerCase().includes(term) ||
        m.aesthetic.toLowerCase().includes(term) ||
        m.vibe.toLowerCase().includes(term)
    );
  } catch {
    return [];
  }
}

