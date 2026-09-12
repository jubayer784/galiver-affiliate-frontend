'use client';
import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import SiteHeader from '@/components/SiteHeader';

const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'https://api.galiver.shop/api/v1';

export default function Login(){
  const router = useRouter(); const [form,setForm]=useState({identifier:'',password:''}); const [error,setError]=useState(''); const [loading,setLoading]=useState(false);
  async function submit(event){event.preventDefault();setLoading(true);setError('');try{const response=await fetch(`${apiUrl}/affiliate/login`,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(form)});const data=await response.json();if(data.status==='pending'){router.push('/pending');return}if(data.status==='suspended'){router.push('/suspended');return}if(!response.ok)throw new Error(data.message||'Login failed');localStorage.setItem('affiliateToken',data.token);localStorage.setItem('affiliateProfile',JSON.stringify(data.affiliate));router.push('/dashboard')}catch(error){setError(error.message)}finally{setLoading(false)}}
  return <main className="auth-page"><SiteHeader /><div className="auth-content"><h1>লগইন করুন</h1><p className="auth-subtitle">আপনার affiliate account-এ প্রবেশ করুন</p><section className="auth-card"><form className="auth-form" onSubmit={submit}><label>ফোন নাম্বার বা ইমেইল<input placeholder="ফোন বা ইমেইল" value={form.identifier} onChange={e=>setForm({...form,identifier:e.target.value})} required /></label><label>পাসওয়ার্ড<input type="password" placeholder="আপনার পাসওয়ার্ড" value={form.password} onChange={e=>setForm({...form,password:e.target.value})} required minLength={8} /></label><div className="auth-forgot"><Link href="/forgot-password">পাসওয়ার্ড ভুলে গেছেন?</Link></div>{error&&<div className="auth-error">{error}</div>}<button className="auth-submit" disabled={loading}>{loading?'অপেক্ষা করুন...':'লগইন করুন'}</button></form></section><p className="auth-switch">অ্যাকাউন্ট নেই? <Link href="/signup">সাইন আপ করুন</Link></p></div><style>{`.auth-forgot{margin-top:-4px;text-align:right}.auth-forgot a{color:#e35d38;font:600 13px Arial,sans-serif}`}</style></main>
}
