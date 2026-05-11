'use client'

import { useEffect, useState } from 'react'
import { Plus, Pencil, Ban, Trash2 } from 'lucide-react'
import { supabase } from '@/lib/supabase'
import { Button } from '@/components/ui/button'
import AddDriverModal from '@/components/admin/AddDriverModal'
import {
  Table, TableBody, TableCell,
  TableHead, TableHeader, TableRow,
} from '@/components/ui/table'

interface Driver {
  id: string
  email: string
  prenom: string
  nom: string
  role: string
  actif: boolean
  created_at: string
  derniere_connexion: string | null
}

export default function AdminDriversPage() {
  const [drivers, setDrivers] = useState<Driver[]>([])
  const [modalOpen, setModalOpen] = useState(false)

  const fetchDrivers = async () => {
    const { data } = await supabase
      .from('users')
      .select('*')
      .eq('role', 'driver')
      .order('created_at', { ascending: false })
    if (data) setDrivers(data)
  }

  useEffect(() => {
    fetchDrivers()
  }, [])

  const handleAddDriver = (newDriver: {
    prenom: string
    nom: string
    email: string
    password: string
  }) => {
    console.log('Nouveau driver à créer via API :', newDriver)
    setModalOpen(false)
  }

  const handleDelete = async (driverId: string) => {
    await supabase.from('users').delete().eq('id', driverId)
    setDrivers((prev) => prev.filter((d) => d.id !== driverId))
  }

  const handleToggleActif = async (driverId: string, actif: boolean) => {
    await supabase.from('users').update({ actif: !actif }).eq('id', driverId)
    setDrivers((prev) =>
      prev.map((d) => d.id === driverId ? { ...d, actif: !actif } : d)
    )
  }

  const formatDate = (dateStr: string | null) => {
    if (!dateStr) return '—'
    return new Date(dateStr).toLocaleDateString('fr-FR')
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
                <TableHead className="text-sm font-medium text-[#6B7280]">Nom</TableHead>
                <TableHead className="text-sm font-medium text-[#6B7280]">Email</TableHead>
                <TableHead className="text-sm font-medium text-[#6B7280]">Créé le</TableHead>
                <TableHead className="text-sm font-medium text-[#6B7280]">Dernière connexion</TableHead>
                <TableHead className="text-sm font-medium text-[#6B7280]">Statut</TableHead>
                <TableHead className="text-right text-sm font-medium text-[#6B7280]">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {drivers.map((driver) => (
                <TableRow key={driver.id} className="border-b border-[#E5E7EB] last:border-b-0">
                  <TableCell className="font-medium text-[#111827]">
                    {driver.prenom} {driver.nom}
                  </TableCell>
                  <TableCell className="text-[#6B7280]">{driver.email}</TableCell>
                  <TableCell className="text-sm text-[#6B7280]">{formatDate(driver.created_at)}</TableCell>
                  <TableCell className="text-sm text-[#6B7280]">{formatDate(driver.derniere_connexion)}</TableCell>
                  <TableCell>
                    <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                      driver.actif
                        ? 'bg-green-100 text-green-700'
                        : 'bg-red-100 text-red-700'
                    }`}>
                      {driver.actif ? 'Actif' : 'Inactif'}
                    </span>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        className="flex h-9 w-9 items-center justify-center rounded-lg text-[#6B7280] hover:bg-gray-100"
                        title="Modifier"
                      >
                        <Pencil className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => handleToggleActif(driver.id, driver.actif)}
                        className="flex h-9 w-9 items-center justify-center rounded-lg text-[#C27803] hover:bg-orange-50"
                        title={driver.actif ? 'Désactiver' : 'Activer'}
                      >
                        <Ban className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(driver.id)}
                        className="flex h-9 w-9 items-center justify-center rounded-lg text-[#E02424] hover:bg-red-50"
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
