export const metadata = {
  title: 'Frequently Asked Questions',
  description: 'Galiver অ্যাফিলিয়েট প্রোগ্রাম সম্পর্কে সাধারণ প্রশ্নের উত্তর — কমিশন কখন যোগ হয়, রেফারেল অ্যাট্রিবিউশন কতদিন থাকে এবং কমিশন রেট কত।',
  alternates: { canonical: '/faq' },
};

const items = [
  ['When is commission credited?', 'After the order is marked Delivered by Galiver.'],
  ['How long does attribution last?', 'The referral cookie lasts 30 days unless a newer valid referral replaces it.'],
  ['What is the commission rate?', 'You earn up to 30% of product value (excluding delivery charges), depending on the product and current campaign.'],
];

const faqJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: items.map(([question, answer]) => ({
    '@type': 'Question',
    name: question,
    acceptedAnswer: { '@type': 'Answer', text: answer },
  })),
};

export default function FAQ() {
  return <main className="shell">
    <h1>Frequently Asked Questions</h1>
    {items.map(([q, a]) => <section className="panel" key={q}><h2>{q}</h2><p className="muted">{a}</p></section>)}
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
  </main>;
}
