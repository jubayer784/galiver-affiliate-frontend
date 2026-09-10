import './globals.css';
import PortalChrome from '@/components/PortalChrome';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://affiliate.galiver.shop';
const storeUrl = process.env.NEXT_PUBLIC_STORE_URL || 'https://galiver.shop';

const title = 'Galiver Affiliates - প্রোডাক্ট শেয়ার করে কমিশন আয় করুন';
const description = 'Galiver অ্যাফিলিয়েট প্রোগ্রামে ফ্রি জয়েন করুন। পছন্দের প্রোডাক্ট লিংক ফেসবুক, টিকটক বা ইউটিউবে শেয়ার করুন এবং প্রতিটি সফল ডেলিভারিতে ১০% কমিশন আয় করুন।';

export const metadata = {
  metadataBase: new URL(siteUrl),
  title: { default: title, template: '%s | Galiver Affiliates' },
  description,
  applicationName: 'Galiver Affiliates',
  keywords: [
    'Galiver affiliate',
    'গ্যালিভার অ্যাফিলিয়েট',
    'অ্যাফিলিয়েট মার্কেটিং বাংলাদেশ',
    'affiliate program Bangladesh',
    'অনলাইনে আয়',
    'earn money online BD',
    'refer and earn Bangladesh',
    'কমিশন আয়',
    'product referral commission',
    'ই-কমার্স অ্যাফিলিয়েট প্রোগ্রাম',
  ],
  authors: [{ name: 'Galiver', url: storeUrl }],
  creator: 'Galiver',
  publisher: 'Galiver',
  category: 'business',
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1 },
  },
  alternates: { canonical: '/' },
  verification: { google: 'x0UfwouGLwKRa5SKT7Mu-BXVlCM5XO4t0CiNtik5HrM' },
  openGraph: {
    type: 'website',
    siteName: 'Galiver Affiliates',
    locale: 'bn_BD',
    url: siteUrl,
    title,
    description,
    images: [{ url: `${storeUrl}/logo.png`, width: 1200, height: 630, alt: 'Galiver Affiliates' }],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@Galiver',
    creator: '@Galiver',
    title,
    description,
    images: [`${storeUrl}/logo.png`],
  },
};

export default function RootLayout({ children }) {
  return <html lang="bn"><body><PortalChrome>{children}</PortalChrome></body></html>;
}
