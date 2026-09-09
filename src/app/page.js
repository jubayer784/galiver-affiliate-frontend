import Link from 'next/link';

export const metadata = {
  title: 'অ্যাফিলিয়েট হিসেবে আয় করুন',
  description: 'Galiver-এর প্রোডাক্ট শেয়ার করে প্রতি সফল অর্ডারে কমিশন আয় করুন।',
};

const steps = [
  ['person_add', 'ফ্রি একাউন্ট খুলুন ও পছন্দের প্রোডাক্ট বাছুন'],
  ['share', 'ফেসবুক, টিকটক বা ইউটিউবে লিংক শেয়ার করুন'],
  ['payments', 'প্রতিটি সফল অর্ডারে সরাসরি কমিশন পান'],
];

export default function Home() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Galiver Affiliates',
    url: 'https://affiliate.galiver.shop',
    description: 'Galiver affiliate programme',
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
        <div className="pill"><span className="material-symbols">verified</span> বাংলাদেশের বিশ্বস্ত ই-কমার্স অ্যাফিলিয়েট প্রোগ্রাম</div>
        <h1>প্রোডাক্ট প্রোমোট করুন,<br />প্রতি অর্ডারে আয় করুন <em>কমিশন!</em></h1>
        <p>শীর্ষস্থানীয় Galiver প্রোডাক্ট শেয়ার করে স্মার্ট ইনকাম শুরু করুন। আপনার লিংক থেকে অর্ডার হলেই কমিশন যোগ হবে।</p>
        <Link className="button button-primary button-wide" href="/login"><span className="material-symbols">rocket_launch</span> অ্যাফিলিয়েট হিসেবে জয়েন করুন</Link>
        <div className="hero-promises"><span><i>✓</i> ফ্রি সাইনআপ</span><span><i>✓</i> সহজ লিংক</span><span><i>✓</i> ডেলিভারির পর পেমেন্ট</span></div>
      </section>

      <section className="info-card guide-card">
        <div className="card-meta"><span className="tag orange-tag">সহজ গাইড</span><span>১ মিনিট পাঠ</span></div>
        <h2>অনলাইনে আয় শুরু করার সহজ ৩ ধাপ</h2>
        <div className="steps">{steps.map(([icon, text], index) => <div className="step" key={icon}><span className="step-icon material-symbols">{icon}</span><b>{index + 1}</b><p>{text}</p></div>)}</div>
        <Link className="button button-soft button-wide" href="/login">শুরু করুন <span className="material-symbols">arrow_forward</span></Link>
      </section>

      <section className="info-card payout-card">
        <div className="card-meta"><span className="tag green-tag">সহজ পেমেন্ট</span><span>স্বচ্ছ হিসাব</span></div>
        <h2>আপনার কমিশন, আপনার ওয়ালেট</h2>
        <p>প্রতিটি delivered order-এর পর কমিশন আপনার affiliate wallet-এ জমা হবে। dashboard থেকে earnings এবং order status দেখুন।</p>
        <div className="feature-row"><div><span className="material-symbols green-icon">account_balance_wallet</span><strong>১০% কমিশন</strong><small>প্রোডাক্ট ভ্যালুর উপর</small></div><div><span className="material-symbols orange-icon">insights</span><strong>লাইভ রিপোর্ট</strong><small>সহজে performance দেখুন</small></div></div>
        <Link className="button button-primary button-wide" href="/dashboard"><span className="material-symbols">dashboard</span> ড্যাশবোর্ড দেখুন</Link>
      </section>

      <div className="trust-strip"><span><i className="material-symbols">verified</i> অথেনটিক প্রোডাক্ট</span><span><i className="material-symbols">support_agent</i> বাংলা সাপোর্ট</span><span><i className="material-symbols">security</i> নিরাপদ প্ল্যাটফর্ম</span></div>
    </main>
    <footer className="landing-footer"><span>© {new Date().getFullYear()} Galiver Affiliates</span><span><Link href="/faq">FAQ</Link><Link href="/terms">Terms</Link></span></footer>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
  </main>;
}
