'use client';

import { usePathname } from 'next/navigation';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import DashboardNav from './DashboardNav';
import DashboardBottomNav from './DashboardBottomNav';
import SuspendedNotice from './SuspendedNotice';

const AUTH_ROUTES = ['/dashboard', '/earnings', '/payments', '/orders', '/products', '/profile', '/notifications'];
const CHROME_ROUTES = [...AUTH_ROUTES, '/support'];

const matches = (pathname, routes) => routes.some(route => pathname === route || pathname.startsWith(`${route}/`));

export default function PortalChrome({ children }) {
  const pathname = usePathname();
  const router = useRouter();
  const needsAuth = matches(pathname, AUTH_ROUTES);
  const hasChrome = matches(pathname, CHROME_ROUTES);
  const [authorized, setAuthorized] = useState(!needsAuth);

  useEffect(() => {
    if (!needsAuth) {
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
  }, [needsAuth, router]);

  if (needsAuth && !authorized) return <SuspendedNotice />;
  if (!hasChrome) return <>{children}<SuspendedNotice /></>;

  return (
    <>
      <DashboardNav />
      <div className="portal-body">{children}</div>
      <DashboardBottomNav />
      <SuspendedNotice />
    </>
  );
}
