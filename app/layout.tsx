import ThemeRegistry from './ThemeRegistry';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Маршрутизатор метро',
  description: 'Мини‑приложение Telegram для расчёта маршрутов метро'
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru">
      <body>
        <ThemeRegistry>{children}</ThemeRegistry>
      </body>
    </html>
  );
}
