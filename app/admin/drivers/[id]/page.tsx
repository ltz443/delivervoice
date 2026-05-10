'use client'

import { use } from 'react'
import SessionDetail from '@/components/admin/SessionDetail'
import { mockDriverSessions, mockLivraisons } from '@/data/mockData'

interface PageProps {
  params: Promise<{ id: string }>
}

export default function DriverSessionPage({ params }: PageProps) {
  const { id } = use(params)

  const session = mockDriverSessions.find((s) => s.driver.id === id)
  const driverLivraisons = mockLivraisons.filter((l) => l.driver_id === id)

  if (!session) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-[#111827]">
            Driver introuvable
          </h1>
          <p className="mt-2 text-[#6B7280]">
            Aucune session trouvée pour ce driver.
          </p>
        </div>
      </div>
    )
  }

  return <SessionDetail session={session} livraisons={driverLivraisons} />
}
