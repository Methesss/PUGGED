'use client'
import { useEffect, useRef, useCallback } from 'react'
import mapboxgl from 'mapbox-gl'
import 'mapbox-gl/dist/mapbox-gl.css'
import { Venue, Territory } from '@/lib/data'

type Props = {
  venues: Venue[]
  territories: Territory[]
  activeTerritory: string | null
  onTerritoryClick: (id: string) => void
  onVenueClick: (venue: Venue) => void
}

const TERRITORY_POLYGONS: Record<string, number[][]> = {
  'paris-19': [[2.3588,48.8700],[2.3930,48.8700],[2.3930,48.8920],[2.3588,48.8920],[2.3588,48.8700]],
  'paris-11': [[2.3620,48.8490],[2.3950,48.8490],[2.3950,48.8640],[2.3620,48.8640],[2.3620,48.8490]],
  'lyon-7':   [[4.8200,45.7280],[4.8580,45.7280],[4.8580,45.7480],[4.8200,45.7480],[4.8200,45.7280]],
  'marseille-13': [[5.3950,43.2900],[5.4400,43.2900],[5.4400,43.3180],[5.3950,43.3180],[5.3950,43.2900]],
}

export default function Map({ venues, territories, activeTerritory, onTerritoryClick, onVenueClick }: Props) {
  const containerRef = useRef<HTMLDivElement>(null)
  const mapRef = useRef<mapboxgl.Map | null>(null)
  const markersRef = useRef<mapboxgl.Marker[]>([])
  const initialized = useRef(false)

  const init = useCallback(() => {
    if (!containerRef.current || initialized.current) return
    initialized.current = true
    mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN!

    const map = new mapboxgl.Map({
      container: containerRef.current,
      style: 'mapbox://styles/mapbox/dark-v11',
      center: [2.3522, 46.8], zoom: 5.2,
      minZoom: 4, maxZoom: 17, attributionControl: false,
    })

    map.on('load', () => {
      territories.forEach(t => {
        const coords = TERRITORY_POLYGONS[t.id]
        if (!coords) return
        map.addSource(`terr-${t.id}`, {
          type: 'geojson',
          data: { type: 'Feature', properties: { id: t.id }, geometry: { type: 'Polygon', coordinates: [coords] } }
        })
        map.addLayer({ id: `fill-${t.id}`, type: 'fill', source: `terr-${t.id}`, paint: { 'fill-color': '#7c6af7', 'fill-opacity': 0.12 } })
        map.addLayer({ id: `line-${t.id}`, type: 'line', source: `terr-${t.id}`, paint: { 'line-color': '#7c6af7', 'line-width': 1.5, 'line-opacity': 0.6 } })
        map.addLayer({
          id: `label-${t.id}`, type: 'symbol', source: `terr-${t.id}`,
          layout: { 'text-field': t.label, 'text-font': ['DIN Offc Pro Medium', 'Arial Unicode MS Bold'], 'text-size': 12 },
          paint: { 'text-color': '#a89dff', 'text-halo-color': '#0e1118', 'text-halo-width': 2 }
        })
        map.on('click', `fill-${t.id}`, (e) => {
          e.originalEvent.stopPropagation()
          onTerritoryClick(t.id)
        })
        map.on('mouseenter', `fill-${t.id}`, () => { map.getCanvas().style.cursor = 'pointer' })
        map.on('mouseleave', `fill-${t.id}`, () => { map.getCanvas().style.cursor = '' })
      })
    })

    mapRef.current = map
  }, [territories, onTerritoryClick])

  useEffect(() => {
    init()
    return () => { mapRef.current?.remove(); mapRef.current = null; initialized.current = false }
  }, [init])

  useEffect(() => {
    const map = mapRef.current
    if (!map) return
    const addMarkers = () => {
      markersRef.current.forEach(m => m.remove())
      markersRef.current = []
      venues.forEach(venue => {
        const el = document.createElement('div')
        el.style.cssText = 'width:38px;height:38px;cursor:pointer;position:relative;z-index:10;'

        const inner = document.createElement('div')
        inner.style.cssText = `
          width:38px;height:38px;border-radius:50%;
          background:#0e1a14;border:2px solid #3ecf8e;
          display:flex;align-items:center;justify-content:center;
          box-shadow:0 2px 14px rgba(62,207,142,0.3);
          transition:transform 0.15s,box-shadow 0.15s;
          pointer-events:none;
        `
        inner.innerHTML = '<svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M9 18V5l12-2v13" stroke="#3ecf8e" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><circle cx="6" cy="18" r="3" fill="#3ecf8e"/><circle cx="18" cy="16" r="3" fill="#3ecf8e"/></svg>'

        el.appendChild(inner)

        el.addEventListener('mouseenter', () => {
          inner.style.transform = 'scale(1.2)'
          inner.style.boxShadow = '0 4px 20px rgba(62,207,142,0.5)'
        })
        el.addEventListener('mouseleave', () => {
          inner.style.transform = 'scale(1)'
          inner.style.boxShadow = '0 2px 14px rgba(62,207,142,0.3)'
        })
        el.addEventListener('click', (e) => {
          e.stopPropagation()
          onVenueClick(venue)
        })

        const marker = new mapboxgl.Marker({ element: el, anchor: 'center' })
          .setLngLat([venue.lng, venue.lat]).addTo(map)
        markersRef.current.push(marker)
      })
    }
    if (map.isStyleLoaded()) addMarkers()
    else map.on('load', addMarkers)
  }, [venues, onVenueClick])

  useEffect(() => {
    const map = mapRef.current
    if (!map || !map.isStyleLoaded()) return
    territories.forEach(t => {
      if (!map.getLayer(`fill-${t.id}`)) return
      const a = t.id === activeTerritory
      map.setPaintProperty(`fill-${t.id}`, 'fill-opacity', a ? 0.28 : 0.12)
      map.setPaintProperty(`line-${t.id}`, 'line-opacity', a ? 1 : 0.6)
      map.setPaintProperty(`line-${t.id}`, 'line-width', a ? 2.5 : 1.5)
    })
  }, [activeTerritory, territories])

  useEffect(() => {
    const map = mapRef.current
    if (!map || !activeTerritory) return
    const t = territories.find(x => x.id === activeTerritory)
    if (t) map.flyTo({ center: [t.lng, t.lat], zoom: t.zoom, duration: 900 })
  }, [activeTerritory, territories])

  return (
    <div style={{ position: 'relative', width: '100%', height: '100%' }}>
      <div ref={containerRef} style={{ width: '100%', height: '100%' }} />
      <div style={{
        position: 'absolute', bottom: 12, right: 12,
        background: 'rgba(14,17,24,0.85)', backdropFilter: 'blur(8px)',
        border: '1px solid rgba(255,255,255,0.07)', borderRadius: 8,
        padding: '6px 12px', fontSize: 11, color: '#4a4f66', fontFamily: 'monospace',
      }}>
        <span style={{ color: '#7c6af7', marginRight: 6 }}>■</span>Territoires
        <span style={{ color: '#3ecf8e', marginLeft: 12, marginRight: 4 }}>♪</span>Salles
      </div>
    </div>
  )
}
