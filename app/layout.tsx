import type { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';
import Script from 'next/script';
import { OG_IMAGE_PATH, SITE_NAME, SITE_URL } from './site-config';
import './globals.css';

const inter = Inter({ subsets: ['latin', 'cyrillic'], display: 'swap' });

export const viewport: Viewport = {
  themeColor: '#FF4D00',
  width: 'device-width',
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  applicationName: SITE_NAME,
  title: 'Срочный выкуп авто в Москве и МО | Дорого и быстро до 98%',
  description:
    'Срочный выкуп автомобилей в Москве и Московской области. Покупаем любые машины: битые, кредитные, с пробегом. Выезд оценщика бесплатно, деньги за 30 минут наличными или на карту.',
  authors: [{ name: SITE_NAME }],
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  },
  icons: {
    icon: [{ url: '/favicon-32x32.png', type: 'image/png', sizes: '32x32' }],
    apple: [{ url: '/apple-touch-icon.png', type: 'image/png', sizes: '180x180' }],
    shortcut: [{ url: '/favicon-32x32.png', type: 'image/png' }],
  },
  manifest: '/manifest.webmanifest',
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'Срочный выкуп авто в Москве и МО | До 98% от рыночной цены',
    description:
      'Выкупаем автомобили в любом состоянии в день обращения. Бесплатный выезд оценщика по Москве и области. Деньги сразу.',
    url: '/',
    siteName: SITE_NAME,
    images: [
      {
        url: OG_IMAGE_PATH,
        width: 1024,
        height: 559,
        alt: `${SITE_NAME} - срочный выкуп авто`,
      },
    ],
    locale: 'ru_RU',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Срочный выкуп авто в Москве и МО | До 98% от рыночной цены',
    description:
      'Выкупаем автомобили в любом состоянии. Бесплатный выезд оценщика. Деньги за 30 минут.',
    images: [OG_IMAGE_PATH],
  },
  formatDetection: {
    telephone: false,
    address: false,
    email: false,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru" className={inter.className}>
      <body>
        {children}
        <Script id="yandex-metrika" strategy="afterInteractive">
          {`
            (function(m,e,t,r,i,k,a){
                m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
                m[i].l=1*new Date();
                for (var j = 0; j < document.scripts.length; j++) {if (document.scripts[j].src === r) { return; }}
                k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)
            })(window, document,'script','https://mc.yandex.ru/metrika/tag.js?id=107195281', 'ym');

            ym(107195281, 'init', {
              ssr: true,
              webvisor: true,
              clickmap: true,
              ecommerce: "dataLayer",
              referrer: document.referrer,
              url: location.href,
              accurateTrackBounce: true,
              trackLinks: true
            });
          `}
        </Script>
        <noscript>
          <div>
            <img
              src="https://mc.yandex.ru/watch/107195281"
              style={{ position: 'absolute', left: '-9999px' }}
              alt=""
            />
          </div>
        </noscript>
      </body>
    </html>
  );
}
