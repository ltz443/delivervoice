// hooks/useAuth.ts
'use client'

import { useState, useCallback } from 'react'
import { User } from '@/lib/types'
import { mockDriver, mockAdmin } from '@/data/mockData'

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

  const login = useCallback(
    async (
      email: string,
      password: string
    ): Promise<{ redirectTo: string } | null> => {
      setAuthState((prev) => ({ ...prev, isLoading: true, error: null }))

      // Simuler un délai réseau
      await new Promise((resolve) => setTimeout(resolve, 800))

      if (!password) {
        setAuthState((prev) => ({
          ...prev,
          isLoading: false,
          error: 'Le mot de passe est obligatoire',
        }))
        return null
      }

      if (!email) {
        setAuthState((prev) => ({
          ...prev,
          isLoading: false,
          error: "L'email est obligatoire",
        }))
        return null
      }

      // Mock login : email contient 'admin' → admin, sinon → driver
      if (email.includes('admin')) {
        setAuthState({
          user: mockAdmin,
          isLoading: false,
          error: null,
        })
        return { redirectTo: '/admin/dashboard' }
      } else {
        setAuthState({
          user: mockDriver,
          isLoading: false,
          error: null,
        })
        return { redirectTo: '/driver/livraisons' }
      }
    },
    []
  )

  const logout = useCallback(() => {
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
