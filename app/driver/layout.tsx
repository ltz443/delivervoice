'use client'

import Header from '@/components/shared/Header'
import { mockDriver } from '@/data/mockData'

export default function DriverLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex min-h-screen flex-col bg-[#F9FAFB]">
      <Header prenom={mockDriver.prenom} nom={mockDriver.nom} />
      <main className="flex-1 px-4 py-4 md:px-6 md:py-6">{children}</main>
    </div>
  )
}
