import type { Metadata } from 'next';
import Link from 'next/link';
import { PHONE_DISPLAY, PHONE_HREF, SITE_NAME, SITE_URL } from '../site-config';

export const metadata: Metadata = {
  title: 'Политика конфиденциальности',
  description:
    'Политика обработки персональных данных сайта АвтоВыкуп МСК. Условия отправки заявок и обработки контактной информации.',
  alternates: {
    canonical: '/privacy-policy',
  },
};

export default function PrivacyPolicyPage() {
  return (
    <main className="legal-page">
      <div className="container legal-container">
        <Link href="/" className="legal-back">
          На главную
        </Link>
        <h1>Политика конфиденциальности</h1>
        <p>
          Настоящая политика описывает порядок обработки персональных данных пользователей сайта{' '}
          <strong>{SITE_NAME}</strong>, размещенного по адресу {SITE_URL}.
        </p>

        <section className="legal-section">
          <h2>Какие данные мы собираем</h2>
          <p>
            При отправке заявки пользователь может предоставить имя, номер телефона, марку и
            модель автомобиля, год выпуска и иные сведения, которые добровольно указывает в
            форме.
          </p>
        </section>

        <section className="legal-section">
          <h2>Цели обработки</h2>
          <p>
            Персональные данные используются только для обратной связи, оценки автомобиля,
            подготовки предложения по выкупу и сопровождения сделки.
          </p>
        </section>

        <section className="legal-section">
          <h2>Передача третьим лицам</h2>
          <p>
            Данные не публикуются в открытом доступе. Они могут обрабатываться только в объеме,
            необходимом для связи с пользователем и исполнения заявки, а также техническими
            сервисами, обеспечивающими работу сайта и уведомлений.
          </p>
        </section>

        <section className="legal-section">
          <h2>Аналитика и cookies</h2>
          <p>
            На сайте используется Яндекс.Метрика для анализа посещаемости и улучшения качества
            сервиса. Продолжая пользоваться сайтом, пользователь соглашается с использованием
            файлов cookies и аналитических инструментов.
          </p>
        </section>

        <section className="legal-section">
          <h2>Связь по вопросам данных</h2>
          <p>
            По вопросам обработки персональных данных и отзыва согласия можно связаться по
            телефону <a href={`tel:${PHONE_HREF}`}>{PHONE_DISPLAY}</a>.
          </p>
        </section>
      </div>
    </main>
  );
}
