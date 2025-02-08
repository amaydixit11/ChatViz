'use client'

import { StatsCard } from './StatsCard'
import { MessageSquare, Users, Image, Smile, Link2, Clock } from 'lucide-react'
import { formatDuration, formatNumber } from '@/lib/utils'

interface KeyMetricsProps {
  stats: BasicStats
  responseTime: number
}

interface MetricItemProps {
  title: string
  value: string | number
  icon: React.ReactNode
  description?: string
  trend?: {
    value: number
    isPositive: boolean
  }
}

function MetricItem({ title, value, icon, description, trend }: MetricItemProps) {
  return (
    <div className="group relative p-4 rounded-lg border bg-card hover:bg-card/50 transition-all duration-300">
      <div className="absolute -right-3 -top-3 h-12 w-12 bg-primary/5 rounded-full transform scale-0 group-hover:scale-100 transition-transform duration-300" />
      <div className="relative space-y-3">
        <div className="flex items-center justify-between">
          <div className="h-10 w-10 flex items-center justify-center rounded-lg bg-primary/10 text-primary transform transition-transform group-hover:scale-110">
            {icon}
          </div>
          {trend && (
            <div className={`flex items-center gap-1 text-sm ${trend.isPositive ? 'text-green-500' : 'text-red-500'}`}>
              <span>{trend.value}%</span>
              <svg
                className={`h-4 w-4 ${trend.isPositive ? 'rotate-0' : 'rotate-180'}`}
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path d="M5 15l7-7 7 7" />
              </svg>
            </div>
          )}
        </div>
        <div className="space-y-1">
          <h3 className="text-sm font-medium text-muted-foreground">{title}</h3>
          <p className="text-2xl font-bold">{value}</p>
          {description && (
            <p className="text-sm text-muted-foreground">{description}</p>
          )}
        </div>
      </div>
      <div className="absolute bottom-0 left-0 h-1 w-full scale-x-0 bg-primary/30 transition-transform duration-300 group-hover:scale-x-100" />
    </div>
  )
}

export function KeyMetrics({ stats, responseTime }: KeyMetricsProps) {
  const metrics: MetricItemProps[] = [
    {
      title: "Total Messages",
      value: formatNumber(stats.total_messages),
      icon: <MessageSquare className="h-5 w-5" />,
      description: "Messages exchanged",
      trend: { value: 12, isPositive: true }
    },
    {
      title: "Participants",
      value: stats.total_participants,
      icon: <Users className="h-5 w-5" />,
      description: "Active users"
    },
    {
      title: "Media Shared",
      value: formatNumber(stats.media_count),
      icon: <Image className="h-5 w-5" />,
      description: "Photos and videos",
      trend: { value: 8, isPositive: true }
    },
    {
      title: "Total Emojis",
      value: formatNumber(stats.total_emojis),
      icon: <Smile className="h-5 w-5" />,
      description: "Emojis used"
    },
    {
      title: "URLs Shared",
      value: formatNumber(stats.urls_shared),
      icon: <Link2 className="h-5 w-5" />,
      description: "Links shared"
    },
    {
      title: "Avg Response Time",
      value: formatDuration(responseTime),
      icon: <Clock className="h-5 w-5" />,
      description: "Average reply time",
      trend: { value: 5, isPositive: false }
    }
  ]

  return (
    <StatsCard title="Key Metrics">
      <div className="grid grid-cols-2 gap-4">
        {metrics.map((metric) => (
          <MetricItem key={metric.title} {...metric} />
        ))}
      </div>
    </StatsCard>
  )
}