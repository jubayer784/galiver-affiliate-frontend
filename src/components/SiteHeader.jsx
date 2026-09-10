'use client';

import Link from 'next/link';

export default function SiteHeader({ href = '/', showAuthLinks = true }) {
  return (
    <>
      <style>{`.site-header{position:sticky;top:0;z-index:20;display:flex;align-items:center;justify-content:space-between;min-height:68px;padding:12px max(18px,calc((100% - 1080px)/2));background:#e35d38;color:#fff}.site-header-brand{display:flex;align-items:center;gap:10px}.site-header-logo{width:104px;height:auto;display:block;object-fit:contain}.site-header-fallback{display:none;color:#fff;font:700 22px Arial,sans-serif;letter-spacing:.5px}.site-header-nav{display:flex;align-items:center;gap:9px;font:700 13px Arial,sans-serif}.site-header-login{padding:9px 13px;border:1px solid rgba(255,255,255,.55);border-radius:8px;color:#fff}.site-header-cta{padding:10px 15px;border-radius:8px;background:#fff;color:#e35d38}.auth-page .site-header{margin-left:-16px;margin-right:-16px}@media(max-width:600px){.site-header{min-height:60px;padding:10px 14px}.site-header-logo{width:86px}.site-header-fallback{font-size:18px}.site-header-nav{gap:6px;font-size:12px}.site-header-login{padding:8px 10px}.site-header-cta{padding:9px 12px}}`}</style>
      <header className="site-header">
        <Link className="site-header-brand" href={href} aria-label="Galiver Affiliates">
          <img className="site-header-logo" src="https://galiver.shop/banner/galiverwhitelogo.png" alt="Galiver Affiliates" onError={event => { event.currentTarget.style.display = 'none'; event.currentTarget.nextElementSibling.style.display = 'block'; }} />
          <span className="site-header-fallback">GALIVER</span>
        </Link>
        {showAuthLinks && (
          <nav className="site-header-nav">
            <Link className="site-header-login" href="/login">লগইন</Link>
            <Link className="site-header-cta" href="/signup">সাইন আপ</Link>
          </nav>
        )}
      </header>
    </>
  );
}
