'use client';
import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import UiIcon from '../../components/UiIcon';

const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'https://api.galiver.shop/api/v1';

export default function Signup() {
  const router = useRouter();
  const [form, setForm] = useState({ name: '', email: '', phone: '', otp: '', password: '', confirmPassword: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const update = event => setForm({ ...form, [event.target.name]: event.target.value });

  async function submit(event) {
    event.preventDefault(); setError('');
    if (form.password !== form.confirmPassword) return setError('পাসওয়ার্ড দুটি একই হতে হবে');
    if (form.password.length < 8) return setError('পাসওয়ার্ড কমপক্ষে ৮ অক্ষরের হতে হবে');
    setLoading(true);
    try {
      const response = await fetch(`${apiUrl}/affiliate/signup-otp`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ email: form.email, name: form.name }) });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message || 'OTP request failed');
      sessionStorage.setItem('affiliateSignup', JSON.stringify({ name: form.name, email: form.email, phone: form.phone, password: form.password }));
      router.push(`/signup/verify?email=${encodeURIComponent(form.email)}`);
    } catch (submitError) { setError(submitError.message); } finally { setLoading(false); }
  }

  return <main className="auth-page"><header className="auth-topbar"><Link className="auth-logo" href="/"><span className="auth-logo-mark">G</span><strong>galiver<span>affiliates</span></strong></Link><nav><Link href="/login">লগইন</Link><Link className="auth-nav-cta" href="/signup">সাইন আপ</Link></nav></header><div className="auth-content"><h1>অ্যাকাউন্ট তৈরি করুন</h1><p className="auth-subtitle">প্রোডাক্ট শেয়ার করে অনলাইন আয় শুরু করুন</p><section className="auth-card"><form className="auth-form" onSubmit={submit}><label>পূর্ণ নাম<input name="name" value={form.name} onChange={update} placeholder="আপনার পূর্ণ নাম" required /></label><label>ইমেইল<input name="email" type="email" value={form.email} onChange={update} placeholder="আপনার ইমেইল" required /></label><label>ফোন নাম্বার<div className="phone-field"><span>🇧🇩 +880</span><input name="phone" type="tel" value={form.phone} onChange={update} placeholder="1XXXXXXXXX" inputMode="numeric" required /></div></label><label>পাসওয়ার্ড<div className="password-field"><input name="password" type={showPassword ? 'text' : 'password'} value={form.password} onChange={update} placeholder="কমপক্ষে ৮ অক্ষর" required minLength={8} /><button className="password-toggle" type="button" aria-label={showPassword ? 'Hide password' : 'Show password'} onClick={() => setShowPassword(value => !value)}><UiIcon name={showPassword ? 'eyeOff' : 'eye'} size={18} /></button></div></label><label>পাসওয়ার্ড নিশ্চিত করুন<div className="password-field"><input name="confirmPassword" type={showConfirmPassword ? 'text' : 'password'} value={form.confirmPassword} onChange={update} placeholder="পাসওয়ার্ড আবার লিখুন" required minLength={8} /><button className="password-toggle" type="button" aria-label={showConfirmPassword ? 'Hide password' : 'Show password'} onClick={() => setShowConfirmPassword(value => !value)}><UiIcon name={showConfirmPassword ? 'eyeOff' : 'eye'} size={18} /></button></div></label>{error && <div className="auth-error">{error}</div>}<button className="auth-submit" disabled={loading}>{loading ? 'OTP পাঠানো হচ্ছে...' : 'সাইন আপ'}</button></form></section><p className="auth-switch">আগেই থেকে অ্যাকাউন্ট আছে? <Link href="/login">সাইন ইন করুন</Link></p></div></main>;
}