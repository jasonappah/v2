import 'tailwindcss/tailwind.css';
import localFont from '@next/font/local';
import AnalyticsWrapper from '../components/Analytics';

const klimaWeb = localFont({
  src: './klima-variable.ttf',
  variable: '--font-klima',
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={klimaWeb.variable}>
      <body>
        {children}
        <AnalyticsWrapper />
      </body>
    </html>
  );
}
