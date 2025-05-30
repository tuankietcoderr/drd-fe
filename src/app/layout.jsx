import {Be_Vietnam_Pro} from 'next/font/google';
import Script from 'next/script';
import 'swiper/css/bundle';
import {commonMetadata} from '../config/metadata-config';
import './globals.css';
import Providers from './providers';
import ReactScan from './react-scan';

export const metadata = commonMetadata;

const font = Be_Vietnam_Pro({
  subsets: ['vietnamese'],
  weight: ['400', '500', '600', '700', '800', '900'],
  fallback: ['sans-serif'],
  display: 'swap',
  adjustFontFallback: true,
});

export default function RootLayout({children}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <ReactScan />
      <body className={`${font.className} antialiased`}>
        <Script
          src="https://cdn.userway.org/widget.js"
          data-account="guYhIM3rq9"
          strategy="lazyOnload"
        />
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
