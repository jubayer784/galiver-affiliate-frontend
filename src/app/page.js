import Link from 'next/link';

const storeUrl = process.env.NEXT_PUBLIC_STORE_URL || 'https://galiver.shop';
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://affiliate.galiver.shop';

export const metadata = {
  title: 'অ্যাফিলিয়েট হিসেবে আয় করুন',
  description: 'Galiver-এর প্রোডাক্ট শেয়ার করে প্রতি সফল অর্ডারে ১০% কমিশন আয় করুন। ফ্রি সাইনআপ, সহজ লিংক শেয়ারিং এবং ডেলিভারির পর পেমেন্ট।',
  alternates: { canonical: '/' },
  openGraph: {
    title: 'অ্যাফিলিয়েট হিসেবে আয় করুন | Galiver Affiliates',
    description: 'Galiver-এর প্রোডাক্ট শেয়ার করে প্রতি সফল অর্ডারে ১০% কমিশন আয় করুন।',
    url: siteUrl,
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
        description: 'Galiver-এর অফিসিয়াল অ্যাফিলিয়েট প্রোগ্রাম — প্রোডাক্ট শেয়ার করে প্রতি সফল অর্ডারে ১০% কমিশন।',
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
    <header className="topbar">
      <Link className="brand-lockup" href="/">
        <span className="brand-mark">G</span>
        <span><strong>galiver<span>affiliates</span></strong><small>TOP AFFILIATE PROGRAMME</small></span>
      </Link>
      <nav className="top-actions"><Link className="login-link" href="/login">লগইন</Link><Link className="button button-small" href="/login">সাইন আপ</Link></nav>
    </header>

    <main className="landing-content">
      <section className="landing-hero">
        <div className="pill"><span aria-hidden="true">✓</span> বাংলাদেশের বিশ্বস্ত ই-কমার্স অ্যাফিলিয়েট প্রোগ্রাম</div>
        <h1>প্রোডাক্ট প্রোমোট করুন,<br />প্রতি অর্ডারে আয় করুন <em>কমিশন!</em></h1>
        <p>শীর্ষস্থানীয় Galiver প্রোডাক্ট শেয়ার করে স্মার্ট ইনকাম শুরু করুন। আপনার লিংক থেকে অর্ডার হলেই কমিশন যোগ হবে।</p>
        <Link className="button button-primary button-wide" href="/login"><span aria-hidden="true">↗</span> অ্যাফিলিয়েট হিসেবে জয়েন করুন</Link>
        <div className="hero-promises"><span><i>✓</i> ফ্রি সাইনআপ</span><span><i>✓</i> সহজ লিংক</span><span><i>✓</i> ডেলিভারির পর পেমেন্ট</span></div>
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
        <p>প্রতিটি delivered order-এর পর কমিশন আপনার affiliate wallet-এ জমা হবে। dashboard থেকে earnings এবং order status দেখুন।</p>
        <div className="feature-row"><div><span className="green-icon" aria-hidden="true">৳</span><strong>১০% কমিশন</strong><small>প্রোডাক্ট ভ্যালুর উপর</small></div><div><span className="orange-icon" aria-hidden="true">↗</span><strong>লাইভ রিপোর্ট</strong><small>সহজে performance দেখুন</small></div></div>
      </section>

      <div className="trust-strip"><span><i aria-hidden="true">✓</i> অথেনটিক প্রোডাক্ট</span><span><i aria-hidden="true">☎</i> বাংলা সাপোর্ট</span><span><i aria-hidden="true">🔒</i> নিরাপদ প্ল্যাটফর্ম</span></div>
    </main>
    <footer className="landing-footer"><span>© {new Date().getFullYear()} Galiver Affiliates</span><span><Link href="/faq">FAQ</Link><Link href="/terms">Terms</Link></span></footer>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
  </main>;
}
