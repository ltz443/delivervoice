'use client'

import { useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'

interface AddDriverModalProps {
  open: boolean
  onClose: () => void
  onAdd: (driver: {
    prenom: string
    nom: string
    email: string
    password: string
  }) => void
}

export default function AddDriverModal({
  open,
  onClose,
  onAdd,
}: AddDriverModalProps) {
  const [prenom, setPrenom] = useState('')
  const [nom, setNom] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errors, setErrors] = useState<Record<string, string>>({})

  const validate = (): boolean => {
    const newErrors: Record<string, string> = {}
    if (!prenom.trim()) newErrors.prenom = 'Le prénom est obligatoire'
    if (!nom.trim()) newErrors.nom = 'Le nom est obligatoire'
    if (!email.trim()) newErrors.email = "L'email est obligatoire"
    if (!password.trim())
      newErrors.password = 'Le mot de passe temporaire est obligatoire'
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!validate()) return
    onAdd({ prenom, nom, email, password })
    resetForm()
    onClose()
  }

  const resetForm = () => {
    setPrenom('')
    setNom('')
    setEmail('')
    setPassword('')
    setErrors({})
  }

  const handleClose = () => {
    resetForm()
    onClose()
  }

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold text-[#111827]">
            Ajouter un driver
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label
              htmlFor="prenom"
              className="text-sm font-medium text-[#111827]"
            >
              Prénom
            </Label>
            <Input
              id="prenom"
              value={prenom}
              onChange={(e) => setPrenom(e.target.value)}
              placeholder="Prénom du driver"
              className="border-[#E5E7EB]"
            />
            {errors.prenom && (
              <p className="text-sm text-[#E02424]">{errors.prenom}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label
              htmlFor="nom"
              className="text-sm font-medium text-[#111827]"
            >
              Nom
            </Label>
            <Input
              id="nom"
              value={nom}
              onChange={(e) => setNom(e.target.value)}
              placeholder="Nom du driver"
              className="border-[#E5E7EB]"
            />
            {errors.nom && (
              <p className="text-sm text-[#E02424]">{errors.nom}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label
              htmlFor="email-driver"
              className="text-sm font-medium text-[#111827]"
            >
              Email
            </Label>
            <Input
              id="email-driver"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="email@delivervoice.fr"
              className="border-[#E5E7EB]"
            />
            {errors.email && (
              <p className="text-sm text-[#E02424]">{errors.email}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label
              htmlFor="password-driver"
              className="text-sm font-medium text-[#111827]"
            >
              Mot de passe temporaire
            </Label>
            <Input
              id="password-driver"
              type="text"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Mot de passe temporaire"
              className="border-[#E5E7EB]"
            />
            {errors.password && (
              <p className="text-sm text-[#E02424]">{errors.password}</p>
            )}
          </div>

          <DialogFooter className="gap-2 sm:gap-0">
            <Button
              type="button"
              variant="outline"
              onClick={handleClose}
              className="border-[#E5E7EB] text-[#6B7280] hover:text-[#111827]"
            >
              Annuler
            </Button>
            <Button
              type="submit"
              className="bg-[#1A56DB] text-white hover:bg-[#1E429F]"
            >
              Créer
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
