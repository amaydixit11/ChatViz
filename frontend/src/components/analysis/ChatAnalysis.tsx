'use client'

import { RefreshCw, ArrowRight, ChevronDown } from 'lucide-react'
import { KeyMetrics } from './KeyMetrics'
import { UserMessages } from './UserMessages'
import { UserSentiment } from './UserSentiment'
import { OverallSentiment } from './OverallSentiment'
import { PopularWords } from './PopularWords'
import { MostUsedEmojis } from './MostUsedEmojis'
import { ActivityInsights } from './ActivityInsights'
import { HourlyActivity } from './HourlyActivity'
import { ThemeToggle } from '../ThemeToggle'
import { BurstSilenceAnalysis } from './BurstSilenceAnalysis'
import { CodeSnippetAnalysis } from './CodeSnippetAnalysis'
import { InteractionAnalysis } from './InteractionAnalysis'
import { SleepPatternAnalysis } from './SleepPatternAnalysis'
import { StopwordAnalysis } from './StopwordAnalysis'
import { TopicAnalysis } from './TopicAnalysis'
import { ReadabilityAnalysis } from './ReadabilityAnalysis'
import { NetworkAnalysis } from './NetworkAnalysis'
import { useState } from 'react'

interface ChatAnalysisProps {
  analysis: ChatAnalysis
  onReset: () => void
}

const Section = ({ title, color, children, defaultExpanded = true }: any) => {
  const [isExpanded, setIsExpanded] = useState(defaultExpanded)
  
  return (
    <section className="rounded-xl border border-border/50 bg-background/50 backdrop-blur-sm shadow-lg">
      <button 
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full px-6 py-4 flex items-center justify-between hover:bg-accent/5 rounded-t-xl transition-colors"
      >
        <h2 className="text-2xl font-semibold text-foreground/80 flex items-center gap-3">
          <span className={`h-8 w-1 rounded-full ${color}`} />
          {title}
        </h2>
        <ChevronDown className={`w-5 h-5 transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
      </button>
      {isExpanded && (
        <div className="p-6 pt-2 space-y-6">
          {children}
        </div>
      )}
    </section>
  )
}

export default function ChatAnalysis({ analysis, onReset }: ChatAnalysisProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background/95 to-background/90">
      {/* Header Section */}
      <header className="sticky top-0 z-50 backdrop-blur-xl border-b border-border/40 bg-background/80">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4">
            {/* Title & Date Range */}
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-3xl sm:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary via-primary to-secondary">
                  Chat Analysis
                </h1>
                <div className="px-2 py-1 rounded-md bg-primary/10 text-primary text-sm">
                  Beta
                </div>
              </div>
              <div className="flex items-center gap-2 mt-1">
                <p className="text-muted-foreground text-sm">
                  {analysis.basic_stats.date_range.start}
                </p>
                <ArrowRight className="w-4 h-4 text-muted-foreground" />
                <p className="text-muted-foreground text-sm">
                  {analysis.basic_stats.date_range.end}
                </p>
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-4">
              <ThemeToggle />
              <button
                onClick={onReset}
                className="group relative overflow-hidden px-6 py-2.5 rounded-lg border border-primary/30 hover:border-primary/50 transition-all duration-300 bg-gradient-to-r from-primary/5 to-primary/10 hover:from-primary/10 hover:to-primary/20"
              >
                <div className="absolute inset-0 bg-primary/10 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-out" />
                <div className="relative flex items-center gap-2 text-sm font-medium text-primary">
                  <RefreshCw className="h-4 w-4 transition-transform duration-500 group-hover:rotate-180" />
                  New Analysis
                </div>
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="space-y-8">
          {/* Overview Section */}
          <Section title="Key Insights" color="bg-primary">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <KeyMetrics 
                stats={analysis.basic_stats} 
                responseTime={analysis.time_patterns.average_response_time_seconds}
              />
              <UserMessages user_activity={analysis.user_activity} />
            </div>
          </Section>

          {/* Activity Section */}
          <Section title="Activity Patterns" color="bg-secondary">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <HourlyActivity hourly_data={analysis.time_patterns.hourly_activity} />
              <ActivityInsights time_patterns={analysis.time_patterns} />
            </div>
          </Section>

          {/* Content Analysis Section */}
          <Section title="Content Analysis" color="bg-[#db2777]">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <MostUsedEmojis content_analysis={analysis.content_analysis} />
              <PopularWords content_analysis={analysis.content_analysis} />
            </div>
          </Section>

          {/* Sentiment Analysis Section */}
          <Section title="Sentiment Analysis" color="bg-[#6366f1]">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <OverallSentiment overall_sentiment={analysis.sentiment_analysis.overall_sentiment} />
              <UserSentiment userSentiment={analysis.sentiment_analysis.user_sentiment} />
            </div>
          </Section>

          {/* Additional Analysis Sections */}
          <Section title="Interaction Patterns" color="bg-[#8b5cf6]" defaultExpanded={false}>
            <InteractionAnalysis interactions={analysis.interactions}/>
          </Section>

          <Section title="Communication Patterns" color="bg-[#ec4899]" defaultExpanded={false}>
            <div className="space-y-6">
              <BurstSilenceAnalysis burst_silence={analysis.burst_silence}/>
              <ReadabilityAnalysis readability={analysis.readability}/>
            </div>
          </Section>

          <Section title="Advanced Analytics" color="bg-[#14b8a6]" defaultExpanded={false}>
            <div className="space-y-6">
              {/* <NetworkAnalysis network_analysis={analysis.network_analysis}/> */}
              <TopicAnalysis topics={analysis.topics}/>
              <SleepPatternAnalysis sleep_patterns={analysis.sleep_patterns}/>
            </div>
          </Section>

          <Section title="Technical Analysis" color="bg-[#f97316]" defaultExpanded={false}>
            <div className="space-y-6">
              {/* <CodeSnippetAnalysis code_snippets={analysis.code_snippets}/> */}
              <StopwordAnalysis stopwords={analysis.stopwords}/>
            </div>
          </Section>
        </div>
      </main>
    </div>
  )
}