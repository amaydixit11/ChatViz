'use client'

import { StatsCard } from './StatsCard'
import { Code, FileCode } from 'lucide-react'

interface CodeSnippetAnalysisProps {
  code_snippets: CodeSnippets
}

export function CodeSnippetAnalysis({ code_snippets }: CodeSnippetAnalysisProps) {
  const totalSnippets = Object.values(code_snippets.code_blocks).reduce((a, b) => a + b, 0)
  const languages = Object.entries(code_snippets.code_blocks)
    .sort(([, a], [, b]) => b - a)

  return (
    <StatsCard title="Code Sharing Analysis">
      <div className="space-y-6">
        <div className="grid grid-cols-2 gap-4">
          <div className="group p-4 rounded-lg border bg-card hover:bg-card/50 transition-all duration-300">
            <div className="flex items-center gap-2 text-primary mb-2">
              <Code className="h-4 w-4 transition-transform group-hover:scale-110" />
              <h4 className="text-xs font-medium">Total Snippets</h4>
            </div>
            <p className="text-2xl font-semibold">{totalSnippets}</p>
          </div>

          <div className="group p-4 rounded-lg border bg-card hover:bg-card/50 transition-all duration-300">
            <div className="flex items-center gap-2 text-primary mb-2">
              <FileCode className="h-4 w-4 transition-transform group-hover:scale-110" />
              <h4 className="text-xs font-medium">Languages</h4>
            </div>
            <p className="text-2xl font-semibold">{languages.length}</p>
          </div>
        </div>

        <div className="space-y-4">
          {languages.map(([language, count]) => (
            <div
              key={language}
              className="group flex items-center gap-3 p-2 rounded-lg hover:bg-muted/50 transition-all duration-300"
            >
              <div className="flex h-8 w-8 items-center justify-center rounded-md bg-primary/10 text-primary group-hover:scale-110 transition-transform">
                <Code className="h-4 w-4" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-baseline">
                  <p className="text-sm font-medium truncate">{language}</p>
                  <span className="text-sm text-muted-foreground">{count}</span>
                </div>
                <div className="mt-1 h-1.5 w-full rounded-full bg-muted overflow-hidden">
                  <div
                    className="h-full bg-primary transition-all duration-300 group-hover:opacity-80"
                    style={{ width: `${(count / totalSnippets) * 100}%` }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </StatsCard>
  )
}