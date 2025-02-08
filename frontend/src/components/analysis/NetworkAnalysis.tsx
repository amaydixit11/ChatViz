'use client'

import { StatsCard } from './StatsCard'
import { Users, Network, Share2 } from 'lucide-react'

interface NetworkAnalysisProps {
  network_analysis: Network
}

export function NetworkAnalysis({ network_analysis }: NetworkAnalysisProps) {
  const totalConnections = Object.values(network_analysis.connections)
    .reduce((acc, curr) => acc + curr.length, 0)

  const avgConnections = totalConnections / Object.keys(network_analysis.connections).length
  // network_analysis.connections
  return (
    <StatsCard title="Network Analysis">
      <div className="space-y-6">
        <div className="grid grid-cols-3 gap-4">
          <div className="group p-4 rounded-lg border bg-card hover:bg-card/50 transition-all duration-300">
            <div className="flex items-center gap-2 text-primary mb-2">
              <Users className="h-4 w-4 transition-transform group-hover:scale-110" />
              <h4 className="text-xs font-medium">Participants</h4>
            </div>
            <p className="text-lg font-semibold">
              {Object.keys(network_analysis.connections).length}
            </p>
          </div>

          <div className="group p-4 rounded-lg border bg-card hover:bg-card/50 transition-all duration-300">
            <div className="flex items-center gap-2 text-primary mb-2">
              <Network className="h-4 w-4 transition-transform group-hover:scale-110" />
              <h4 className="text-xs font-medium">Connections</h4>
            </div>
            <p className="text-lg font-semibold">{totalConnections}</p>
          </div>

          <div className="group p-4 rounded-lg border bg-card hover:bg-card/50 transition-all duration-300">
            <div className="flex items-center gap-2 text-primary mb-2">
              <Share2 className="h-4 w-4 transition-transform group-hover:scale-110" />
              <h4 className="text-xs font-medium">Avg. Links</h4>
            </div>
            <p className="text-lg font-semibold">{avgConnections.toFixed(1)}</p>
          </div>
        </div>

        <div className="space-y-4">
          {Object.entries(network_analysis.connections)
            .sort((a, b) => b[1].length - a[1].length)
            .map(([user, connections]) => (
              <div
                key={user}
                className="group p-4 rounded-lg border bg-card hover:bg-card/50 transition-all duration-300"
              >
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-medium">{user}</h3>
                  <span className="text-sm text-muted-foreground">
                    {connections.length} connections
                  </span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {connections.map(connection => (
                    <span
                      key={connection}
                      className="px-2 py-1 text-xs rounded-full bg-primary/10 text-primary"
                    >
                      {connection}
                    </span>
                  ))}
                </div>
              </div>
            ))}
        </div>
      </div>
    </StatsCard>
  )
}