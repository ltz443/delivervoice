'use client'

import { useRouter } from 'next/navigation'
import { LogOut } from 'lucide-react'
import Logo from '@/components/shared/Logo'
import { Button } from '@/components/ui/button'

interface HeaderProps {
  prenom: string
  nom: string
  onMenuToggle?: () => void
  showMenuButton?: boolean
}

export default function Header({
  prenom,
  nom,
  onMenuToggle,
  showMenuButton = false,
}: HeaderProps) {
  const router = useRouter()

  const handleLogout = () => {
    router.push('/login')
  }

  return (
    <header className="sticky top-0 z-50 flex h-16 items-center justify-between border-b border-[#E5E7EB] bg-white px-4 md:px-6">
      <div className="flex items-center gap-3">
        {showMenuButton && (
          <button
            onClick={onMenuToggle}
            className="flex h-11 w-11 items-center justify-center rounded-lg text-[#6B7280] hover:bg-gray-100 lg:hidden"
            aria-label="Menu"
          >
            <svg
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
              />
            </svg>
          </button>
        )}
        <Logo size="sm" linkTo="/" />
      </div>

      <div className="flex items-center gap-3">
        <span className="text-sm font-medium text-[#111827]">
          {prenom} {nom}
        </span>
        <Button
          variant="ghost"
          size="sm"
          onClick={handleLogout}
          className="text-[#6B7280] hover:text-[#111827]"
        >
          <LogOut className="mr-1 h-4 w-4" />
          <span className="hidden sm:inline">Déconnexion</span>
        </Button>
      </div>
    </header>
  )
}
