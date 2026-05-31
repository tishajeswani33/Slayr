export interface Moodboard {
  id: string;
  title: string;
  imageUrl: string;
  aesthetic: string;
  vibe: string;
  colorPalette: string[];
  tags: string[];
  savedCount: number;
  createdAt: Date;
  relatedAesthetics?: string[];
}

export interface Collection {
  id: string;
  userId: string;
  name: string;
  description: string;
  moodboards: string[]; // moodboard IDs
  coverImage: string;
  createdAt: Date;
  updatedAt: Date;
}

export type AestheticCategory =
  | 'Minimal Luxury'
  | 'Streetwear'
  | 'Korean Casual'
  | 'Scandinavian Minimal'
  | 'Dark Academia'
  | 'Old Money'
  | 'Y2K'
  | 'Techwear'
  | 'Clean Girl'
  | 'Cyber Minimal'
  | 'Futuristic Editorial';

export interface AestheticFilter {
  aesthetic: AestheticCategory | null;
  search: string;
  sortBy: 'trending' | 'recent' | 'popular';
}
