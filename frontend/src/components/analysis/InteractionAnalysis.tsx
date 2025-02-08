'use client'

import { StatsCard } from './StatsCard'
import { Users, MessageSquare } from 'lucide-react'

interface Interactions {
  interactions: Record<string, number>;
}

interface InteractionAnalysisProps {
  interactions: Interactions
}

export function InteractionAnalysis({ interactions }: InteractionAnalysisProps) {
  // Ensure we're working with Record<string, number>
  const sortedInteractions = Object.entries(interactions.interactions)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 8)
    .map(([pair, count]) => ({ pair, count }))

  const maxInteractions = sortedInteractions[0]?.count || 0
  const totalInteractions = Object.values(interactions.interactions).reduce((sum, count) => sum + count, 0)

  return (
    <StatsCard title="Interaction Analysis">
      <div className="space-y-6">
        <div className="grid grid-cols-2 gap-4">
          <div className="group p-4 rounded-lg border bg-card hover:bg-card/50 transition-all duration-300">
            <div className="flex items-center gap-2 text-primary mb-2">
              <Users className="h-4 w-4 transition-transform group-hover:scale-110" />
              <h4 className="text-xs font-medium">Total Interactions</h4>
            </div>
            <p className="text-2xl font-semibold">{totalInteractions}</p>
          </div>

          <div className="group p-4 rounded-lg border bg-card hover:bg-card/50 transition-all duration-300">
            <div className="flex items-center gap-2 text-primary mb-2">
              <MessageSquare className="h-4 w-4 transition-transform group-hover:scale-110" />
              <h4 className="text-xs font-medium">Unique Pairs</h4>
            </div>
            <p className="text-2xl font-semibold">{Object.keys(interactions.interactions).length}</p>
          </div>
        </div>

        <div className="space-y-4">
          {sortedInteractions.map(({ pair, count }, index) => {
            const [user1, user2] = pair.split('-')
            return (
              <div
                key={pair}
                className="group flex items-center gap-3 p-2 rounded-lg hover:bg-muted/50 transition-all duration-300"
              >
                <div className="flex h-8 w-8 items-center justify-center rounded-md bg-primary/10 text-primary group-hover:scale-110 transition-transform">
                  {index + 1}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-baseline">
                    <p className="text-sm font-medium truncate">
                      {user1} ↔ {user2}
                    </p>
                    <span className="text-sm text-muted-foreground">{count}</span>
                  </div>
                  <div className="mt-1 h-1.5 w-full rounded-full bg-muted overflow-hidden">
                    <div
                      className="h-full bg-primary transition-all duration-300 group-hover:opacity-80"
                      style={{ width: `${maxInteractions > 0 ? (count / maxInteractions) * 100 : 0}%` }}
                    />
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </StatsCard>
  )
}