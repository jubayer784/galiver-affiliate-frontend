'use client';

import { useEffect, useState } from 'react';
import UiIcon from './UiIcon';

const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'https://api.galiver.shop/api/v1';
const cards = [
  { key: 'total', label: 'Total Order', icon: 'bag', color: '#e35d38' },
  { key: 'delivered', label: 'Total Delivered', icon: 'check', color: '#20815a' },
  { key: 'pending', label: 'Total Pending', icon: 'clock', color: '#3978b8' },
  { key: 'canceled', label: 'Total Cancel', icon: 'close', color: '#c94b4b' },
  { key: 'returned', label: 'Total Return', icon: 'return', color: '#9a6915' },
  { key: 'earning', label: 'Total Earning', icon: 'wallet', color: '#7a4aa8', money: true },
];

export default function OrderStats() {
  const [stats, setStats] = useState({ total: 0, delivered: 0, pending: 0, canceled: 0, returned: 0, earning: 0 });
  useEffect(() => {
    const token = localStorage.getItem('affiliateToken');
    if (!token) return;
    fetch(`${apiUrl}/affiliate/stats`, { headers: { Authorization: `Bearer ${token}` } })
      .then(response => response.ok ? response.json() : null)
      .then(data => { if (data) setStats(data); })
      .catch(() => {});
  }, []);

  return (
    <section className="order-stats" aria-label="Order summary">
      <style>{`.order-date-filter{display:grid;grid-template-columns:1fr 1fr 1fr auto;align-items:end;gap:10px;margin-bottom:16px;padding:14px;border:1px solid #dfe5dc;border-radius:8px;background:#fff}.order-date-filter label{display:grid;gap:6px;color:#526159;font:700 11px Arial,sans-serif}.order-date-filter input,.order-date-filter select{height:38px;padding:0 9px;border:1px solid #dfe5dc;border-radius:6px;background:#fff;color:#17231d;font:13px Arial,sans-serif}.order-date-reset{height:38px;padding:0 13px;border:0;border-radius:6px;background:#e35d38;color:#fff;font:700 11px Arial,sans-serif;cursor:pointer}.order-stats-grid{display:grid;grid-template-columns:repeat(2,1fr);gap:12px;margin-bottom:20px}.order-stat-card{display:flex;align-items:center;gap:10px;padding:14px 12px;border:1px solid #dfe5dc;border-radius:8px;background:#fff}.order-stat-icon{display:grid;place-items:center;width:36px;height:36px;flex:0 0 36px;border-radius:50%;color:#fff}.order-stat-label{display:block;color:#64716b;font:600 10px Arial,sans-serif;white-space:nowrap}.order-stat-value{display:block;margin-top:4px;color:#17231d;font:700 20px Arial,sans-serif;white-space:nowrap}@media(max-width:600px){.order-date-filter{grid-template-columns:1fr 1fr}.order-date-reset{width:100%}.order-stats-grid{gap:10px}.order-stat-card{padding:12px 10px;gap:9px}.order-stat-icon{width:32px;height:32px;flex-basis:32px}.order-stat-icon .material-symbols{font-size:18px}.order-stat-label{font-size:9px}.order-stat-value{font-size:18px}}`}</style>
      <style>{`.order-stats{background:transparent}.order-stat-card{min-height:108px;padding:20px 16px;gap:14px;background:#fff}.order-stat-icon{width:46px;height:46px;flex-basis:46px}.order-stat-icon .material-symbols{font-size:24px}.order-stat-label{font-size:11px}.order-stat-value{font-size:25px}@media(max-width:900px){.order-stat-card{min-height:100px}}@media(max-width:600px){.order-stat-card{min-height:94px;padding:16px 12px}.order-stat-icon{width:40px;height:40px;flex-basis:40px}.order-stat-icon .material-symbols{font-size:21px}.order-stat-label{font-size:10px}.order-stat-value{font-size:22px}}`}</style>
      <div className="order-stats-grid">{cards.map(card => <article className="order-stat-card" key={card.key}><span className="order-stat-icon" style={{ background: card.color }}><UiIcon name={card.icon} size={20} /></span><span><span className="order-stat-label">{card.label}</span><strong className="order-stat-value">{card.money ? `৳ ${Number(stats[card.key] || 0).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}` : Number(stats[card.key] || 0).toLocaleString('en-US')}</strong></span></article>)}</div>
    </section>
  );
}
