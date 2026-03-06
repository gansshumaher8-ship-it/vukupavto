import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    
    const phone = formData.get('phone') as string;
    const name = formData.get('name') as string;
    const marka = formData.get('marka') as string;
    const year = formData.get('year') as string;
    const form_source = (formData.get('form_source') as string) || 'Неизвестно';

    if (!phone) {
      return NextResponse.json({ error: 'Телефон обязателен' }, { status: 400 });
    }

    const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
    const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID;

    if (!TELEGRAM_BOT_TOKEN || !TELEGRAM_CHAT_ID) {
      console.error('Telegram credentials are not configured');
      return NextResponse.json(
        { error: 'Сервис временно недоступен. Попробуйте позже или позвоните нам.' },
        { status: 500 },
      );
    }

    let message = `🚨 <b>Новая заявка на выкуп авто!</b>\n\n`;
    message += `<b>Источник:</b> ${form_source}\n`;
    
    if (name) message += `<b>Имя:</b> ${name}\n`;
    message += `<b>Телефон:</b> ${phone}\n`;
    if (marka) message += `<b>Марка/Модель:</b> ${marka}\n`;
    if (year) message += `<b>Год:</b> ${year}\n`;

    const telegramUrl = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`;
    
    const response = await fetch(telegramUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        chat_id: TELEGRAM_CHAT_ID,
        text: message,
        parse_mode: 'HTML',
      }),
    });

    if (!response.ok) {
      console.error('Telegram API error:', await response.text());
      return NextResponse.json({ error: 'Ошибка отправки в Telegram' }, { status: 500 });
    }

    return NextResponse.json({ success: true, message: 'Заявка успешно отправлена' });
  } catch (error) {
    console.error('Server error:', error);
    return NextResponse.json({ error: 'Внутренняя ошибка сервера' }, { status: 500 });
  }
}