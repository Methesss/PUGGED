'use client'
import { Venue } from '@/lib/data'
import { X, MapPin } from 'lucide-react'
import Link from 'next/link'

type Props = { venue: Venue; onClose: () => void }

export default function VenuePopup({ venue, onClose }: Props) {
  return (
    <div style={{
      position: 'absolute', bottom: 90, left: '50%', transform: 'translateX(-50%)',
      width: 300, background: '#161b27',
      border: '1px solid rgba(62,207,142,0.3)', borderRadius: 14, padding: 16,
      zIndex: 30, animation: 'slideUp 0.2s ease', boxShadow: '0 8px 32px rgba(0,0,0,0.5)',
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div>
          <div style={{ fontSize: 11, color: '#3ecf8e', fontFamily: 'monospace', marginBottom: 4 }}>🎭 SALLE DE SPECTACLE</div>
          <div style={{ fontSize: 16, fontWeight: 500, color: '#f0ede8' }}>{venue.name}</div>
        </div>
        <button onClick={onClose} style={{ width: 26, height: 26, borderRadius: 6, border: '1px solid rgba(255,255,255,0.07)', background: '#1e2535', color: '#8a8fa8', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <X size={13} />
        </button>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 8, fontSize: 12, color: '#8a8fa8' }}>
        <MapPin size={12} color="#3ecf8e" />
        {venue.address} · {venue.neighborhood}
      </div>
      {venue.upcoming_shows.length > 0 && (
        <div style={{ marginTop: 8, fontSize: 11, color: '#8a8fa8' }}>
          📅 {venue.upcoming_shows.length} concert{venue.upcoming_shows.length > 1 ? 's' : ''} à venir
        </div>
      )}
      <Link href={`/venue/${venue.id}`} style={{
        display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
        marginTop: 12, padding: '9px 16px', background: '#1e2535',
        border: '1px solid rgba(62,207,142,0.25)', borderRadius: 8,
        fontSize: 13, color: '#3ecf8e', textDecoration: 'none', fontWeight: 500,
      }}>
        Voir la fiche complète →
      </Link>
    </div>
  )
}
