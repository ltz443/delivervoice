'use client'

import Link from 'next/link'
import { Eye } from 'lucide-react'
import { DriverSession } from '@/lib/types'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

interface DriverTableProps {
  sessions: DriverSession[]
}

export default function DriverTable({ sessions }: DriverTableProps) {
  return (
    <div className="rounded-xl border border-[#E5E7EB] bg-white shadow-sm">
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow className="border-b border-[#E5E7EB]">
              <TableHead className="text-sm font-medium text-[#6B7280]">
                Driver
              </TableHead>
              <TableHead className="text-sm font-medium text-[#6B7280]">
                Connecté depuis
              </TableHead>
              <TableHead className="text-sm font-medium text-[#6B7280]">
                Livraisons
              </TableHead>
              <TableHead className="text-sm font-medium text-[#6B7280]">
                Appels passés
              </TableHead>
              <TableHead className="text-sm font-medium text-[#6B7280]">
                Statut
              </TableHead>
              <TableHead className="text-right text-sm font-medium text-[#6B7280]">
                Action
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sessions.map((session) => {
              const progression = session.livraisons_total > 0
                ? Math.round(
                    (session.livraisons_effectuees / session.livraisons_total) *
                      100
                  )
                : 0
              const isActif = true // Mock: tous les drivers listés sont actifs

              return (
                <TableRow
                  key={session.driver.id}
                  className="cursor-pointer border-b border-[#E5E7EB] transition-colors hover:bg-gray-50"
                >
                  <TableCell>
                    <Link
                      href={`/admin/drivers/${session.driver.id}`}
                      className="block"
                    >
                      <p className="font-medium text-[#111827]">
                        {session.driver.prenom} {session.driver.nom}
                      </p>
                      <p className="text-sm text-[#6B7280]">
                        {session.driver.email}
                      </p>
                    </Link>
                  </TableCell>
                  <TableCell className="text-[#111827]">
                    {session.connecte_depuis}
                  </TableCell>
                  <TableCell>
                    <span className="text-[#111827]">
                      {session.livraisons_effectuees}/{session.livraisons_total}
                    </span>
                    <span className="ml-2 text-sm text-[#6B7280]">
                      ({progression}%)
                    </span>
                  </TableCell>
                  <TableCell className="text-[#111827]">
                    {session.appels_passes}
                  </TableCell>
                  <TableCell>
                    <span
                      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                        isActif
                          ? 'bg-green-100 text-green-700'
                          : 'bg-gray-100 text-gray-600'
                      }`}
                    >
                      {isActif ? 'Actif' : 'Inactif'}
                    </span>
                  </TableCell>
                  <TableCell className="text-right">
                    <Link
                      href={`/admin/drivers/${session.driver.id}`}
                      className="inline-flex min-h-[44px] items-center gap-1.5 rounded-lg border border-[#E5E7EB] bg-white px-3 py-2 text-sm font-medium text-[#6B7280] transition-colors hover:bg-gray-50 hover:text-[#111827]"
                    >
                      <Eye className="h-4 w-4" />
                      Voir session
                    </Link>
                  </TableCell>
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
