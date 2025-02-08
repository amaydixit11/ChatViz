'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Loader2 } from 'lucide-react'
import ChatAnalysis from '@/components/analysis/ChatAnalysis'
import { useAnalysisStore } from '@/lib/store'
import { useTheme } from '@/components/ThemeProvider'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'

export default function AnalysisPage() {
  const router = useRouter()
  const { currentTheme } = useTheme()
  const analysis = useAnalysisStore((state) => state.analysis)
  const setAnalysis = useAnalysisStore((state) => state.setAnalysis)

  useEffect(() => {
    if (!analysis) {
      router.push('/')
    }
  }, [analysis, router])

  const handleReset = () => {
    setAnalysis(null)
    router.push('/')
  }

  if (!analysis) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <div className="rounded-full bg-primary p-3">
          <Loader2 className="h-8 w-8 animate-spin text-primary-foreground" />
        </div>
      </div>
    )
  }

  return (
    // <main className="relative min-h-screen bg-background text-foreground">
    //   Background pattern
    //   <div className="absolute inset-0 -z-10">
    //     <div 
    //       className="h-full w-full border-border"
    //       style={{
    //         backgroundImage: `
    //           linear-gradient(to right, rgb(var(--border) / 0.1) 1px, transparent 1px),
    //           linear-gradient(to bottom, rgb(var(--border) / 0.1) 1px, transparent 1px)
    //         `,
    //         backgroundSize: '6rem 4rem'
    //       }}
    //     >
    //       <div className="absolute bottom-0 left-0 right-0 top-0 bg-[radial-gradient(circle_800px_at_100%_200px,hsl(var(--primary)/0.1),transparent)]" />
    //     </div>
    //   </div>

    //   Content
    //   <div className="container mx-auto px-4 py-8">
    //     <Card className="mb-6 border-primary/20">
    //       <CardContent className="pt-6">
    //         <h1 className="text-2xl font-bold text-foreground mb-2">Analysis Results</h1>
    //         <p className="text-secondary-foreground">
    //           Review your chat analysis below. You can reset and start a new analysis at any time.
    //         </p>
    //       </CardContent>
    //     </Card>

    //     <Card className="border-primary/10 hover:border-primary/30 transition-colors duration-300">
    //       <CardContent className="p-6">
            <ChatAnalysis 
              analysis={analysis} 
              onReset={handleReset} 
            />
    //       </CardContent>
    //     </Card>

    //     <div className="mt-8 flex justify-center">
    //       <Button
    //         variant="outline"
    //         onClick={handleReset}
    //         className="border-primary/20 hover:bg-primary hover:text-primary-foreground transition-colors duration-300"
    //       >
    //         Start New Analysis
    //       </Button>
    //     </div>
    //   </div>
    // </main>
  )
}