export interface User {
  id: string;
  username: string;
  displayName: string;
  bio: string;
  avatarUrl: string;
  coverImageUrl?: string;
  dominantAesthetic: string;
  followersCount: number;
  followingCount: number;
  savedCount: number;
  isFollowing?: boolean;
  joinedAt: Date;
  styleStats?: StyleStats;
}

export interface StyleStats {
  dominantAesthetic: string;
  secondaryAesthetic: string;
  favoriteColors: string[];
  vibeScore: number;
  monthlyEvolution: string[];
  totalOutfitsAnalyzed: number;
  averageScore: number;
}

export interface FeedItem {
  id: string;
  type: 'outfit' | 'moodboard' | 'inspiration' | 'ai-suggestion';
  userId: string;
  user: User;
  imageUrl: string;
  title: string;
  description: string;
  aesthetic: string;
  likes: number;
  saves: number;
  isLiked: boolean;
  isSaved: boolean;
  createdAt: Date;
  tags?: string[];
}

export interface Notification {
  id: string;
  type: 'like' | 'save' | 'follow' | 'ai-update' | 'trending';
  userId: string;
  user?: User;
  message: string;
  imageUrl?: string;
  isRead: boolean;
  createdAt: Date;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'ai';
  content: string;
  timestamp: Date;
  suggestions?: string[];
}

export interface OnboardingData {
  selectedAesthetics: string[];
  favoriteColors: string[];
  fashionVibe: string;
  styleGoals: string[];
}
