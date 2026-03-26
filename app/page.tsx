import Image from 'next/image';
import Link from 'next/link';
import LeadForm from './components/lead-form';
import {
  ADVANTAGES,
  FAQ_ITEMS,
  OG_IMAGE_PATH,
  PHONE_DISPLAY,
  PHONE_HREF,
  SERVICE_AREAS,
  SERVICE_ITEMS,
  SITE_NAME,
  SITE_URL,
} from './site-config';

const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'AutoDealer',
  '@id': `${SITE_URL}/#organization`,
  name: SITE_NAME,
  alternateName: 'Срочный выкуп автомобилей Москва',
  url: SITE_URL,
  image: `${SITE_URL}${OG_IMAGE_PATH}`,
  telephone: PHONE_DISPLAY,
  description:
    'Срочный выкуп автомобилей в Москве и Московской области. Покупаем любые авто: с пробегом, битые, кредитные и коммерческие. Деньги в день обращения.',
  areaServed: [
    { '@type': 'City', name: 'Москва' },
    { '@type': 'State', name: 'Московская область' },
  ],
  openingHoursSpecification: {
    '@type': 'OpeningHoursSpecification',
    dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
    opens: '00:00',
    closes: '23:59',
  },
  contactPoint: {
    '@type': 'ContactPoint',
    contactType: 'customer support',
    telephone: PHONE_DISPLAY,
    areaServed: 'RU-MOW',
    availableLanguage: ['ru'],
  },
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'Услуги автовыкупа',
    itemListElement: SERVICE_ITEMS.map((item) => ({
      '@type': 'Offer',
      itemOffered: {
        '@type': 'Service',
        name: item.title,
        description: item.description,
      },
    })),
  },
};

const webPageSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  name: 'Срочный выкуп авто в Москве и Московской области',
  url: SITE_URL,
  description:
    'Профессиональный выкуп автомобилей в Москве и МО. Любое состояние: с пробегом, битые, кредитные. Деньги за 30 минут.',
  inLanguage: 'ru-RU',
  mainEntity: {
    '@id': `${SITE_URL}/#organization`,
  },
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: FAQ_ITEMS.map((item) => ({
    '@type': 'Question',
    name: item.question,
    acceptedAnswer: {
      '@type': 'Answer',
      text: item.answer,
    },
  })),
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <header className="header">
        <div className="container header-container">
          <Link href="/" className="logo" aria-label="АвтоВыкуп МСК">
            <span className="logo-accent">Авто</span>Выкуп МСК
          </Link>
          <div className="header-info">
            <div className="working-hours">Работаем 24/7 по Москве и МО</div>
          </div>
          <div className="header-contacts">
            <a href={`tel:${PHONE_HREF}`} className="phone-link">
              {PHONE_DISPLAY}
            </a>
            <a href="#lead-form" className="btn btn-outline">
              Оценить авто
            </a>
          </div>
        </div>
      </header>

      <main>
        <section className="hero">
          <Image
            src="/images/hero-car.jpg"
            alt=""
            fill
            priority
            sizes="100vw"
            className="hero-image"
          />
          <div className="hero-overlay" aria-hidden="true" />
          <div className="container hero-container">
            <div className="hero-content">
              <p className="hero-kicker">Срочный выкуп авто в Москве и МО</p>
              <h1>
                Срочный выкуп автомобилей в Москве и области{' '}
                <span className="text-accent">до 98% от рынка</span>
              </h1>
              <p className="hero-subtitle">
                Выкупаем любые авто: с пробегом, битые, кредитные, залоговые и на разбор.
                Деньги сразу, договор на месте, выезд оценщика без доплат.
              </p>
              <ul className="hero-benefits">
                <li>Бесплатный выезд оценщика по Москве и МО</li>
                <li>Оформление документов и сопровождение сделки</li>
                <li>Наличные или перевод на карту в день обращения</li>
              </ul>
              <div className="hero-actions">
                <a href="#lead-form" className="btn btn-primary">
                  Узнать стоимость авто
                </a>
                <a href={`tel:${PHONE_HREF}`} className="btn btn-outline btn-light">
                  Позвонить сейчас
                </a>
              </div>
            </div>
          </div>
        </section>

        <section className="calc-section" id="lead-form">
          <div className="container">
            <div className="calc-wrapper">
              <div className="calc-text">
                <h2>Получите оценку вашего автомобиля онлайн</h2>
                <p>
                  Оставьте заявку, и мы быстро свяжемся с вами с предварительной стоимостью
                  выкупа.
                </p>
                <ul className="calc-list">
                  <li>Работаем с легковыми авто и коммерческим транспортом</li>
                  <li>Рассматриваем битые, кредитные и проблемные автомобили</li>
                  <li>Обслуживаем {SERVICE_AREAS.join(', ')}</li>
                </ul>
              </div>
              <LeadForm
                id="lead-form-main"
                source="Главная форма"
                submitLabel="Получить предложение"
                title="Оставьте заявку"
                description="Чем подробнее данные, тем точнее предварительная оценка."
                showVehicleFields
              />
            </div>
          </div>
        </section>

        <section className="advantages" id="advantages">
          <div className="container">
            <h2 className="section-title">Почему нам доверяют</h2>
            <div className="grid-4">
              {ADVANTAGES.map((item) => (
                <article className="adv-card" key={item.title}>
                  <div className="adv-icon" aria-hidden="true">
                    {item.icon}
                  </div>
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="we-buy bg-gray" id="we-buy">
          <div className="container">
            <h2 className="section-title">Какие автомобили мы выкупаем</h2>
            <div className="grid-3">
              {SERVICE_ITEMS.map((item) => (
                <article className="buy-card" key={item.title}>
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="how-it-works" id="steps">
          <div className="container">
            <h2 className="section-title">Как происходит выкуп авто</h2>
            <div className="steps-wrapper">
              <article className="step">
                <div className="step-num">1</div>
                <h3>Заявка</h3>
                <p>Оставляете заявку на сайте или звоните, мы уточняем базовые данные по машине.</p>
              </article>
              <article className="step">
                <div className="step-num">2</div>
                <h3>Осмотр</h3>
                <p>Эксперт приезжает в удобное место и проводит точную оценку автомобиля.</p>
              </article>
              <article className="step">
                <div className="step-num">3</div>
                <h3>Оформление</h3>
                <p>Готовим документы, согласовываем цену и проводим сделку официально.</p>
              </article>
              <article className="step">
                <div className="step-num">4</div>
                <h3>Оплата</h3>
                <p>Вы получаете деньги сразу после оформления наличными или переводом на карту.</p>
              </article>
            </div>
          </div>
        </section>

        <section className="faq-section bg-gray" id="faq">
          <div className="container">
            <h2 className="section-title">Частые вопросы</h2>
            <div className="faq-list">
              {FAQ_ITEMS.map((item) => (
                <details className="faq-item" key={item.question}>
                  <summary>{item.question}</summary>
                  <p>{item.answer}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        <section className="seo-text" aria-label="О выкупе автомобилей">
          <div className="container">
            <h2 className="section-title">Выкуп автомобилей в Москве и Московской области</h2>
            <div className="seo-content">
              <p>
                Компания «{SITE_NAME}» занимается <strong>срочным выкупом автомобилей</strong>{' '}
                в Москве и городах Московской области. Мы покупаем легковые иномарки и
                отечественные автомобили, коммерческий транспорт, машины после ДТП, кредитные,
                залоговые и проблемные авто.
              </p>
              <p>
                <strong>Срочный выкуп авто</strong> подходит тем, кто хочет быстро и безопасно
                продать машину без длительного размещения объявлений. Вы получаете деньги в день
                обращения, а мы берем на себя организацию сделки и оформление документов.
              </p>
            </div>
          </div>
        </section>
      </main>

      <footer className="footer">
        <div className="container footer-container">
          <div className="footer-col">
            <Link href="/" className="logo">
              <span className="logo-accent">Авто</span>Выкуп МСК
            </Link>
            <p>Профессиональный и срочный выкуп автомобилей в Москве и Московской области.</p>
            <p>© 2026 Все права защищены.</p>
          </div>
          <div className="footer-col">
            <h4>Контакты</h4>
            <p>
              <a href={`tel:${PHONE_HREF}`}>{PHONE_DISPLAY}</a>
            </p>
            <p>Режим работы: круглосуточно</p>
          </div>
          <div className="footer-col">
            <h4>Полезно</h4>
            <p>
              <Link href="/privacy-policy">Политика конфиденциальности</Link>
            </p>
            <p>
              <a href="#faq">Частые вопросы</a>
            </p>
          </div>
        </div>
      </footer>

      <div className="floating-widgets">
        <a
          href={`tel:${PHONE_HREF}`}
          className="float-btn float-phone"
          title="Позвонить нам"
          aria-label="Позвонить нам"
        >
          <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor" aria-hidden="true">
            <path d="M20.01 15.38c-1.23 0-2.42-.2-3.53-.56a.977.977 0 00-1.01.24l-1.57 1.97c-2.83-1.35-5.48-3.9-6.89-6.83l1.95-1.66c.27-.28.35-.67.24-1.02-.37-1.11-.56-2.3-.56-3.53 0-.54-.45-.99-.99-.99H4.19C3.65 3 3 3.24 3 3.99 3 13.28 10.73 21 20.01 21c.71 0 .99-.63.99-1.18v-3.45c0-.54-.45-.99-.99-.99z" />
          </svg>
        </a>
      </div>
    </>
  );
}
