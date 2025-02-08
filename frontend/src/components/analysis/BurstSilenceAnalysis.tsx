'use client'

import { StatsCard } from './StatsCard'
import { Clock, Zap, AlertTriangle, Activity } from 'lucide-react'
import { formatDuration } from '@/lib/utils'

interface BurstSilenceAnalysisProps {
  burst_silence: BurstSilence
}

export function BurstSilenceAnalysis({ burst_silence }: BurstSilenceAnalysisProps) {
  const getBurstRatioLabel = (ratio: number) => {
    if (ratio > 1.5) return 'High activity bursts'
    if (ratio < 0.5) return 'Short activity bursts'
    return 'Balanced activity'
  }

  const getSilenceRatioLabel = (ratio: number) => {
    if (ratio > 1.5) return 'Long silence periods'
    if (ratio < 0.5) return 'Short silence periods'
    return 'Regular intervals'
  }

  const burstRatio = burst_silence.burst_avg / burst_silence.silence_avg
  const silenceRatio = burst_silence.silence_avg / burst_silence.burst_avg

  return (
    <StatsCard title="Communication Patterns">
      <div className="space-y-6">
        <div className="grid grid-cols-2 gap-4">
          <div className="group p-4 rounded-lg border bg-card hover:bg-card/50 transition-all duration-300">
            <div className="flex items-center gap-2 text-primary mb-2">
              <Zap className="h-4 w-4 transition-transform group-hover:scale-110" />
              <h4 className="text-xs font-medium">Active Periods</h4>
            </div>
            <p className="text-2xl font-semibold">
              {formatDuration(burst_silence.burst_avg)}
            </p>
            <p className="text-sm text-muted-foreground mt-1">
              Average conversation duration
            </p>
          </div>

          <div className="group p-4 rounded-lg border bg-card hover:bg-card/50 transition-all duration-300">
            <div className="flex items-center gap-2 text-primary mb-2">
              <Clock className="h-4 w-4 transition-transform group-hover:scale-110" />
              <h4 className="text-xs font-medium">Break Periods</h4>
            </div>
            <p className="text-2xl font-semibold">
              {formatDuration(burst_silence.silence_avg)}
            </p>
            <p className="text-sm text-muted-foreground mt-1">
              Average time between chats
            </p>
          </div>
        </div>

        <div className="p-4 rounded-lg border bg-card">
          <div className="flex items-center gap-2 text-primary mb-4">
            <Activity className="h-4 w-4" />
            <h4 className="text-sm font-medium">Activity Analysis</h4>
          </div>
          
          <div className="space-y-4">
            <div>
              <div className="flex justify-between items-baseline mb-2">
                <span className="text-sm text-muted-foreground">Activity Pattern</span>
                <span className="text-sm font-medium">{burstRatio.toFixed(2)}</span>
              </div>
              <div className="space-y-2">
                <div className="h-2 bg-muted rounded-full overflow-hidden">
                  <div
                    className="h-full bg-primary transition-all duration-300"
                    style={{
                      width: `${Math.min((burstRatio / 2) * 100, 100)}%`
                    }}
                  />
                </div>
                <p className="text-xs text-muted-foreground">
                  {getBurstRatioLabel(burstRatio)}
                </p>
              </div>
            </div>

            <div>
              <div className="flex justify-between items-baseline mb-2">
                <span className="text-sm text-muted-foreground">Break Pattern</span>
                <span className="text-sm font-medium">{silenceRatio.toFixed(2)}</span>
              </div>
              <div className="space-y-2">
                <div className="h-2 bg-muted rounded-full overflow-hidden">
                  <div
                    className="h-full bg-primary transition-all duration-300"
                    style={{
                      width: `${Math.min((silenceRatio / 2) * 100, 100)}%`
                    }}
                  />
                </div>
                <p className="text-xs text-muted-foreground">
                  {getSilenceRatioLabel(silenceRatio)}
                </p>
              </div>
            </div>
          </div>

          <div className="mt-4 p-3 rounded-md bg-muted/50">
            <div className="flex gap-2">
              <AlertTriangle className="h-4 w-4 text-primary flex-shrink-0 mt-0.5" />
              <p className="text-xs text-muted-foreground">
                A ratio close to 1.0 indicates balanced communication patterns. Higher ratios show longer periods of either activity or silence.
              </p>
            </div>
          </div>
        </div>
      </div>
    </StatsCard>
  )
}