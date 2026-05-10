'use client'

import { useState } from 'react'
import { Plus, Pencil, Ban, Trash2 } from 'lucide-react'
import { User } from '@/lib/types'
import { mockDrivers } from '@/data/mockData'
import { Button } from '@/components/ui/button'
import AddDriverModal from '@/components/admin/AddDriverModal'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

export default function AdminDriversPage() {
  const [drivers, setDrivers] = useState<User[]>(mockDrivers)
  const [modalOpen, setModalOpen] = useState(false)

  const handleAddDriver = (newDriver: {
    prenom: string
    nom: string
    email: string
    password: string
  }) => {
    const driver: User = {
      id: `driver-${Date.now()}`,
      email: newDriver.email,
      prenom: newDriver.prenom,
      nom: newDriver.nom,
      role: 'driver',
    }
    setDrivers((prev) => [...prev, driver])
  }

  const handleDelete = (driverId: string) => {
    setDrivers((prev) => prev.filter((d) => d.id !== driverId))
  }

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-[#111827]">Gestion Drivers</h1>
        <Button
          onClick={() => setModalOpen(true)}
          className="bg-[#1A56DB] text-white hover:bg-[#1E429F]"
        >
          <Plus className="mr-2 h-4 w-4" />
          Ajouter un driver
        </Button>
      </div>

      <div className="rounded-xl border border-[#E5E7EB] bg-white shadow-sm">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="border-b border-[#E5E7EB]">
                <TableHead className="text-sm font-medium text-[#6B7280]">
                  Nom
                </TableHead>
                <TableHead className="text-sm font-medium text-[#6B7280]">
                  Email
                </TableHead>
                <TableHead className="text-sm font-medium text-[#6B7280]">
                  Créé le
                </TableHead>
                <TableHead className="text-sm font-medium text-[#6B7280]">
                  Dernière connexion
                </TableHead>
                <TableHead className="text-sm font-medium text-[#6B7280]">
                  Statut
                </TableHead>
                <TableHead className="text-right text-sm font-medium text-[#6B7280]">
                  Actions
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {drivers.map((driver) => (
                <TableRow
                  key={driver.id}
                  className="border-b border-[#E5E7EB] last:border-b-0"
                >
                  <TableCell className="font-medium text-[#111827]">
                    {driver.prenom} {driver.nom}
                  </TableCell>
                  <TableCell className="text-[#6B7280]">
                    {driver.email}
                  </TableCell>
                  <TableCell className="text-sm text-[#6B7280]">
                    10 mai 2026
                  </TableCell>
                  <TableCell className="text-sm text-[#6B7280]">
                    Aujourd&apos;hui
                  </TableCell>
                  <TableCell>
                    <span className="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-700">
                      Actif
                    </span>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        className="flex h-9 w-9 items-center justify-center rounded-lg text-[#6B7280] transition-colors hover:bg-gray-100 hover:text-[#111827]"
                        title="Modifier"
                      >
                        <Pencil className="h-4 w-4" />
                      </button>
                      <button
                        className="flex h-9 w-9 items-center justify-center rounded-lg text-[#C27803] transition-colors hover:bg-orange-50"
                        title="Désactiver"
                      >
                        <Ban className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(driver.id)}
                        className="flex h-9 w-9 items-center justify-center rounded-lg text-[#E02424] transition-colors hover:bg-red-50"
                        title="Supprimer"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>

      <AddDriverModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onAdd={handleAddDriver}
      />
    </div>
  )
}
