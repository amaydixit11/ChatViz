'use client'

import { StatsCard } from './StatsCard'
import { Hash, Filter } from 'lucide-react'

interface StopwordAnalysisProps {
  stopwords: Stopwords
}

export function StopwordAnalysis({ stopwords }: StopwordAnalysisProps) {
  console.log(stopwords)
  const sortedStopwords = Object.entries(stopwords)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 10)

  const maxUsage = sortedStopwords[0]?.[1] || 0
  const totalUsage = Object.values(stopwords).reduce((a, b) => a + b, 0)
  return (
    <StatsCard title="Common Words Analysis">
      <div className="space-y-6">
        <div className="grid grid-cols-2 gap-4">
          <div className="group p-4 rounded-lg border bg-card hover:bg-card/50 transition-all duration-300">
            <div className="flex items-center gap-2 text-primary mb-2">
              <Hash className="h-4 w-4 transition-transform group-hover:scale-110" />
              <h4 className="text-xs font-medium">Total Usage</h4>
            </div>
            <p className="text-2xl font-semibold">{totalUsage}</p>
          </div>

          <div className="group p-4 rounded-lg border bg-card hover:bg-card/50 transition-all duration-300">
            <div className="flex items-center gap-2 text-primary mb-2">
              <Filter className="h-4 w-4 transition-transform group-hover:scale-110" />
              <h4 className="text-xs font-medium">Unique Words</h4>
            </div>
            <p className="text-2xl font-semibold">
              {Object.keys(stopwords).length}
            </p>
          </div>
        </div>

        <div className="space-y-4">
          {sortedStopwords.map(([word, count], index) => (
            <div
              key={word}
              className="group flex items-center gap-3 p-2 rounded-lg hover:bg-muted/50 transition-all duration-300"
            >
              <div className="flex h-8 w-8 items-center justify-center rounded-md bg-primary/10 text-primary group-hover:scale-110 transition-transform">
                {index + 1}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-baseline">
                  <p className="text-sm font-medium truncate">{word}</p>
                  <span className="text-sm text-muted-foreground">{count}</span>
                </div>
                <div className="mt-1 h-1.5 w-full rounded-full bg-muted overflow-hidden">
                  <div
                    className="h-full bg-primary transition-all duration-300 group-hover:opacity-80"
                    style={{ width: `${(count / maxUsage) * 100}%` }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </StatsCard>
  )
}