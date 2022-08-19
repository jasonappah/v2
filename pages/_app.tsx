import '../styles/fonts.css';
import 'tailwindcss/tailwind.css';
import { AppProps } from 'next/app';
import Head from 'next/head';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Jason Antwi-Appah" />
        <meta
          property="og:description"
          content="Hi! I'm a 17-year-old student and maker that loves all sorts of tech."
        />
        <meta property="og:url" content="https://jasonaa.me" />
        <meta property="og:image" content="/og.png" />
        <link rel="icon" type="image/png" href="favicon.png" />
      </Head>
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
