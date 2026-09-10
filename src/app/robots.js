const base = process.env.NEXT_PUBLIC_SITE_URL || 'https://affiliate.galiver.shop';

export default function robots() {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/dashboard', '/earnings', '/payments', '/orders', '/products', '/profile', '/login', '/signup'],
    },
    sitemap: `${base}/sitemap.xml`,
    host: base,
  };
}
