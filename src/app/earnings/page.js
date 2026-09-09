'use client';

import { useEffect, useState } from 'react';

const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api/v1';
const dateValue = date => `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
const getDateRange = preset => { const today = new Date(); const start = new Date(today); const end = new Date(today); const day = today.getDay(); if (preset === 'today') return { from: dateValue(start), to: dateValue(end) }; if (preset === 'yesterday') { start.setDate(start.getDate() - 1); end.setDate(end.getDate() - 1); } else if (preset === 'this-week') start.setDate(start.getDate() - (day === 0 ? 6 : day - 1)); else if (preset === 'last-week') { start.setDate(start.getDate() - (day === 0 ? 13 : day + 6)); end.setDate(end.getDate() - (day === 0 ? 7 : day)); } else if (preset === 'this-month') start.setDate(1); else if (preset === 'last-month') { start.setMonth(start.getMonth() - 1, 1); end.setDate(0); } return { from: dateValue(start), to: dateValue(end) }; };
const datePresets = [['today', 'Today'], ['yesterday', 'Yesterday'], ['this-week', 'This Week'], ['last-week', 'Last Week'], ['this-month', 'This Month'], ['last-month', 'Last Month']];

export default function Earnings() {
  const defaultToday = getDateRange('today');
  const [commissions, setCommissions] = useState([]);
  const [balance, setBalance] = useState(0);
  const [paymentMethods, setPaymentMethods] = useState([]);
  const [requestOpen, setRequestOpen] = useState(false);
  const [requestForm, setRequestForm] = useState({ method: '' });
  const [requestMessage, setRequestMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [from, setFrom] = useState(defaultToday.from);
  const [to, setTo] = useState(defaultToday.to);
  const [selectedPreset, setSelectedPreset] = useState('today');

  useEffect(() => {
    const token = localStorage.getItem('affiliateToken');
    fetch(`${apiUrl}/affiliate/me`, { headers: { Authorization: `Bearer ${token || ''}` } }).then(response => response.ok ? response.json() : null).then(data => { setBalance(Number(data?.affiliate?.walletBalance || 0)); const methods = data?.affiliate?.paymentMethods || []; setPaymentMethods(methods); setRequestForm({ method: methods[0] || '' }); }).catch(() => {});
    const query = new URLSearchParams({ from, to });
    fetch(`${apiUrl}/affiliate/commissions?${query}`, { headers: { Authorization: `Bearer ${token || ''}` } })
      .then(async response => { if (!response.ok) throw new Error('Earnings load করা যায়নি।'); return response.json(); })
      .then(data => setCommissions(data.commissions || []))
      .catch(loadError => { setError(loadError.message); setCommissions([]); })
      .finally(() => setLoading(false));
  }, [from, to]);

  const credited = commissions.filter(item => item.status === 'credited').reduce((sum, item) => sum + Number(item.amount || 0), 0);
  const reversed = commissions.filter(item => item.status === 'reversed').reduce((sum, item) => sum + Number(item.amount || 0), 0);

  function updateDateRange(nextFrom, nextTo) {
    if (nextFrom && nextTo && nextFrom > nextTo) { setError('From date, To date-এর আগে হতে পারবে না।'); return; }
    setError('');
    setSelectedPreset('');
    setFrom(nextFrom);
    setTo(nextTo);
  }

  function selectPreset(preset) {
    const range = getDateRange(preset);
    setSelectedPreset(preset);
    setFrom(range.from);
    setTo(range.to);
  }

  async function submitPaymentRequest(event) {
    event.preventDefault();
    setRequestMessage('');
    const token = localStorage.getItem('affiliateToken');
    const response = await fetch(`${apiUrl}/affiliate/payment-request`, { method: 'POST', headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token || ''}` }, body: JSON.stringify({ amount: balance, method: requestForm.method }) });
    const data = await response.json();
    if (!response.ok) { setRequestMessage(data.message || 'Payment request পাঠানো যায়নি।'); return; }
    setRequestMessage('Payment request পাঠানো হয়েছে।');
    setRequestForm({ method: paymentMethods[0] || '' });
    setRequestOpen(false);
  }

  return <main className="earnings-page shell">
    <style>{`.earnings-page{padding-bottom:120px}.earnings-heading{margin:20px 0 18px;color:#17231d;font:700 30px Arial,sans-serif}.balance-request{display:flex;align-items:center;justify-content:space-between;gap:16px;margin-bottom:24px;padding:18px;border:1px solid #dfe5dc;border-radius:8px;background:#fff}.balance-label{display:block;color:#6b776f;font:600 12px Arial,sans-serif}.balance-value{display:block;margin-top:7px;color:#17231d;font:700 28px Arial,sans-serif}.request-button{padding:11px 15px;border:0;border-radius:6px;background:#e35d38;color:#fff;font:700 12px Arial,sans-serif;cursor:pointer}.request-form{display:grid;grid-template-columns:1fr auto;gap:10px;align-items:end;margin-bottom:24px;padding:16px;border:1px solid #dfe5dc;border-radius:8px;background:#fff}.request-form label{display:grid;gap:6px;color:#526159;font:700 11px Arial,sans-serif}.request-form select{height:38px;padding:0 9px;border:1px solid #dfe5dc;border-radius:6px;background:#fff;color:#17231d;font:13px Arial,sans-serif}.request-submit{height:38px;padding:0 14px;border:0;border-radius:6px;background:#17231d;color:#fff;font:700 11px Arial,sans-serif;cursor:pointer}.request-submit:disabled{cursor:not-allowed;opacity:.5}.request-message{margin:-12px 0 20px;color:#20815a;font:13px Arial,sans-serif}.earnings-summary{display:grid;grid-template-columns:repeat(3,1fr);gap:14px;margin-bottom:24px}.earning-card{padding:18px;border:1px solid #dfe5dc;border-radius:8px;background:#fff}.earning-card-label{display:block;color:#6b776f;font:600 12px Arial,sans-serif}.earning-card-value{display:block;margin-top:9px;color:#17231d;font:700 25px Arial,sans-serif}.earning-card:first-child .earning-card-value{color:#e35d38}.earning-card:nth-child(2) .earning-card-value{color:#20815a}.earning-card:nth-child(3) .earning-card-value{color:#c24848}.earnings-list{overflow:hidden;border:1px solid #dfe5dc;border-radius:8px;background:#fff}.earnings-list-heading{display:flex;justify-content:space-between;padding:16px;border-bottom:1px solid #e9ede7;color:#17231d;font:700 15px Arial,sans-serif}.earning-row{display:grid;grid-template-columns:1.1fr 1fr 1fr 1fr;gap:12px;align-items:center;padding:15px 16px;border-bottom:1px solid #eef1ed;color:#526159;font:13px Arial,sans-serif}.earning-row:last-child{border-bottom:0}.earning-invoice{color:#17231d;font-weight:700}.earning-amount{color:#20815a;font-weight:700}.earning-status{text-transform:capitalize}.earning-status.reversed{color:#c24848}.earning-status.credited{color:#20815a}.earnings-empty,.earnings-error{padding:24px;color:#6b776f;font:13px Arial,sans-serif}.earnings-error{color:#b33b3b;background:#fff0ef}@media(max-width:650px){.earnings-heading{font-size:25px}.balance-request{padding:14px}.balance-value{font-size:24px}.request-form{grid-template-columns:1fr auto}.earnings-summary{grid-template-columns:repeat(2,1fr);gap:10px}.earning-card{padding:14px}.earning-card:first-child{grid-column:1/-1}.earning-card-value{font-size:22px}.earning-row{grid-template-columns:1fr 1fr;gap:8px}.earning-row span:nth-child(3),.earning-row span:nth-child(4){font-size:12px}}`}</style>
    <style>{`.balance-actions{display:flex;align-items:center;gap:8px}.view-payments{padding:11px 13px;border:1px solid #dfe5dc;border-radius:6px;color:#17231d;font:700 12px Arial,sans-serif}@media(max-width:500px){.balance-request{align-items:flex-start}.balance-actions{flex-direction:column;align-items:stretch}.view-payments,.request-button{white-space:nowrap;text-align:center}}`}</style>
    <style>{`.earning-date-presets{display:grid;grid-template-columns:repeat(6,1fr);gap:8px;margin-bottom:10px}.earning-date-preset{min-height:34px;padding:7px 8px;border:1px solid #dfe5dc;border-radius:6px;background:#fff;color:#526159;font:700 11px Arial,sans-serif;cursor:pointer}.earning-date-preset:hover,.earning-date-preset:focus-visible,.earning-date-preset.active{border-color:#e35d38;background:#e35d38;color:#fff;outline:0}.earning-date-filter{display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-bottom:24px;padding:14px;border:1px solid #dfe5dc;border-radius:8px;background:#fff}.earning-date-filter label{display:grid;gap:6px;color:#526159;font:700 11px Arial,sans-serif}.earning-date-filter input{height:38px;padding:0 9px;border:1px solid #dfe5dc;border-radius:6px;background:#fff;color:#17231d;font:13px Arial,sans-serif}@media(max-width:650px){.earning-date-presets{grid-template-columns:repeat(3,1fr);gap:6px}.earning-date-preset{padding:7px 4px;font-size:10px}}`}</style>
    <h1 className="earnings-heading">My Earnings</h1>
    <section className="balance-request"><div><span className="balance-label">Current Balance</span><strong className="balance-value">৳ {balance.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</strong></div><div className="balance-actions"><a className="view-payments" href="/payments">View Payments</a><button className="request-button" type="button" onClick={() => setRequestOpen(value => !value)}>{requestOpen ? 'Close' : 'Payment Request'}</button></div></section>
    {requestOpen && <form className="request-form" onSubmit={submitPaymentRequest}><label>Payment method<select value={requestForm.method} onChange={event => setRequestForm({ method: event.target.value })} required><option value="">Select payment method</option>{paymentMethods.map(method => <option key={method} value={method}>{method}</option>)}</select></label><button className="request-submit" type="submit" disabled={!paymentMethods.length || balance < 1}>Request ৳ {balance.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</button></form>}
    {requestMessage && <p className="request-message">{requestMessage}</p>}
    <div className="earning-date-presets" aria-label="Earning date filters">{datePresets.map(([value, label]) => <button className={`earning-date-preset ${selectedPreset === value ? 'active' : ''}`} type="button" key={value} onClick={() => selectPreset(value)}>{label}</button>)}</div>
    <div className="earning-date-filter"><label>From date<input type="date" value={from} onChange={event => updateDateRange(event.target.value, to)} /></label><label>To date<input type="date" value={to} onChange={event => updateDateRange(from, event.target.value)} /></label></div>
    <section className="earnings-summary" aria-label="Earnings summary">
      <article className="earning-card"><span className="earning-card-label">Total Earning</span><strong className="earning-card-value">৳ {credited.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</strong></article>
      <article className="earning-card"><span className="earning-card-label">Credited</span><strong className="earning-card-value">৳ {credited.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</strong></article>
      <article className="earning-card"><span className="earning-card-label">Reversed</span><strong className="earning-card-value">৳ {reversed.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</strong></article>
    </section>
    {error && <div className="earnings-error">{error}</div>}
    <section className="earnings-list"><div className="earnings-list-heading"><span>Earning History</span><span>{loading ? 'Loading...' : `${commissions.length} records`}</span></div>{!loading && !commissions.length && <p className="earnings-empty">এখনও কোনো earning record নেই।</p>}{commissions.map(commission => <div className="earning-row" key={commission._id}><span className="earning-invoice">#{commission.order?.invoice || 'Order'}</span><span className="earning-amount">৳ {Number(commission.amount || 0).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span><span>{new Date(commission.creditedAt || commission.createdAt).toLocaleDateString('en-GB')}</span><span className={`earning-status ${commission.status}`}>{commission.status}</span></div>)}</section>
  </main>;
}
