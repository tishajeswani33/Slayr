import { create } from 'zustand';
import { OutfitAnalysis } from '../types/outfit';

interface OutfitStore {
  currentAnalysis: OutfitAnalysis | null;
  isAnalyzing: boolean;
  error: string | null;
  setAnalysis: (analysis: OutfitAnalysis) => void;
  setAnalyzing: (analyzing: boolean) => void;
  setError: (error: string | null) => void;
  clearAnalysis: () => void;
}

export const useOutfitStore = create<OutfitStore>((set) => ({
  currentAnalysis: null,
  isAnalyzing: false,
  error: null,
  setAnalysis: (analysis) => set({ currentAnalysis: analysis, isAnalyzing: false, error: null }),
  setAnalyzing: (analyzing) => set({ isAnalyzing: analyzing, error: null }),
  setError: (error) => set({ error, isAnalyzing: false }),
  clearAnalysis: () => set({ currentAnalysis: null, error: null, isAnalyzing: false }),
}));
