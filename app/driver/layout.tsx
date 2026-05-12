'use client'

import { useState, useEffect } from 'react'
import Header from '@/components/shared/Header'
import { supabase } from '@/lib/supabase'

export default function DriverLayout({ children }: { children: React.ReactNode }) {
  const [prenom, setPrenom] = useState('')
  const [nom, setNom] = useState('')

  useEffect(() => {
    const fetchProfile = async (userId: string) => {
      const { data } = await supabase
        .from('users')
        .select('prenom, nom')
        .eq('id', userId)
        .single()
      if (data) {
        setPrenom(data.prenom)
        setNom(data.nom)
      }
    }

    // Vérifier la session immédiatement
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) fetchProfile(session.user.id)
    })

    // Écouter les changements d'auth
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        if (session) fetchProfile(session.user.id)
      }
    )

    return () => subscription.unsubscribe()
  }, [])

  return (
    <div className="flex min-h-screen flex-col bg-[#F9FAFB]">
      <Header prenom={prenom} nom={nom} />
      <main className="flex-1 px-4 py-4 md:px-6 md:py-6">{children}</main>
    </div>
  )
}
