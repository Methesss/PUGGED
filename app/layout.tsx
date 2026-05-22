import type { Metadata } from 'next'
import './globals.css'
export const metadata: Metadata = {
  title: 'Plugged — La radio de ton territoire',
  description: 'Découvre la musique underground de ton quartier.',
}
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return <html lang="fr"><body>{children}</body></html>
}
