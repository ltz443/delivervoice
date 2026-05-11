'use client'

import { useState, useCallback, useMemo, useEffect } from 'react'
import { Livraison, StatutLivraison } from '@/lib/types'
import { supabase } from '@/lib/supabase'

type FiltreStatut = 'tous' | StatutLivraison

export function useLivraisons() {
  const [livraisons, setLivraisons] = useState<Livraison[]>([])
  const [filtre, setFiltre] = useState<FiltreStatut>('tous')
  const [isLoading, setIsLoading] = useState(true)

  const fetchLivraisons = useCallback(async () => {
    setIsLoading(true)

    const { data: { session } } = await supabase.auth.getSession()
    if (!session) return

    const today = new Date().toISOString().split('T')[0]

    const { data, error } = await supabase
      .from('livraisons')
      .select('*')
      .eq('driver_id', session.user.id)
      .eq('date_livraison', today)
      .order('heure_prevue', { ascending: true })

    if (!error && data) {
      setLivraisons(data as Livraison[])
    }
    setIsLoading(false)
  }, [])

  useEffect(() => {
    fetchLivraisons()

    const channel = supabase
      .channel('livraisons_realtime')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'livraisons' },
        () => fetchLivraisons()
      )
      .subscribe()

    return () => {
      supabase.removeChannel(channel)
    }
  }, [fetchLivraisons])

  const livraisonsFiltered = useMemo(() => {
    if (filtre === 'tous') return livraisons
    return livraisons.filter((l) => l.statut === filtre)
  }, [livraisons, filtre])

  const livraisonsRestantes = useMemo(() => {
    return livraisons.filter((l) => l.statut !== 'livre').length
  }, [livraisons])

  const updateStatut = useCallback(
    async (livraisonId: string, nouveauStatut: StatutLivraison) => {
      await supabase
        .from('livraisons')
        .update({ statut: nouveauStatut })
        .eq('id', livraisonId)

      setLivraisons((prev) =>
        prev.map((l) =>
          l.id === livraisonId ? { ...l, statut: nouveauStatut } : l
        )
      )
    },
    []
  )

  return {
    livraisons: livraisonsFiltered,
    filtre,
    setFiltre,
    livraisonsRestantes,
    updateStatut,
    isLoading,
  }
}
