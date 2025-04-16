import { CssBaseline, ThemeProvider, createTheme } from '@mui/material';
import { useEffect, useMemo, useState } from 'react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Маршрутизатор метро',
  description: 'Мини‑приложение Telegram для расчёта маршрутов метро'
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const [mode, setMode] = useState<'light' | 'dark'>('light');

  useEffect(() => {
    // Telegram theme detection
    if (typeof window !== 'undefined' && (window as any).Telegram?.WebApp?.themeParams?.bg_color) {
      const bg = (window as any).Telegram.WebApp.themeParams.bg_color as string;
      setMode(bg && bg.startsWith('#000') ? 'dark' : 'light');
    } else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      setMode('dark');
    }
  }, []);

  const theme = useMemo(
    () =>
      createTheme({
        palette: { mode }
      }),
    [mode]
  );

  return (
    <html lang="ru">
      <body>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
