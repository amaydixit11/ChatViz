'use client'

import { useState } from 'react'
import { RefreshCw, BarChart3, Clock, Heart, MessageSquare } from 'lucide-react'
import { KeyMetrics } from './KeyMetrics'
import { UserMessages } from './UserMessages'
import { UserSentiment } from './UserSentiment'
import { OverallSentiment } from './OverallSentiment'
import { PopularWords } from './PopularWords'
import { MostUsedEmojis } from './MostUsedEmojis'
import { ActivityInsights } from './ActivityInsights'
import { HourlyActivity } from './HourlyActivity'
import { useTheme } from '../ThemeProvider'
import { ThemeToggle } from '../ThemeToggle'

interface ChatAnalysisProps {
  analysis: ChatAnalysis
  onReset: () => void
}

export default function ChatAnalysis({ analysis, onReset }: ChatAnalysisProps) {
  const [activeTab, setActiveTab] = useState('overview')
  const { currentTheme } = useTheme()

  const tabs = [
    { id: 'overview', label: 'Overview', icon: BarChart3 },
    { id: 'activity', label: 'Activity', icon: Clock },
    { id: 'content', label: 'Content', icon: MessageSquare },
    { id: 'sentiment', label: 'Sentiment', icon: Heart }
  ]

  return (
    <div className="space-y-8 max-w-7xl mx-auto px-4 py-8">
      <div className="relative">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
              Chat Analysis Results
            </h2>
            <p className="text-muted-foreground mt-2">
              {analysis.basic_stats.date_range.start} - {analysis.basic_stats.date_range.end}
            </p>
          </div>
          <div className="flex items-center gap-4">
            <ThemeToggle />
            <button
              onClick={onReset}
              className="group relative overflow-hidden px-6 py-2 rounded-lg border border-primary/20 hover:border-primary/30 transition-all"
            >
              <div className="absolute inset-0 bg-primary/5 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
              <div className="relative flex items-center gap-2 text-sm font-medium text-primary">
                <RefreshCw className="h-4 w-4 transition-transform group-hover:rotate-180" />
                New Analysis
              </div>
            </button>
          </div>
        </div>
      </div>

      <nav className="flex space-x-1 rounded-lg bg-muted p-1">
        {tabs.map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            onClick={() => setActiveTab(id)}
            className={`
              flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-md transition-colors
              ${activeTab === id
                ? 'bg-background text-foreground shadow-sm'
                : 'text-muted-foreground hover:text-foreground hover:bg-background/50'
              }
            `}
          >
            <Icon className="h-4 w-4" />
            {label}
          </button>
        ))}
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {activeTab === 'overview' && (
          <>
            <KeyMetrics 
              stats={analysis.basic_stats} 
              responseTime={analysis.time_patterns.average_response_time_seconds}
            />
            <UserMessages user_activity={analysis.user_activity} />
          </>
        )}

        {activeTab === 'activity' && (
          <>
            <HourlyActivity hourly_data={analysis.time_patterns.hourly_activity} />
            <ActivityInsights time_patterns={analysis.time_patterns} />
          </>
        )}

        {activeTab === 'content' && (
          <>
            <MostUsedEmojis content_analysis={analysis.content_analysis} />
            <PopularWords content_analysis={analysis.content_analysis} />
          </>
        )}

        {activeTab === 'sentiment' && (
          <>
            <OverallSentiment overall_sentiment={analysis.sentiment_analysis.overall_sentiment} />
            <UserSentiment userSentiment={analysis.sentiment_analysis.user_sentiment} />
          </>
        )}
      </div>
    </div>
  )
}