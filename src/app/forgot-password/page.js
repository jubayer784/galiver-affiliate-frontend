'use client';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import UiIcon from '../../components/UiIcon';
import SiteHeader from '@/components/SiteHeader';

const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'https://api.galiver.shop/api/v1';

export default function ForgotPassword() {
  const router = useRouter();
  const [step, setStep] = useState('email');
  const [form, setForm] = useState({ email: '', otp: '', password: '', confirmPassword: '' });
  const [error, setError] = useState('');
  const [notice, setNotice] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [secondsLeft, setSecondsLeft] = useState(0);

  const update = event => setForm({ ...form, [event.target.name]: event.target.value });

  useEffect(() => {
    if (secondsLeft <= 0) return undefined;
    const timer = setInterval(() => setSecondsLeft(value => value - 1), 1000);
    return () => clearInterval(timer);
  }, [secondsLeft]);

  async function requestOtp(event) {
    event.preventDefault();
    setError(''); setNotice('');
    if (!form.email.trim()) return setError('আপনার ইমেইল দিন');
    setLoading(true);
    try {
      const response = await fetch(`${apiUrl}/affiliate/forgot-password-otp`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ email: form.email.trim() }) });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message || 'OTP পাঠানো যায়নি');
      setStep('reset');
      setSecondsLeft(data.expiresIn || 300);
      setNotice('আপনার ইমেইলে ৬ সংখ্যার OTP পাঠানো হয়েছে');
    } catch (requestError) { setError(requestError.message); } finally { setLoading(false); }
  }

  async function resetPassword(event) {
    event.preventDefault();
    setError(''); setNotice('');
    if (!form.otp.trim()) return setError('ইমেইলে পাঠানো OTP দিন');
    if (form.password.length < 8) return setError('পাসওয়ার্ড কমপক্ষে ৮ অক্ষরের হতে হবে');
    if (form.password !== form.confirmPassword) return setError('পাসওয়ার্ড দুটি একই হতে হবে');
    setLoading(true);
    try {
      const response = await fetch(`${apiUrl}/affiliate/reset-password`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ email: form.email.trim(), otp: form.otp.trim(), password: form.password }) });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message || 'পাসওয়ার্ড রিসেট করা যায়নি');
      localStorage.setItem('affiliateToken', data.token);
      localStorage.setItem('affiliateProfile', JSON.stringify(data.affiliate));
      router.push('/dashboard');
    } catch (resetError) { setError(resetError.message); } finally { setLoading(false); }
  }

  return <main className="auth-page">
    <SiteHeader />
    <div className="auth-content">
      <h1>পাসওয়ার্ড রিসেট</h1>
      <p className="auth-subtitle">{step === 'email' ? 'আপনার রেজিস্টার্ড ইমেইল দিন, OTP পাঠানো হবে' : 'OTP ও নতুন পাসওয়ার্ড দিন'}</p>
      <section className="auth-card">
        {step === 'email'
          ? <form className="auth-form" onSubmit={requestOtp}>
              <label>ইমেইল<input name="email" type="email" value={form.email} onChange={update} placeholder="আপনার ইমেইল" required /></label>
              {error && <div className="auth-error">{error}</div>}
              <button className="auth-submit" disabled={loading}>{loading ? 'OTP পাঠানো হচ্ছে...' : 'OTP পাঠান'}</button>
            </form>
          : <form className="auth-form" onSubmit={resetPassword}>
              <label>ইমেইল<input value={form.email} readOnly /></label>
              <label>OTP code<input name="otp" value={form.otp} onChange={event => setForm({ ...form, otp: event.target.value.replace(/\D/g, '').slice(0, 6) })} placeholder="123456" inputMode="numeric" maxLength={6} required /></label>
              <label>নতুন পাসওয়ার্ড<div className="password-field"><input name="password" type={showPassword ? 'text' : 'password'} value={form.password} onChange={update} placeholder="কমপক্ষে ৮ অক্ষর" required minLength={8} /><button className="password-toggle" type="button" aria-label={showPassword ? 'Hide password' : 'Show password'} onClick={() => setShowPassword(value => !value)}><UiIcon name={showPassword ? 'eyeOff' : 'eye'} size={18} /></button></div></label>
              <label>পাসওয়ার্ড নিশ্চিত করুন<div className="password-field"><input name="confirmPassword" type={showPassword ? 'text' : 'password'} value={form.confirmPassword} onChange={update} placeholder="পাসওয়ার্ড আবার লিখুন" required minLength={8} /></div></label>
              {notice && !error && <div className="auth-notice">{notice}{secondsLeft > 0 ? ` — ${secondsLeft}s` : ''}</div>}
              {error && <div className="auth-error">{error}</div>}
              <button className="auth-submit" disabled={loading}>{loading ? 'রিসেট হচ্ছে...' : 'পাসওয়ার্ড রিসেট করুন'}</button>
              <button className="auth-linkbtn" type="button" disabled={loading || secondsLeft > 0} onClick={requestOtp}>{secondsLeft > 0 ? `আবার OTP পাঠান (${secondsLeft}s)` : 'আবার OTP পাঠান'}</button>
            </form>}
      </section>
      <p className="auth-switch">পাসওয়ার্ড মনে পড়েছে? <Link href="/login">লগইন করুন</Link></p>
    </div>
    <style>{`.auth-notice{padding:9px 12px;border-radius:7px;background:#eef7ee;color:#2f6d3a;font:13px/1.5 Arial,sans-serif}.auth-linkbtn{margin-top:4px;background:none;border:none;color:#e35d38;font:600 13px Arial,sans-serif;cursor:pointer}.auth-linkbtn:disabled{color:#9aa39d;cursor:default}`}</style>
  </main>;
}
