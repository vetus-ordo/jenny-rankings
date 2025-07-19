import './globals.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'The Sorting of Tastes',
  description: 'Discover whose preferences align in the wizarding world.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}