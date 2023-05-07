import type { Metadata } from 'next';
import '../styles/globals.css';
import localFont from 'next/font/local';
import AnalyticsWrapper from '../components/Analytics';

import styles from '../styles/palettes.module.css';

const klimaWeb = localFont({
  src: '../public/klima-variable.ttf',
  variable: '--font-klima',
});

export const revalidate = 60;

function RootLayout({ children }: { children: React.ReactNode }) {
  const paletteOptions = Object.keys(styles);
  const palette =
    paletteOptions[Math.floor(Math.random() * paletteOptions.length)];
  return (
    <html lang="en" className={klimaWeb.variable}>
      <body>
        <div className={styles[palette]}>
          <div className="flex justify-center w-full text-sm bg-back min-h-screen text-[1.25em] sm:text-[1.3em]">
            <div className="flex flex-col items-start justify-center leading-9 gap-y-4 my-[4em] mx-[2em] sm:m-16 text-content font-sans">
              {children}
            </div>
          </div>
        </div>
        <AnalyticsWrapper />
      </body>
    </html>
  );
}

export const metadata: Metadata = {
  title: 'Jason Antwi-Appah',
  creator: 'Jason Antwi-Appah',
  description: "Hi! I'm a student and maker that loves all sorts of tech.",
  openGraph: {
    type: 'website',
    title: { default: 'Jason Antwi-Appah', template: '%s | Jason Antwi-Appah' },
    description: '🛠️ 👨🏾‍💻 🎓 ✨',
    url: 'https://jasonaa.me',
    locale: 'en-US',
    images: [
      {
        url: '/og.png',
        width: 1200,
        height: 630,
      },
    ],
  },
};

export default RootLayout;
