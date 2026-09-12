'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'https://api.galiver.shop/api/v1';

// Patches window.fetch once so ANY API call anywhere in the app — every page
// currently calls fetch() directly rather than through a shared helper —
// gets caught the moment the backend reports the affiliate's account as
// suspended (affiliateTokenVerify replies 403 { status: 'suspended' } on
// every protected route once an admin suspends the account, even mid
// session). No need to touch each page individually.
let patched = false;
const listeners = new Set();
const patchFetchOnce = () => {
  if (patched) return;
  patched = true;
  const originalFetch = window.fetch.bind(window);
  window.fetch = async (...args) => {
    const response = await originalFetch(...args);
    const url = typeof args[0] === 'string' ? args[0] : args[0]?.url || '';
    if (response.status === 403 && url.startsWith(apiUrl)) {
      response
        .clone()
        .json()
        .then(data => {
          if (data?.status === 'suspended') listeners.forEach(fn => fn());
        })
        .catch(() => {});
    }
    return response;
  };
};

export default function SuspendedNotice() {
  const router = useRouter();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    patchFetchOnce();
    const show = () => {
      window.localStorage.removeItem('affiliateToken');
      window.localStorage.removeItem('affiliateProfile');
      setVisible(true);
    };
    listeners.add(show);
    return () => listeners.delete(show);
  }, []);

  if (!visible) return null;

  return (
    <div className="suspended-overlay" role="alertdialog" aria-modal="true">
      <style>{`.suspended-overlay{position:fixed;inset:0;z-index:1000;display:flex;align-items:center;justify-content:center;padding:20px;background:rgba(23,35,29,.6)}.suspended-card{max-width:380px;width:100%;padding:28px 24px;border-radius:10px;background:#fff;text-align:center}.suspended-card svg{color:#c24848}.suspended-card h2{margin:14px 0 0;color:#17231d;font:700 19px Arial,sans-serif}.suspended-card p{margin:10px 0 0;color:#64716b;font:14px/1.6 Arial,sans-serif}.suspended-actions{display:grid;gap:10px;margin-top:20px}.suspended-support{padding:12px;border:0;border-radius:7px;background:#e35d38;color:#fff;font:700 14px Arial,sans-serif}.suspended-login{padding:12px;border:1px solid #dfe5dc;border-radius:7px;background:#fff;color:#17231d;font:700 14px Arial,sans-serif}`}</style>
      <div className="suspended-card">
        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" /></svg>
        <h2>আপনার অ্যাকাউন্ট সাসপেন্ড করা হয়েছে</h2>
        <p>বিস্তারিত জানতে আমাদের সাপোর্ট পেজে যোগাযোগ করুন।</p>
        <div className="suspended-actions">
          <a className="suspended-support" href="/support">সাপোর্ট পেজে যান</a>
          <button type="button" className="suspended-login" onClick={() => router.replace('/login')}>লগইন পেজে ফিরে যান</button>
        </div>
      </div>
    </div>
  );
}
