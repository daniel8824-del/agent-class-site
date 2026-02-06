import { useState, useCallback } from 'react';
import { Outlet } from 'react-router-dom';
import { Header } from './Header';
import { Footer } from './Footer';
import { MobileMenu } from './MobileMenu';
import { PageTransition } from './PageTransition';
import { SearchDialog } from '@/components/search/SearchDialog';

export function RootLayout() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  const handleSearchClick = useCallback(() => setSearchOpen(true), []);
  const handleMenuClick = useCallback(() => setMobileMenuOpen(true), []);

  return (
    <div className="min-h-screen bg-background">
      <Header onMenuClick={handleMenuClick} onSearchClick={handleSearchClick} />
      <main className="w-full">
        <PageTransition>
          <Outlet />
        </PageTransition>
      </main>
      <Footer />
      <MobileMenu
        open={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
      />
      <SearchDialog open={searchOpen} onClose={() => setSearchOpen(false)} />
    </div>
  );
}
