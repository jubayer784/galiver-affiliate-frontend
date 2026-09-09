'use client';

import { useEffect, useState } from 'react';

const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'https://api.galiver.shop/api/v1';
const initialCounts = { total: 0, pending: 0, canceled: 0, returned: 0 };
const dateValue = date => `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
const getDateRange = preset => { const today = new Date(); const start = new Date(today); const end = new Date(today); const day = today.getDay(); if (preset === 'today') return { from: dateValue(start), to: dateValue(end) }; if (preset === 'yesterday') { start.setDate(start.getDate() - 1); end.setDate(end.getDate() - 1); } else if (preset === 'this-week') start.setDate(start.getDate() - (day === 0 ? 6 : day - 1)); else if (preset === 'last-week') { start.setDate(start.getDate() - (day === 0 ? 13 : day + 6)); end.setDate(end.getDate() - (day === 0 ? 7 : day)); } else if (preset === 'this-month') start.setDate(1); else if (preset === 'last-month') { start.setMonth(start.getMonth() - 1, 1); end.setDate(0); } return { from: dateValue(start), to: dateValue(end) }; };
const datePresets = [['today', 'Today'], ['yesterday', 'Yesterday'], ['this-week', 'This Week'], ['last-week', 'Last Week'], ['this-month', 'This Month'], ['last-month', 'Last Month']];

export default function Orders() {
  const defaultToday = getDateRange('today');
  const [from, setFrom] = useState(defaultToday.from);
  const [to, setTo] = useState(defaultToday.to);
  const [selectedPreset, setSelectedPreset] = useState('today');
  const [appliedRange, setAppliedRange] = useState(defaultToday);
  const [counts, setCounts] = useState(initialCounts);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('affiliateToken');
    const query = new URLSearchParams();
    if (appliedRange.from) query.set('from', appliedRange.from);
    if (appliedRange.to) query.set('to', appliedRange.to);
    setLoading(true);
    setError('');
    fetch(`${apiUrl}/affiliate/orders${query.toString() ? `?${query}` : ''}`, { headers: { Authorization: `Bearer ${token || ''}` } })
      .then(async response => { if (!response.ok) throw new Error('Orders load করা যায়নি।'); return response.json(); })
      .then(data => { setOrders(data.orders || []); setCounts({ ...initialCounts, ...(data.counts || {}) }); })
      .catch(loadError => { setError(loadError.message); setOrders([]); setCounts(initialCounts); })
      .finally(() => setLoading(false));
  }, [appliedRange]);

  function updateDateRange(nextFrom, nextTo) {
    setError('');
    setSelectedPreset('');
    if (nextFrom && nextTo && nextFrom > nextTo) { setError('From date, To date-এর আগে হতে পারবে না।'); return; }
    setAppliedRange({ from: nextFrom, to: nextTo });
  }

  function selectPreset(preset) {
    const range = getDateRange(preset);
    setFrom(range.from);
    setTo(range.to);
    updateDateRange(range.from, range.to);
    setSelectedPreset(preset);
  }

  return <main className="orders-page shell">
    <style>{`.orders-page{padding-bottom:120px}.orders-heading{margin:20px 0 18px;color:#17231d;font:700 30px Arial,sans-serif}.date-presets{display:grid;grid-template-columns:repeat(6,1fr);gap:8px;margin-bottom:10px}.date-preset{min-height:34px;padding:7px 8px;border:1px solid #dfe5dc;border-radius:6px;background:#fff;color:#526159;font:700 11px Arial,sans-serif;cursor:pointer}.date-preset:hover,.date-preset:focus-visible,.date-preset.active{border-color:#e35d38;background:#e35d38;color:#fff;outline:0}.order-date-filter{display:grid;grid-template-columns:1fr 1fr;align-items:end;gap:10px;margin-bottom:16px;padding:14px;border:1px solid #dfe5dc;border-radius:8px;background:#fff}.order-date-filter label{display:grid;gap:6px;color:#526159;font:700 11px Arial,sans-serif}.order-date-filter input{height:38px;padding:0 9px;border:1px solid #dfe5dc;border-radius:6px;background:#fff;color:#17231d;font:13px Arial,sans-serif}.orders-summary{display:grid;grid-template-columns:repeat(4,1fr);gap:14px;margin-bottom:26px}.orders-card{padding:18px;border:1px solid #dfe5dc;border-radius:8px;background:#fff}.orders-card-label{display:block;color:#6b776f;font:600 12px Arial,sans-serif}.orders-card-value{display:block;margin-top:9px;color:#17231d;font:700 28px Arial,sans-serif}.orders-card:nth-child(2) .orders-card-value{color:#c78319}.orders-card:nth-child(3) .orders-card-value{color:#c24848}.orders-card:nth-child(4) .orders-card-value{color:#8a5c9e}.orders-list{overflow:hidden;border:1px solid #dfe5dc;border-radius:8px;background:#fff}.orders-list-heading{display:flex;justify-content:space-between;padding:16px;border-bottom:1px solid #e9ede7;color:#17231d;font:700 15px Arial,sans-serif}.order-row{display:grid;grid-template-columns:1.2fr 1fr 1fr 1fr;gap:12px;align-items:center;padding:15px 16px;border-bottom:1px solid #eef1ed;color:#526159;font:13px Arial,sans-serif}.order-row:last-child{border-bottom:0}.order-invoice{color:#17231d;font-weight:700}.order-status{text-transform:capitalize}.order-status.pending{color:#c78319}.order-status.canceled{color:#c24848}.order-status.returned{color:#8a5c9e}.orders-empty,.orders-error{padding:24px;color:#6b776f;font:13px Arial,sans-serif}.orders-error{color:#b33b3b;background:#fff0ef}@media(max-width:700px){.orders-heading{font-size:25px}.date-presets{grid-template-columns:repeat(3,1fr)}.order-date-filter{grid-template-columns:1fr 1fr}.orders-summary{grid-template-columns:repeat(2,1fr);gap:10px}.orders-card{padding:14px}.orders-card-value{font-size:24px}.order-row{grid-template-columns:1fr 1fr;gap:8px}.order-row span:nth-child(3),.order-row span:nth-child(4){font-size:12px}}@media(max-width:430px){.date-presets{gap:6px}.date-preset{padding:7px 4px;font-size:10px}.order-date-filter{grid-template-columns:1fr 1fr}.orders-list-heading{font-size:14px}}`}</style>
    <h1 className="orders-heading">My Orders</h1>
    <div className="date-presets" aria-label="Quick date filters">{datePresets.map(([value, label]) => <button className={`date-preset ${selectedPreset === value ? 'active' : ''}`} type="button" key={value} onClick={() => selectPreset(value)}>{label}</button>)}</div>
    <div className="order-date-filter">
      <label>From date<input type="date" value={from} onChange={event => { const value = event.target.value; setFrom(value); updateDateRange(value, to); }} /></label>
      <label>To date<input type="date" value={to} onChange={event => { const value = event.target.value; setTo(value); updateDateRange(from, value); }} /></label>
    </div>
    {error && <div className="orders-error">{error}</div>}
    <section className="orders-summary" aria-label="Order summary">
      <article className="orders-card"><span className="orders-card-label">Total Order</span><strong className="orders-card-value">{counts.total}</strong></article>
      <article className="orders-card"><span className="orders-card-label">Total Pending</span><strong className="orders-card-value">{counts.pending}</strong></article>
      <article className="orders-card"><span className="orders-card-label">Total Cancel</span><strong className="orders-card-value">{counts.canceled}</strong></article>
      <article className="orders-card"><span className="orders-card-label">Total Return</span><strong className="orders-card-value">{counts.returned}</strong></article>
    </section>
    <section className="orders-list"><div className="orders-list-heading"><span>Order History</span><span>{loading ? 'Loading...' : `${orders.length} orders`}</span></div>{!loading && !orders.length && <p className="orders-empty">এই date range-এ কোনো order পাওয়া যায়নি।</p>}{orders.map(order => <div className="order-row" key={order._id}><span className="order-invoice">#{order.invoice || order._id.slice(-8)}</span><span>৳ {Number(order.total || 0).toLocaleString('en-US')}</span><span>{new Date(order.createdAt).toLocaleDateString('en-GB')}</span><span className={`order-status ${order.status}`}>{order.status}</span></div>)}</section>
  </main>;
}
