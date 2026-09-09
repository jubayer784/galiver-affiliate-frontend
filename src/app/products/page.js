'use client';

import { useEffect, useState } from 'react';

const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'https://api.galiver.shop/api/v1';
const storeUrl = process.env.NEXT_PUBLIC_STORE_URL || 'https://galiver.shop';
const demoProducts = [
  { _id: 'demo-1', title: 'Premium Cotton T-Shirt', price: 850, imageUrl: 'https://placehold.co/500x500/f7d9c9/17231d?text=T-Shirt' },
  { _id: 'demo-2', title: 'Classic Leather Wallet', price: 650, imageUrl: 'https://placehold.co/500x500/e8dfd2/17231d?text=Wallet' },
  { _id: 'demo-3', title: 'Wireless Bluetooth Earbuds', price: 1250, imageUrl: 'https://placehold.co/500x500/d9e7f2/17231d?text=Earbuds' },
  { _id: 'demo-4', title: 'Everyday Canvas Backpack', price: 1450, imageUrl: 'https://placehold.co/500x500/dce8d8/17231d?text=Backpack' },
  { _id: 'demo-5', title: 'Minimal Desk Lamp', price: 980, imageUrl: 'https://placehold.co/500x500/f1e4b8/17231d?text=Lamp' },
  { _id: 'demo-6', title: 'Smart Fitness Watch', price: 2200, imageUrl: 'https://placehold.co/500x500/ded8ed/17231d?text=Watch' },
  { _id: 'demo-7', title: 'Stainless Steel Water Bottle', price: 550, imageUrl: 'https://placehold.co/500x500/d6ebe7/17231d?text=Bottle' },
  { _id: 'demo-8', title: 'Aroma Soy Candle Set', price: 720, imageUrl: 'https://placehold.co/500x500/f0d9e5/17231d?text=Candle' },
  { _id: 'demo-9', title: 'Portable Phone Stand', price: 350, imageUrl: 'https://placehold.co/500x500/e3e0d5/17231d?text=Stand' },
  { _id: 'demo-10', title: 'Organic Skincare Combo', price: 1650, imageUrl: 'https://placehold.co/500x500/eee0c7/17231d?text=Skincare' },
];

