import { FeedItem, User } from '../types/social';
import { apiRequest } from './api';

export async function getPersonalizedFeed(): Promise<FeedItem[]> {
  try {
    const res = await apiRequest<{ feed: any[] }>('/api/feed');
    // Map backend outfits structure to FeedItem shapes seamlessly
    return res.feed.map((o) => ({
      id: o.id,
      type: 'outfit',
      userId: o.userId,
      user: {
        id: o.user.id,
        username: o.user.username,
        displayName: o.user.displayName,
        bio: o.user.bio || '',
        avatarUrl: o.user.avatarUrl || 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400',
        dominantAesthetic: o.user.dominantAesthetic || 'Minimal Luxury',
        followersCount: o.user.followersCount,
        followingCount: o.user.followingCount,
        savedCount: o.user.savedCount,
        joinedAt: new Date(o.user.joinedAt),
      },
      imageUrl: o.imageUrl,
      title: `${o.aesthetic} styled fit`,
      description: o.vibe,
      aesthetic: o.aesthetic,
      likes: o.likesCount,
      saves: o.savesCount,
      isLiked: false,
      isSaved: false,
      createdAt: new Date(o.createdAt),
      tags: o.fashionTags,
    }));
  } catch {
    // Graceful offline fallback to keep demo-mode operational
    return getMockFeed();
  }
}

export async function getTrendingCreators(): Promise<User[]> {
  try {
    const res = await apiRequest<{ creators: any[] }>('/api/trends/creators');
    return res.creators.map((c) => ({
      id: c.id,
      username: c.username,
      displayName: c.name,
      bio: `Gen Z Creator • Dominant Aesthetic: ${c.aesthetic}`,
      avatarUrl: c.avatarUrl,
      dominantAesthetic: c.aesthetic,
      followersCount: c.followers,
      followingCount: 150,
      savedCount: c.outfitCount * 10,
      joinedAt: new Date(),
    }));
  } catch {
    return getMockCreators();
  }
}

export async function saveFeedItem(itemId: string): Promise<void> {
  await apiRequest('/api/feed/save', 'POST', { outfitId: itemId });
}

// Minimal static fallback mocks
function getMockFeed(): FeedItem[] {
  return [
    {
      id: 'mock-1',
      type: 'outfit',
      userId: 'usr-seed',
      user: getMockCreators()[0],
      imageUrl: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=800',
      title: 'Monochrome perfection',
      description: 'Clean lines and neutral tones for the perfect minimalist look',
      aesthetic: 'Minimal Luxury',
      likes: 1247,
      saves: 342,
      isLiked: false,
      isSaved: false,
      createdAt: new Date(),
      tags: ['minimal', 'monochrome', 'luxury'],
    }
  ];
}

function getMockCreators(): User[] {
  return [
    {
      id: 'usr-seed',
      username: 'sophiarose',
      displayName: 'Sophia Rose',
      bio: 'Minimal luxury enthusiast • NYC',
      avatarUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400',
      dominantAesthetic: 'Minimal Luxury',
      followersCount: 12400,
      followingCount: 342,
      savedCount: 891,
      joinedAt: new Date(),
    }
  ];
}
