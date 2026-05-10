'use client'

import { StatutLivraison } from '@/lib/types'

interface StatutBadgeProps {
  statut: StatutLivraison
}

const statutConfig: Record<
  StatutLivraison,
  { label: string; classes: string }
> = {
  en_attente: {
    label: 'EN ATTENTE',
    classes: 'bg-gray-100 text-gray-600',
  },
  appele: {
    label: 'APPELÉ',
    classes: 'bg-orange-100 text-orange-700',
  },
  rappel_lance: {
    label: 'RAPPEL LANCÉ',
    classes: 'bg-orange-200 text-orange-800',
  },
  livre: {
    label: 'LIVRÉ',
    classes: 'bg-green-100 text-green-700',
  },
  echec_appel: {
    label: 'ÉCHEC APPEL',
    classes: 'bg-red-100 text-red-700',
  },
}

export default function StatutBadge({ statut }: StatutBadgeProps) {
  const config = statutConfig[statut]

  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${config.classes}`}
    >
      {config.label}
    </span>
  )
}
