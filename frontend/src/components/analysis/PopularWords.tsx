'use client'

import { StatsCard } from './StatsCard'
import { Hash, Globe } from 'lucide-react'

interface PopularWordsProps {
  content_analysis: ContentAnalysis
}

function ItemList({ items, icon: Icon }: { 
  items: [string, number][], 
  icon: React.ComponentType<any> 
}) {
  return (
    <div className="space-y-3">
      {items.map(([item, count], index) => (
        <div
          key={item}
          className="group flex items-center gap-3 p-2 rounded-lg hover:bg-muted/50 transition-all duration-300"
        >
          <div className="flex h-8 w-8 items-center justify-center rounded-md bg-primary/10 text-primary group-hover:scale-110 transition-transform">
            <Icon className="h-4 w-4" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex justify-between items-baseline">
              <p className="text-sm font-medium truncate">{item}</p>
              <span className="text-sm text-muted-foreground">{count}</span>
            </div>
            <div className="mt-1 h-1.5 w-full rounded-full bg-muted overflow-hidden">
              <div
                className="h-full bg-primary transition-all duration-300 group-hover:opacity-80"
                style={{
                  width: `${(count / items[0][1]) * 100}%`
                }}
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

export function PopularWords({ content_analysis }: PopularWordsProps) {
  const words = Object.entries(content_analysis.word_frequency).slice(0, 8)
  const domains = Object.entries(content_analysis.shared_domains).slice(0, 8)

  return (
    <StatsCard title="Popular Words & URLs">
      <div className="space-y-8">
        <div>
          <div className="flex items-center gap-2 text-primary mb-4">
            <Hash className="h-4 w-4" />
            <h4 className="text-sm font-medium">Top Words</h4>
          </div>
          <ItemList items={words} icon={Hash} />
        </div>

        <div>
          <div className="flex items-center gap-2 text-primary mb-4">
            <Globe className="h-4 w-4" />
            <h4 className="text-sm font-medium">Top Domains</h4>
          </div>
          <ItemList items={domains} icon={Globe} />
        </div>
      </div>
    </StatsCard>
  )
}