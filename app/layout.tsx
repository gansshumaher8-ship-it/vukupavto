import type { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';
import Script from 'next/script';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const viewport: Viewport = {
  themeColor: '#FF4D00',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
};

export const metadata: Metadata = {
  title: 'Срочный выкуп авто в Москве и МО | Дорого и Быстро до 98%',
  description: 'Срочный выкуп автомобилей в Москве и Московской области. Покупаем любые машины: битые, кредитные, с пробегом. Выезд оценщика бесплатно, деньги за 30 минут наличными или на карту.',
  keywords: 'выкуп авто, срочный выкуп автомобилей, продать авто в москве, выкуп битых авто, скупка машин, автовыкуп дорого, выкуп авто москва, выкуп авто московская область, срочно продать авто, выкуп автомобилей с пробегом, выкуп авто в кредите, выкуп залоговых авто, скупка битых автомобилей, оценка авто бесплатно москва, выкуп иномарок, выкуп отечественных авто, продать машину дорого, trade-in альтернатива, выкуп авто без документов, выкуп авто после дтп, выкуп тотальных авто, снять с учета гибдд, выкуп газели, выкуп коммерческого транспорта, выкуп авто на разбор, авто на запчасти',
  authors: [{ name: 'АвтоВыкуп МСК' }],
  robots: 'index, follow',
  icons: {
    icon: [
      { url: '/favicon.png', type: 'image/png' },
      { url: '/images/favicon.png', type: 'image/png' },
    ],
    apple: [{ url: '/images/favicon.png', type: 'image/png' }],
  },
  alternates: {
    canonical: 'https://мос-авто.рф/',
  },
  openGraph: {
    title: 'Срочный выкуп авто в Москве и МО | До 98% от рыночной цены',
    description: 'Выкупаем автомобили в любом состоянии в день обращения. Бесплатный выезд оценщика по Москве и области. Деньги сразу!',
    url: 'https://мос-авто.рф/',
    siteName: 'АвтоВыкуп МСК',
    images: [
      {
        url: 'https://мос-авто.рф/images/og-image.jpg',
        width: 1200,
        height: 630,
      },
    ],
    locale: 'ru_RU',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Срочный выкуп авто в Москве и МО | До 98% от рыночной цены',
    description: 'Выкупаем автомобили в любом состоянии. Бесплатный выезд оценщика. Деньги за 30 минут!',
    images: ['https://мос-авто.рф/images/og-image.jpg'],
  },
  formatDetection: {
    telephone: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ru" className={inter.className}>
      <body>
        {children}
        {/* Yandex.Metrika counter */}
        <Script id="yandex-metrika" strategy="afterInteractive">
          {`
            (function(m,e,t,r,i,k,a){
                m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
                m[i].l=1*new Date();
                for (var j = 0; j < document.scripts.length; j++) {if (document.scripts[j].src === r) { return; }}
                k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)
            })(window, document,'script','https://mc.yandex.ru/metrika/tag.js?id=107195281', 'ym');

            ym(107195281, 'init', {ssr:true, webvisor:true, clickmap:true, ecommerce:"dataLayer", referrer: document.referrer, url: location.href, accurateTrackBounce:true, trackLinks:true});
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