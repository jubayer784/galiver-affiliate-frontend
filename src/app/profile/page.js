'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'https://api.galiver.shop/api/v1';

export default function ProfilePage() {
  const router = useRouter();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [newMethod, setNewMethod] = useState('');
  const [paymentProvider, setPaymentProvider] = useState('');
  const [methodLoading, setMethodLoading] = useState(false);
  const [showMethodForm, setShowMethodForm] = useState(false);
  const [showPaymentPopup, setShowPaymentPopup] = useState(false);
  const [methodToRemove, setMethodToRemove] = useState('');
  const [otpStep, setOtpStep] = useState(false);
  const [otp, setOtp] = useState('');
  const [pendingMethod, setPendingMethod] = useState('');
  const [otpNotice, setOtpNotice] = useState('');

  function resetMethodForm() {
    setShowMethodForm(false);
    setOtpStep(false);
    setOtp('');
    setPendingMethod('');
    setOtpNotice('');
    setNewMethod('');
    setPaymentProvider('');
  }

  useEffect(() => {
    const token = localStorage.getItem('affiliateToken');
    if (!token) {
      router.replace('/login');
      return;
    }

    fetch(`${apiUrl}/affiliate/me`, { headers: { Authorization: `Bearer ${token}` } })
      .then(async response => {
        if (!response.ok) throw new Error('Profile load করা যায়নি');
        return response.json();
      })
      .then(data => {
        if (!data?.affiliate) throw new Error('Profile data পাওয়া যায়নি');
        setProfile(data.affiliate);
        localStorage.setItem('affiliateProfile', JSON.stringify(data.affiliate));
      })
      .catch(loadError => setError(loadError.message))
      .finally(() => setLoading(false));
  }, [router]);

  function logout() {
    localStorage.removeItem('affiliateToken');
    localStorage.removeItem('affiliateProfile');
    router.replace('/login');
  }

  async function sendMethodOtp(event) {
    event.preventDefault();
    const accountNumber = newMethod.trim();
    if (!paymentProvider || !accountNumber) return;
    const method = `${paymentProvider} - ${accountNumber}`;
    setMethodLoading(true);
    setError('');
    setOtpNotice('');
    try {
      const token = localStorage.getItem('affiliateToken');
      const response = await fetch(`${apiUrl}/affiliate/payment-methods/otp`, { method: 'POST', headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token || ''}` }, body: JSON.stringify({ method }) });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message || 'OTP পাঠানো যায়নি');
      setPendingMethod(method);
      setOtpStep(true);
      setOtp('');
      setOtpNotice(`${profile?.email || 'আপনার ইমেইলে'}-এ ৬ সংখ্যার OTP পাঠানো হয়েছে`);
    } catch (methodError) { setError(methodError.message); } finally { setMethodLoading(false); }
  }

  async function confirmPaymentMethod(event) {
    event.preventDefault();
    if (!otp.trim()) return;
    setMethodLoading(true);
    setError('');
    try {
      const token = localStorage.getItem('affiliateToken');
      const response = await fetch(`${apiUrl}/affiliate/payment-methods`, { method: 'POST', headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token || ''}` }, body: JSON.stringify({ method: pendingMethod, otp: otp.trim() }) });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message || 'Payment method যোগ করা যায়নি');
      const updatedProfile = { ...profile, paymentMethods: data.paymentMethods || [] };
      setProfile(updatedProfile);
      localStorage.setItem('affiliateProfile', JSON.stringify(updatedProfile));
      resetMethodForm();
    } catch (methodError) { setError(methodError.message); } finally { setMethodLoading(false); }
  }

  async function removePaymentMethod() {
    if (!methodToRemove) return;
    setMethodLoading(true);
    setError('');
    try {
      const token = localStorage.getItem('affiliateToken');
      const response = await fetch(`${apiUrl}/affiliate/payment-methods/${encodeURIComponent(methodToRemove)}`, { method: 'DELETE', headers: { Authorization: `Bearer ${token || ''}` } });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message || 'Payment method মুছে ফেলা যায়নি');
      const updatedProfile = { ...profile, paymentMethods: data.paymentMethods || [] };
      setProfile(updatedProfile);
      localStorage.setItem('affiliateProfile', JSON.stringify(updatedProfile));
      setMethodToRemove('');
    } catch (methodError) { setError(methodError.message); } finally { setMethodLoading(false); }
  }

  const name = profile?.name || 'Affiliate';
  const initials = name.trim().split(/\s+/).slice(0, 2).map(part => part[0]).join('').toUpperCase();

  return <main className="profile-page shell">
    <style>{`.profile-page{max-width:720px;padding-bottom:120px}.profile-heading{margin:8px 0 18px;color:#17231d;font:700 28px Arial,sans-serif}.profile-hero{display:flex;align-items:center;gap:16px;margin-bottom:14px;padding:20px;border-radius:10px;background:#17231d;color:#fff}.profile-avatar{display:grid;place-items:center;width:64px;height:64px;border-radius:50%;background:#e35d38;color:#fff;font:700 22px Arial,sans-serif}.profile-name{margin:0;font:700 20px Arial,sans-serif}.profile-email{margin:5px 0 0;color:#d6e0d9;font:13px Arial,sans-serif}.profile-card{margin-top:12px;padding:18px;border:1px solid #dfe5dc;border-radius:8px;background:#fff}.profile-card-title{margin:0 0 14px;color:#17231d;font:700 16px Arial,sans-serif}.profile-fields{display:grid;grid-template-columns:1fr 1fr;gap:12px}.profile-field{padding:12px;border-radius:6px;background:#f5f7f3}.profile-label{display:block;margin-bottom:5px;color:#64716b;font:11px Arial,sans-serif}.profile-value{display:block;overflow:hidden;color:#17231d;font:700 14px Arial,sans-serif;text-overflow:ellipsis;white-space:nowrap}.profile-code{color:#e35d38}.profile-actions{display:flex;gap:10px;margin-top:16px}.profile-action{display:inline-flex;align-items:center;justify-content:center;min-height:40px;padding:0 15px;border:0;border-radius:6px;background:#17231d;color:#fff;font:700 12px Arial,sans-serif;cursor:pointer}.profile-action.secondary{background:#edf2ed;color:#17231d}.profile-error{padding:12px;border-radius:6px;background:#fff0ef;color:#b33b3b;font:13px Arial,sans-serif}.profile-loading{color:#64716b;font:14px Arial,sans-serif}@media(max-width:600px){.profile-heading{font-size:24px}.profile-hero{padding:16px}.profile-avatar{width:54px;height:54px;font-size:18px}.profile-name{font-size:18px}.profile-fields{grid-template-columns:1fr}.profile-actions{display:grid}.profile-action{width:100%}}`}</style>
    <style>{`.profile-card-title-row{display:flex;align-items:center;justify-content:space-between;gap:12px;margin-bottom:14px}.profile-field-label-row{display:flex;align-items:center;justify-content:space-between;gap:8px}.profile-field-label-row .profile-label{margin-bottom:0}.profile-method-controls{display:flex;align-items:center}.profile-add-method,.profile-view-methods,.profile-remove-method{border:0;border-radius:5px;cursor:pointer;font:700 11px Arial,sans-serif}.profile-add-method{padding:5px 8px;background:#e35d38;color:#fff}.profile-view-methods{display:grid;place-items:center;width:36px;height:32px;padding:0;background:#e8eee8;color:#17231d;font-size:24px;line-height:1}.profile-methods{display:flex;flex-wrap:wrap;gap:6px;margin-top:8px}.profile-method{display:inline-flex;align-items:center;gap:7px;padding:5px 7px 5px 8px;border-radius:4px;background:#e8eee8;color:#17231d;font:12px Arial,sans-serif}.profile-remove-method{display:grid;place-items:center;width:17px;height:17px;padding:0;border-radius:50%;background:#d85c4f;color:#fff;font-size:14px;line-height:1}.profile-method-form{display:grid;grid-template-columns:150px 1fr auto;gap:10px;margin-top:18px}.profile-method-select,.profile-method-input{min-width:0;padding:11px;border:1px solid #cfd9cf;border-radius:5px;background:#fff;color:#17231d;font:13px Arial,sans-serif}.profile-modal-backdrop{position:fixed;inset:0;z-index:20;display:grid;place-items:center;padding:18px;background:rgba(23,35,29,.45)}.profile-modal{width:min(100%,560px);padding:28px;border-radius:10px;background:#fff;box-shadow:0 12px 35px rgba(0,0,0,.2)}.profile-modal-header{display:flex;align-items:center;justify-content:space-between;gap:12px}.profile-modal-close{border:0;background:transparent;color:#64716b;font-size:22px;cursor:pointer}.profile-modal-actions{display:flex;justify-content:flex-end;margin-top:20px}.profile-confirm-backdrop{position:fixed;inset:0;z-index:30;display:grid;place-items:center;padding:18px;background:rgba(23,35,29,.3)}.profile-confirm{width:min(100%,390px);padding:24px;border-radius:10px;background:#fff;box-shadow:0 12px 35px rgba(0,0,0,.2)}.profile-confirm-text{margin:0;color:#17231d;font:14px Arial,sans-serif;line-height:1.5}.profile-confirm-actions{display:flex;justify-content:flex-end;gap:8px;margin-top:20px}.profile-confirm-cancel{border:0;border-radius:5px;padding:9px 13px;background:#edf2ed;color:#17231d;font:700 12px Arial,sans-serif;cursor:pointer}.profile-otp-form{display:block;margin-top:18px}.profile-otp-notice{margin:0 0 10px;padding:8px 10px;border-radius:5px;background:#eef7ee;color:#2f6d3a;font:12px/1.5 Arial,sans-serif}.profile-otp-method{margin:0 0 10px;color:#17231d;font:700 13px Arial,sans-serif}.profile-otp-form .profile-method-input{width:100%}.profile-otp-actions{display:flex;gap:8px;justify-content:flex-end;margin-top:12px}@media(max-width:600px){.profile-method-form{grid-template-columns:1fr}.profile-modal{padding:20px}}`}</style>
    <h1 className="profile-heading">আমার প্রোফাইল</h1>
    {loading && <p className="profile-loading">লোড হচ্ছে...</p>}
    {error && <div className="profile-error">{error}</div>}
    {!loading && profile && <>
      <section className="profile-hero"><span className="profile-avatar">{initials}</span><div><h2 className="profile-name">{profile.name}</h2><p className="profile-email">{profile.email}</p></div></section>
      <section className="profile-card"><h2 className="profile-card-title">অ্যাকাউন্ট তথ্য</h2><div className="profile-fields"><div className="profile-field"><span className="profile-label">ফোন নাম্বার</span><strong className="profile-value">{profile.phone || 'দেওয়া হয়নি'}</strong></div><div className="profile-field"><span className="profile-label">Affiliate code</span><strong className="profile-value profile-code">{profile.code || 'দেওয়া হয়নি'}</strong></div><div className="profile-field"><span className="profile-label">Wallet balance</span><strong className="profile-value">৳ {Number(profile.walletBalance || 0).toLocaleString('en-BD', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</strong></div><div className="profile-field"><div className="profile-field-label-row"><span className="profile-label">Payment methods</span><div className="profile-method-controls"><button className="profile-view-methods" type="button" aria-label="View payment methods" title="View payment methods" onClick={() => { setShowPaymentPopup(true); resetMethodForm(); }}>›</button></div></div><strong className="profile-value">{profile.paymentMethods?.length || 0} টি</strong></div></div><div className="profile-actions"><Link className="profile-action secondary" href="/earnings">Earnings দেখুন</Link><button className="profile-action" type="button" onClick={logout}>লগআউট</button></div></section>
      {showPaymentPopup && <div className="profile-modal-backdrop" role="presentation" onClick={event => { if (event.target === event.currentTarget) { setShowPaymentPopup(false); resetMethodForm(); } }}><section className="profile-modal" role="dialog" aria-modal="true" aria-labelledby="payment-method-title"><div className="profile-modal-header"><h2 id="payment-method-title" className="profile-card-title">Payment methods</h2><button className="profile-modal-close" type="button" aria-label="Close" onClick={() => { setShowPaymentPopup(false); resetMethodForm(); }}>×</button></div><div className="profile-methods">{profile.paymentMethods?.length ? profile.paymentMethods.map(method => <span className="profile-method" key={method}>{method}<button className="profile-remove-method" type="button" aria-label={`Remove ${method}`} title="Remove" onClick={() => setMethodToRemove(method)}>×</button></span>) : <span className="profile-label">এখনও কোনো method যোগ করা হয়নি</span>}</div>{showMethodForm && !otpStep && <form className="profile-method-form" onSubmit={sendMethodOtp}><select className="profile-method-select" value={paymentProvider} onChange={event => setPaymentProvider(event.target.value)} aria-label="Payment provider" required><option value="">Payment method select করুন</option><option value="bKash">bKash</option><option value="Nagad">Nagad</option></select>{paymentProvider && <><input className="profile-method-input" value={newMethod} onChange={event => setNewMethod(event.target.value)} placeholder="Account number দিন" aria-label="Payment account number" inputMode="numeric" required /><button className="profile-action" type="submit" disabled={methodLoading}>{methodLoading ? 'OTP পাঠানো হচ্ছে...' : 'Send OTP'}</button></>}</form>}{showMethodForm && otpStep && <form className="profile-method-form profile-otp-form" onSubmit={confirmPaymentMethod}>{otpNotice && <p className="profile-otp-notice">{otpNotice}</p>}<p className="profile-otp-method">{pendingMethod}</p><input className="profile-method-input" value={otp} onChange={event => setOtp(event.target.value.replace(/\D/g, '').slice(0, 6))} placeholder="৬ সংখ্যার OTP" aria-label="OTP code" inputMode="numeric" maxLength={6} required /><div className="profile-otp-actions"><button className="profile-confirm-cancel" type="button" onClick={() => { setOtpStep(false); setOtp(''); setOtpNotice(''); }}>← Back</button><button className="profile-action" type="submit" disabled={methodLoading}>{methodLoading ? 'যোগ হচ্ছে...' : 'Verify & Save'}</button></div></form>}{!showMethodForm && <div className="profile-modal-actions"><button className="profile-add-method" type="button" onClick={() => setShowMethodForm(true)}>+ Add method</button></div>}</section></div>}
      {methodToRemove && <div className="profile-confirm-backdrop" role="presentation"><section className="profile-confirm" role="dialog" aria-modal="true" aria-labelledby="remove-method-title"><h2 id="remove-method-title" className="profile-card-title">Payment method মুছে ফেলবেন?</h2><p className="profile-confirm-text">{methodToRemove} মুছে ফেললে এটি আর payment request-এ ব্যবহার করা যাবে না।</p><div className="profile-confirm-actions"><button className="profile-confirm-cancel" type="button" onClick={() => setMethodToRemove('')}>Cancel</button><button className="profile-action" type="button" onClick={removePaymentMethod} disabled={methodLoading}>{methodLoading ? 'মুছছে...' : 'Yes, remove'}</button></div></section></div>}
    </>}
  </main>;
}
