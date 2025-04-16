import { CssBaseline, ThemeProvider, createTheme } from '@mui/material';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Маршрутизатор метро',
  description: 'Мини‑приложение Telegram для расчёта маршрутов метро',
};

const theme = createTheme({ palette: { mode: 'light' } });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
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
