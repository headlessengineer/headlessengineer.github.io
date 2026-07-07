import type { Metadata } from 'next';
import { Inter, JetBrains_Mono } from 'next/font/google';
import localFont from 'next/font/local';
import { ThemeScript } from '../components/ThemeScript';
import { ThemeProvider } from '../context/ThemeContext';
import { Header } from '../components/organisms/Header';
import { Footer } from '../components/organisms/Footer';
import themeFullConfig from '../theme.config';
import PageClass from '../components/PageClass';
import './styles/globals.css';

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '600', '700'],
  variable: '--font-inter',
  display: 'swap',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400', '600'],
  variable: '--font-jetbrains-mono',
  display: 'swap',
});

const bitcount = localFont({
  src: '../public/fonts/BitcountGridDouble-Variable.ttf',
  variable: '--font-bitcount',
  display: 'swap',
  weight: '100 900',
});

const { site } = themeFullConfig;

export const metadata: Metadata = {
  title: {
    default: site.name,
    template: `%s - ${site.name}`,
  },
  description: site.tagline,
  keywords: site.keywords,
  authors: [{ name: site.author.name, url: site.url }],
  metadataBase: new URL(site.url),
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: site.url,
    siteName: site.name,
    title: site.name,
    description: site.tagline,
  },
  twitter: {
    card: 'summary_large_image',
    creator: site.social.twitter,
    title: site.name,
    description: site.tagline,
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: site.url,
    types: {
      'application/rss+xml': `${site.url}/rss.xml`,
    },
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${jetbrainsMono.variable} ${bitcount.variable}`}
      suppressHydrationWarning
    >
      <head>
        <ThemeScript />
        <style>{`
          html.dark-mode-preload {
            --bg: var(--n-950);
            --surface: var(--n-900);
            --elevated: var(--n-800);
            --border: var(--n-700);
            --fg: var(--white);
            --fg-secondary: var(--n-300);
          }
          html.dark-mode-preload body {
            background-color: var(--bg);
            color: var(--fg);
          }
        `}</style>
      </head>
      <body suppressHydrationWarning>
        <ThemeProvider config={themeFullConfig}>
          <PageClass />
          <div className="page-shell">
            <Header site={site} />
            <main id="main-content">
              {children}
            </main>
            <Footer site={site} />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
