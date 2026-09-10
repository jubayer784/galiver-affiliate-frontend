import Link from 'next/link';
import SiteHeader from '@/components/SiteHeader';

const storeUrl = process.env.NEXT_PUBLIC_STORE_URL || 'https://galiver.shop';
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://affiliate.galiver.shop';

export const metadata = {
  title: 'অ্যাফিলিয়েট হিসেবে আয় করুন',
  description: 'Galiver-এর প্রোডাক্ট শেয়ার করে প্রতি সফল অর্ডারে ৩০% পর্যন্ত কমিশন আয় করুন। ফ্রি সাইনআপ, সহজ লিংক শেয়ারিং এবং ডেলিভারির পর পেমেন্ট।',
  alternates: { canonical: '/' },
  openGraph: {
    title: 'অ্যাফিলিয়েট হিসেবে আয় করুন | Galiver Affiliates',
    description: 'Galiver-এর প্রোডাক্ট শেয়ার করে প্রতি সফল অর্ডারে ৩০% পর্যন্ত কমিশন আয় করুন।',
    url: siteUrl,
    images: [{ url: '/hero-banner.png', width: 1024, height: 572, alt: 'Galiver Affiliates — ৩০% পর্যন্ত কমিশন আয় করুন' }],
  },
};

const steps = [
  ['+', 'ফ্রি একাউন্ট খুলুন ও পছন্দের প্রোডাক্ট বাছুন'],
  ['↗', 'ফেসবুক, টিকটক বা ইউটিউবে লিংক শেয়ার করুন'],
  ['৳', 'প্রতিটি সফল অর্ডারে সরাসরি কমিশন পান'],
];

