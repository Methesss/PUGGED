'use client'
import { Artist, getArtistById } from '@/lib/data'
import Link from 'next/link'
import { MapPin, Music, Play, ArrowLeft, Calendar } from 'lucide-react'
import { useState, useRef } from 'react'

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })
}

function AudioPlayer({ url }: { url: string }) {
  const [playing, setPlaying] = useState(false)
  const [progress, setProgress] = useState(0)
  const audioRef = useRef<HTMLAudioElement>(null)
  const toggle = () => {
    const a = audioRef.current
    if (!a) return
    if (playing) { a.pause(); setPlaying(false) } else { a.play(); setPlaying(true) }
  }
  return (
    <div style={{ display:'flex', alignItems:'center', gap:12, background:'#1e2535', border:'1px solid rgba(124,106,247,0.2)', borderRadius:12, padding:'10px 16px', marginTop:8 }}>
      <button onClick={toggle} style={{ width:36, height:36, borderRadius:'50%', border:'none', background:'#7c6af7', color:'white', display:'flex', alignItems:'center', justifyContent:'center', cursor:'pointer', flexShrink:0 }}>
        {playing
          ? <svg width="14" height="14" viewBox="0 0 14 14" fill="currentColor"><rect x="2" y="1" width="4" height="12" rx="1"/><rect x="8" y="1" width="4" height="12" rx="1"/></svg>
          : <Play size={14} fill="white" />}
      </button>
      <div style={{ flex:1 }}>
        <div style={{ fontSize:11, color:'#8a8fa8', marginBottom:6 }}>écouter un extrait</div>
        <div style={{ display:'flex', gap:2, alignItems:'center', height:20 }}>
          {Array.from({ length:32 }).map((_,i) => (
            <div key={i} style={{ width:3, height: 3 + Math.sin(i*0.7)*5 + 4, borderRadius:2, background: playing && i < progress*32 ? '#7c6af7' : 'rgba(255,255,255,0.15)' }} />
          ))}
        </div>
      </div>
      <audio ref={audioRef} src={url}
        onTimeUpdate={e => { const a = e.currentTarget; setProgress(a.duration ? a.currentTime/a.duration : 0) }}
        onEnded={() => setPlaying(false)} />
    </div>
  )
}

