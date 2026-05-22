'use client'
import { useState, useCallback } from 'react'
import dynamic from 'next/dynamic'
import { TERRITORIES, TRACKS, VENUES, Venue, getTracksByTerritory } from '@/lib/data'
import { PlayerProvider } from '@/lib/player-context'
import Sidebar from '@/components/Sidebar'
import TerritoryPanel from '@/components/TerritoryPanel'
import VenuePopup from '@/components/VenuePopup'
import Player from '@/components/Player'

const Map = dynamic(() => import('@/components/Map'), { ssr: false })

function App() {
  const [activeTerritory, setActiveTerritory] = useState<string | null>(null)
  const [activeVenue, setActiveVenue] = useState<Venue | null>(null)

  const territory = TERRITORIES.find(t => t.id === activeTerritory) ?? null
  const territoryTracks = activeTerritory ? getTracksByTerritory(activeTerritory) : []

  const handleTerritoryClick = useCallback((id: string) => {
    setActiveVenue(null)
    setActiveTerritory(prev => prev === id ? null : id)
  }, [])

  const handleVenueClick = useCallback((venue: Venue) => {
    setActiveVenue(prev => prev?.id === venue.id ? null : venue)
  }, [])

  return (
    <div style={{ display: 'flex', height: '100dvh', overflow: 'hidden', background: '#0e1118' }}>
      <Sidebar territories={TERRITORIES} activeTerritory={activeTerritory} onSelect={handleTerritoryClick} />

      <main style={{ flex: 1, position: 'relative', overflow: 'hidden' }}>
        <Map
          venues={VENUES} territories={TERRITORIES}
          activeTerritory={activeTerritory}
          onTerritoryClick={handleTerritoryClick}
          onVenueClick={handleVenueClick}
        />

        <div style={{
          position: 'absolute', top: 14, left: 14,
          background: 'rgba(14,17,24,0.85)', backdropFilter: 'blur(10px)',
          border: '1px solid rgba(255,255,255,0.07)', borderRadius: 20,
          padding: '6px 14px', fontSize: 12, color: '#8a8fa8', fontFamily: 'monospace',
          display: 'flex', alignItems: 'center', gap: 7, pointerEvents: 'none',
        }}>
          <span style={{ width: 7, height: 7, borderRadius: '50%', background: '#3ecf8e', display: 'block', animation: 'pulse 2s ease-in-out infinite' }} />
          {TRACKS.length} artistes · {TERRITORIES.length} territoires · {VENUES.length} salles
        </div>

        {territory && (
          <TerritoryPanel territory={territory} tracks={territoryTracks} onClose={() => setActiveTerritory(null)} />
        )}
        {activeVenue && (
          <VenuePopup venue={activeVenue} onClose={() => setActiveVenue(null)} />
        )}
      </main>

      <Player />
    </div>
  )
}

export default function Home() {
  return <PlayerProvider><App /></PlayerProvider>
}
