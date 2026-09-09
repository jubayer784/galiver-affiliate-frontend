'use client';

import { useEffect, useState } from 'react';

export default function DashboardNav() {
  const [balance, setBalance] = useState(0);
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    try {
      const profile = JSON.parse(localStorage.getItem('affiliateProfile') || 'null');
      setBalance(Number(profile?.walletBalance || 0));
      setProfile(profile);
    } catch {
      setBalance(0);
      setProfile(null);
    }
  }, []);

  const name = profile?.name || 'Affiliate';
  const initials = name.trim().split(/\s+/).slice(0, 2).map(part => part[0]).join('').toUpperCase();
  const image = profile?.profileImage || profile?.avatar || profile?.image;

  return (
    <>
      <style>{`.dashboard-nav{position:sticky;top:0;z-index:20;display:flex;align-items:center;justify-content:space-between;min-height:68px;padding:12px max(18px,calc((100% - 1112px)/2));margin:0 0 24px;background:#e35d38;color:#fff}.dashboard-brand{display:flex;align-items:center;gap:10px;font:700 22px/1 Arial,sans-serif;color:#fff}.dashboard-brand-logo{width:104px;height:auto;display:block;object-fit:contain}.dashboard-brand-fallback{display:none;color:#fff;font:700 22px Arial,sans-serif}.dashboard-balance{position:absolute;left:50%;transform:translateX(-50%);padding:8px 16px;border-radius:999px;background:#fff;color:#17231d;text-align:center;white-space:nowrap;box-shadow:0 3px 10px rgba(112,45,20,.16)}.dashboard-balance-value{display:block;color:#17231d;font:700 17px Arial,sans-serif}.dashboard-actions{display:flex;align-items:center;gap:9px}.dashboard-notification{position:relative;display:grid;place-items:center;width:40px;height:40px;border:1px solid rgba(255,255,255,.45);border-radius:50%;background:rgba(255,255,255,.16);color:#fff;cursor:pointer}.dashboard-notification .material-symbols{font-size:21px}.dashboard-notification-dot{position:absolute;top:8px;right:9px;width:7px;height:7px;border:2px solid #e35d38;border-radius:50%;background:#fff}.dashboard-profile-avatar{width:40px;height:40px;border:2px solid #fff;border-radius:50%;object-fit:cover}.dashboard-profile-fallback{display:grid;place-items:center;background:#17231d;color:#fff;font:700 12px Arial,sans-serif}@media(max-width:600px){.dashboard-nav{min-height:62px;padding:10px 12px;margin:0 0 18px}.dashboard-brand-logo{width:86px}.dashboard-brand-fallback{font-size:18px}.dashboard-balance{padding:7px 10px}.dashboard-balance-value{font-size:15px}.dashboard-notification{width:36px;height:36px}.dashboard-profile-avatar{width:36px;height:36px}}`}</style>
      <nav className="dashboard-nav">
      <a className="dashboard-brand" href="/" aria-label="Galiver affiliates home">
        <img className="dashboard-brand-logo" src="https://galiver.shop/banner/galiverwhitelogo.png" alt="Galiver" onError={event => { event.currentTarget.style.display = 'none'; event.currentTarget.nextElementSibling.style.display = 'block'; }} />
        <span className="dashboard-brand-fallback">GALIVER</span>
      </a>
      <div className="dashboard-balance">
        <span className="dashboard-balance-value">৳ {balance.toLocaleString('en-BD', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
      </div>
      <div className="dashboard-actions">
        <button className="dashboard-notification" type="button" aria-label="Notifications">
          <span className="material-symbols">notifications</span>
          <span className="dashboard-notification-dot" aria-hidden="true" />
        </button>
        {image ? <img className="dashboard-profile-avatar" src={image} alt={name} /> : <span className="dashboard-profile-avatar dashboard-profile-fallback" aria-label={name}>{initials}</span>}
      </div>
      </nav>
    </>
  );
}
