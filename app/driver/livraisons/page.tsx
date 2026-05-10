'use client'

import LivraisonList from '@/components/driver/LivraisonList'
import { mockDriver } from '@/data/mockData'

export default function DriverLivraisonsPage() {
  return <LivraisonList driverId={mockDriver.id} />
}
