'use client'

import { useCallback } from 'react'
import { MapPin, CheckCircle } from 'lucide-react'
import { Livraison, StatutLivraison } from '@/lib/types'
import StatutBadge from '@/components/shared/Badge'
import AppelButton from '@/components/driver/AppelButton'

interface LivraisonCardProps {
  livraison: Livraison
  index: number
  onUpdateStatut: (id: string, statut: StatutLivraison) => void
}

const borderColors: Record<StatutLivraison, string> = {
  en_attente: 'border-l-gray-300',
  appele: 'border-l-orange-400',
  rappel_lance: 'border-l-orange-400',
  livre: 'border-l-green-500',
  echec_appel: 'border-l-red-500',
}

export default function LivraisonCard({
  livraison,
  index,
  onUpdateStatut,
}: LivraisonCardProps) {
  const handleAppelComplete = useCallback(() => {
    onUpdateStatut(livraison.id, 'appele')
  }, [livraison.id, onUpdateStatut])

  const handleLivre = useCallback(() => {
    onUpdateStatut(livraison.id, 'livre')
  }, [livraison.id, onUpdateStatut])

  const showAppelButton =
    livraison.statut === 'en_attente' || livraison.statut === 'echec_appel'
  const showLivreButton =
    livraison.statut === 'appele' || livraison.statut === 'rappel_lance'

  return (
    <div
      className={`rounded-xl border-l-4 bg-white p-4 shadow-sm ${borderColors[livraison.statut]}`}
    >
      {/* Header : numéro + badge */}
      <div className="mb-2 flex items-center justify-between">
        <span className="text-sm text-[#6B7280]">
          #{String(index + 1).padStart(3, '0')}
        </span>
        <StatutBadge statut={livraison.statut} />
      </div>

      {/* Nom client */}
      <h3 className="text-lg font-semibold text-[#111827]">
        {livraison.client_prenom} {livraison.client_nom}
      </h3>

      {/* Adresse */}
      <div className="mt-1 flex items-start gap-1.5">
        <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-[#6B7280]" />
        <p className="text-base text-[#6B7280]">{livraison.adresse}</p>
      </div>

      {/* Heure prévue */}
      <p className="mt-1 text-sm text-[#6B7280]">
        Heure prévue : {livraison.heure_prevue}
      </p>

      {/* Boutons */}
      <div className="mt-4 space-y-3">
        {showAppelButton && (
          <AppelButton onAppelComplete={handleAppelComplete} />
        )}
        {showLivreButton && (
          <button
            onClick={handleLivre}
            className="flex min-h-[56px] w-full items-center justify-center gap-2 rounded-lg bg-[#057A55] px-4 py-3 text-base font-medium text-white transition-colors hover:bg-green-700 active:bg-green-800"
            style={{ minHeight: '56px' }}
          >
            <CheckCircle className="h-5 w-5" />
            Marquer comme livré
          </button>
        )}
      </div>
    </div>
  )
}
