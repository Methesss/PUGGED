'use client'
import { Track, Territory, getArtistsByTerritory } from '@/lib/data'
import { usePlayer } from '@/lib/player-context'
import { X, Play, Pause, Radio, Music } from 'lucide-react'
import Link from 'next/link'

type Props = {
  territory: Territory
  tracks: Track[]
  onClose: () => void
}

export default function TerritoryPanel({ territory, tracks, onClose }: Props) {
  const { track: activeTrack, isPlaying, play, pause, resume, queue } = usePlayer()
  const artists = getArtistsByTerritory(territory.id)
  const isThisRadio = queue.length > 0 && queue[0]?.territory_id === territory.id

  const startRadio = () => {
    if (!tracks.length) return
    play(tracks[0], tracks, territory.label)
  }
  const toggleRadio = () => {
    if (!isThisRadio) { startRadio(); return }
    isPlaying ? pause() : resume()
  }

  return (
    <div style={{
      position: 'absolute', top: 0, right: 0, bottom: 0, width: 340,
      background: '#161b27', borderLeft: '1px solid rgba(255,255,255,0.07)',
      display: 'flex', flexDirection: 'column', animation: 'fadeIn 0.25s ease', zIndex: 20,
    }}>
      {/* Header */}
      <div style={{ padding: '18px 18px 14px', borderBottom: '1px solid rgba(255,255,255,0.07)', display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
        <div>
          <div style={{ fontSize: 11, color: '#4a4f66', fontFamily: 'monospace', marginBottom: 4 }}>TERRITOIRE</div>
          <div style={{ fontSize: 20, fontWeight: 500, color: '#f0ede8' }}>{territory.label}</div>
          <div style={{ fontSize: 12, color: '#8a8fa8', marginTop: 3 }}>{artists.length} artiste{artists.length !== 1 ? 's' : ''} · Radio 24/7</div>
        </div>
        <button onClick={onClose} style={{ width: 28, height: 28, borderRadius: 7, background: '#1e2535', border: '1px solid rgba(255,255,255,0.07)', color: '#8a8fa8', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
          <X size={14} />
        </button>
      </div>

      {/* Bouton radio */}
      <div style={{ padding: '14px 18px', borderBottom: '1px solid rgba(255,255,255,0.07)' }}>
        <button onClick={toggleRadio} style={{
          width: '100%', padding: '12px 18px',
          background: isThisRadio && isPlaying ? '#3ecf8e' : '#7c6af7',
          border: 'none', borderRadius: 10,
          color: isThisRadio && isPlaying ? '#0e1118' : 'white',
          fontSize: 14, fontWeight: 500, fontFamily: 'inherit',
          cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10,
        }}>
          {isThisRadio && isPlaying ? <><Pause size={16} />Pause la radio</> : <><Radio size={16} />{isThisRadio ? 'Reprendre' : `Écouter Radio ${territory.label}`}</>}
        </button>
        {isThisRadio && isPlaying && activeTrack && (
          <div style={{ marginTop: 10, display: 'flex', alignItems: 'center', gap: 8, padding: '8px 12px', background: 'rgba(62,207,142,0.08)', borderRadius: 8, border: '1px solid rgba(62,207,142,0.15)' }}>
            <div style={{ display: 'flex', gap: 2, alignItems: 'flex-end', height: 14 }}>
              {[1,2,3].map(i => <span key={i} style={{ width: 3, borderRadius: 2, background: '#3ecf8e', display: 'block', animation: `eq${i} 0.8s ease-in-out infinite`, animationDelay: `${(i-1)*0.15}s` }} />)}
            </div>
            <span style={{ fontSize: 12, color: '#3ecf8e' }}>En ce moment : {activeTrack.title}</span>
          </div>
        )}
      </div>

      {/* Liste artistes avec lien vers leur profil */}
      <div style={{ flex: 1, overflowY: 'auto', paddingBottom: 80 }}>
        <div style={{ padding: '12px 18px 6px', fontSize: 11, color: '#4a4f66', fontFamily: 'monospace' }}>ARTISTES DU TERRITOIRE</div>

        {artists.length === 0 && (
          <div style={{ padding: '40px 20px', textAlign: 'center', color: '#4a4f66', fontSize: 13 }}>
            <Music size={28} style={{ marginBottom: 12, opacity: 0.4, display: 'block', margin: '0 auto 12px' }} />
            Aucun artiste dans ce territoire.<br />
            <span style={{ fontSize: 12 }}>Sois le premier à ajouter ta musique !</span>
          </div>
        )}

        {artists.map(artist => {
          const t = tracks.find(tr => tr.artist_id === artist.id)
          const isActive = t && activeTrack?.id === t.id
          const playing = isActive && isPlaying
          return (
            <div key={artist.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '10px 18px' }}>
                {/* Cover / initiales — cliquable pour jouer */}
                <button
                  onClick={() => t && (isActive ? (isPlaying ? pause() : resume()) : play(t, tracks, territory.label))}
                  style={{
                    width: 44, height: 44, borderRadius: 8, flexShrink: 0,
                    background: isActive ? 'rgba(124,106,247,0.2)' : '#1e2535',
                    border: `1px solid ${isActive ? '#7c6af7' : 'rgba(255,255,255,0.07)'}`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontFamily: 'monospace', fontSize: 12, color: isActive ? '#a89dff' : '#8a8fa8',
                    cursor: 'pointer',
                  }}
                >
                  {playing ? <Pause size={14} color="#a89dff" /> : <Play size={14} color={isActive ? '#a89dff' : '#4a4f66'} />}
                </button>

                {/* Infos + lien profil */}
                <Link href={`/artist/${artist.id}`} style={{ flex: 1, minWidth: 0, textDecoration: 'none' }}>
                  <div style={{ fontSize: 13, fontWeight: 500, color: isActive ? '#a89dff' : '#f0ede8', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                    {artist.name}
                  </div>
                  <div style={{ fontSize: 11, color: '#8a8fa8', marginTop: 2 }}>{artist.genre} · {artist.neighborhood}</div>
                  {artist.upcoming_shows.length > 0 && (
                    <div style={{ fontSize: 10, color: '#3ecf8e', marginTop: 3 }}>
                      📅 {artist.upcoming_shows.length} date{artist.upcoming_shows.length > 1 ? 's' : ''} à venir
                    </div>
                  )}
                </Link>

                {/* Flèche vers profil */}
                <Link href={`/artist/${artist.id}`} style={{ color: '#4a4f66', textDecoration: 'none', fontSize: 16, padding: '0 4px' }}>›</Link>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
