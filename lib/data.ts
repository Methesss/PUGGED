export type Artist = {
  id: string
  name: string
  city: string
  neighborhood: string
  territory_id: string
  genre: string
  bio: string
  photo_url: string | null
  audio_preview_url: string | null
  affiliated: string[]   // ids d'autres artistes
  upcoming_shows: Show[]
  play_count: number
  created_at: string
}

export type Venue = {
  id: string
  name: string
  address: string
  city: string
  neighborhood: string
  lat: number
  lng: number
  type: 'salle' | 'bar' | 'festival' | 'squat'
  genres: string[]
  description: string
  photo_url: string | null
  website?: string
  upcoming_shows: Show[]
  affiliated_artists: string[]  // ids artistes
}

export type Show = {
  id: string
  artist_id: string
  artist_name: string
  artist_photo?: string | null
  venue_id: string
  venue_name: string
  venue_city: string
  date: string          // ISO
  genre?: string
}

export type Track = {
  id: string
  title: string
  artist_id: string
  artist_name: string
  genre: string
  audio_url: string
  cover_url: string | null
  territory_id: string
  territory_label: string
  play_count: number
  created_at: string
}

export type Territory = {
  id: string
  label: string
  city: string
  lat: number
  lng: number
  zoom: number
}

// ─── TERRITOIRES ─────────────────────────────────────────────────────────────
export const TERRITORIES: Territory[] = [
  { id: 'paris-19', label: 'Paris 19e', city: 'Paris', lat: 48.8796, lng: 2.3803, zoom: 14 },
  { id: 'paris-11', label: 'Paris 11e', city: 'Paris', lat: 48.8589, lng: 2.3791, zoom: 14 },
  { id: 'lyon-7',   label: 'Lyon 7e',   city: 'Lyon',  lat: 45.7367, lng: 4.8393, zoom: 14 },
  { id: 'marseille-13', label: 'Marseille 13e', city: 'Marseille', lat: 43.3024, lng: 5.4142, zoom: 13 },
]

// ─── ARTISTES ────────────────────────────────────────────────────────────────
export const ARTISTS: Artist[] = [
  {
    id: 'la-mano-19',
    name: 'La Mano 1.9',
    city: 'Paris',
    neighborhood: '19ème arrondissement',
    territory_id: 'paris-19',
    genre: 'Rap',
    bio: "La Mano 1.9, rappeur parisien du 19ème, à l'énergie imparable sur scène, s'est fait une place de choix sur la scène du rap français ! Couronné « Révélation masculine de l'année » aux Flammes 2025, invité par Gaïors et actuellement n°1 en France, La Mano 1.9 poursuit son ascension fulgurante.",
    photo_url: null,
    audio_preview_url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
    affiliated: ['jrk-19', 'keequaid', 'gapman'],
    upcoming_shows: [
      { id: 's1', artist_id: 'la-mano-19', artist_name: 'La Mano 1.9', venue_id: 'maroquinerie', venue_name: 'La Maroquinerie', venue_city: '20ème arrondissement de Paris', date: '2026-05-30', genre: 'RAP' },
    ],
    play_count: 3420,
    created_at: '2024-09-01',
  },
  {
    id: 'jrk-19',
    name: 'JRK 19',
    city: 'Paris',
    neighborhood: '19ème arrondissement',
    territory_id: 'paris-19',
    genre: 'Rap',
    bio: "JRK 19, rappeur du 19ème, écriture acérée et flow technique. Figure montante de la scène parisienne underground.",
    photo_url: null,
    audio_preview_url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3',
    affiliated: ['la-mano-19', 'keequaid', 'gapman'],
    upcoming_shows: [],
    play_count: 1200,
    created_at: '2024-10-01',
  },
  {
    id: 'keequaid',
    name: 'KEEQUAID',
    city: 'Paris',
    neighborhood: '19ème arrondissement',
    territory_id: 'paris-19',
    genre: 'Rap',
    bio: "KEEQUAID navigue entre rap et trap. Artiste du 19ème avec un univers sonore très personnel.",
    photo_url: null,
    audio_preview_url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3',
    affiliated: ['la-mano-19', 'jrk-19', 'gapman'],
    upcoming_shows: [],
    play_count: 890,
    created_at: '2024-10-15',
  },
  {
    id: 'gapman',
    name: 'GAPMAN',
    city: 'Paris',
    neighborhood: '11ème arrondissement',
    territory_id: 'paris-11',
    genre: 'Rap',
    bio: "GAPMAN, MC du 11ème, vibe club et textes introspectifs. Collaborations régulières avec la scène du 19ème.",
    photo_url: null,
    audio_preview_url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3',
    affiliated: ['la-mano-19', 'jrk-19', 'keequaid'],
    upcoming_shows: [
      { id: 's2', artist_id: 'gapman', artist_name: 'GAPMAN', venue_id: 'maroquinerie', venue_name: 'La Maroquinerie', venue_city: '20ème arrondissement de Paris', date: '2026-06-04', genre: 'RAP' },
    ],
    play_count: 670,
    created_at: '2024-11-01',
  },
  {
    id: 'avenir-flou',
    name: 'Avenir Flou',
    city: 'Lyon',
    neighborhood: '7ème arrondissement',
    territory_id: 'lyon-7',
    genre: 'Électro',
    bio: "Avenir Flou produit une électro mélancolique et hypnotique depuis le 7ème à Lyon. Sets immersifs, influences ambient et techno.",
    photo_url: null,
    audio_preview_url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3',
    affiliated: [],
    upcoming_shows: [
      { id: 's3', artist_id: 'avenir-flou', artist_name: 'Avenir Flou', venue_id: 'transbordeur', venue_name: 'Le Transbordeur', venue_city: 'Villeurbanne', date: '2026-06-12', genre: 'ÉLECTRO' },
    ],
    play_count: 450,
    created_at: '2024-11-10',
  },
]

