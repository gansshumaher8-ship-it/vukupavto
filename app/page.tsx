"use client";

import { useState, useEffect } from 'react';

export default function Home() {
  const [isModalActive, setIsModalActive] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const openModal = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsModalActive(true);
  };

  const closeModal = () => {
    setIsModalActive(false);
  };

  const handleModalClick = (e: React.MouseEvent) => {
    if ((e.target as HTMLElement).classList.contains('modal-overlay')) {
      closeModal();
    }
  };

  const submitForm = async (e: React.FormEvent<HTMLFormElement>, formSource: string) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);
    
    const phone = formData.get('phone') as string;
    if (!phone || phone.length < 10) {
      alert('Пожалуйста, введите корректный номер телефона');
      return;
    }

    setIsSubmitting(true);
    formData.append('form_source', formSource);

    try {
      const response = await fetch('/api/send', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        alert('Спасибо! Ваша заявка принята. Мы перезвоним вам в течение 3 минут.');
        form.reset();
        if (formSource === 'Всплывающее окно') {
          closeModal();
        }
      } else {
        alert('Произошла ошибка при отправке. Пожалуйста, попробуйте позже или позвоните нам.');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Произошла ошибка при отправке. Пожалуйста, проверьте подключение к интернету.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Smooth scroll
  useEffect(() => {
    const handleSmoothScroll = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.tagName === 'A' && target.getAttribute('href')?.startsWith('#')) {
        const targetId = target.getAttribute('href');
        if (targetId === '#callback' || targetId === '#') return;
        
        const targetElement = document.querySelector(targetId!);
        if (targetElement) {
          e.preventDefault();
          targetElement.scrollIntoView({ behavior: 'smooth' });
        }
      }
    };
    document.addEventListener('click', handleSmoothScroll);
    return () => document.removeEventListener('click', handleSmoothScroll);
  }, []);

  return (
    <>
      {/* Schema.org */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "AutoDealer",
            "name": "АвтоВыкуп МСК",
            "alternateName": "Срочный выкуп автомобилей Москва",
            "image": "https://мос-авто.рф/images/logo.png",
            "@id": "https://мос-авто.рф/#organization",
            "url": "https://мос-авто.рф/",
            "telephone": "+7-916-205-32-34",
            "description": "Срочный выкуп автомобилей в Москве и Московской области. Выкупаем любые авто: с пробегом, битые, кредитные, залоговые. Деньги за 30 минут.",
            "geo": {
              "@type": "GeoCoordinates",
              "latitude": 55.7558,
              "longitude": 37.6173
            },
            "areaServed": [
              { "@type": "City", "name": "Москва" },
              { "@type": "State", "name": "Московская область" }
            ],
            "openingHoursSpecification": {
              "@type": "OpeningHoursSpecification",
              "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
              "opens": "00:00",
              "closes": "23:59"
            },
            "priceRange": "$$$",
            "hasOfferCatalog": {
              "@type": "OfferCatalog",
              "name": "Услуги автовыкупа",
              "itemListElement": [
                { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Выкуп легковых автомобилей" } },
                { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Выкуп битых и после ДТП авто" } },
                { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Выкуп авто в кредите и залоге" } },
                { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Выкуп коммерческого транспорта" } },
                { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Выкуп авто на разбор" } }
              ]
            }
          })
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            "name": "Срочный выкуп авто в Москве и Московской области",
            "description": "Профессиональный выкуп автомобилей в Москве и МО. Любое состояние: с пробегом, битые, кредитные. Деньги за 30 минут.",
            "url": "https://мос-авто.рф/",
            "breadcrumb": {
              "@type": "BreadcrumbList",
              "itemListElement": [{ "@type": "ListItem", "position": 1, "name": "Главная", "item": "https://мос-авто.рф/" }]
            }
          })
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": [
              {
                "@type": "Question",
                "name": "Сколько стоит выкуп автомобиля в Москве?",
                "acceptedAnswer": { "@type": "Answer", "text": "Мы выплачиваем до 98% от рыночной стоимости автомобиля. Точная сумма зависит от марки, года, состояния и пробега. Оценка по телефону и выезд оценщика бесплатно." }
              },
              {
                "@type": "Question",
                "name": "За сколько времени выкупаете авто?",
                "acceptedAnswer": { "@type": "Answer", "text": "От заявки до получения денег — от 30 минут до 1 часа. Выезд оценщика по Москве и МО в течение 15–30 минут." }
              },
              {
                "@type": "Question",
                "name": "Выкупаете ли авто в кредите или после ДТП?",
                "acceptedAnswer": { "@type": "Answer", "text": "Да. Выкупаем автомобили в кредите, в залоге, битые, после ДТП, тотальные, без документов. Сами погасим кредит в банке при необходимости." }
              },
              {
                "@type": "Question",
                "name": "Как происходит оплата при выкупе авто?",
                "acceptedAnswer": { "@type": "Answer", "text": "Оплата на месте: наличными или переводом на банковскую карту. Оформление договора купли-продажи и снятие с учета в ГИБДД — за наш счет." }
              }
            ]
          })
        }}
      />

      <header className="header">
        <div className="container header-container">
          <div className="logo">
            <span className="logo-accent">Авто</span>Выкуп МСК
          </div>
          <div className="header-info">
            <div className="working-hours">Работаем 24/7 по Москве и МО</div>
          </div>
          <div className="header-contacts">
            <a href="tel:+79162053234" className="phone-link">+7 (916) 205-32-34</a>
            <a href="#callback" className="btn btn-outline modal-open" onClick={openModal}>Заказать звонок</a>
          </div>
        </div>
      </header>

      <section className="hero">
        <div className="container hero-container">
          <div className="hero-content">
            <h1>Срочный выкуп автомобилей в Москве и области <span className="text-accent">до 98% от рынка</span></h1>
            <p className="hero-subtitle">Выкупаем любые авто: с пробегом, битые, кредитные, залоговые, на разбор. Деньги сразу — наличными или на карту за 30 минут!</p>
            <ul className="hero-benefits">
              <li>✔️ Бесплатный выезд оценщика через 15 минут</li>
              <li>✔️ Оформление всех документов за наш счет</li>
              <li>✔️ Работаем легально, снимаем авто с учета в ГИБДД</li>
            </ul>
            <div className="hero-actions">
              <a href="#callback" className="btn btn-primary modal-open" onClick={openModal}>Узнать стоимость авто</a>
            </div>
          </div>
          <div className="hero-image">
            <img src="https://images.unsplash.com/photo-1542282088-fe8426682b8f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" alt="Срочный выкуп авто" loading="lazy" />
          </div>
        </div>
      </section>

      <section className="calc-section" id="calc">
        <div className="container">
          <div className="calc-wrapper">
            <div className="calc-text">
              <h2>Получите оценку вашего автомобиля онлайн</h2>
              <p>Оставьте заявку, и мы перезвоним через 3 минуты с готовым предложением.</p>
            </div>
            <form className="lead-form" id="leadForm" onSubmit={(e) => submitForm(e, 'Калькулятор (главная)')}>
              <input type="text" name="marka" placeholder="Марка и модель авто" required />
              <input type="text" name="year" placeholder="Год выпуска" />
              <input type="tel" name="phone" placeholder="Ваш телефон *" required />
              <button type="submit" className="btn btn-primary btn-block" disabled={isSubmitting}>
                {isSubmitting ? 'Отправка...' : 'Получить предложение'}
              </button>
              <p className="form-policy">Нажимая кнопку, вы соглашаетесь с <a href="#policy">политикой конфиденциальности</a>.</p>
            </form>
          </div>
        </div>
      </section>

      <section className="advantages" id="advantages">
        <div className="container">
          <h2 className="section-title">Почему нам доверяют</h2>
          <div className="grid-4">
            <div className="adv-card">
              <div className="adv-icon">⚡</div>
              <h3>Быстро</h3>
              <p>Весь процесс от звонка до получения денег занимает от 30 до 60 минут.</p>
            </div>
            <div className="adv-card">
              <div className="adv-icon">💰</div>
              <h3>Дорого</h3>
              <p>Выплачиваем до 98% от реальной рыночной стоимости автомобиля.</p>
            </div>
            <div className="adv-card">
              <div className="adv-icon">🛡️</div>
              <h3>Безопасно</h3>
              <p>Юридическая чистота сделки, официальный договор купли-продажи.</p>
            </div>
            <div className="adv-card">
              <div className="adv-icon">🆓</div>
              <h3>Бесплатно</h3>
              <p>Выезд эксперта, оценка, эвакуатор и переоформление — за наш счет.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="we-buy bg-gray" id="we-buy">
        <div className="container">
          <h2 className="section-title">Какие автомобили мы выкупаем</h2>
          <div className="grid-3">
            <div className="buy-card">
              <h3>С пробегом</h3>
              <p>Любого года выпуска, отечественные и иномарки. В хорошем состоянии выкупаем по максимальной цене.</p>
            </div>
            <div className="buy-card">
              <h3>Битые и после ДТП</h3>
              <p>Покупаем авто не на ходу, тотальные. Бесплатно заберем на своем эвакуаторе.</p>
            </div>
            <div className="buy-card">
              <h3>Кредитные и залоговые</h3>
              <p>Сами погасим ваш кредит или залог в банке, а разницу выплатим вам на руки.</p>
            </div>
            <div className="buy-card">
              <h3>С запретом на рег. действия</h3>
              <p>Поможем снять запрет и арест, решим проблемы с приставами (ФССП).</p>
            </div>
            <div className="buy-card">
              <h3>Коммерческий транспорт</h3>
              <p>Газели, фургоны, спецтехника, такси, корпоративные парки.</p>
            </div>
            <div className="buy-card">
              <h3>Без документов</h3>
              <p>Потерянные ПТС, СТС, утилизированные авто, проблемные документы.</p>
            </div>
            <div className="buy-card">
              <h3>На разбор</h3>
              <p>Выкупаем автомобили на запчасти и на разбор: неисправные, с большим пробегом, когда ремонт нецелесообразен.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="how-it-works" id="steps">
        <div className="container">
          <h2 className="section-title">Как происходит выкуп авто</h2>
          <div className="steps-wrapper">
            <div className="step">
              <div className="step-num">1</div>
              <h3>Оставьте заявку</h3>
              <p>Позвоните нам или оставьте заявку на сайте. Мы назовем предварительную стоимость по телефону.</p>
            </div>
            <div className="step">
              <div className="step-num">2</div>
              <h3>Встреча и осмотр</h3>
              <p>Наш эксперт бесплатно приедет к вам в любую точку Москвы и МО для точной оценки.</p>
            </div>
            <div className="step">
              <div className="step-num">3</div>
              <h3>Оформление</h3>
              <p>Мы берем на себя всю бумажную работу и заключение договора купли-продажи.</p>
            </div>
            <div className="step">
              <div className="step-num">4</div>
              <h3>Оплата</h3>
              <p>Вы получаете всю сумму сразу на месте наличными или переводом на банковскую карту.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="seo-text bg-gray" aria-label="О выкупе автомобилей">
        <div className="container">
          <h2 className="section-title">Выкуп автомобилей в Москве и Московской области</h2>
          <div className="seo-content">
            <p>Компания «АвтоВыкуп МСК» занимается <strong>срочным выкупом автомобилей</strong> в Москве, Подольске, Химках, Мытищах, Балашихе, Люберцах, Королёве, Одинцово и других городах Московской области. Мы выкупаем <strong>легковые иномарки и отечественные авто</strong> любого года выпуска: Toyota, BMW, Mercedes-Benz, Audi, Volkswagen, Hyundai, Kia, Nissan, Mazda, Ford, Chevrolet, Lada, Renault, Skoda и другие марки.</p>
            <p><strong>Срочный выкуп авто</strong> — удобная альтернатива долгой продаже через объявления или trade-in. Вы получаете деньги за машину в день обращения: наличными или на карту. Мы берём на себя бесплатный выезд оценщика, оформление договора купли-продажи и снятие автомобиля с учёта в ГИБДД. Выкупаем машины в любом состоянии: с пробегом, после ДТП, битые, тотальные, в кредите, в залоге, с запретами на регистрационные действия, а также <strong>авто на разбор</strong> (на запчасти). Оставьте заявку на сайте для оценки.</p>
          </div>
        </div>
      </section>

      <footer className="footer">
        <div className="container footer-container">
          <div className="footer-col">
            <div className="logo">
              <span className="logo-accent">Авто</span>Выкуп МСК
            </div>
            <p>Профессиональный и срочный выкуп автомобилей в Москве и Московской области.</p>
            <p>© 2026 Все права защищены.</p>
          </div>
          <div className="footer-col">
            <h4>Контакты</h4>
            <p>📞 <a href="tel:+79162053234">+7 (916) 205-32-34</a></p>
            <p>🕒 Режим работы: Круглосуточно</p>
          </div>
        </div>
      </footer>

      <div className={`modal-overlay ${isModalActive ? 'active' : ''}`} id="modal" onClick={handleModalClick}>
        <div className="modal-content">
          <button className="modal-close" onClick={closeModal}>&times;</button>
          <h3>Оставить заявку на выкуп</h3>
          <p>Мы перезвоним вам в течение 3 минут!</p>
          <form className="lead-form modal-form" id="modalForm" onSubmit={(e) => submitForm(e, 'Всплывающее окно')}>
            <input type="text" name="name" placeholder="Ваше имя" />
            <input type="tel" name="phone" placeholder="Ваш телефон *" required />
            <button type="submit" className="btn btn-primary btn-block" disabled={isSubmitting}>
              {isSubmitting ? 'Отправка...' : 'Перезвоните мне'}
            </button>
            <p className="form-policy">Нажимая кнопку, вы соглашаетесь с политикой конфиденциальности.</p>
          </form>
        </div>
      </div>

      <div className="floating-widgets">
        <a href="tel:+79162053234" className="float-btn float-phone" title="Позвонить нам">
          <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor"><path d="M20.01 15.38c-1.23 0-2.42-.2-3.53-.56a.977.977 0 00-1.01.24l-1.57 1.97c-2.83-1.35-5.48-3.9-6.89-6.83l1.95-1.66c.27-.28.35-.67.24-1.02-.37-1.11-.56-2.3-.56-3.53 0-.54-.45-.99-.99-.99H4.19C3.65 3 3 3.24 3 3.99 3 13.28 10.73 21 20.01 21c.71 0 .99-.63.99-1.18v-3.45c0-.54-.45-.99-.99-.99z"/></svg>
        </a>
      </div>
    </>
  );
}