export default function ArtistPageClient({ artist }: { artist: Artist }) {
  const affiliated = artist.affiliated.map(id => getArtistById(id)).filter(Boolean) as Artist[]
  return (
    <div style={{ minHeight:'100dvh', background:'#0e1118', fontFamily:'system-ui,sans-serif', maxWidth:480, margin:'0 auto' }}>
      {/* Header */}
      <div style={{ height:200, background:'linear-gradient(135deg,#1a1f30,#2a1f40)', position:'relative', overflow:'hidden' }}>
        <div style={{ position:'absolute', inset:0, opacity:0.15, backgroundImage:'repeating-linear-gradient(45deg,#7c6af7 0px,#7c6af7 1px,transparent 1px,transparent 20px)' }} />
        {artist.photo_url
          ? <img src={artist.photo_url} alt={artist.name} style={{ width:'100%', height:'100%', objectFit:'cover' }} />
          : <div style={{ position:'absolute', inset:0, display:'flex', alignItems:'center', justifyContent:'center' }}>
              <div style={{ width:90, height:90, borderRadius:'50%', background:'rgba(124,106,247,0.2)', border:'2px solid rgba(124,106,247,0.4)', display:'flex', alignItems:'center', justifyContent:'center', fontSize:32, color:'#a89dff', fontWeight:700, fontFamily:'monospace' }}>
                {artist.name.slice(0,2).toUpperCase()}
              </div>
            </div>
        }
        <Link href="/" style={{ position:'absolute', top:14, left:14, width:34, height:34, borderRadius:'50%', background:'rgba(14,17,24,0.7)', backdropFilter:'blur(8px)', border:'1px solid rgba(255,255,255,0.1)', display:'flex', alignItems:'center', justifyContent:'center', color:'#f0ede8', textDecoration:'none' }}>
          <ArrowLeft size={16} />
        </Link>
        <div style={{ position:'absolute', top:14, right:14, background:'rgba(14,17,24,0.7)', backdropFilter:'blur(8px)', border:'1px solid rgba(124,106,247,0.3)', borderRadius:20, padding:'4px 12px', fontSize:11, color:'#a89dff', fontFamily:'monospace' }}>
          {artist.territory_id.replace('-',' ').toUpperCase()}
        </div>
      </div>

      {/* Contenu */}
      <div style={{ padding:'20px 20px 100px' }}>
        <h1 style={{ fontSize:28, fontWeight:700, color:'#f0ede8', margin:0 }}>{artist.name}</h1>
        <div style={{ display:'flex', alignItems:'center', gap:6, marginTop:8, fontSize:13, color:'#8a8fa8' }}><MapPin size={13} color="#7c6af7" />{artist.neighborhood}</div>
        <div style={{ display:'flex', alignItems:'center', gap:6, marginTop:4, fontSize:13, color:'#8a8fa8' }}><Music size={13} color="#7c6af7" />{artist.genre}</div>
        <p style={{ fontSize:12, color:'#8a8fa8', lineHeight:1.7, marginTop:16, fontStyle:'italic' }}>{artist.bio}</p>
        {artist.audio_preview_url && <AudioPlayer url={artist.audio_preview_url} />}

        {artist.upcoming_shows.length > 0 && (
          <div style={{ marginTop:24 }}>
            <h2 style={{ fontSize:14, fontWeight:600, color:'#f0ede8', marginBottom:12, display:'flex', alignItems:'center', gap:8 }}><Calendar size={14} color="#7c6af7" />Prochaines dates :</h2>
            {artist.upcoming_shows.map(show => (
              <Link key={show.id} href={`/venue/${show.venue_id}`} style={{ textDecoration:'none' }}>
                <div style={{ display:'flex', gap:12, alignItems:'center', padding:'12px 14px', marginBottom:8, background:'#161b27', borderRadius:10, border:'1px solid rgba(255,255,255,0.06)' }}>
                  <div style={{ width:52, height:52, borderRadius:8, flexShrink:0, background:'#1e2535', display:'flex', alignItems:'center', justifyContent:'center', fontSize:20 }}>🎭</div>
                  <div style={{ flex:1 }}>
                    <div style={{ fontSize:14, fontWeight:600, color:'#f0ede8' }}>{show.venue_name}</div>
                    <div style={{ fontSize:11, color:'#8a8fa8', marginTop:2 }}>{show.venue_city}</div>
                    <div style={{ fontSize:18, fontWeight:700, color:'#7c6af7', marginTop:4 }}>{formatDate(show.date)}</div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}

        {affiliated.length > 0 && (
          <div style={{ marginTop:24 }}>
            <h2 style={{ fontSize:14, fontWeight:600, color:'#f0ede8', marginBottom:12 }}>Artistes affiliés :</h2>
            <div style={{ display:'flex', gap:16, flexWrap:'wrap' }}>
              {affiliated.map(a => (
                <Link key={a.id} href={`/artist/${a.id}`} style={{ textDecoration:'none', display:'flex', flexDirection:'column', alignItems:'center', gap:6 }}>
                  <div style={{ width:64, height:64, borderRadius:'50%', background:'#1e2535', border:'2px solid rgba(124,106,247,0.2)', display:'flex', alignItems:'center', justifyContent:'center', fontFamily:'monospace', fontSize:14, color:'#a89dff', fontWeight:700, overflow:'hidden' }}>
                    {a.name.slice(0,2).toUpperCase()}
                  </div>
                  <span style={{ fontSize:11, color:'#8a8fa8', textAlign:'center', maxWidth:70, overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap' }}>{a.name}</span>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Nav bas */}
      <div style={{ position:'fixed', bottom:0, left:'50%', transform:'translateX(-50%)', width:'100%', maxWidth:480, background:'rgba(14,17,24,0.95)', backdropFilter:'blur(20px)', borderTop:'1px solid rgba(255,255,255,0.07)', display:'flex', padding:'10px 0 16px', zIndex:50 }}>
        {[{icon:'🏠',label:'Accueil',href:'/'},{icon:'📅',label:'Agenda',href:'/'},{icon:'👤',label:'Profil',href:'/'},{icon:'⚙️',label:'Réglages',href:'/'}].map(item => (
          <Link key={item.label} href={item.href} style={{ flex:1, display:'flex', flexDirection:'column', alignItems:'center', gap:4, textDecoration:'none', fontSize:20 }}>
            <span>{item.icon}</span>
            <span style={{ fontSize:9, color:'#4a4f66' }}>{item.label}</span>
          </Link>
        ))}
      </div>
    </div>
  )
}