import { create } from 'zustand';
import { User, FeedItem, Notification, OnboardingData } from '../types/social';

interface SocialStore {
  currentUser: User | null;
  feedItems: FeedItem[];
  notifications: Notification[];
  onboardingCompleted: boolean;
  onboardingData: OnboardingData | null;
  
  setCurrentUser: (user: User) => void;
  setFeedItems: (items: FeedItem[]) => void;
  likeFeedItem: (itemId: string) => void;
  saveFeedItem: (itemId: string) => void;
  followUser: (userId: string) => void;
  setNotifications: (notifications: Notification[]) => void;
  markNotificationRead: (notificationId: string) => void;
  completeOnboarding: (data: OnboardingData) => void;
}

export const useSocialStore = create<SocialStore>((set) => ({
  currentUser: null,
  feedItems: [],
  notifications: [],
  onboardingCompleted: false,
  onboardingData: null,

  setCurrentUser: (user) => set({ currentUser: user }),

  setFeedItems: (items) => set({ feedItems: items }),

  likeFeedItem: (itemId) =>
    set((state) => ({
      feedItems: state.feedItems.map((item) =>
        item.id === itemId
          ? {
              ...item,
              isLiked: !item.isLiked,
              likes: item.isLiked ? item.likes - 1 : item.likes + 1,
            }
          : item
      ),
    })),

  saveFeedItem: (itemId) =>
    set((state) => ({
      feedItems: state.feedItems.map((item) =>
        item.id === itemId
          ? {
              ...item,
              isSaved: !item.isSaved,
              saves: item.isSaved ? item.saves - 1 : item.saves + 1,
            }
          : item
      ),
    })),

  followUser: (userId) =>
    set((state) => ({
      feedItems: state.feedItems.map((item) =>
        item.userId === userId
          ? {
              ...item,
              user: {
                ...item.user,
                isFollowing: !item.user.isFollowing,
              },
            }
          : item
      ),
    })),

  setNotifications: (notifications) => set({ notifications }),

  markNotificationRead: (notificationId) =>
    set((state) => ({
      notifications: state.notifications.map((notif) =>
        notif.id === notificationId ? { ...notif, isRead: true } : notif
      ),
    })),

  completeOnboarding: (data) =>
    set({
      onboardingCompleted: true,
      onboardingData: data,
    }),
}));
