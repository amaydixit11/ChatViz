import { create } from 'zustand'
import type { ChatAnalysis } from '@/types' // Assuming you have your types in a types.ts file

interface AnalysisStore {
  analysis: ChatAnalysis | null
  setAnalysis: (analysis: ChatAnalysis | null) => void
}

export const useAnalysisStore = create<AnalysisStore>((set) => ({
  analysis: null,
  setAnalysis: (analysis) => set({ analysis }),
}))