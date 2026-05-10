'use client'

import { StatutLivraison } from '@/lib/types'
import { useLivraisons } from '@/hooks/useLivraisons'
import LivraisonCard from '@/components/driver/LivraisonCard'

interface LivraisonListProps {
  driverId: string
}

type FiltreOption = {
  value: 'tous' | StatutLivraison
  label: string
}

const filtres: FiltreOption[] = [
  { value: 'tous', label: 'Tous' },
  { value: 'en_attente', label: 'En attente' },
  { value: 'appele', label: 'Appelés' },
  { value: 'livre', label: 'Livrés' },
]

export default function LivraisonList({ driverId }: LivraisonListProps) {
  const { livraisons, filtre, setFiltre, livraisonsRestantes, updateStatut } =
    useLivraisons(driverId)

  const today = new Date().toLocaleDateString('fr-FR', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })

  return (
    <div className="mx-auto max-w-2xl">
      {/* Titre + date */}
      <div className="mb-1">
        <h1 className="text-2xl font-bold text-[#111827]">
          Mes Livraisons du jour
        </h1>
        <p className="text-sm capitalize text-[#6B7280]">{today}</p>
      </div>

      {/* Compteur */}
      <p className="mb-4 text-base text-[#6B7280]">
        <span className="font-semibold text-[#111827]">
          {livraisonsRestantes}
        </span>{' '}
        livraison{livraisonsRestantes > 1 ? 's' : ''} restante
        {livraisonsRestantes > 1 ? 's' : ''}
      </p>

      {/* Filtres */}
      <div className="mb-4 flex gap-2 overflow-x-auto pb-1">
        {filtres.map((f) => (
          <button
            key={f.value}
            onClick={() => setFiltre(f.value)}
            className={`min-h-[44px] shrink-0 rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
              filtre === f.value
                ? 'bg-[#1A56DB] text-white'
                : 'bg-white text-[#6B7280] border border-[#E5E7EB] hover:bg-gray-50'
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      {/* Liste de cartes */}
      <div className="space-y-3">
        {livraisons.length === 0 ? (
          <div className="rounded-xl bg-white p-8 text-center shadow-sm">
            <p className="text-base text-[#6B7280]">
              Aucune livraison pour ce filtre.
            </p>
          </div>
        ) : (
          livraisons.map((livraison, index) => (
            <LivraisonCard
              key={livraison.id}
              livraison={livraison}
              index={index}
              onUpdateStatut={updateStatut}
            />
          ))
        )}
      </div>
    </div>
  )
}
