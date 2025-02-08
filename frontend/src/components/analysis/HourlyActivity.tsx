'use client'

import { StatsCard } from './StatsCard'
import { formatHourlyData } from '@/lib/utils'
import {
  Line,
  LineChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import { useTheme } from '../ThemeProvider'

interface HourlyActivityProps {
  hourly_data: Record<string, number>
}

export function HourlyActivity({ hourly_data }: HourlyActivityProps) {
  const { currentTheme } = useTheme()
  const data = formatHourlyData(hourly_data)

  return (
    <StatsCard title="Hourly Activity">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <defs>
            <linearGradient id="gradient" x1="0" y1="0" x2="0" y2="1">
              <stop 
                offset="5%" 
                stopColor={currentTheme.colors.primary.default} 
                stopOpacity={0.2}
              />
              <stop 
                offset="95%" 
                stopColor={currentTheme.colors.primary.default} 
                stopOpacity={0}
              />
            </linearGradient>
          </defs>
          <CartesianGrid 
            strokeDasharray="3 3" 
            stroke={currentTheme.colors.border} 
          />
          <XAxis 
            dataKey="hour" 
            stroke={currentTheme.colors.foreground}
          />
          <YAxis stroke={currentTheme.colors.foreground} />
          <Tooltip
            contentStyle={{
              backgroundColor: currentTheme.colors.background,
              borderColor: currentTheme.colors.border,
            //   borderRadius: currentTheme.borderRadius,
            }}
          />
          <Line
            type="monotone"
            dataKey="count"
            stroke={currentTheme.colors.primary.default}
            strokeWidth={2}
            dot={false}
            activeDot={{ r: 6, fill: currentTheme.colors.primary.default }}
            fill="url(#gradient)"
          />
        </LineChart>
      </ResponsiveContainer>
    </StatsCard>
  )
}