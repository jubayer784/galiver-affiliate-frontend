'use client';

import { useEffect, useState } from 'react';

const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'https://api.galiver.shop/api/v1';

export default function Payments() {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('affiliateToken');
    fetch(`${apiUrl}/affiliate/payment-requests`, { headers: { Authorization: `Bearer ${token || ''}` } })
      .then(async response => { if (!response.ok) throw new Error('Payment history load করা যায়নি।'); return response.json(); })
      .then(data => setRequests(data.requests || []))
      .catch(loadError => { setError(loadError.message); setRequests([]); })
      .finally(() => setLoading(false));
  }, []);

  return <main className="payments-page shell">
    <style>{`.payments-page{padding-bottom:120px}.payments-heading{margin:20px 0 18px;color:#17231d;font:700 30px Arial,sans-serif}.payments-list{overflow:hidden;border:1px solid #dfe5dc;border-radius:8px;background:#fff}.payments-list-heading{display:flex;justify-content:space-between;padding:16px;border-bottom:1px solid #e9ede7;color:#17231d;font:700 15px Arial,sans-serif}.payment-row{display:grid;grid-template-columns:1fr 1fr 1fr 1fr;gap:12px;align-items:center;padding:16px;border-bottom:1px solid #eef1ed;color:#526159;font:13px Arial,sans-serif}.payment-row:last-child{border-bottom:0}.payment-amount{color:#17231d;font-weight:700}.payment-method{color:#20815a;font-weight:700}.payment-status{text-transform:capitalize}.payment-status.pending{color:#c78319}.payment-status.paid{color:#20815a}.payment-status.rejected{color:#c24848}.payments-empty,.payments-error{padding:24px;color:#6b776f;font:13px Arial,sans-serif}.payments-error{color:#b33b3b;background:#fff0ef}@media(max-width:600px){.payments-heading{font-size:25px}.payment-row{grid-template-columns:1fr 1fr;gap:8px}.payment-row span:nth-child(3),.payment-row span:nth-child(4){font-size:12px}}`}</style>
    <h1 className="payments-heading">Payment History</h1>
    <section className="payments-list"><div className="payments-list-heading"><span>Payment Requests</span><span>{loading ? 'Loading...' : `${requests.length} requests`}</span></div>{error && <p className="payments-error">{error}</p>}{!loading && !error && !requests.length && <p className="payments-empty">এখনও কোনো payment request নেই।</p>}{requests.map(request => <div className="payment-row" key={request._id}><span className="payment-amount">৳ {Number(request.amount || 0).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span><span className="payment-method">{request.method}</span><span>{new Date(request.createdAt).toLocaleDateString('en-GB')}</span><span className={`payment-status ${request.status}`}>{request.status}</span></div>)}</section>
  </main>;
}
