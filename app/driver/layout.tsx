'use client'

import { useState, useEffect } from 'react'
import Header from '@/components/shared/Header'
import { supabase } from '@/lib/supabase'

export default function DriverLayout({ children }: { children: React.ReactNode }) {
  const [prenom, setPrenom] = useState('')
  const [nom, setNom] = useState('')

  useEffect(() => {
    const fetchUser = async () => {
      const { data: { session } } = await supabase.auth.getSession()
      if (!session) return
      const { data } = await supabase
        .from('users')
        .select('prenom, nom')
        .eq('id', session.user.id)
        .single()
      if (data) {
        setPrenom(data.prenom)
        setNom(data.nom)
      }
    }
    fetchUser()
  }, [])

  return (
    <div className="flex min-h-screen flex-col bg-[#F9FAFB]">
      <Header prenom={prenom} nom={nom} />
      <main className="flex-1 px-4 py-4 md:px-6 md:py-6">{children}</main>
    </div>
  )
}
