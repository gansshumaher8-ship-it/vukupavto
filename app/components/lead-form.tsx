'use client';

import Link from 'next/link';
import { useState } from 'react';

type LeadFormProps = {
  id?: string;
  source: string;
  submitLabel: string;
  title?: string;
  description?: string;
  showName?: boolean;
  showVehicleFields?: boolean;
  className?: string;
};

type FormState = {
  status: 'idle' | 'success' | 'error';
  message: string;
};

const initialState: FormState = {
  status: 'idle',
  message: '',
};

function normalizePhone(phone: string) {
  return phone.replace(/\D/g, '');
}

export default function LeadForm({
  id,
  source,
  submitLabel,
  title,
  description,
  showName = false,
  showVehicleFields = false,
  className = '',
}: LeadFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formState, setFormState] = useState<FormState>(initialState);

  const idPrefix = id ?? source.toLowerCase().replace(/\s+/g, '-');

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const form = event.currentTarget;
    const formData = new FormData(form);
    const phone = String(formData.get('phone') ?? '');
    const phoneDigits = normalizePhone(phone);

    if (phoneDigits.length < 10) {
      setFormState({
        status: 'error',
        message: 'Укажите корректный номер телефона, чтобы мы смогли с вами связаться.',
      });
      return;
    }

    setIsSubmitting(true);
    setFormState(initialState);
    formData.append('form_source', source);

    try {
      const response = await fetch('/api/send', {
        method: 'POST',
        body: formData,
      });

      const data = (await response.json().catch(() => null)) as
        | { error?: string; message?: string }
        | null;

      if (!response.ok) {
        throw new Error(data?.error || 'Не удалось отправить заявку. Попробуйте еще раз.');
      }

      form.reset();
      setFormState({
        status: 'success',
        message:
          data?.message || 'Спасибо! Заявка отправлена. Мы свяжемся с вами в ближайшее время.',
      });
    } catch (error) {
      setFormState({
        status: 'error',
        message:
          error instanceof Error
            ? error.message
            : 'Произошла ошибка при отправке. Попробуйте позже или позвоните нам.',
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form className={`lead-form ${className}`.trim()} id={id} onSubmit={handleSubmit} noValidate>
      {title ? <h3 className="form-title">{title}</h3> : null}
      {description ? <p className="form-description">{description}</p> : null}

      {showName ? (
        <div className="form-field">
          <label className="sr-only" htmlFor={`${idPrefix}-name`}>
            Ваше имя
          </label>
          <input
            id={`${idPrefix}-name`}
            type="text"
            name="name"
            placeholder="Ваше имя"
            autoComplete="name"
          />
        </div>
      ) : null}

      {showVehicleFields ? (
        <>
          <div className="form-field">
            <label className="sr-only" htmlFor={`${idPrefix}-marka`}>
              Марка и модель автомобиля
            </label>
            <input
              id={`${idPrefix}-marka`}
              type="text"
              name="marka"
              placeholder="Марка и модель авто"
              autoComplete="off"
              required
            />
          </div>
          <div className="form-field">
            <label className="sr-only" htmlFor={`${idPrefix}-year`}>
              Год выпуска
            </label>
            <input
              id={`${idPrefix}-year`}
              type="text"
              name="year"
              placeholder="Год выпуска"
              inputMode="numeric"
              autoComplete="bday-year"
            />
          </div>
        </>
      ) : null}

      <div className="form-field">
        <label className="sr-only" htmlFor={`${idPrefix}-phone`}>
          Телефон
        </label>
        <input
          id={`${idPrefix}-phone`}
          type="tel"
          name="phone"
          placeholder="Ваш телефон *"
          autoComplete="tel"
          inputMode="tel"
          required
        />
      </div>

      <div className="form-field honeypot-field" aria-hidden="true">
        <label className="sr-only" htmlFor={`${idPrefix}-website`}>
          Website
        </label>
        <input id={`${idPrefix}-website`} type="text" name="website" tabIndex={-1} autoComplete="off" />
      </div>

      <button type="submit" className="btn btn-primary btn-block" disabled={isSubmitting}>
        {isSubmitting ? 'Отправка...' : submitLabel}
      </button>

      <p className="form-policy">
        Нажимая кнопку, вы соглашаетесь с{' '}
        <Link href="/privacy-policy">политикой конфиденциальности</Link>.
      </p>

      <p
        className={`form-status ${formState.status === 'idle' ? 'is-hidden' : formState.status}`}
        role="status"
        aria-live="polite"
      >
        {formState.message}
      </p>
    </form>
  );
}
