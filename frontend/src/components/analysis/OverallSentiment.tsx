'use client'

import { StatsCard } from './StatsCard'
import { getSentimentColor } from '@/lib/utils'
import { Smile, TrendingUp, BarChart2, Zap } from 'lucide-react'

interface OverallSentimentProps {
  overall_sentiment: SentimentStats
}

function SentimentGauge({ value }: { value: number }) {
  const rotation = (value + 1) * 90 // Convert -1 to 1 range to 0 to 180 degrees
  
  return (
    <div className="relative w-48 h-24 mx-auto">
      {/* Gauge background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute bottom-0 left-0 right-0 h-full rounded-t-full border-8 border-muted opacity-30" />
      </div>
      
      {/* Gauge needle */}
      <div 
        className="absolute bottom-0 left-1/2 h-20 w-1 origin-bottom bg-primary transition-transform duration-1000"
        style={{ transform: `translateX(-50%) rotate(${rotation}deg)` }}
      >
        <div className="absolute -top-1 -left-1 h-2 w-2 rounded-full bg-primary" />
      </div>
      
      {/* Labels */}
      <div className="absolute -bottom-6 left-0 right-0 flex justify-between text-xs text-muted-foreground">
        <span>Negative</span>
        <span>Neutral</span>
        <span>Positive</span>
      </div>
    </div>
  )
}

export function OverallSentiment({ overall_sentiment }: OverallSentimentProps) {
  const sentimentColor = getSentimentColor(overall_sentiment.average)
  
  return (
    <StatsCard title="Overall Sentiment">
      <div className="space-y-8">
        {/* Sentiment Score */}
        <div className="relative p-6 rounded-lg bg-card/50">
          <div className="absolute top-0 right-0 p-3">
            <Smile className="h-6 w-6 text-primary" />
          </div>
          <h4 className="text-sm font-medium text-muted-foreground mb-2">
            Average Sentiment Score
          </h4>
          <div className="flex items-baseline gap-2">
            <p className={`text-4xl font-bold ${sentimentColor}`}>
              {overall_sentiment.average.toFixed(2)}
            </p>
            <span className="text-sm text-muted-foreground">/ 1.0</span>
          </div>
          
          <SentimentGauge value={overall_sentiment.average} />
        </div>

        {/* Statistics Grid */}
        <div className="grid grid-cols-3 gap-4">
          <div className="group p-4 rounded-lg border bg-card hover:bg-card/50 transition-all duration-300">
            <div className="flex items-center gap-2 text-primary mb-2">
              <TrendingUp className="h-4 w-4 transition-transform group-hover:scale-110" />
              <h4 className="text-xs font-medium">Variance</h4>
            </div>
            <p className="text-lg font-semibold">
              {(overall_sentiment.std ** 2).toFixed(3)}
            </p>
          </div>

          <div className="group p-4 rounded-lg border bg-card hover:bg-card/50 transition-all duration-300">
            <div className="flex items-center gap-2 text-primary mb-2">
              <BarChart2 className="h-4 w-4 transition-transform group-hover:scale-110" />
              <h4 className="text-xs font-medium">Std Dev</h4>
            </div>
            <p className="text-lg font-semibold">
              {overall_sentiment.std.toFixed(3)}
            </p>
          </div>

          <div className="group p-4 rounded-lg border bg-card hover:bg-card/50 transition-all duration-300">
            <div className="flex items-center gap-2 text-primary mb-2">
              <Zap className="h-4 w-4 transition-transform group-hover:scale-110" />
              <h4 className="text-xs font-medium">Range</h4>
            </div>
            <p className="text-lg font-semibold">
              {(overall_sentiment.max - overall_sentiment.min).toFixed(2)}
            </p>
          </div>
        </div>
      </div>
    </StatsCard>
  )
}