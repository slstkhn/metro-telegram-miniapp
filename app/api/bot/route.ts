import { NextRequest, NextResponse } from 'next/server';
import { Telegraf } from 'telegraf';

const BOT_TOKEN = process.env.BOT_TOKEN as string;
if (!BOT_TOKEN) throw new Error('BOT_TOKEN env not set');

const bot = new Telegraf(BOT_TOKEN);

// приветствие на /start
bot.start((ctx) =>
  ctx.reply(
    'Привет! Я помогу построить быстрый маршрут в метро.\n' +
    'Нажмите кнопку «Открыть» ниже, чтобы запустить мини‑приложение.'
  )
);

// инициализируем Telegraf один раз (важно для serverless)
let inited = false;
function init() {
  if (!inited) {
    bot.webhookReply = false;        // отключаем автоматический reply
    inited = true;
  }
}

export async function POST(req: NextRequest) {
  init();
  const update = await req.json();
  await bot.handleUpdate(update);
  return NextResponse.json({ ok: true });
}
