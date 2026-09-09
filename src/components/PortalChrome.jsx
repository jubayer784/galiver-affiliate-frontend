'use client';

import { usePathname } from 'next/navigation';
import DashboardNav from './DashboardNav';
import DashboardBottomNav from './DashboardBottomNav';

export default function PortalChrome({ children }) {
  const pathname = usePathname();
  const isPortalPage = ['/dashboard', '/earnings', '/payments', '/orders', '/products', '/support', '/profile'].some(route => pathname === route || pathname.startsWith(`${route}/`));

  if (!isPortalPage) return children;

  return (
    <>
      <DashboardNav />
      {children}
      <DashboardBottomNav />
    </>
  );
}
