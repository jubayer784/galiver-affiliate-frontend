'use client';

import { usePathname } from 'next/navigation';
import UiIcon from './UiIcon';

const items = [
  { href: '/earnings', icon: 'wallet', label: 'Earnings' },
  { href: '/orders', icon: 'receipt', label: 'Orders' },
  { href: '/products', icon: 'box', label: 'Products' },
  { href: '/support', icon: 'support', label: 'Support' },
];

export default function DashboardBottomNav() {
  const pathname = usePathname();

  return (
    <>
      <style>{`.dashboard-bottom-nav{position:fixed;right:0;bottom:0;left:0;z-index:20;display:flex;justify-content:center;background:#fff;border-top:1px solid #e5e8e3;box-shadow:0 -5px 18px rgba(23,35,29,.08)}.dashboard-bottom-nav-inner{display:grid;grid-template-columns:repeat(4,1fr);width:min(100%,620px);padding:8px 14px calc(8px + env(safe-area-inset-bottom))}.dashboard-bottom-link{display:grid;justify-items:center;gap:3px;padding:5px 4px;border:0;background:transparent;color:#748078;font:600 10px Arial,sans-serif}.dashboard-bottom-icon{font-size:27px;font-weight:700;line-height:1}.dashboard-bottom-link.active{color:#e35d38}.dashboard-bottom-link:focus-visible{outline:2px solid #e35d38;outline-offset:-2px;border-radius:8px}@media(min-width:700px){.dashboard-bottom-nav{top:68px;left:0;right:auto;bottom:0;flex-direction:column;justify-content:flex-start;width:210px;border:0;border-right:1px solid #e5e8e3;box-shadow:2px 0 16px rgba(23,35,29,.06)}.dashboard-bottom-nav-inner{grid-template-columns:1fr;gap:6px;width:auto;padding:18px 12px;overflow-y:auto}.dashboard-bottom-link{grid-template-columns:22px 1fr;justify-items:start;align-items:center;gap:12px;padding:12px 13px;border-radius:10px;font-size:14px}.dashboard-bottom-icon{font-size:20px}.dashboard-bottom-link.active{background:#fdefe9;color:#e35d38}.portal-body{padding-left:210px}}`}</style>
      <nav className="dashboard-bottom-nav" aria-label="Dashboard navigation">
        <div className="dashboard-bottom-nav-inner">
          {items.map(item => (
            <a className={`dashboard-bottom-link ${pathname === item.href || pathname.startsWith(`${item.href}/`) ? 'active' : ''}`} href={item.href} key={item.label}>
              <span className="dashboard-bottom-icon"><UiIcon name={item.icon} size={19} /></span>
              <span>{item.label}</span>
            </a>
          ))}
        </div>
      </nav>
    </>
  );
}
