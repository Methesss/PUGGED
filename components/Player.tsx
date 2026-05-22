'use client'
import { usePlayer } from '@/lib/player-context'

export default function Player() {
  const { track, isPlaying, progress, duration, territoryLabel, pause, resume, seek, next, prev } = usePlayer()
  if (!track) return null

  const fmt = (s: number) => `${Math.floor(s/60)}:${String(Math.floor(s%60)).padStart(2,'0')}`

  return (
    <div style={{
      position: 'fixed', bottom: 0, left: 0, right: 0, height: 72,
      background: 'rgba(14,17,24,0.95)', backdropFilter: 'blur(20px)',
      borderTop: '1px solid rgba(255,255,255,0.07)',
      display: 'flex', alignItems: 'center', gap: 14, padding: '0 20px',
      zIndex: 100, animation: 'slideUp 0.3s ease',
    }}>
      {/* Cover */}
      <div style={{
        width: 44, height: 44, borderRadius: 8, background: '#1e2535',
        border: '1px solid rgba(124,106,247,0.3)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontFamily: 'monospace', fontSize: 11, color: '#a89dff', flexShrink: 0,
      }}>
        {track.cover_url
          ? <img src={track.cover_url} style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: 7 }} />
          : track.artist_name.slice(0, 2).toUpperCase()
        }
      </div>

      {/* Info */}
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontSize: 13, fontWeight: 500, color: '#f0ede8', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
          {track.title}
        </div>
        <div style={{ fontSize: 11, color: '#8a8fa8', marginTop: 2, display: 'flex', gap: 6, alignItems: 'center' }}>
          {track.artist_name}
          {territoryLabel && <>
            <span style={{ color: '#4a4f66' }}>·</span>
            <span style={{ color: '#3ecf8e' }}>📻 Radio {territoryLabel}</span>
          </>}
        </div>
      </div>

      {/* Controls */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        <button onClick={prev} style={btnStyle}>
          <svg width="14" height="14" viewBox="0 0 14 14" fill="currentColor"><path d="M11 2L3 7l8 5V2z"/><rect x="1" y="1" width="2" height="12" rx="1"/></svg>
        </button>
        <button onClick={isPlaying ? pause : resume} style={{
          ...btnStyle, width: 38, height: 38,
          background: '#7c6af7', border: 'none', color: 'white',
        }}>
          {isPlaying
            ? <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor"><rect x="3" y="2" width="4" height="12" rx="1.5"/><rect x="9" y="2" width="4" height="12" rx="1.5"/></svg>
            : <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor"><path d="M4 2l10 6-10 6V2z"/></svg>
          }
        </button>
        <button onClick={next} style={btnStyle}>
          <svg width="14" height="14" viewBox="0 0 14 14" fill="currentColor"><path d="M3 2l8 5-8 5V2z"/><rect x="11" y="1" width="2" height="12" rx="1"/></svg>
        </button>
      </div>

      {/* Progress */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, width: 240, flexShrink: 0 }}>
        <span style={{ fontSize: 10, color: '#4a4f66', fontFamily: 'monospace', minWidth: 30 }}>
          {fmt(progress * duration)}
        </span>
        <div
          onClick={e => {
            const r = (e.target as HTMLElement).getBoundingClientRect()
            seek((e.clientX - r.left) / r.width)
          }}
          style={{
            flex: 1, height: 3, background: '#1e2535', borderRadius: 3, cursor: 'pointer',
          }}
        >
          <div style={{ height: '100%', width: `${progress * 100}%`, background: '#7c6af7', borderRadius: 3, transition: 'width 0.1s linear' }} />
        </div>
        <span style={{ fontSize: 10, color: '#4a4f66', fontFamily: 'monospace', minWidth: 30 }}>
          {fmt(duration)}
        </span>
      </div>
    </div>
  )
}

const btnStyle: React.CSSProperties = {
  width: 32, height: 32, borderRadius: '50%',
  background: 'transparent', border: '1px solid rgba(255,255,255,0.1)',
  color: '#8a8fa8', display: 'flex', alignItems: 'center', justifyContent: 'center',
  cursor: 'pointer',
}
