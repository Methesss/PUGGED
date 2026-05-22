import { VENUES, getVenueById } from '@/lib/data'
import { notFound } from 'next/navigation'
import VenuePageClient from './VenuePageClient'

export function generateStaticParams() {
  return VENUES.map(v => ({ id: v.id }))
}

export default async function VenuePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const venue = getVenueById(id)
  if (!venue) notFound()
  return <VenuePageClient venue={venue} />
}
