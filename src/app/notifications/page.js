'use client';

import { useEffect, useState } from 'react';
import UiIcon from '../../components/UiIcon';

const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'https://api.galiver.shop/api/v1';

const META = {
  order_new: { icon: 'bag', tone: 'green', label: 'নতুন অর্ডার' },
  order_delivered: { icon: 'check', tone: 'green', label: 'ডেলিভার্ড' },
  order_canceled: { icon: 'close', tone: 'red', label: 'বাতিল' },
  order_returned: { icon: 'return', tone: 'purple', label: 'রিটার্ন' },
  payment_paid: { icon: 'wallet', tone: 'orange', label: 'পেমেন্ট' },
};

function timeAgo(value) {
  const diff = Date.now() - new Date(value).getTime();
  const min = Math.round(diff / 60000);
  if (min < 1) return 'এইমাত্র';
  if (min < 60) return `${min} মিনিট আগে`;
  const hr = Math.round(min / 60);
  if (hr < 24) return `${hr} ঘণ্টা আগে`;
  const day = Math.round(hr / 24);
  if (day < 30) return `${day} দিন আগে`;
  return new Date(value).toLocaleDateString('en-GB');
}

export default function Notifications() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('affiliateToken') || '';
    setLoading(true);
    setError('');
    fetch(`${apiUrl}/affiliate/notifications`, { headers: { Authorization: `Bearer ${token}` } })
      .then(async response => { if (!response.ok) throw new Error('নোটিফিকেশন লোড করা যায়নি।'); return response.json(); })
      .then(data => {
        setItems(data.notifications || []);
        if ((data.unread || 0) > 0) {
          fetch(`${apiUrl}/affiliate/notifications/read`, { method: 'POST', headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' }, body: '{}' })
            .then(() => window.dispatchEvent(new Event('affiliate-notifications-read')))
            .catch(() => {});
        }
      })
      .catch(loadError => { setError(loadError.message); setItems([]); })
      .finally(() => setLoading(false));
  }, []);

  return <main className="notif-page shell">
    <style>{`.notif-page{max-width:760px;padding-bottom:120px}.notif-heading{margin:20px 0 6px;color:#17231d;font:700 30px Arial,sans-serif}.notif-sub{margin:0 0 20px;color:#6b776f;font:14px Arial,sans-serif}.notif-list{display:grid;gap:10px}.notif-item{display:grid;grid-template-columns:44px 1fr;gap:13px;align-items:start;padding:15px;border:1px solid #dfe5dc;border-radius:12px;background:#fff;box-shadow:0 4px 14px rgba(23,35,29,.04)}.notif-item.is-unread{border-color:#f3c9bd;background:#fff8f5}.notif-badge{display:grid;place-items:center;width:44px;height:44px;border-radius:12px}.notif-badge.green{background:#d8f7e7;color:#006c49}.notif-badge.red{background:#fde2df;color:#c24848}.notif-badge.purple{background:#ece4f4;color:#7a4fa0}.notif-badge.orange{background:#ffe1d3;color:#c1521f}.notif-body-title{margin:0;color:#17231d;font:700 15px Arial,sans-serif}.notif-body-text{margin:4px 0 0;color:#556059;font:13px/1.55 Arial,sans-serif}.notif-time{display:block;margin-top:7px;color:#94a09a;font:600 11px Arial,sans-serif}.notif-empty,.notif-error{padding:40px 20px;text-align:center;color:#6b776f;font:14px Arial,sans-serif}.notif-error{color:#b33b3b;background:#fff0ef;border-radius:12px}.notif-skeleton{height:76px;border-radius:12px;background:linear-gradient(90deg,#f1f4f0,#e7ece6,#f1f4f0);background-size:200% 100%;animation:notif-pulse 1.3s ease-in-out infinite}@keyframes notif-pulse{0%{background-position:200% 0}100%{background-position:-200% 0}}@media(max-width:600px){.notif-heading{font-size:25px}.notif-item{grid-template-columns:40px 1fr;gap:11px;padding:13px}.notif-badge{width:40px;height:40px}}`}</style>
    <h1 className="notif-heading">নোটিফিকেশন</h1>
    <p className="notif-sub">অর্ডার ও পেমেন্টের সর্বশেষ আপডেট</p>

    {loading && <div className="notif-list">{[0, 1, 2, 3].map(key => <div className="notif-skeleton" key={key} />)}</div>}
    {!loading && error && <div className="notif-error">{error}</div>}
    {!loading && !error && !items.length && <div className="notif-empty">এখনো কোনো নোটিফিকেশন নেই।</div>}

    {!loading && !error && !!items.length && <div className="notif-list">
      {items.map(item => {
        const meta = META[item.type] || META.order_new;
        return <article className={`notif-item ${item.read ? '' : 'is-unread'}`} key={item._id}>
          <span className={`notif-badge ${meta.tone}`}><UiIcon name={meta.icon} size={20} /></span>
          <div>
            <p className="notif-body-title">{item.title}</p>
            {item.body && <p className="notif-body-text">{item.body}</p>}
            <span className="notif-time">{timeAgo(item.createdAt)}</span>
          </div>
        </article>;
      })}
    </div>}
  </main>;
}
