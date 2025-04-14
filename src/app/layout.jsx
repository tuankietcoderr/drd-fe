import {Roboto} from 'next/font/google';
import 'swiper/css/bundle';
import {commonMetadata} from '../config/metadata-config';
import './globals.css';
import Providers from './providers';

const roboto = Roboto({
  variable: '--font-roboto',
  subsets: ['latin'],
});

export const metadata = commonMetadata;

export default function RootLayout({children}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${roboto.className} antialiased`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
