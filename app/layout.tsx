import type { ReactNode } from 'react';

import Footer from './components/Footer';
import Header from './components/Header';
import './globals.css';
import { getLanguageCookie } from './i18n/actions';

export const metadata = {
  title: 'Kid-Wise',
  description: 'Explain words to kids with AI',
};

export default async function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  const lang = await getLanguageCookie();
  return (
    <html lang={lang}>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link
          href="https://fonts.googleapis.com/css2?family=Quicksand:wght@400;600;700&display=swap"
          rel="stylesheet"
        />

        <link
          rel="icon"
          type="image/png"
          href="/favicon-96x96.png"
          sizes="96x96"
        />
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <link rel="shortcut icon" href="/favicon.ico" />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link rel="manifest" href="/site.webmanifest" />
      </head>
      <body
        className="font-sans bg-kidwise-background min-h-screen bg-dots"
        style={{ fontFamily: 'Quicksand, sans-serif' }}
      >
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
