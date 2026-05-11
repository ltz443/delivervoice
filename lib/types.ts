export type UserRole = 'driver' | 'admin'

export type StatutLivraison =
  | 'en_attente'
  | 'appele'
  | 'rappel_lance'
  | 'livre'
  | 'echec_appel'

export type User = {
  id: string
  email: string
  prenom: string
  nom: string
  role: UserRole
}

export type Livraison = {
  id: string
  driver_id: string
  client_prenom: string
  client_nom: string
  client_telephone: string
  adresse: string
  statut: StatutLivraison
  heure_prevue: string
  created_at: string
}

export type DriverSession = {
  driver: User
  connecte_depuis: string
  livraisons_total: number
  livraisons_effectuees: number
  appels_passes: number
}
