import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'NetSuite SuiteFoundation — Study Guide',
  description: 'Comprehensive review covering all exam domains with mnemonics, tips, and 40+ practice questions',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body>{children}</body>
    </html>
  )
}
