'use client'

import { StatsCard } from './StatsCard'
import { getSentimentColor } from '@/lib/utils'
import { User, TrendingUp, TrendingDown } from 'lucide-react'

interface UserSentimentProps {
  userSentiment: Record<string, SentimentStats>
}

function SentimentBar({ value, max }: { value: number; max: number }) {
  const width = Math.abs((value / max) * 100)
  const isPositive = value >= 0
  
  return (
    <div className="relative h-2 w-full bg-muted rounded-full overflow-hidden">
      <div
        className={`absolute top-0 h-full transition-all duration-500 rounded-full ${
          isPositive ? 'right-1/2 bg-green-500' : 'left-1/2 bg-red-500'
        }`}
        style={{ width: `${width}%` }}
      />
    </div>
  )
}

export function UserSentiment({ userSentiment }: UserSentimentProps) {
  const users = Object.entries(userSentiment).sort((a, b) => b[1].average - a[1].average)
  const maxAbsValue = Math.max(
    ...Object.values(userSentiment).map(stats => Math.abs(stats.average))
  )

  return (
    <StatsCard title="Sentiment By User">
      <div className="space-y-6">
        {users.map(([user, stats]) => (
          <div
            key={user}
            className="group relative p-4 rounded-lg border bg-card hover:bg-card/50 transition-all duration-300"
          >
            {/* User Info */}
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <User className="h-4 w-4" />
                </div>
                <h4 className="font-medium">{user}</h4>
              </div>
              <div className={`flex items-center gap-2 ${getSentimentColor(stats.average)}`}>
                {stats.average >= 0 ? (
                  <TrendingUp className="h-4 w-4" />
                ) : (
                  <TrendingDown className="h-4 w-4" />
                )}
                <span className="font-semibold">{stats.average.toFixed(2)}</span>
              </div>
            </div>

            {/* Sentiment Bar */}
            <SentimentBar value={stats.average} max={maxAbsValue} />

            {/* Stats Grid */}
            <div className="grid grid-cols-3 gap-4 mt-4 text-sm">
              <div>
                <p className="text-muted-foreground">Range</p>
                <p className="font-medium">
                  [{stats.min.toFixed(2)}, {stats.max.toFixed(2)}]
                </p>
              </div>
              <div>
                <p className="text-muted-foreground">Std Dev</p>
                <p className="font-medium">{stats.std.toFixed(3)}</p>
              </div>
              <div>
                <p className="text-muted-foreground">Variance</p>
                <p className="font-medium">{(stats.std ** 2).toFixed(3)}</p>
              </div>
            </div>

            {/* Hover Effect */}
            <div className="absolute inset-0 border border-primary/10 rounded-lg scale-105 opacity-0 group-hover:opacity-100 transition-all duration-300" />
          </div>
        ))}
      </div>
    </StatsCard>
  )
}