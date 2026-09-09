import './globals.css';
import PortalChrome from '@/components/PortalChrome';

export const metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://affiliate.galiver.shop'),
  title: { default: 'Galiver Affiliates', template: '%s | Galiver Affiliates' },
  description: 'Earn with Galiver by sharing products you believe in.',
};

export default function RootLayout({ children }) {
  return <html lang="bn"><body><PortalChrome>{children}</PortalChrome></body></html>;
}
