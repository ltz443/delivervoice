'use client'

import { useState, useCallback } from 'react'
import { supabase } from '@/lib/supabase'
import { User } from '@/lib/types'

interface AuthState {
  user: User | null
  isLoading: boolean
  error: string | null
}

export function useAuth() {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    isLoading: false,
    error: null,
  })

  const login = useCallback(async (
    email: string,
    password: string
  ): Promise<{ redirectTo: string } | null> => {
    setAuthState((prev) => ({ ...prev, isLoading: true, error: null }))

    if (!email || !password) {
      setAuthState((prev) => ({
        ...prev,
        isLoading: false,
        error: 'Email et mot de passe obligatoires',
      }))
      return null
    }

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error || !data.user) {
      setAuthState((prev) => ({
        ...prev,
        isLoading: false,
        error: 'Email ou mot de passe incorrect',
      }))
      return null
    }

    // Récupérer le profil depuis la table users
    const { data: profile } = await supabase
      .from('users')
      .select('*')
      .eq('id', data.user.id)
      .single()

    if (!profile) {
      setAuthState((prev) => ({
        ...prev,
        isLoading: false,
        error: 'Profil introuvable, contactez un administrateur',
      }))
      return null
    }

    setAuthState({ user: profile, isLoading: false, error: null })

    return {
      redirectTo: profile.role === 'admin'
        ? '/admin/dashboard'
        : '/driver/livraisons',
    }
  }, [])

  const logout = useCallback(async () => {
    await supabase.auth.signOut()
    setAuthState({ user: null, isLoading: false, error: null })
  }, [])

  return {
    user: authState.user,
    isLoading: authState.isLoading,
    error: authState.error,
    login,
    logout,
  }
}
