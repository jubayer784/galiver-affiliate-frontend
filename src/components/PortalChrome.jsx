'use client';

import { usePathname } from 'next/navigation';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import DashboardNav from './DashboardNav';
import DashboardBottomNav from './DashboardBottomNav';

export default function PortalChrome({ children }) {
  const pathname = usePathname();
  const router = useRouter();
  const isPortalPage = ['/dashboard', '/earnings', '/payments', '/orders', '/products', '/support', '/profile'].some(route => pathname === route || pathname.startsWith(`${route}/`));
  const [authorized, setAuthorized] = useState(!isPortalPage);

  useEffect(() => {
    if (!isPortalPage) {
      setAuthorized(true);
      return undefined;
    }

    const checkAuth = () => {
      const hasToken = Boolean(window.localStorage.getItem('affiliateToken'));
      setAuthorized(hasToken);
      if (!hasToken) router.replace('/login');
    };

    checkAuth();
    window.addEventListener('pageshow', checkAuth);
    return () => window.removeEventListener('pageshow', checkAuth);
  }, [isPortalPage, router]);

  if (!isPortalPage || authorized) {
    if (!isPortalPage) return children;
    return (
      <>
        <DashboardNav />
        {children}
        <DashboardBottomNav />
      </>
    );
  }

  return null;
}
