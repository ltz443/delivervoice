'use client'

import { LucideIcon } from 'lucide-react'

interface StatCardProps {
  titre: string
  valeur: number
  sousTitre?: string
  icon: LucideIcon
  couleur: 'blue' | 'green' | 'orange' | 'gray'
}

const couleurConfig = {
  blue: {
    bg: 'bg-[#EBF5FF]',
    icon: 'text-[#1A56DB]',
  },
  green: {
    bg: 'bg-[#F3FAF7]',
    icon: 'text-[#057A55]',
  },
  orange: {
    bg: 'bg-[#FFF8F0]',
    icon: 'text-[#C27803]',
  },
  gray: {
    bg: 'bg-gray-50',
    icon: 'text-[#6B7280]',
  },
}

export default function StatCard({
  titre,
  valeur,
  sousTitre,
  icon: Icon,
  couleur,
}: StatCardProps) {
  const config = couleurConfig[couleur]

  return (
    <div className="rounded-xl border border-[#E5E7EB] bg-white p-5 shadow-sm">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-[#6B7280]">{titre}</p>
          <p className="mt-1 text-3xl font-bold text-[#111827]">{valeur}</p>
          {sousTitre && (
            <p className="mt-1 text-sm text-[#6B7280]">{sousTitre}</p>
          )}
        </div>
        <div
          className={`flex h-12 w-12 items-center justify-center rounded-lg ${config.bg}`}
        >
          <Icon className={`h-6 w-6 ${config.icon}`} />
        </div>
      </div>
    </div>
  )
}