export default function Products() {
  const [products, setProducts] = useState([]);
  const [affiliate, setAffiliate] = useState(null);
  const [copied, setCopied] = useState('');
  const [error, setError] = useState('');
  const [search, setSearch] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('affiliateToken');
    try { setAffiliate(JSON.parse(localStorage.getItem('affiliateProfile') || 'null')); } catch { setAffiliate(null); }
    if (token) fetch(`${apiUrl}/affiliate/me`, { headers: { Authorization: `Bearer ${token}` } })
      .then(response => response.ok ? response.json() : null)
      .then(data => { if (data?.affiliate) { setAffiliate(data.affiliate); localStorage.setItem('affiliateProfile', JSON.stringify(data.affiliate)); } })
      .catch(() => {});
    const query = new URLSearchParams();
    if (search.trim()) query.set('search', search.trim());
    fetch(`${apiUrl}/affiliate/products${query.toString() ? `?${query}` : ''}`, { headers: token ? { Authorization: `Bearer ${token}` } : {} })
      .then(async response => { if (!response.ok) throw new Error('Could not load products'); return response.json(); })
      .then(data => setProducts(data.products?.length ? data.products : data?.length ? data : search.trim() ? [] : demoProducts))
      .catch(() => setProducts(search.trim() ? [] : demoProducts));
  }, [search]);

  const referralCode = affiliate?.code || '';
  const getReferralLink = product => `${storeUrl}/product/${encodeURIComponent(product._id)}?ref=${encodeURIComponent(referralCode)}`;
  const websiteLink = `${storeUrl}/?ref=${encodeURIComponent(referralCode)}`;

  async function copyLink(link, key) {
    if (!referralCode) return;
    try {
      if (navigator.clipboard?.writeText) await navigator.clipboard.writeText(link);
      else {
        const input = document.createElement('textarea');
        input.value = link;
        input.setAttribute('readonly', '');
        input.style.position = 'fixed';
        input.style.opacity = '0';
        document.body.appendChild(input);
        input.select();
        if (!document.execCommand('copy')) throw new Error('Copy failed');
        input.remove();
      }
      setError('');
      setCopied(key);
      setTimeout(() => setCopied(''), 1800);
    } catch { setError('Link copy করা যায়নি।'); }
  }

  return <main className="products-page shell">
    <style>{`.products-page{padding-bottom:120px}.products-heading{margin:20px 0 16px;color:#17231d;font:700 30px Arial,sans-serif}.products-toolbar{display:flex;align-items:center;gap:12px;margin-bottom:18px}.products-search{flex:1;height:44px;padding:0 14px;border:1px solid #dfe5dc;border-radius:7px;background:#fff;color:#17231d;font:14px Arial,sans-serif;outline:0}.products-search:focus{border-color:#e35d38;box-shadow:0 0 0 3px rgba(227,93,56,.12)}.search-icon{font-size:22px}.website-link-box{display:flex;align-items:center;justify-content:space-between;gap:12px;margin-bottom:22px;padding:15px 16px;border:1px solid #dfe5dc;border-radius:8px;background:#fff}.website-link-url{min-width:0;overflow:hidden;color:#64716b;font:12px Arial,sans-serif;text-overflow:ellipsis;white-space:nowrap}.website-link-copy{flex:0 0 auto;padding:10px 13px;border:0;border-radius:6px;background:#e35d38;color:#fff;font:700 12px Arial,sans-serif;cursor:pointer}.products-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:16px}.product-card{overflow:hidden;border:1px solid #dfe5dc;border-radius:8px;background:#fff}.product-image{display:block;width:100%;aspect-ratio:1/1;object-fit:cover;background:#eef1eb}.product-card-content{padding:15px}.product-title{display:block;overflow:hidden;color:#17231d;font:700 16px Arial,sans-serif;text-overflow:ellipsis;white-space:nowrap}.product-price{margin:8px 0 4px;color:#e35d38;font:700 18px Arial,sans-serif}.product-commission{display:block;margin-bottom:14px;color:#20815a;font:700 13px Arial,sans-serif}.product-link{width:100%;padding:11px;border:0;border-radius:6px;background:#17231d;color:#fff;font:700 12px Arial,sans-serif;cursor:pointer}.products-error{padding:14px;border-radius:6px;background:#fff0ef;color:#b33b3b;font:13px Arial,sans-serif}@media(max-width:850px){.products-grid{grid-template-columns:repeat(2,1fr)}}@media(max-width:600px){.products-heading{font-size:25px}.products-toolbar{gap:7px}.website-link-box{display:block}.website-link-copy{width:100%;margin-top:10px}.products-grid{grid-template-columns:1fr;gap:12px}.product-card{display:grid;grid-template-columns:110px 1fr}.product-image{height:100%;aspect-ratio:auto}.product-card-content{display:flex;flex-direction:column;justify-content:center}.product-price{margin:7px 0 4px}}`}</style>
    <style>{`.products-grid{grid-template-columns:repeat(4,1fr);gap:12px}.product-card-content{padding:10px}.product-title{font-size:13px}.product-price{margin:5px 0 3px;font-size:15px}.product-commission{margin-bottom:9px;font-size:11px}.product-link{padding:8px 6px;font-size:10px}@media(max-width:1000px){.products-grid{grid-template-columns:repeat(3,1fr)}}@media(max-width:850px){.products-grid{grid-template-columns:repeat(2,1fr);gap:10px}}@media(max-width:600px){.products-grid{gap:8px}.product-card-content{padding:8px}.product-title{font-size:12px}.product-price{font-size:14px}.product-commission{font-size:10px}.product-link{padding:7px 4px;font-size:10px}}`}</style>
    <h1 className="products-heading">All Products</h1>
    <div className="products-toolbar"><span className="material-symbols search-icon">search</span><input className="products-search" value={search} onChange={event => setSearch(event.target.value)} placeholder="Search products" aria-label="Search products" /></div>
    <div className="website-link-box"><span className="website-link-url">{websiteLink}</span><button className="website-link-copy" type="button" onClick={() => copyLink(websiteLink, 'website')}>{copied === 'website' ? 'Link Copied' : 'Copy Website Link'}</button></div>
    {error && <div className="products-error">{error}</div>}
    {!error && !products.length && <p className="muted">No products found.</p>}
    <section className="products-grid">{products.map(product => { const price = Number(product.price || 0) - Number(product.discount || 0); const commission = price * 0.1; const link = getReferralLink(product); return <article className="product-card" key={product._id}><img className="product-image" src={product.imageUrl || product.mediaUrl || `${apiUrl}/media?name=${encodeURIComponent(product.media?.[0]?.name || '')}`} alt={product.title} /><div className="product-card-content"><strong className="product-title">{product.title}</strong><span className="product-price">৳ {price.toLocaleString('en-US')}</span><span className="product-commission">Your commission: ৳ {commission.toFixed(2)}</span><button className="product-link" type="button" onClick={() => copyLink(link, product._id)}>{copied === product._id ? 'Link Copied' : 'Copy Unique Link'}</button></div></article>; })}</section>
  </main>;
}
