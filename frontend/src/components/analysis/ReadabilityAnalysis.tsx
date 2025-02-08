'use client'

import { StatsCard } from './StatsCard'
import { BookOpen, Type, AlignLeft } from 'lucide-react'


interface ReadabilityAnalysisProps {
  readability: Readability
}

export function ReadabilityAnalysis({ readability }: ReadabilityAnalysisProps) {
  return (
    <StatsCard title="Readability Analysis">
      <div className="space-y-6">
        {Object.entries(readability).map(([metric, score], index) => (
          <div
            key={metric}
            className="group p-4 rounded-lg border bg-card hover:bg-card/50 transition-all duration-300"
          >
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                {index === 0 && <BookOpen className="h-4 w-4 text-primary" />}
                {index === 1 && <Type className="h-4 w-4 text-primary" />}
                {index === 2 && <AlignLeft className="h-4 w-4 text-primary" />}
                <h3 className="text-sm font-medium">
                  {metric.split('_').map(word => 
                    word.charAt(0).toUpperCase() + word.slice(1)
                  ).join(' ')}
                </h3>
              </div>
              <span className="text-2xl font-semibold">{score.toFixed(1)}</span>
            </div>
            
            <div className="mt-2">
              <div className="h-2 bg-muted rounded-full overflow-hidden">
                <div
                  className="h-full bg-primary transition-all duration-300 group-hover:opacity-80"
                  style={{ width: `${(score / 100) * 100}%` }}
                />
              </div>
              <div className="mt-1 text-xs text-muted-foreground">
                {score >= 80 ? 'Very Easy' :
                 score >= 60 ? 'Easy' :
                 score >= 40 ? 'Moderate' :
                 score >= 20 ? 'Difficult' : 'Very Difficult'}
              </div>
            </div>
          </div>
        ))}
      </div>
    </StatsCard>
  )
}