'use client';

import Link from 'next/link';
import SiteHeader from '@/components/SiteHeader';

export default function PendingApproval() {
  return <main className="auth-page">
    <SiteHeader />
    <div className="auth-content">
      <div className="pending-box">
        <span className="pending-icon" aria-hidden="true">✓</span>
        <h1>সাইনআপ সম্পন্ন হয়েছে!</h1>
        <p>আপনার Galiver অ্যাফিলিয়েট রেজিস্ট্রেশন সফল হয়েছে। এখন আপনার অ্যাকাউন্ট <strong>অ্যাডমিন অনুমোদনের অপেক্ষায়</strong> আছে।</p>
        <p className="pending-sub">অনুমোদন হয়ে গেলে আপনার ইমেইলে জানানো হবে — তারপর লগইন করে প্রোডাক্ট প্রোমোট শুরু করতে পারবেন।</p>
        <Link className="button button-primary button-wide" href="/login">লগইন পেজে যান</Link>
      </div>
    </div>
    <style>{`.pending-box{width:min(100%,420px);margin:12px auto 0;padding:30px 26px;border:1px solid #e5e0e9;border-radius:16px;background:#fff;box-shadow:0 2px 6px rgba(34,21,45,.08);text-align:center}.pending-icon{display:grid;place-items:center;width:52px;height:52px;margin:0 auto 16px;border-radius:50%;background:#d8f7e7;color:#006c49;font:700 24px Arial,sans-serif}.pending-box h1{margin:0 0 12px;font:700 21px 'Space Grotesk','Plus Jakarta Sans',sans-serif;color:#17231d}.pending-box p{margin:0 0 12px;color:#4a544e;font:14px/1.7 Arial,sans-serif}.pending-sub{color:#7a857e!important;font-size:13px!important}.pending-box .button-primary{margin-top:10px;padding:14px 20px;border-radius:10px;background:linear-gradient(145deg,#ff8a3d,#ff6b00);color:#fff;font-weight:700;box-shadow:0 10px 22px rgba(255,107,0,.28)}`}</style>
  </main>;
}
