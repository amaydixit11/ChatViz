import { create } from 'zustand'

interface AnalysisStore {
  analysis: ChatAnalysis | null
  setAnalysis: (analysis: ChatAnalysis | null) => void
}

export const useAnalysisStore = create<AnalysisStore>((set) => ({
  analysis: null,
  setAnalysis: (analysis) => set({ analysis }),
}))