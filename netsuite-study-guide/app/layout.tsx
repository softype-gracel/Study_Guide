import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'NetSuite SuiteFoundation Exam — Study Guide',
  description: 'Comprehensive review covering all exam domains with mnemonics, tips, and 40+ practice questions',
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
