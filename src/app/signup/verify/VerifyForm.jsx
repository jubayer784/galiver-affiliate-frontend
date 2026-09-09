'use client';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'https://api.galiver.shop/api/v1';

export default function VerifyForm() {
  const router = useRouter();
  const params = useSearchParams();
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [signup, setSignup] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [secondsLeft, setSecondsLeft] = useState(60);

  useEffect(() => {
    setEmail(params.get('email') || '');
    try { setSignup(JSON.parse(sessionStorage.getItem('affiliateSignup') || 'null')); } catch { setSignup(null); }
  }, [params]);

  useEffect(() => {
    if (secondsLeft <= 0) return undefined;
    const timer = setInterval(() => setSecondsLeft(value => value - 1), 1000);
    return () => clearInterval(timer);
  }, [secondsLeft]);

  async function submit(event) {
    event.preventDefault();
    if (!signup) return setError('Signup details পাওয়া যায়নি। আবার signup করুন।');
    if (!otp.trim()) return setError('Email-এ পাঠানো OTP দিন');
    setLoading(true); setError('');
    try {
      const response = await fetch(`${apiUrl}/affiliate/signup`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ ...signup, otp: otp.trim() }) });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message || 'Invalid OTP');
      sessionStorage.removeItem('affiliateSignup');
      localStorage.setItem('affiliateToken', data.token);
      localStorage.setItem('affiliateProfile', JSON.stringify(data.affiliate));
      router.push('/dashboard');
    } catch (submitError) { setError(submitError.message); } finally { setLoading(false); }
  }

  return <main className="auth-page"><header className="auth-topbar"><Link className="auth-logo" href="/"><span className="auth-logo-mark">G</span><strong>galiver<span>affiliates</span></strong></Link><nav><Link href="/login">লগইন</Link><Link className="auth-nav-cta" href="/signup">সাইন আপ</Link></nav></header><div className="auth-content"><h1>OTP দিন</h1><p className="auth-subtitle">অ্যাকাউন্ট তৈরি করতে ৬ সংখ্যার OTP দিন</p><section className="auth-card"><form className="auth-form" onSubmit={submit}><label>ইমেইল<input value={email} readOnly /></label><label>OTP code<input className="otp-input" value={otp} onChange={event => setOtp(event.target.value.replace(/\D/g, '').slice(0, 6))} placeholder="123456" inputMode="numeric" maxLength={6} required /></label><p className="otp-timer">OTP expires in {secondsLeft}s</p><div className="auth-test-otp">Test OTP: <strong>123456</strong></div>{error && <div className="auth-error">{error}</div>}<button className="auth-submit" disabled={loading || secondsLeft <= 0}>{loading ? 'অ্যাকাউন্ট তৈরি হচ্ছে...' : secondsLeft <= 0 ? 'OTP expired' : 'ভেরিফাই ও লগইন'}</button></form></section><p className="auth-switch">Email ভুল হয়েছে? <Link href="/signup">আবার signup করুন</Link></p></div></main>;
}
