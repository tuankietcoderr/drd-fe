const favicons = [
  '/favicon.ico',
  '/favicon-16x16.png',
  '/favicon-32x32.png',
  '/favicon-96x96.png',
];

const appleIcons = [
  '/apple-icon.png',
  '/apple-icon-57x57.png',
  '/apple-icon-60x60.png',
  '/apple-icon-72x72.png',
  '/apple-icon-76x76.png',
  '/apple-icon-114x114.png',
  '/apple-icon-120x120.png',
  '/apple-icon-144x144.png',
  '/apple-icon-152x152.png',
  '/apple-icon-180x180.png',
  '/apple-icon-precomposed.png',
];

const description =
  'TRUNG TÂM BẢO TRỢ - DẠY NGHỀ VÀ TẠO VIỆC LÀM CHO NGƯỜI TÀN TẬT TP.HCM';
const title =
  'TRUNG TÂM BẢO TRỢ - DẠY NGHỀ VÀ TẠO VIỆC LÀM CHO NGƯỜI TÀN TẬT TP.HCM';

const url = process.env.NEXT_PUBLIC_PRODUCTION_URL || 'https://vieclamnkt.vn';

export const commonMetadata = {
  metadataBase: new URL(url),
  title,
  description,
  keywords: [
    'drd',
    'DRD',
    'vieclamnkt',
    'vieclam',
    'viec lam',
    'viec-lam',
    'viec-lam-tai-nha',
    'viec-lam-online',
    'tim-viec-lam',
    'tim-viec',
    'tim-viec-lam-online',
    'tim-viec-lam-tai-nha',
    'tim-viec-lam-tai-nha-mien-phi',
    'tim-viec-lam-online-mien-phi',
    'tim-viec-lam-tai-nha-mien-phi',
    'tim-viec-lam-online-mien-phi',
    title,
    title.toLowerCase(),
  ],
  twitter: {
    title,
    description,
    site: '@drd',
    card: 'summary_large_image',
  },
  openGraph: {
    title,
    description,
    url,
    siteName: title,
    type: 'website',
  },
  icons: {
    apple: appleIcons,
    icon: favicons,
  },
  category: 'job',
  creator: '@drd',
  manifest: '/manifest.json',
  alternates: {
    canonical: {
      title,
      url,
    },
    languages: {
      vi: [
        {
          url,
          title,
        },
      ],
    },
  },
  other: {
    'msapplication-config': '/browserconfig.xml',
    'pinterest-rich-pin': 'true',
  },
};
