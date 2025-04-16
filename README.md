# Telegram Mini‑App «Metro Router»

Стартовый проект на **Next.js 14 + TypeScript + Material‑UI** для мини‑приложения Telegram,
которое строит маршрут между станциями метро.

## Быстрый старт

```bash
pnpm install  # или npm / yarn
pnpm dev      # http://localhost:3000
```

Затем в *BotFather*:
1. `/newbot` — получаем токен  
2. `/setdomain` → `https://<ваш‑домен>.vercel.app`  
3. `/setwebapp` → то же самое

## Деплой на Vercel

```bash
vercel --prod
```

## Структура

```
data/metro.json          — минимальный набор станций/перегонов (пример)
lib/dijkstra.ts          — простой алгоритм поиска кратчайшего пути
app/api/route/route.ts   — POST /api/route — расчёт маршрута
app/components/*         — компоненты интерфейса (MUI)
app/page.tsx             — главный экран Mini App
app/layout.tsx           — глобальные стили + темы MUI
```

**Важно**: файл `metro.json` сейчас содержит всего три станции — для демо.
Замените его полными данными метро СПб (или вашего города).
