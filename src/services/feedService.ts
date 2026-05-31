import { FeedItem, User } from '../types/social';

// Demo users
const DEMO_USERS: User[] = [
  {
    id: '1',
    username: 'sophiarose',
    displayName: 'Sophia Rose',
    bio: 'Minimal luxury enthusiast • NYC',
    avatarUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400',
    dominantAesthetic: 'Minimal Luxury',
    followersCount: 12400,
    followingCount: 342,
    savedCount: 891,
    joinedAt: new Date(),
  },
  {
    id: '2',
    username: 'alexkim',
    displayName: 'Alex Kim',
    bio: 'Streetwear curator • Seoul → LA',
    avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400',
    dominantAesthetic: 'Streetwear',
    followersCount: 8920,
    followingCount: 156,
    savedCount: 456,
    joinedAt: new Date(),
  },
  {
    id: '3',
    username: 'emilycharlotte',
    displayName: 'Emily Charlotte',
    bio: 'Old money aesthetic • London',
    avatarUrl: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400',
    dominantAesthetic: 'Old Money',
    followersCount: 15600,
    followingCount: 89,
    savedCount: 1234,
    joinedAt: new Date(),
  },
];

// Demo feed items
const DEMO_FEED: FeedItem[] = [
  {
    id: '1',
    type: 'outfit',
    userId: '1',
    user: DEMO_USERS[0],
    imageUrl: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=800',
    title: 'Monochrome perfection',
    description: 'Clean lines and neutral tones for the perfect minimalist look',
    aesthetic: 'Minimal Luxury',
    likes: 1247,
    saves: 342,
    isLiked: false,
    isSaved: false,
    createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000),
    tags: ['minimal', 'monochrome', 'luxury'],
  },
  {
    id: '2',
    type: 'moodboard',
    userId: '2',
    user: DEMO_USERS[1],
    imageUrl: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=800',
    title: 'Urban Edge',
    description: 'Bold streetwear inspiration for the modern city dweller',
    aesthetic: 'Streetwear',
    likes: 2134,
    saves: 567,
    isLiked: false,
    isSaved: false,
    createdAt: new Date(Date.now() - 5 * 60 * 60 * 1000),
    tags: ['streetwear', 'urban', 'bold'],
  },
  {
    id: '3',
    type: 'outfit',
    userId: '3',
    user: DEMO_USERS[2],
    imageUrl: 'https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=800',
    title: 'Timeless Elegance',
    description: 'Old money aesthetic with classic silhouettes',
    aesthetic: 'Old Money',
    likes: 3456,
    saves: 892,
    isLiked: false,
    isSaved: false,
    createdAt: new Date(Date.now() - 8 * 60 * 60 * 1000),
    tags: ['old money', 'classic', 'elegant'],
  },
  {
    id: '4',
    type: 'ai-suggestion',
    userId: '1',
    user: DEMO_USERS[0],
    imageUrl: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=800',
    title: 'AI Recommended: Scandinavian Minimal',
    description: 'Based on your style, try this Nordic-inspired look',
    aesthetic: 'Scandinavian Minimal',
    likes: 987,
    saves: 234,
    isLiked: false,
    isSaved: false,
    createdAt: new Date(Date.now() - 12 * 60 * 60 * 1000),
    tags: ['ai-curated', 'scandinavian', 'minimal'],
  },
  {
    id: '5',
    type: 'moodboard',
    userId: '2',
    user: DEMO_USERS[1],
    imageUrl: 'https://images.unsplash.com/photo-1539533018447-63fcce2678e3?w=800',
    title: 'K-Fashion Vibes',
    description: 'Seoul street style inspiration',
    aesthetic: 'Korean Casual',
    likes: 1892,
    saves: 456,
    isLiked: false,
    isSaved: false,
    createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
    tags: ['korean', 'trendy', 'casual'],
  },
  {
    id: '6',
    type: 'outfit',
    userId: '3',
    user: DEMO_USERS[2],
    imageUrl: 'https://images.unsplash.com/photo-1516762689617-e1cffcef479d?w=800',
    title: 'Academic Romance',
    description: 'Dark academia with vintage charm',
    aesthetic: 'Dark Academia',
    likes: 1654,
    saves: 389,
    isLiked: false,
    isSaved: false,
    createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
    tags: ['dark academia', 'vintage', 'romantic'],
  },
];

export async function getPersonalizedFeed(): Promise<FeedItem[]> {
  // In production, this would fetch from Firestore based on user preferences
  return DEMO_FEED;
}

export async function getTrendingCreators(): Promise<User[]> {
  return DEMO_USERS;
}

export async function getUserById(userId: string): Promise<User | null> {
  const user = DEMO_USERS.find((u) => u.id === userId);
  return user || null;
}

export async function likeFeedItem(itemId: string): Promise<void> {
  console.log('Liked item:', itemId);
}

export async function saveFeedItem(itemId: string): Promise<void> {
  console.log('Saved item:', itemId);
}

export async function followUser(userId: string): Promise<void> {
  console.log('Followed user:', userId);
}
