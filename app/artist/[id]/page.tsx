import { ARTISTS, getArtistById } from '@/lib/data'
import { notFound } from 'next/navigation'
import ArtistPageClient from './ArtistPageClient'

export function generateStaticParams() {
  return ARTISTS.map(a => ({ id: a.id }))
}

export default async function ArtistPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const artist = getArtistById(id)
  if (!artist) notFound()
  return <ArtistPageClient artist={artist} />
}
