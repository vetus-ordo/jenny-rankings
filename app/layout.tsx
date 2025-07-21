import './globals.css'
import type { Metadata } from 'next'
import AmbientParticles from '@/components/AmbientParticles'

export const metadata: Metadata = {
  title: 'The Sorting of Tastes',
  description: 'A magical ranking of tastes.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Cinzel:wght@600&family=Quicksand:wght@400;600&display=swap" rel="stylesheet" />
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css" />
      </head>
      <body className="magical-bg">
        <AmbientParticles />
        {children}
      </body>
    </html>
  )
}