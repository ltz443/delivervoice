'use client'

import { useEffect, useState } from 'react'
import { Package, CheckCircle, Users, Phone } from 'lucide-react'
import StatCard from '@/components/admin/StatCard'
import DriverTable from '@/components/admin/DriverTable'
import { supabase } from '@/lib/supabase'
import { DriverSession } from '@/lib/types'

export default function AdminDashboardPage() {
  const [livraisonsTotal, setLivraisonsTotal] = useState(0)
  const [livraisonsLivrees, setLivraisonsLivrees] = useState(0)
  const [driversActifs, setDriversActifs] = useState(0)
  const [appelsTotal, setAppelsTotal] = useState(0)
  const [driverSessions, setDriverSessions] = useState<DriverSession[]>([])

  useEffect(() => {
    const fetchStats = async () => {
      const today = new Date().toISOString().split('T')[0]

      const { data: livraisons } = await supabase
        .from('livraisons')
        .select('*')
        .eq('date_livraison', today)

      if (livraisons) {
        setLivraisonsTotal(livraisons.length)
        setLivraisonsLivrees(livraisons.filter((l) => l.statut === 'livre').length)
      }

      const { data: drivers } = await supabase
        .from('users')
        .select('*')
        .eq('role', 'driver')
        .eq('actif', true)

      if (drivers) setDriversActifs(drivers.length)

      const { data: appels } = await supabase
        .from('appels')
        .select('*')
        .gte('created_at', `${today}T00:00:00`)

      if (appels) setAppelsTotal(appels.length)

      if (drivers && livraisons) {
        const sessions: DriverSession[] = drivers.map((driver) => {
          const driverLivraisons = livraisons.filter((l) => l.driver_id === driver.id)
          return {
            driver: {
              id: driver.id,
              email: driver.email,
              prenom: driver.prenom,
              nom: driver.nom,
              role: driver.role,
            },
            connecte_depuis: driver.derniere_connexion ?? new Date().toISOString(),
            livraisons_total: driverLivraisons.length,
            livraisons_effectuees: driverLivraisons.filter((l) => l.statut === 'livre').length,
            appels_passes: appels?.filter((a) => a.driver_id === driver.id).length ?? 0,
          }
        })
        setDriverSessions(sessions)
      }
    }

    fetchStats()
  }, [])

  const pourcentageLivrees =
    livraisonsTotal > 0
      ? Math.round((livraisonsLivrees / livraisonsTotal) * 100)
      : 0

  return (
    <div>
      <h1 className="mb-6 text-2xl font-bold text-[#111827]">
        Tableau de bord
      </h1>

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

      <div>
        <h2 className="mb-4 text-xl font-semibold text-[#111827]">
          Sessions drivers actives
        </h2>
        <DriverTable sessions={driverSessions} />
      </div>
    </div>
  )
}
