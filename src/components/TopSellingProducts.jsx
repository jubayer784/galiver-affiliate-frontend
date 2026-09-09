'use client';

import { useEffect, useState } from 'react';

const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'https://api.galiver.shop/api/v1';

export default function TopSellingProducts() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem('affiliateToken');
    if (!token) return;
    fetch(`${apiUrl}/affiliate/top-products`, { headers: { Authorization: `Bearer ${token}` } })
      .then(response => response.ok ? response.json() : null)
      .then(data => { setProducts(data?.products || []); })
      .catch(() => setProducts([]));
  }, []);

  return (
    <section className="top-selling-section" aria-label="Top selling products">
      <style>{`.top-selling-section{min-width:0;margin-top:26px}.top-selling-title{max-width:100%;margin:0 0 14px;color:#17231d;font:700 clamp(18px,5vw,24px)/1.2 Arial,sans-serif;overflow-wrap:anywhere;white-space:normal}.top-selling-list{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:10px}.top-selling-item{display:flex;align-items:center;min-width:0;gap:12px;min-height:76px;padding:10px 12px;border:1px solid #dfe5dc;border-radius:8px;background:#fff}.top-selling-rank{width:25px;flex:0 0 25px;color:#e35d38;font:700 15px Arial,sans-serif;text-align:center}.top-selling-image{width:54px;height:54px;flex:0 0 54px;border-radius:6px;object-fit:cover;background:#eef1eb}.top-selling-info{min-width:0}.top-selling-name{display:block;overflow:hidden;color:#17231d;font:700 13px Arial,sans-serif;text-overflow:ellipsis;white-space:nowrap}@media(max-width:600px){.top-selling-list{grid-template-columns:minmax(0,1fr)}.top-selling-item{min-height:70px}}`}</style>
      <h2 className="top-selling-title">Top Selling Products</h2>
      {products.length ? <div className="top-selling-list">{products.map((product, index) => <article className="top-selling-item" key={product._id}><span className="top-selling-rank">#{index + 1}</span><img className="top-selling-image" src={product.imageUrl || product.mediaUrl || `${apiUrl}/media?name=${encodeURIComponent(product.media?.[0]?.name || '')}`} alt={product.title} /><span className="top-selling-info"><strong className="top-selling-name">{product.title}</strong></span></article>)}</div> : <p className="muted">No sales data available yet.</p>}
    </section>
  );
}
