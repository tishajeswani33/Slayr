import { create } from 'zustand';
import { Collection } from '../types/moodboard';

interface MoodboardStore {
  savedMoodboards: string[];
  collections: Collection[];
  currentFilter: string;
  searchQuery: string;
  saveMoodboard: (moodboardId: string) => void;
  unsaveMoodboard: (moodboardId: string) => void;
  isSaved: (moodboardId: string) => boolean;
  setFilter: (filter: string) => void;
  setSearchQuery: (query: string) => void;
  createCollection: (name: string, description: string) => void;
}

export const useMoodboardStore = create<MoodboardStore>((set, get) => ({
  savedMoodboards: [],
  collections: [],
  currentFilter: 'All',
  searchQuery: '',

  saveMoodboard: (moodboardId) =>
    set((state) => ({
      savedMoodboards: [...state.savedMoodboards, moodboardId],
    })),

  unsaveMoodboard: (moodboardId) =>
    set((state) => ({
      savedMoodboards: state.savedMoodboards.filter((id) => id !== moodboardId),
    })),

  isSaved: (moodboardId) => get().savedMoodboards.includes(moodboardId),

  setFilter: (filter) => set({ currentFilter: filter }),

  setSearchQuery: (query) => set({ searchQuery: query }),

  createCollection: (name, description) =>
    set((state) => ({
      collections: [
        ...state.collections,
        {
          id: Date.now().toString(),
          userId: 'demo-user',
          name,
          description,
          moodboards: [],
          coverImage: '',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
    })),
}));
