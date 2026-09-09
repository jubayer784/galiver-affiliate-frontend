'use client';

import { usePathname } from 'next/navigation';

const items = [
  { href: '/dashboard', icon: 'home', label: 'Home' },
  { href: '/earnings', icon: 'payments', label: 'Earnings' },
  { href: '/orders', icon: 'receipt_long', label: 'Orders' },
  { href: '/products', icon: 'inventory_2', label: 'Products' },
  { href: '/support', icon: 'support_agent', label: 'Support' },
];

export default function DashboardBottomNav() {
  const pathname = usePathname();

  return (
    <>
      <style>{`.dashboard-bottom-nav{position:fixed;right:0;bottom:0;left:0;z-index:20;display:flex;justify-content:center;background:#fff;border-top:1px solid #e5e8e3;box-shadow:0 -5px 18px rgba(23,35,29,.08)}.dashboard-bottom-nav-inner{display:grid;grid-template-columns:repeat(5,1fr);width:min(100%,620px);padding:8px 14px calc(8px + env(safe-area-inset-bottom))}.dashboard-bottom-link{display:grid;justify-items:center;gap:3px;padding:5px 4px;border:0;background:transparent;color:#748078;font:600 10px Arial,sans-serif}.dashboard-bottom-link .material-symbols{font-size:22px}.dashboard-bottom-link.active{color:#e35d38}.dashboard-bottom-link:focus-visible{outline:2px solid #e35d38;outline-offset:-2px;border-radius:8px}@media(min-width:700px){.dashboard-bottom-nav{right:24px;bottom:20px;left:auto;width:620px;border:1px solid #e5e8e3;border-radius:14px}.dashboard-bottom-nav-inner{padding:9px 16px}}`}</style>
      <nav className="dashboard-bottom-nav" aria-label="Dashboard navigation">
        <div className="dashboard-bottom-nav-inner">
          {items.map(item => (
            <a className={`dashboard-bottom-link ${pathname === item.href || (item.href === '/dashboard' && pathname === '/dashboard') ? 'active' : ''}`} href={item.href} key={item.label}>
              <span className="material-symbols">{item.icon}</span>
              <span>{item.label}</span>
            </a>
          ))}
        </div>
      </nav>
    </>
  );
}
