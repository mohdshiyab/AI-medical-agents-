import { UserButton } from '@clerk/nextjs'
import Image from 'next/image'
import Link from 'next/link'   // ✅ import Link
import React from 'react'

const menuOptions = [
{ id: 1, name: 'Home', path: '/' },
  { id: 2, name: 'History', path: '/dashboard/history' },
  { id: 3, name: 'Pricing', path: '/' },
  { id: 4, name: 'Profile', path: '/' },
]

function AppHeader() {
  return (
    <div className="flex items-center justify-between p-4 shadow px-10 md:px-20 lg:px-40">
      <Image src="/logo-shrinivas.png" alt="logo" width={200} height={90} />

      {/* Menu */}
      <div className="hidden md:flex gap-12 items-center">
        {menuOptions.map((option) => (
          <Link key={option.id} href={option.path}>
            <h2 className="hover:font-bold cursor-pointer">
              {option.name}
            </h2>
          </Link>
        ))}
      </div>

      {/* User Button */}
      <UserButton
        appearance={{
          elements: {
            userButtonAvatarBox:
              "bg-[var(--foreground)] text-[var(--background)]", 
            userButtonTrigger:
              "rounded-full border border-[var(--border)] hover:opacity-90 transition",
          },
        }}
      />
    </div>
  )
}

export default AppHeader
