'use client'

import { StatsCard } from './StatsCard'
import { Hash, MessageCircle } from 'lucide-react'

interface TopicAnalysisProps {
  topics: Topics
}

export function TopicAnalysis({ topics }: TopicAnalysisProps) {
  return (
    <StatsCard title="Topic Analysis">
      <div className="space-y-4">
        {topics.topics.map((topic, index) => (
          <div
            key={index}
            className="group p-4 rounded-lg border bg-card hover:bg-card/50 transition-all duration-300"
          >
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <div className="h-8 w-8 flex items-center justify-center rounded-full bg-primary/10">
                  <Hash className="h-4 w-4 text-primary" />
                </div>
                <h3 className="font-medium">{topic.topic}</h3>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <MessageCircle className="h-4 w-4 text-muted-foreground" />
                <div className="flex flex-wrap gap-2">
                  {topic.words.map((word, wordIndex) => (
                    <span
                      key={wordIndex}
                      className="px-2 py-1 text-xs rounded-full bg-muted text-muted-foreground"
                    >
                      {word}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </StatsCard>
  )
}