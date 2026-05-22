'use client'
import { Venue, getArtistById } from '@/lib/data'
import Link from 'next/link'
import { MapPin, ExternalLink, ArrowLeft, Calendar } from 'lucide-react'

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })
}

export default function VenuePageClient({ venue }: { venue: Venue }) {
  const affiliatedArtists = venue.affiliated_artists.map(id => getArtistById(id)).filter(Boolean)
  return (
    <div style={{ minHeight:'100dvh', background:'#0e1118', fontFamily:'system-ui,sans-serif', maxWidth:480, margin:'0 auto' }}>
      {/* Header */}
      <div style={{ height:200, background:'linear-gradient(135deg,#1a2520,#0f1f18)', position:'relative', overflow:'hidden' }}>
        <div style={{ position:'absolute', inset:0, opacity:0.12, backgroundImage:'repeating-linear-gradient(45deg,#3ecf8e 0px,#3ecf8e 1px,transparent 1px,transparent 20px)' }} />
        {venue.photo_url
          ? <img src={venue.photo_url} alt={venue.name} style={{ width:'100%', height:'100%', objectFit:'cover' }} />
          : <div style={{ position:'absolute', inset:0, display:'flex', alignItems:'center', justifyContent:'center' }}><span style={{ fontSize:64 }}>🎭</span></div>
        }
        <Link href="/" style={{ position:'absolute', top:14, left:14, width:34, height:34, borderRadius:'50%', background:'rgba(14,17,24,0.7)', backdropFilter:'blur(8px)', border:'1px solid rgba(255,255,255,0.1)', display:'flex', alignItems:'center', justifyContent:'center', color:'#f0ede8', textDecoration:'none' }}>
          <ArrowLeft size={16} />
        </Link>
        <div style={{ position:'absolute', top:14, right:14, background:'rgba(14,17,24,0.7)', backdropFilter:'blur(8px)', border:'1px solid rgba(62,207,142,0.3)', borderRadius:20, padding:'4px 12px', fontSize:11, color:'#3ecf8e', fontFamily:'monospace' }}>
          SALLE DE SPECTACLE
        </div>
      </div>

      {/* Contenu */}
      <div style={{ padding:'20px 20px 100px' }}>
        <h1 style={{ fontSize:28, fontWeight:700, color:'#f0ede8', margin:0 }}>{venue.name}</h1>
        <div style={{ display:'flex', alignItems:'center', gap:6, marginTop:8, fontSize:13, color:'#8a8fa8' }}><MapPin size={13} color="#3ecf8e" />{venue.address}, {venue.neighborhood}</div>
        <div style={{ marginTop:6, display:'flex', flexWrap:'wrap', gap:5 }}>
          {venue.genres.map(g => <span key={g} style={{ fontSize:11, padding:'2px 9px', borderRadius:10, background:'rgba(62,207,142,0.1)', border:'1px solid rgba(62,207,142,0.2)', color:'#3ecf8e' }}>{g}</span>)}
        </div>
        <p style={{ fontSize:12, color:'#8a8fa8', lineHeight:1.7, marginTop:16 }}>{venue.description}</p>
        {venue.website && (
          <a href={venue.website} target="_blank" rel="noreferrer" style={{ display:'inline-flex', alignItems:'center', gap:6, marginTop:10, fontSize:12, color:'#7c6af7', textDecoration:'none' }}>
            <ExternalLink size={12} />{venue.website.replace('https://','')}
          </a>
        )}

        {venue.upcoming_shows.length > 0 && (
          <div style={{ marginTop:24 }}>
            <h2 style={{ fontSize:14, fontWeight:600, color:'#f0ede8', marginBottom:12, display:'flex', alignItems:'center', gap:8 }}><Calendar size={14} color="#3ecf8e" />Prochaines dates :</h2>
            {venue.upcoming_shows.map(show => (
              <Link key={show.id} href={`/artist/${show.artist_id}`} style={{ textDecoration:'none' }}>
                <div style={{ display:'flex', gap:12, alignItems:'center', padding:'12px 14px', marginBottom:8, background:'#161b27', borderRadius:10, border:'1px solid rgba(255,255,255,0.06)' }}>
                  <div style={{ width:52, height:52, borderRadius:8, flexShrink:0, background:'#1e2535', display:'flex', alignItems:'center', justifyContent:'center', fontFamily:'monospace', fontSize:13, color:'#a89dff', fontWeight:700 }}>
                    {show.artist_name.slice(0,2)}
                  </div>
                  <div style={{ flex:1 }}>
                    <div style={{ fontSize:14, fontWeight:600, color:'#f0ede8' }}>{show.artist_name}</div>
                    {show.genre && <div style={{ fontSize:11, color:'#8a8fa8', marginTop:1 }}>{show.genre}</div>}
                    <div style={{ fontSize:18, fontWeight:700, color:'#3ecf8e', marginTop:4 }}>{formatDate(show.date)}</div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}

        {affiliatedArtists.length > 0 && (
          <div style={{ marginTop:24 }}>
            <h2 style={{ fontSize:14, fontWeight:600, color:'#f0ede8', marginBottom:12 }}>Artistes affiliés :</h2>
            <div style={{ display:'flex', gap:16, flexWrap:'wrap' }}>
              {affiliatedArtists.map(a => a && (
                <Link key={a.id} href={`/artist/${a.id}`} style={{ textDecoration:'none', display:'flex', flexDirection:'column', alignItems:'center', gap:6 }}>
                  <div style={{ width:64, height:64, borderRadius:'50%', background:'#1e2535', border:'2px solid rgba(62,207,142,0.2)', display:'flex', alignItems:'center', justifyContent:'center', fontFamily:'monospace', fontSize:14, color:'#3ecf8e', fontWeight:700 }}>
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