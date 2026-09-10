const base = process.env.NEXT_PUBLIC_SITE_URL || 'https://affiliate.galiver.shop';

export default function sitemap() {
  const lastModified = new Date();
  return [
    { url: base, lastModified, changeFrequency: 'weekly', priority: 1 },
    { url: `${base}/faq`, lastModified, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${base}/terms`, lastModified, changeFrequency: 'yearly', priority: 0.4 },
    { url: `${base}/support`, lastModified, changeFrequency: 'yearly', priority: 0.4 },
  ];
}
