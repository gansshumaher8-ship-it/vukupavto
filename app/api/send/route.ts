import { NextResponse } from 'next/server';

function normalizePhone(phone: string) {
  return phone.replace(/\D/g, '');
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function readString(formData: FormData, key: string) {
  return String(formData.get(key) ?? '').trim();
}

export async function POST(request: Request) {
  try {
    const formData = await request.formData();

    if (readString(formData, 'website')) {
      return NextResponse.json({ success: true, message: 'Заявка отправлена.' });
    }

    const phone = readString(formData, 'phone');
    const normalizedPhone = normalizePhone(phone);
    const name = readString(formData, 'name');
    const marka = readString(formData, 'marka');
    const year = readString(formData, 'year');
    const formSource = readString(formData, 'form_source') || 'Неизвестно';

    if (normalizedPhone.length < 10) {
      return NextResponse.json(
        { error: 'Укажите корректный номер телефона.' },
        { status: 400 },
      );
    }

    const telegramBotToken = process.env.TELEGRAM_BOT_TOKEN;
    const telegramChatId = process.env.TELEGRAM_CHAT_ID;

    if (!telegramBotToken || !telegramChatId) {
      console.error('Telegram credentials are not configured');
      return NextResponse.json(
        { error: 'Сервис временно недоступен. Позвоните нам или попробуйте позже.' },
        { status: 503 },
      );
    }

    let message = '🚘 <b>Новая заявка на выкуп авто</b>\n\n';
    message += `<b>Источник:</b> ${escapeHtml(formSource)}\n`;
    message += `<b>Телефон:</b> ${escapeHtml(phone)}\n`;

    if (name) {
      message += `<b>Имя:</b> ${escapeHtml(name)}\n`;
    }

    if (marka) {
      message += `<b>Марка / модель:</b> ${escapeHtml(marka)}\n`;
    }

    if (year) {
      message += `<b>Год:</b> ${escapeHtml(year)}\n`;
    }

    const forwardedFor = request.headers.get('x-forwarded-for');
    if (forwardedFor) {
      message += `<b>IP:</b> ${escapeHtml(forwardedFor.split(',')[0]?.trim() || forwardedFor)}\n`;
    }

    const telegramUrl = `https://api.telegram.org/bot${telegramBotToken}/sendMessage`;

    const response = await fetch(telegramUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        chat_id: telegramChatId,
        text: message,
        parse_mode: 'HTML',
      }),
    });

    if (!response.ok) {
      console.error('Telegram API error:', await response.text());
      return NextResponse.json(
        { error: 'Не удалось отправить заявку. Попробуйте позже или позвоните нам.' },
        { status: 502 },
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Спасибо! Заявка отправлена. Мы свяжемся с вами в ближайшее время.',
    });
  } catch (error) {
    console.error('Server error:', error);
    return NextResponse.json(
      { error: 'Внутренняя ошибка сервера. Попробуйте позже.' },
      { status: 500 },
    );
  }
}
