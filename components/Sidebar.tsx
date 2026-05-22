'use client'
import { Territory, getArtistsByTerritory } from '@/lib/data'
import { Radio, MapPin, Music } from 'lucide-react'
import { usePlayer } from '@/lib/player-context'

type Props = { territories: Territory[]; activeTerritory: string | null; onSelect: (id: string) => void }

export default function Sidebar({ territories, activeTerritory, onSelect }: Props) {
  const { track: activeTrack, isPlaying, territoryLabel } = usePlayer()

  return (
    <aside style={{ width: 268, minWidth: 268, height: '100%', background: '#161b27', borderRight: '1px solid rgba(255,255,255,0.07)', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
      <div style={{ padding: '18px 18px 14px', borderBottom: '1px solid rgba(255,255,255,0.07)' }}>
        <div style={{ fontFamily: 'monospace', fontSize: 18, fontWeight: 700, color: '#f0ede8' }}>
          plugged<span style={{ color: '#7c6af7' }}>map</span>
        </div>
        <div style={{ fontSize: 11, color: '#4a4f66', marginTop: 4 }}>La radio de ton territoire</div>
      </div>

      {activeTrack && (
        <div style={{ margin: 12, padding: '10px 12px', background: 'rgba(62,207,142,0.07)', border: '1px solid rgba(62,207,142,0.18)', borderRadius: 10 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 7, marginBottom: 6 }}>
            {isPlaying && <div style={{ display: 'flex', gap: 2, alignItems: 'flex-end', height: 12 }}>
              {[1,2,3].map(i => <span key={i} style={{ width: 3, borderRadius: 2, background: '#3ecf8e', display: 'block', animation: `eq${i} 0.8s ease-in-out infinite`, animationDelay: `${(i-1)*0.15}s` }} />)}
            </div>}
            <span style={{ fontSize: 11, color: '#3ecf8e', fontFamily: 'monospace' }}>
              {isPlaying ? `RADIO ${territoryLabel.toUpperCase()}` : 'EN PAUSE'}
            </span>
          </div>
          <div style={{ fontSize: 12, fontWeight: 500, color: '#f0ede8' }}>{activeTrack.title}</div>
          <div style={{ fontSize: 11, color: '#8a8fa8', marginTop: 2 }}>{activeTrack.artist_name}</div>
        </div>
      )}

      <div style={{ padding: '8px 18px 4px', fontSize: 11, color: '#4a4f66', fontFamily: 'monospace' }}>TERRITOIRES</div>

      <div style={{ flex: 1, overflowY: 'auto', paddingBottom: 80 }}>
        {territories.map(t => {
          const count = getArtistsByTerritory(t.id).length
          const isActive = t.id === activeTerritory
          return (
            <div key={t.id} onClick={() => onSelect(t.id)} style={{
              padding: '10px 18px', cursor: 'pointer',
              background: isActive ? 'rgba(124,106,247,0.1)' : 'transparent',
              borderLeft: `2px solid ${isActive ? '#7c6af7' : 'transparent'}`,
              borderBottom: '1px solid rgba(255,255,255,0.04)',
              display: 'flex', alignItems: 'center', gap: 12, transition: 'all 0.15s',
            }}
              onMouseEnter={e => { if (!isActive) (e.currentTarget as HTMLElement).style.background = '#1e2535' }}
              onMouseLeave={e => { if (!isActive) (e.currentTarget as HTMLElement).style.background = 'transparent' }}
            >
              <div style={{ width: 36, height: 36, borderRadius: 8, background: isActive ? 'rgba(124,106,247,0.2)' : '#1e2535', border: `1px solid ${isActive ? '#7c6af7' : 'rgba(255,255,255,0.07)'}`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Radio size={14} color={isActive ? '#a89dff' : '#4a4f66'} />
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 13, fontWeight: 500, color: isActive ? '#a89dff' : '#f0ede8' }}>{t.label}</div>
                <div style={{ fontSize: 11, color: '#4a4f66', marginTop: 2, display: 'flex', alignItems: 'center', gap: 4 }}>
                  <Music size={10} />{count} artiste{count !== 1 ? 's' : ''}
                  <span style={{ margin: '0 3px' }}>·</span>
                  <MapPin size={10} />{t.city}
                </div>
              </div>
              {count > 0 && <div style={{ fontSize: 10, padding: '2px 7px', borderRadius: 10, fontFamily: 'monospace', background: 'rgba(62,207,142,0.1)', color: '#3ecf8e', border: '1px solid rgba(62,207,142,0.2)' }}>LIVE</div>}
            </div>
          )
        })}
      </div>
    </aside>
  )
}
