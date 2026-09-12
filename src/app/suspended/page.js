'use client';

import Link from 'next/link';
import SiteHeader from '@/components/SiteHeader';

export default function SuspendedAccount() {
  return <main className="auth-page">
    <SiteHeader />
    <div className="auth-content">
      <div className="pending-box suspended-box">
        <span className="pending-icon suspended-icon" aria-hidden="true">!</span>
        <h1>আপনার অ্যাকাউন্ট সাসপেন্ড করা হয়েছে</h1>
        <p>আপনার Galiver অ্যাফিলিয়েট অ্যাকাউন্টটি সাময়িকভাবে স্থগিত করা হয়েছে।</p>
        <p className="pending-sub">বিস্তারিত জানতে আমাদের সাপোর্ট পেজে যোগাযোগ করুন।</p>
        <Link className="button button-primary button-wide" href="/support">সাপোর্ট পেজে যান</Link>
        <Link className="suspended-back" href="/login">লগইন পেজে ফিরে যান</Link>
      </div>
    </div>
    <style>{`.pending-box{width:min(100%,420px);margin:12px auto 0;padding:30px 26px;border:1px solid #e5e0e9;border-radius:16px;background:#fff;box-shadow:0 2px 6px rgba(34,21,45,.08);text-align:center}.pending-icon{display:grid;place-items:center;width:52px;height:52px;margin:0 auto 16px;border-radius:50%;font:700 24px Arial,sans-serif}.suspended-icon{background:#fde3e1;color:#c24848}.pending-box h1{margin:0 0 12px;font:700 21px 'Space Grotesk','Plus Jakarta Sans',sans-serif;color:#17231d}.pending-box p{margin:0 0 12px;color:#4a544e;font:14px/1.7 Arial,sans-serif}.pending-sub{color:#7a857e!important;font-size:13px!important}.pending-box .button-primary{margin-top:10px;padding:14px 20px;border-radius:10px;background:#e35d38;color:#fff;font-weight:700}.suspended-back{display:block;margin-top:14px;color:#526159;font:600 13px Arial,sans-serif}`}</style>
  </main>;
}
