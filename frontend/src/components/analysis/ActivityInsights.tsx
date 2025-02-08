'use client'

import { StatsCard } from './StatsCard'
import { Clock, Calendar, Zap, ArrowUp, ArrowDown, Target } from 'lucide-react'
import { formatDuration } from '@/lib/utils'

const DAYS_OF_WEEK = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']

interface ActivityInsightsProps {
  time_patterns: TimePatterns
}

export function ActivityInsights({ time_patterns }: ActivityInsightsProps) {
  return (
    <StatsCard title="Activity Insights">
      <div className="space-y-8">
        <div className="grid grid-cols-2 gap-4">
          <div className="group p-4 rounded-lg border bg-card hover:bg-card/50 transition-all duration-300">
            <div className="flex items-center gap-2 text-primary mb-2">
              <Clock className="h-4 w-4 transition-transform group-hover:rotate-12" />
              <h4 className="text-sm font-medium">Peak Hour</h4>
            </div>
            <p className="text-2xl font-semibold">{time_patterns.peak_hour}:00</p>
            <div className="mt-2 text-sm text-muted-foreground">
              Most active time of day
            </div>
          </div>
          
          <div className="group p-4 rounded-lg border bg-card hover:bg-card/50 transition-all duration-300">
            <div className="flex items-center gap-2 text-primary mb-2">
              <Calendar className="h-4 w-4 transition-transform group-hover:scale-110" />
              <h4 className="text-sm font-medium">Peak Day</h4>
            </div>
            <p className="text-2xl font-semibold">
              {DAYS_OF_WEEK[time_patterns.peak_day]}
            </p>
            <div className="mt-2 text-sm text-muted-foreground">
              Busiest day of the week
            </div>
          </div>
        </div>

        <div className="p-6 rounded-lg border bg-card">
          <div className="flex items-center gap-2 text-primary mb-6">
            <Zap className="h-5 w-5" />
            <h4 className="text-base font-medium">Response Times</h4>
          </div>
          
          <div className="space-y-6">
            <div className="relative p-4 rounded-lg bg-primary/5">
              <span className="text-sm text-muted-foreground">Average</span>
              <div className="mt-1 flex items-baseline gap-2">
                <span className="text-2xl font-bold">
                  {formatDuration(time_patterns.average_response_time_seconds)}
                </span>
                <span className="text-sm text-muted-foreground">response time</span>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 rounded-lg hover:bg-muted/50 transition-colors">
                <div className="flex items-center gap-2">
                  <ArrowDown className="h-4 w-4 text-green-500" />
                  <span className="text-sm font-medium">Fastest</span>
                </div>
                <span>{formatDuration(time_patterns.response_time_distribution.min)}</span>
              </div>

              <div className="flex items-center justify-between p-3 rounded-lg hover:bg-muted/50 transition-colors">
                <div className="flex items-center gap-2">
                  <ArrowUp className="h-4 w-4 text-red-500" />
                  <span className="text-sm font-medium">Slowest</span>
                </div>
                <span>{formatDuration(time_patterns.response_time_distribution.max)}</span>
              </div>

              <div className="flex items-center justify-between p-3 rounded-lg hover:bg-muted/50 transition-colors">
                <div className="flex items-center gap-2">
                  <Target className="h-4 w-4 text-blue-500" />
                  <span className="text-sm font-medium">Median</span>
                </div>
                <span>{formatDuration(time_patterns.response_time_distribution.median)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </StatsCard>
  )
}