export default function Home() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Organization',
        '@id': `${siteUrl}/#organization`,
        name: 'Galiver Affiliates',
        url: siteUrl,
        logo: `${storeUrl}/logo.png`,
        description: 'Galiver-এর অফিসিয়াল অ্যাফিলিয়েট প্রোগ্রাম — প্রোডাক্ট শেয়ার করে প্রতি সফল অর্ডারে ৩০% পর্যন্ত কমিশন।',
        parentOrganization: { '@type': 'Organization', name: 'Galiver', url: storeUrl },
      },
      {
        '@type': 'WebSite',
        '@id': `${siteUrl}/#website`,
        url: siteUrl,
        name: 'Galiver Affiliates',
        inLanguage: 'bn-BD',
        publisher: { '@id': `${siteUrl}/#organization` },
      },
    ],
  };

  return <main className="affiliate-app">
    <SiteHeader href="/" />
    <style>{`.landing-content{padding-top:24px}.landing-hero{margin-bottom:34px}.hero-banner{width:100%;height:auto;aspect-ratio:16/9;object-fit:cover;border-radius:16px;display:block;margin-bottom:20px;background:#f0eef8}.landing-hero h1{margin:0 0 12px;font-size:clamp(24px,5.4vw,38px);letter-spacing:-.6px}.landing-hero>p{margin:0 auto 22px}
.landing-hero .button-primary{padding:16px 26px;border-radius:12px;background:linear-gradient(145deg,#ff8a3d,#ff6b00);color:#fff;font-weight:700;box-shadow:0 12px 24px rgba(255,107,0,.32)}
.payout-card{overflow:hidden;background:linear-gradient(180deg,#ffffff,#f6f9ff)}
.wallet-preview{position:relative;margin:2px 0 16px;padding:18px 18px 16px;border-radius:16px;background:linear-gradient(135deg,#02493a 0%,#0b7a55 60%,#0d8a5f 100%);color:#fff;box-shadow:0 14px 30px rgba(3,73,54,.26);overflow:hidden}
.wallet-preview:after{content:'';position:absolute;right:-40px;top:-40px;width:150px;height:150px;border-radius:50%;background:rgba(255,255,255,.08)}
.wallet-preview-top{position:relative;display:flex;justify-content:space-between;align-items:center;font:700 10px/1 'Plus Jakarta Sans',sans-serif;letter-spacing:.8px;text-transform:uppercase;opacity:.9}
.wallet-preview-chip{padding:4px 9px;border-radius:999px;background:rgba(255,255,255,.18);letter-spacing:.4px}
.wallet-preview-amount{position:relative;display:block;margin:14px 0 14px;font:700 34px/1 'Space Grotesk',sans-serif;letter-spacing:-1.2px}
.wallet-preview-amount span{font-size:17px;opacity:.65;letter-spacing:0}
.wallet-preview-foot{position:relative;display:flex;justify-content:space-between;align-items:center;font:600 11px 'Plus Jakarta Sans',sans-serif;opacity:.92}
.wallet-preview-arrow{display:grid;place-items:center;width:26px;height:26px;border-radius:50%;background:rgba(255,255,255,.18);font-style:normal;font-size:13px}
.payout-stats{display:grid;grid-template-columns:1fr 1fr;gap:10px}
.payout-stat{display:flex;align-items:center;gap:11px;padding:13px;border-radius:12px;background:#fff;border:1px solid var(--line);box-shadow:0 4px 14px rgba(21,28,39,.04)}
.payout-stat-badge{display:grid;place-items:center;width:36px;height:36px;flex:none;border-radius:11px;font:700 17px 'Space Grotesk',sans-serif}
.payout-stat-badge.is-green{background:var(--green-soft);color:var(--green)}
.payout-stat-badge.is-orange{background:var(--orange-soft);color:var(--orange-dark)}
.payout-stat strong{display:block;font-size:13px;letter-spacing:-.2px}
.payout-stat small{color:var(--muted);font-size:10px}
.guide-card{background:linear-gradient(180deg,#ffffff,#fff6f0)}
.guide-card .steps{display:grid;gap:10px;margin:2px 0 18px}
.guide-card .step{display:grid;grid-template-columns:40px 1fr;align-items:center;gap:12px;padding:13px;border-radius:12px;background:#fff;border:1px solid var(--line);box-shadow:0 4px 14px rgba(21,28,39,.04)}
.guide-card .step-icon{display:none}
.guide-card .step b{display:grid;place-items:center;width:40px;height:40px;border-radius:12px;background:linear-gradient(145deg,#ff8a3d,#ff6b00);color:#fff;font:700 17px 'Space Grotesk',sans-serif;box-shadow:0 7px 16px rgba(255,107,0,.3)}
.guide-card .step p{margin:0;font-size:13px;font-weight:600;line-height:1.5;letter-spacing:-.1px}
.guide-card .button-soft{background:linear-gradient(145deg,#ff8a3d,#ff6b00);color:#fff;font-weight:700;box-shadow:0 8px 18px rgba(255,107,0,.28)}
@media(max-width:600px){.landing-content{padding-top:16px}.hero-banner{border-radius:12px;margin-bottom:16px}.landing-hero h1{font-size:23px}.wallet-preview-amount{font-size:29px}.payout-stats{grid-template-columns:1fr}.guide-card .step{grid-template-columns:36px 1fr;gap:10px;padding:12px}.guide-card .step b{width:36px;height:36px;font-size:15px}}`}</style>

    <main className="landing-content">
      <section className="landing-hero">
        <img className="hero-banner" src="/hero-banner.png" alt="Galiver পণ্য প্রমোট করে প্রতি অর্ডারে ৩০% পর্যন্ত কমিশন আয় করুন" width={1024} height={572} fetchPriority="high" />
        <h1>ঘরে বসেই ইনকাম করুন অনলাইন থেকে!</h1>
        <p>আমাদের প্রিমিয়াম ই-কমার্স পণ্যগুলো প্রমোট করে প্রতিটি সফল অর্ডারে জিতে নিন ৩০% পর্যন্ত আকর্ষণীয় কমিশন। কোনো অ্যাডভান্স ইনভেস্টমেন্ট ছাড়াই আজই শুরু করুন আপনার অনলাইন আর্নিং জার্নি।</p>
        <Link className="button button-primary button-wide" href="/login"><span aria-hidden="true">↗</span> অ্যাফিলিয়েট হিসেবে জয়েন করুন</Link>
      </section>

      <section className="info-card guide-card">
        <div className="card-meta"><span className="tag orange-tag">সহজ গাইড</span><span>১ মিনিট পাঠ</span></div>
        <h2>অনলাইনে আয় শুরু করার সহজ ৩ ধাপ</h2>
        <div className="steps">{steps.map(([icon, text], index) => <div className="step" key={icon}><span className="step-icon" aria-hidden="true">{icon}</span><b>{index + 1}</b><p>{text}</p></div>)}</div>
        <Link className="button button-soft button-wide" href="/login">শুরু করুন <span aria-hidden="true">→</span></Link>
      </section>

      <section className="info-card payout-card">
        <div className="card-meta"><span className="tag green-tag">সহজ পেমেন্ট</span><span>স্বচ্ছ হিসাব</span></div>
        <h2>আপনার কমিশন, আপনার ওয়ালেট</h2>
        <p>প্রতিটি delivered order-এর পর কমিশন সরাসরি আপনার affiliate wallet-এ জমা হয়। dashboard থেকে earnings ও order status দেখুন।</p>
        <div className="wallet-preview">
          <div className="wallet-preview-top"><span>Affiliate Wallet</span><span className="wallet-preview-chip">Withdrawable</span></div>
          <strong className="wallet-preview-amount">৳ ১২,৫০০<span> .০০</span></strong>
          <div className="wallet-preview-foot"><span>ডেলিভারির পর অটো-ক্রেডিট</span><span className="wallet-preview-arrow" aria-hidden="true">↗</span></div>
        </div>
        <div className="payout-stats">
          <div className="payout-stat"><span className="payout-stat-badge is-green" aria-hidden="true">৳</span><div><strong>৩০% পর্যন্ত কমিশন</strong><small>প্রোডাক্ট ভ্যালুর উপর</small></div></div>
          <div className="payout-stat"><span className="payout-stat-badge is-orange" aria-hidden="true">↗</span><div><strong>লাইভ রিপোর্ট</strong><small>real-time performance</small></div></div>
        </div>
      </section>

      <div className="trust-strip"><span><i aria-hidden="true">✓</i> অথেনটিক প্রোডাক্ট</span><span><i aria-hidden="true">☎</i> বাংলা সাপোর্ট</span><span><i aria-hidden="true">🔒</i> নিরাপদ প্ল্যাটফর্ম</span></div>
    </main>
    <footer className="landing-footer"><span>© {new Date().getFullYear()} Galiver Affiliates</span><span><Link href="/faq">FAQ</Link><Link href="/terms">Terms</Link></span></footer>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
  </main>;
}
