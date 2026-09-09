'use client';
import { useEffect, useState } from 'react';

const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'https://api.galiver.shop/api/v1';
const storeUrl = process.env.NEXT_PUBLIC_STORE_URL || 'https://galiver.shop';

export default function ProductList(){
  const [products,setProducts]=useState([]); const [code,setCode]=useState(''); const [copied,setCopied]=useState(''); const [error,setError]=useState('');
  useEffect(()=>{
    const token = localStorage.getItem('affiliateToken');
    const savedProfile = localStorage.getItem('affiliateProfile');
    if (savedProfile) { try { setCode(JSON.parse(savedProfile).code || ''); } catch {} }
    fetch(`${apiUrl}/affiliate/products`, { headers: token ? { Authorization: `Bearer ${token}` } : {} })
      .then(async r=>{if(!r.ok) throw new Error('Could not load products'); return r.json()})
      .then(d=>setProducts(d.products||d)).catch(e=>setError(e.message));
    if (token) fetch(`${apiUrl}/affiliate/me`, { headers: { Authorization: `Bearer ${token}` } }).then(r=>r.ok?r.json():null).then(d=>{if(d?.affiliate?.code)setCode(d.affiliate.code)});
  },[]);
  async function copy(product){
    if(!code.trim()) return setError('Enter your promoter code first.');
    const slug=product.slug || product._id; const link=`${storeUrl}/products/${encodeURIComponent(slug)}?ref=${encodeURIComponent(code.trim())}`;
    try { await navigator.clipboard.writeText(link); setCopied(product._id); setTimeout(()=>setCopied(''),1800); } catch { setError('Clipboard permission was denied. Copy the link from your browser.'); }
  }
  return <div><div className="form" style={{margin:'22px 0'}}><label className="muted" htmlFor="ref">Your promoter code</label><input id="ref" value={code} onChange={e=>setCode(e.target.value)} placeholder="PROMOTER_ID" autoComplete="off" />{error&&<div className="notice">{error}</div>}</div><div className="grid">{products.map(product=>{const price=Number(product.price||0)-Number(product.discount||0);return <article className="panel product" key={product._id}><img src={product.imageUrl || product.mediaUrl || `${apiUrl}/media?name=${encodeURIComponent(product.media?.[0]?.name||'')}`} alt={product.title}/><h3>{product.title}</h3><div className="price">৳ {price.toLocaleString()}</div><div className="commission">Estimated commission: ৳ {(price*.1).toFixed(2)}</div><button className="button" onClick={()=>copy(product)}>{copied===product._id?'Copied':'Copy referral link'}</button></article>})}</div>{!error&&!products.length&&<p className="muted">No active products found.</p>}</div>
}
