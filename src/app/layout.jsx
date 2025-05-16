import Script from 'next/script';
import 'swiper/css/bundle';
import {commonMetadata} from '../config/metadata-config';
import './globals.css';
import Providers from './providers';
import ReactScan from './react-scan';

export const metadata = commonMetadata;

export default function RootLayout({children}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <ReactScan />
      <body className={`antialiased`}>
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
