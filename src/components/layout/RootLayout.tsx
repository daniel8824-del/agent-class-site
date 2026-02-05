import { useState, useCallback } from 'react'
import { Outlet } from 'react-router-dom'
import { Header } from './Header'
import { Sidebar } from './Sidebar'
import { MobileSidebar } from './MobileSidebar'
import { SearchDialog } from '@/components/search/SearchDialog'

export function RootLayout() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)

  const handleSearchClick = useCallback(() => setSearchOpen(true), [])
  const handleMenuClick = useCallback(() => setMobileMenuOpen(true), [])

  return (
    <div className="min-h-screen bg-background">
      <Header onMenuClick={handleMenuClick} onSearchClick={handleSearchClick} />
      <div className="flex">
        <Sidebar />
        <main className="flex-1 min-w-0">
          <Outlet />
        </main>
      </div>
      <MobileSidebar open={mobileMenuOpen} onClose={() => setMobileMenuOpen(false)} />
      <SearchDialog open={searchOpen} onClose={() => setSearchOpen(false)} />
    </div>
  )
}
