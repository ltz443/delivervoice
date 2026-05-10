'use client'

import { Package, CheckCircle, Users, Phone } from 'lucide-react'
import StatCard from '@/components/admin/StatCard'
import DriverTable from '@/components/admin/DriverTable'
import { mockLivraisons, mockDriverSessions } from '@/data/mockData'

export default function AdminDashboardPage() {
  const livraisonsTotal = mockLivraisons.length
  const livraisonsLivrees = mockLivraisons.filter(
    (l) => l.statut === 'livre'
  ).length
  const pourcentageLivrees =
    livraisonsTotal > 0
      ? Math.round((livraisonsLivrees / livraisonsTotal) * 100)
      : 0
  const driversActifs = mockDriverSessions.length
  const appelsTotal = mockDriverSessions.reduce(
    (acc, s) => acc + s.appels_passes,
    0
  )

  return (
    <div>
      <h1 className="mb-6 text-2xl font-bold text-[#111827]">
        Tableau de bord
      </h1>

      {/* Statistiques */}
      <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard
          titre="Livraisons du jour"
          valeur={livraisonsTotal}
          icon={Package}
          couleur="blue"
        />
        <StatCard
          titre="Livrées"
          valeur={livraisonsLivrees}
          sousTitre={`${pourcentageLivrees}% de progression`}
          icon={CheckCircle}
          couleur="green"
        />
        <StatCard
          titre="Drivers actifs"
          valeur={driversActifs}
          icon={Users}
          couleur="orange"
        />
        <StatCard
          titre="Appels passés"
          valeur={appelsTotal}
          icon={Phone}
          couleur="gray"
        />
      </div>

      {/* Sessions drivers actives */}
      <div>
        <h2 className="mb-4 text-xl font-semibold text-[#111827]">
          Sessions drivers actives
        </h2>
        <DriverTable sessions={mockDriverSessions} />
      </div>
    </div>
  )
}
