'use client'

import Image from 'next/image'
import Link from 'next/link'

interface LogoProps {
  size?: 'sm' | 'md' | 'lg'
  linkTo?: string
}

export default function Logo({ size = 'md', linkTo = '/' }: LogoProps) {
  const dimensions = {
    sm: { width: 140, height: 34 },
    md: { width: 180, height: 44 },
    lg: { width: 220, height: 54 },
  }

  const { width, height } = dimensions[size]

  const logo = (
    <Image
      src="/logo.svg"
      alt="DeliverVoice"
      width={width}
      height={height}
      priority
    />
  )

  if (linkTo) {
    return <Link href={linkTo}>{logo}</Link>
  }

  return logo
}