// ─── SALLES ──────────────────────────────────────────────────────────────────
export const VENUES: Venue[] = [
  {
    id: 'maroquinerie',
    name: 'La Maroquinerie',
    address: '23 Rue Boyer',
    city: 'Paris',
    neighborhood: '20ème arrondissement',
    lat: 48.8676,
    lng: 2.3925,
    type: 'salle',
    genres: ['hip-hop', 'rock', 'indé', 'électro', 'folk'],
    description: "Créée en 1997, La Maroquinerie est une salle de concert de près de 500 places. Filiale de la société de production Asterios, elle présente plus de 200 concerts par an dans tous les styles musicaux, et particulièrement les musiques indés. Elle dispose également d'un espace restauration.",
    photo_url: null,
    website: 'https://lamaroquinerie.fr',
    upcoming_shows: [
      { id: 's1', artist_id: 'la-mano-19', artist_name: 'LA MANO 19', artist_photo: null, venue_id: 'maroquinerie', venue_name: 'La Maroquinerie', venue_city: 'Paris', date: '2026-05-30', genre: 'RAP' },
      { id: 's2', artist_id: 'gapman', artist_name: 'GAPMAN', artist_photo: null, venue_id: 'maroquinerie', venue_name: 'La Maroquinerie', venue_city: 'Paris', date: '2026-06-04', genre: 'RAP' },
    ],
    affiliated_artists: ['la-mano-19', 'jrk-19', 'keequaid', 'gapman'],
  },
  {
    id: 'villette',
    name: 'La Villette',
    address: '211 Av. Jean Jaurès',
    city: 'Paris',
    neighborhood: '19ème arrondissement',
    lat: 48.8937,
    lng: 2.3930,
    type: 'salle',
    genres: ['tous genres', 'électro', 'world', 'jazz'],
    description: "Établissement public culturel pluridisciplinaire, La Villette est le plus grand parc urbain de Paris. Elle accueille concerts, festivals et spectacles en plein air et en salle toute l'année.",
    photo_url: null,
    website: 'https://lavillette.com',
    upcoming_shows: [],
    affiliated_artists: ['la-mano-19', 'keequaid'],
  },
  {
    id: 'transbordeur',
    name: 'Le Transbordeur',
    address: 'Bd Stalingrad',
    city: 'Villeurbanne',
    neighborhood: 'Villeurbanne',
    lat: 45.7674,
    lng: 4.8810,
    type: 'salle',
    genres: ['rock', 'électro', 'métal', 'indé'],
    description: "Le Transbordeur est LA salle de référence de la scène lyonnaise depuis les années 90. Plus de 2000 concerts à son actif, une acoustique réputée et une programmation pointue.",
    photo_url: null,
    website: 'https://transbordeur.fr',
    upcoming_shows: [
      { id: 's3', artist_id: 'avenir-flou', artist_name: 'Avenir Flou', artist_photo: null, venue_id: 'transbordeur', venue_name: 'Le Transbordeur', venue_city: 'Villeurbanne', date: '2026-06-12', genre: 'ÉLECTRO' },
    ],
    affiliated_artists: ['avenir-flou'],
  },
  {
    id: 'affranchi',
    name: "L'Affranchi",
    address: '212 Bd de Saint-Marcel',
    city: 'Marseille',
    neighborhood: '13ème arrondissement',
    lat: 43.2965,
    lng: 5.3698,
    type: 'salle',
    genres: ['rap', 'électro', 'reggae', 'rock'],
    description: "L'Affranchi, ancienne salle de boxe reconvertie en lieu de culture, est devenu l'un des spots incontournables de la scène marseillaise. Ambiance brute, son puissant.",
    photo_url: null,
    website: 'https://laffranchi.com',
    upcoming_shows: [],
    affiliated_artists: [],
  },
]

// ─── TRACKS (pour la radio) ───────────────────────────────────────────────────
export const TRACKS: Track[] = ARTISTS.map(a => ({
  id: `track-${a.id}`,
  title: `${a.name} — Extrait`,
  artist_id: a.id,
  artist_name: a.name,
  genre: a.genre,
  audio_url: a.audio_preview_url || '',
  cover_url: a.photo_url,
  territory_id: a.territory_id,
  territory_label: TERRITORIES.find(t => t.id === a.territory_id)?.label || '',
  play_count: a.play_count,
  created_at: a.created_at,
})).filter(t => t.audio_url)

// ─── HELPERS ─────────────────────────────────────────────────────────────────
export const getArtistById = (id: string) => ARTISTS.find(a => a.id === id)
export const getVenueById  = (id: string) => VENUES.find(v => v.id === id)
export const getTracksByTerritory = (tid: string) => TRACKS.filter(t => t.territory_id === tid)
export const getArtistsByTerritory = (tid: string) => ARTISTS.filter(a => a.territory_id === tid)
