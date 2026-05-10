'use client'

import { useState } from 'react'
import { toast } from 'sonner'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'

export default function AdminParametresPage() {
  const [nomEntreprise, setNomEntreprise] = useState('DeliverVoice')
  const [messageVocal, setMessageVocal] = useState(
    'Votre livreur sera en bas de chez vous dans 2 minutes'
  )
  const [delaiPremierAppel, setDelaiPremierAppel] = useState(5)
  const [delaiRappel, setDelaiRappel] = useState(2)

  const handleSave = () => {
    // TODO: sauvegarder dans Supabase quand le backend sera prêt
    toast.success('Paramètres enregistrés avec succès')
  }

  return (
    <div>
      <h1 className="mb-6 text-2xl font-bold text-[#111827]">Paramètres</h1>

      <div className="max-w-2xl space-y-8">
        {/* Nom de l'entreprise */}
        <div className="rounded-xl border border-[#E5E7EB] bg-white p-6 shadow-sm">
          <h2 className="mb-4 text-xl font-semibold text-[#111827]">
            Informations générales
          </h2>
          <div className="space-y-2">
            <Label
              htmlFor="nom-entreprise"
              className="text-sm font-medium text-[#111827]"
            >
              Nom de l&apos;entreprise
            </Label>
            <Input
              id="nom-entreprise"
              value={nomEntreprise}
              onChange={(e) => setNomEntreprise(e.target.value)}
              className="border-[#E5E7EB]"
              placeholder="Nom de votre entreprise"
            />
          </div>
        </div>

        {/* Message vocal */}
        <div className="rounded-xl border border-[#E5E7EB] bg-white p-6 shadow-sm">
          <h2 className="mb-4 text-xl font-semibold text-[#111827]">
            Message vocal
          </h2>
          <div className="space-y-2">
            <Label
              htmlFor="message-vocal"
              className="text-sm font-medium text-[#111827]"
            >
              Message personnalisable
            </Label>
            <textarea
              id="message-vocal"
              value={messageVocal}
              onChange={(e) => setMessageVocal(e.target.value)}
              rows={4}
              className="w-full rounded-lg border border-[#E5E7EB] px-3 py-2 text-base text-[#111827] placeholder:text-[#6B7280] focus:border-[#1A56DB] focus:outline-none focus:ring-1 focus:ring-[#1A56DB]"
              placeholder="Message vocal diffusé au client..."
            />
            <p className="text-sm text-[#6B7280]">
              Ce message sera diffusé automatiquement lors de l&apos;appel au
              client.
            </p>
          </div>
        </div>

        {/* Délais */}
        <div className="rounded-xl border border-[#E5E7EB] bg-white p-6 shadow-sm">
          <h2 className="mb-4 text-xl font-semibold text-[#111827]">
            Délais d&apos;appel
          </h2>

          <div className="space-y-6">
            <div className="space-y-3">
              <Label
                htmlFor="delai-premier"
                className="text-sm font-medium text-[#111827]"
              >
                Délai premier appel (minutes)
              </Label>
              <div className="flex items-center gap-4">
                <input
                  id="delai-premier"
                  type="range"
                  min={1}
                  max={15}
                  value={delaiPremierAppel}
                  onChange={(e) =>
                    setDelaiPremierAppel(Number(e.target.value))
                  }
                  className="h-2 flex-1 cursor-pointer appearance-none rounded-lg bg-gray-200 accent-[#1A56DB]"
                />
                <div className="flex h-10 w-16 items-center justify-center rounded-lg border border-[#E5E7EB] text-base font-medium text-[#111827]">
                  {delaiPremierAppel}
                </div>
              </div>
              <p className="text-sm text-[#6B7280]">
                Temps avant l&apos;arrivée pour déclencher le premier appel
                (défaut : 5 min)
              </p>
            </div>

            <div className="space-y-3">
              <Label
                htmlFor="delai-rappel"
                className="text-sm font-medium text-[#111827]"
              >
                Délai rappel automatique (minutes)
              </Label>
              <div className="flex items-center gap-4">
                <input
                  id="delai-rappel"
                  type="range"
                  min={1}
                  max={10}
                  value={delaiRappel}
                  onChange={(e) => setDelaiRappel(Number(e.target.value))}
                  className="h-2 flex-1 cursor-pointer appearance-none rounded-lg bg-gray-200 accent-[#1A56DB]"
                />
                <div className="flex h-10 w-16 items-center justify-center rounded-lg border border-[#E5E7EB] text-base font-medium text-[#111827]">
                  {delaiRappel}
                </div>
              </div>
              <p className="text-sm text-[#6B7280]">
                Temps avant l&apos;arrivée pour déclencher le rappel
                automatique (défaut : 2 min)
              </p>
            </div>
          </div>
        </div>

        {/* Bouton sauvegarder */}
        <div className="flex justify-end">
          <Button
            onClick={handleSave}
            className="bg-[#1A56DB] px-8 py-3 text-base font-medium text-white hover:bg-[#1E429F]"
          >
            Enregistrer
          </Button>
        </div>
      </div>
    </div>
  )
}
