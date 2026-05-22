'use client'
import { createContext, useContext, useRef, useState, useCallback, ReactNode } from 'react'
import { Howl } from 'howler'
import { Track } from './data'

type PlayerState = {
  track: Track | null; queue: Track[]; isPlaying: boolean
  progress: number; duration: number; territoryLabel: string
  play: (track: Track, queue?: Track[], label?: string) => void
  pause: () => void; resume: () => void; seek: (p: number) => void
  next: () => void; prev: () => void
}
const Ctx = createContext<PlayerState | null>(null)

export function PlayerProvider({ children }: { children: ReactNode }) {
  const [track, setTrack] = useState<Track | null>(null)
  const [queue, setQueue] = useState<Track[]>([])
  const [qIdx, setQIdx] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [progress, setProgress] = useState(0)
  const [duration, setDuration] = useState(0)
  const [label, setLabel] = useState('')
  const howl = useRef<Howl | null>(null)
  const raf = useRef<number>(0)
  const idxRef = useRef(0)
  const qRef = useRef<Track[]>([])

  const tick = useCallback(() => {
    if (!howl.current) return
    const s = howl.current.seek() as number, d = howl.current.duration()
    setProgress(d > 0 ? s / d : 0)
    raf.current = requestAnimationFrame(tick)
  }, [])

  const load = useCallback((t: Track) => {
    if (howl.current) { howl.current.unload(); cancelAnimationFrame(raf.current) }
    const h = new Howl({
      src: [t.audio_url], html5: true,
      onplay: () => { setIsPlaying(true); setDuration(h.duration()); raf.current = requestAnimationFrame(tick) },
      onend: () => {
        setIsPlaying(false); cancelAnimationFrame(raf.current)
        const ni = idxRef.current + 1
        if (ni < qRef.current.length) { idxRef.current = ni; setQIdx(ni); setTrack(qRef.current[ni]); load(qRef.current[ni]) }
      },
      onpause: () => { setIsPlaying(false); cancelAnimationFrame(raf.current) },
    })
    h.play(); howl.current = h; setTrack(t); setProgress(0)
  }, [tick])

  const play = useCallback((t: Track, q: Track[] = [t], l = '') => {
    const i = Math.max(q.findIndex(x => x.id === t.id), 0)
    idxRef.current = i; qRef.current = q
    setQueue(q); setQIdx(i); setLabel(l); load(t)
  }, [load])

  const pause = useCallback(() => howl.current?.pause(), [])
  const resume = useCallback(() => { howl.current?.play() }, [])
  const seek = useCallback((p: number) => { if (howl.current) howl.current.seek(p * howl.current.duration()) }, [])
  const next = useCallback(() => {
    const i = Math.min(idxRef.current + 1, qRef.current.length - 1)
    idxRef.current = i; setQIdx(i); const t = qRef.current[i]; if (t) { setTrack(t); load(t) }
  }, [load])
  const prev = useCallback(() => {
    const i = Math.max(idxRef.current - 1, 0)
    idxRef.current = i; setQIdx(i); const t = qRef.current[i]; if (t) { setTrack(t); load(t) }
  }, [load])

  return (
    <Ctx.Provider value={{ track, queue, isPlaying, progress, duration, territoryLabel: label, play, pause, resume, seek, next, prev }}>
      {children}
    </Ctx.Provider>
  )
}

export const usePlayer = () => {
  const c = useContext(Ctx)
  if (!c) throw new Error('usePlayer outside PlayerProvider')
  return c
}
