'use client'

import { useState, useCallback } from 'react'
import { Loader2, Phone, Clock, Check } from 'lucide-react'

type AppelStatut = 'default' | 'loading' | 'appele' | 'termine'

interface AppelButtonProps {
  onAppelComplete: () => void
  disabled?: boolean
}

export default function AppelButton({
  onAppelComplete,
  disabled = false,
}: AppelButtonProps) {
  const [statut, setStatut] = useState<AppelStatut>('default')
  const [cooldown, setCooldown] = useState(false)

  const handleAppel = useCallback(async () => {
    if (statut !== 'default' || cooldown || disabled) return

    setStatut('loading')
    setCooldown(true)

    // TODO: appeler lib/twilio.ts quand backend prêt
    await new Promise((resolve) => setTimeout(resolve, 2000))
    setStatut('appele')
    onAppelComplete()

    // Désactiver le bouton 3 secondes après le clic pour éviter les doubles appels
    setTimeout(() => setCooldown(false), 3000)

    // Simuler le rappel automatique après 3 min
    setTimeout(() => setStatut('termine'), 180000)
  }, [statut, cooldown, disabled, onAppelComplete])

  const config: Record<
    AppelStatut,
    {
      bg: string
      text: string
      label: string
      icon: React.ReactNode
      clickable: boolean
    }
  > = {
    default: {
      bg: 'bg-[#1A56DB] hover:bg-[#1E429F] active:bg-[#1E429F]',
      text: 'text-white',
      label: 'Appeler',
      icon: <Phone className="h-5 w-5" />,
      clickable: true,
    },
    loading: {
      bg: 'bg-gray-400',
      text: 'text-white',
      label: 'Appel en cours...',
      icon: <Loader2 className="h-5 w-5 animate-spin" />,
      clickable: false,
    },
    appele: {
      bg: 'bg-[#C27803]',
      text: 'text-white',
      label: 'Rappel dans 2 min',
      icon: <Clock className="h-5 w-5" />,
      clickable: false,
    },
    termine: {
      bg: 'bg-gray-100',
      text: 'text-gray-400',
      label: 'Appels terminés',
      icon: <Check className="h-5 w-5" />,
      clickable: false,
    },
  }

  const current = config[statut]
  const isDisabled = !current.clickable || cooldown || disabled

  return (
    <button
      onClick={handleAppel}
      disabled={isDisabled}
      className={`flex min-h-[56px] w-full items-center justify-center gap-2 rounded-lg px-4 py-3 text-base font-medium transition-colors ${current.bg} ${current.text} ${
        isDisabled ? 'cursor-not-allowed' : 'cursor-pointer'
      }`}
      style={{ minHeight: '56px' }}
    >
      {current.icon}
      {current.label}
    </button>
  )
}
