'use client'

import { ArrowLeft, Clock, Phone } from 'lucide-react'
import Link from 'next/link'
import { DriverSession, Livraison } from '@/lib/types'
import StatutBadge from '@/components/shared/Badge'

interface SessionDetailProps {
  session: DriverSession
  livraisons: Livraison[]
}

export default function SessionDetail({
  session,
  livraisons,
}: SessionDetailProps) {
  const progression =
    session.livraisons_total > 0
      ? Math.round(
          (session.livraisons_effectuees / session.livraisons_total) * 100
        )
      : 0

  // Mock historique appels
  const historiqueAppels = livraisons
    .filter((l) => l.statut !== 'en_attente')
    .map((l) => ({
      livraisonId: l.id,
      clientNom: `${l.client_prenom} ${l.client_nom}`,
      heure: l.heure_prevue,
      statut: l.statut === 'livre' || l.statut === 'appele' || l.statut === 'rappel_lance'
        ? ('repondu' as const)
        : ('non_repondu' as const),
    }))

  return (
    <div>
      {/* Bouton retour */}
      <Link
        href="/admin/dashboard"
        className="mb-6 inline-flex min-h-[44px] items-center gap-2 rounded-lg text-sm font-medium text-[#6B7280] transition-colors hover:text-[#111827]"
      >
        <ArrowLeft className="h-4 w-4" />
        Retour au dashboard
      </Link>

      {/* En-tête driver */}
      <div className="mb-6 rounded-xl border border-[#E5E7EB] bg-white p-6 shadow-sm">
        <h1 className="text-2xl font-bold text-[#111827]">
          {session.driver.prenom} {session.driver.nom}
        </h1>
        <div className="mt-2 flex items-center gap-2 text-sm text-[#6B7280]">
          <Clock className="h-4 w-4" />
          Connecté depuis {session.connecte_depuis}
        </div>

        {/* Barre de progression */}
        <div className="mt-4">
          <div className="mb-1 flex items-center justify-between text-sm">
            <span className="text-[#6B7280]">Progression des livraisons</span>
            <span className="font-medium text-[#111827]">
              {session.livraisons_effectuees} / {session.livraisons_total} ({progression}%)
            </span>
          </div>
          <div className="h-3 w-full rounded-full bg-gray-100">
            <div
              className="h-3 rounded-full bg-[#1A56DB] transition-all duration-500"
              style={{ width: `${progression}%` }}
            />
          </div>
        </div>
      </div>

      {/* Liste des livraisons */}
      <div className="mb-6">
        <h2 className="mb-4 text-xl font-semibold text-[#111827]">
          Livraisons
        </h2>
        <div className="rounded-xl border border-[#E5E7EB] bg-white shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-[#E5E7EB]">
                  <th className="px-4 py-3 text-left text-sm font-medium text-[#6B7280]">
                    #
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-[#6B7280]">
                    Client
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-[#6B7280]">
                    Adresse
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-[#6B7280]">
                    Heure prévue
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-[#6B7280]">
                    Statut
                  </th>
                </tr>
              </thead>
              <tbody>
                {livraisons.map((livraison, index) => (
                  <tr
                    key={livraison.id}
                    className="border-b border-[#E5E7EB] last:border-b-0"
                  >
                    <td className="px-4 py-3 text-sm text-[#6B7280]">
                      #{String(index + 1).padStart(3, '0')}
                    </td>
                    <td className="px-4 py-3 font-medium text-[#111827]">
                      {livraison.client_prenom} {livraison.client_nom}
                    </td>
                    <td className="px-4 py-3 text-sm text-[#6B7280]">
                      {livraison.adresse}
                    </td>
                    <td className="px-4 py-3 text-sm text-[#111827]">
                      {livraison.heure_prevue}
                    </td>
                    <td className="px-4 py-3">
                      <StatutBadge statut={livraison.statut} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Historique appels */}
      <div>
        <h2 className="mb-4 text-xl font-semibold text-[#111827]">
          Historique des appels
        </h2>
        <div className="rounded-xl border border-[#E5E7EB] bg-white shadow-sm">
          {historiqueAppels.length === 0 ? (
            <div className="p-6 text-center text-[#6B7280]">
              Aucun appel passé pour le moment.
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-[#E5E7EB]">
                    <th className="px-4 py-3 text-left text-sm font-medium text-[#6B7280]">
                      Client
                    </th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-[#6B7280]">
                      Heure
                    </th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-[#6B7280]">
                      Statut
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {historiqueAppels.map((appel, index) => (
                    <tr
                      key={`${appel.livraisonId}-${index}`}
                      className="border-b border-[#E5E7EB] last:border-b-0"
                    >
                      <td className="px-4 py-3 text-sm text-[#111827]">
                        <div className="flex items-center gap-2">
                          <Phone className="h-4 w-4 text-[#6B7280]" />
                          {appel.clientNom}
                        </div>
                      </td>
                      <td className="px-4 py-3 text-sm text-[#6B7280]">
                        {appel.heure}
                      </td>
                      <td className="px-4 py-3">
                        <span
                          className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                            appel.statut === 'repondu'
                              ? 'bg-green-100 text-green-700'
                              : 'bg-red-100 text-red-700'
                          }`}
                        >
                          {appel.statut === 'repondu'
                            ? 'Répondu'
                            : 'Non répondu'}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
