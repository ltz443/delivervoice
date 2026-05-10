// hooks/useLivraisons.ts
'use client'

import { useState, useCallback, useMemo } from 'react'
import { Livraison, StatutLivraison } from '@/lib/types'
import { mockLivraisons } from '@/data/mockData'

type FiltreStatut = 'tous' | StatutLivraison

export function useLivraisons(driverId?: string) {
  const [livraisons, setLivraisons] = useState<Livraison[]>(mockLivraisons)
  const [filtre, setFiltre] = useState<FiltreStatut>('tous')

  const livraisonsDriver = useMemo(() => {
    const filtered = driverId
      ? livraisons.filter((l) => l.driver_id === driverId)
      : livraisons

    if (filtre === 'tous') return filtered
    return filtered.filter((l) => l.statut === filtre)
  }, [livraisons, driverId, filtre])

  const livraisonsRestantes = useMemo(() => {
    const driverLivraisons = driverId
      ? livraisons.filter((l) => l.driver_id === driverId)
      : livraisons
    return driverLivraisons.filter((l) => l.statut !== 'livre').length
  }, [livraisons, driverId])

  const updateStatut = useCallback(
    (livraisonId: string, nouveauStatut: StatutLivraison) => {
      setLivraisons((prev) =>
        prev.map((l) =>
          l.id === livraisonId ? { ...l, statut: nouveauStatut } : l
        )
      )
    },
    []
  )

  return {
    livraisons: livraisonsDriver,
    filtre,
    setFiltre,
    livraisonsRestantes,
    updateStatut,
  }
}
