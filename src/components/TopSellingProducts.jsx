'use client';

import { useEffect, useState } from 'react';

const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'https://api.galiver.shop/api/v1';
const demoProducts = [
  { _id: 'demo-1', title: 'Premium Cotton T-Shirt', imageUrl: 'https://placehold.co/120x120/f7d9c9/17231d?text=T-Shirt' },
  { _id: 'demo-2', title: 'Classic Leather Wallet', imageUrl: 'https://placehold.co/120x120/e8dfd2/17231d?text=Wallet' },
  { _id: 'demo-3', title: 'Wireless Bluetooth Earbuds', imageUrl: 'https://placehold.co/120x120/d9e7f2/17231d?text=Earbuds' },
  { _id: 'demo-4', title: 'Everyday Canvas Backpack', imageUrl: 'https://placehold.co/120x120/dce8d8/17231d?text=Bag' },
  { _id: 'demo-5', title: 'Minimal Desk Lamp', imageUrl: 'https://placehold.co/120x120/f1e4b8/17231d?text=Lamp' },
  { _id: 'demo-6', title: 'Smart Fitness Watch', imageUrl: 'https://placehold.co/120x120/ded8ed/17231d?text=Watch' },
];

export default function TopSellingProducts() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem('affiliateToken');
    if (!token) { setProducts(demoProducts); return; }
    fetch(`${apiUrl}/affiliate/top-products`, { headers: { Authorization: `Bearer ${token}` } })
      .then(response => response.ok ? response.json() : null)
      .then(data => { setProducts(data?.products?.length ? data.products : demoProducts); })
      .catch(() => setProducts(demoProducts));
  }, []);

  return (
    <section className="top-selling-section" aria-label="Top selling products">
      <style>{`.top-selling-section{margin-top:26px}.top-selling-title{margin:0 0 14px;color:#17231d;font:700 24px Arial,sans-serif}.top-selling-list{display:grid;grid-template-columns:repeat(2,1fr);gap:10px}.top-selling-item{display:flex;align-items:center;gap:12px;min-height:76px;padding:10px 12px;border:1px solid #dfe5dc;border-radius:8px;background:#fff}.top-selling-rank{width:25px;color:#e35d38;font:700 15px Arial,sans-serif;text-align:center}.top-selling-image{width:54px;height:54px;border-radius:6px;object-fit:cover;background:#eef1eb}.top-selling-info{min-width:0}.top-selling-name{display:block;overflow:hidden;color:#17231d;font:700 13px Arial,sans-serif;text-overflow:ellipsis;white-space:nowrap}@media(max-width:600px){.top-selling-title{font-size:20px}.top-selling-list{grid-template-columns:1fr}.top-selling-item{min-height:70px}}`}</style>
      <h2 className="top-selling-title">Top Selling Products</h2>
      {products.length ? <div className="top-selling-list">{products.map((product, index) => <article className="top-selling-item" key={product._id}><span className="top-selling-rank">#{index + 1}</span><img className="top-selling-image" src={product.imageUrl || product.mediaUrl || `${apiUrl}/media?name=${encodeURIComponent(product.media?.[0]?.name || '')}`} alt={product.title} /><span className="top-selling-info"><strong className="top-selling-name">{product.title}</strong></span></article>)}</div> : <p className="muted">No sales data available yet.</p>}
    </section>
  );
}
