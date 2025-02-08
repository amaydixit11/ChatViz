'use client'

import { StatsCard } from './StatsCard'
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from 'recharts'
import { formatEmojiData } from '@/lib/utils'
import { useTheme } from '../ThemeProvider'

interface MostUsedEmojisProps {
  content_analysis: ContentAnalysis
}

export function MostUsedEmojis({ content_analysis }: MostUsedEmojisProps) {
  const { currentTheme } = useTheme()
  const data = formatEmojiData(content_analysis)

  const CHART_COLORS = [
    currentTheme.colors.primary.default,
    currentTheme.colors.secondary.default,
    '#db2777',
    '#ea580c',
    '#65a30d',
    '#0891b2',
    '#6366f1',
    '#d946ef'
  ]

  return (
    <StatsCard title="Most Used Emojis">
      <div className="h-full flex flex-col">
        <div className="flex-1">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={120}
                innerRadius={60}
                paddingAngle={2}
                label={({ name, value }) => `${name} (${value})`}
              >
                {data.map((_, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={CHART_COLORS[index % CHART_COLORS.length]}
                    className="transition-all duration-300 hover:opacity-80"
                  />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  backgroundColor: currentTheme.colors.background,
                  borderColor: currentTheme.colors.border,
                //   borderRadius: currentTheme.borderRadius,
                //   boxShadow: currentTheme.boxShadow,
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="mt-4 grid grid-cols-4 gap-2">
          {data.slice(0, 8).map((item, index) => (
            <div
              key={item.name}
              className="group p-2 rounded-lg hover:bg-muted/50 transition-all duration-300 text-center"
            >
              <div
                className="text-2xl mb-1 transform transition-transform group-hover:scale-125"
                style={{ color: CHART_COLORS[index % CHART_COLORS.length] }}
              >
                {item.name}
              </div>
              <div className="text-sm text-muted-foreground">{item.value}</div>
            </div>
          ))}
        </div>
      </div>
    </StatsCard>
  )
}