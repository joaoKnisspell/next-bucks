'use client'

import Logo from './Logo'
import { ArrowRightLeft, Goal, LayoutGrid, Menu } from 'lucide-react'
import { NavLink } from './NavItem'
import { ProfileSection } from './ProfileSection'
import { useState } from 'react'

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <aside
      className="fixed left-0 right-0 top-0 z-20 flex flex-col justify-between bg-appBlack  px-8 py-4 data-[open=true]:bottom-0 lg:relative lg:min-h-screen lg:w-sidebar lg:px-7 lg:py-12 xl:h-full"
      data-open={isOpen}
    >
      <div className="flex w-full items-center justify-between">
        <Logo variant="sidebar">
          <span className="font-bold">NEXT</span>
        </Logo>
        <div className="flex h-9 w-9 cursor-pointer items-center justify-center rounded hover:bg-zinc-800 lg:hidden">
          <Menu
            className="h-7 w-7 text-white"
            onClick={() => setIsOpen(!isOpen)}
          />
        </div>
      </div>
      <div
        className="flex h-full flex-col justify-between data-[open=false]:hidden lg:data-[open=false]:flex"
        data-open={isOpen}
      >
        <nav className="mt-10 flex w-full flex-col gap-4 ">
          <NavLink
            pathName="/"
            linkName="Overview"
            onClick={() => setIsOpen(false)}
          >
            <LayoutGrid className="h-6 w-6" />
          </NavLink>

          <NavLink
            pathName="/transactions"
            linkName="Transactions"
            onClick={() => setIsOpen(false)}
          >
            <ArrowRightLeft className="h-6 w-6" />
          </NavLink>

          <NavLink
            pathName="/goals"
            linkName="Goals"
            onClick={() => setIsOpen(false)}
          >
            <Goal className="h-6 w-6" />
          </NavLink>
        </nav>
        <ProfileSection />
      </div>
    </aside>
  )
}
