'use client'

import { StatsCard } from './StatsCard'
import { Moon, Sun, Clock } from 'lucide-react'

interface SleepPatternAnalysisProps {
  sleep_patterns: SleepPatterns
}

export function SleepPatternAnalysis({ sleep_patterns }: SleepPatternAnalysisProps) {
  return (
    <StatsCard title="Sleep Pattern Analysis">
      <div className="space-y-6">
        {Object.entries(sleep_patterns.sleep_times).map(([user, times]) => (
          <div
            key={user}
            className="group p-4 rounded-lg border bg-card hover:bg-card/50 transition-all duration-300"
          >
            <h3 className="font-medium mb-4">{user}</h3>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center gap-2">
                <Moon className="h-4 w-4 text-primary" />
                <div>
                  <p className="text-sm text-muted-foreground">Sleep Time</p>
                  <p className="font-medium">
                    {new Date(times.start).toLocaleTimeString([], {
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Sun className="h-4 w-4 text-primary" />
                <div>
                  <p className="text-sm text-muted-foreground">Wake Time</p>
                  <p className="font-medium">
                    {new Date(times.end).toLocaleTimeString([], {
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-4 flex items-center gap-2">
              <Clock className="h-4 w-4 text-primary" />
              <div>
                <p className="text-sm text-muted-foreground">Sleep Duration</p>
                <p className="font-medium">
                  {((new Date(times.end).getTime() - new Date(times.start).getTime()) / 
                    (1000 * 60 * 60)).toFixed(1)} hours
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </StatsCard>
  )
}