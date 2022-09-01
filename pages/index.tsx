import { GetStaticProps, InferGetStaticPropsType } from 'next';
import Head from 'next/head';
import {
  AnchorHTMLAttributes,
  DetailedHTMLProps,
  PropsWithChildren,
  useEffect,
  useState,
} from 'react';
import styles from '../styles/palettes.module.css';
import Signature from '../components/Signature';

function Link({
  children,
  href,
}: PropsWithChildren<
  DetailedHTMLProps<AnchorHTMLAttributes<HTMLAnchorElement>, HTMLAnchorElement>
>) {
  return (
    <a
      href={href}
      className="transition text-accent hover:text-back hover:bg-content"
    >
      {children}
    </a>
  );
}

export const getStaticProps: GetStaticProps<{ palette: string }> = () => {
  const paletteOptions = Object.keys(styles);
  const palette =
    paletteOptions[Math.floor(Math.random() * paletteOptions.length)];
  return {
    props: {
      palette,
    },
    revalidate: 60,
  };
};

function Index({ palette }: InferGetStaticPropsType<typeof getStaticProps>) {
  const [electronicMailIdentifier, setEmail] = useState('...');
  useEffect(() => {
    setEmail(Buffer.from('aGV5QGphc29uYWEubWU=', 'base64').toString('utf8'));
    console.log(
      '👋 you should also follow my Instagram: https://instagram.com/jasonaa_'
    );
  }, []);
  return (
    <>
      <Head>
        <title>Jason Antwi-Appah</title>
      </Head>
      <div className={styles[palette]}>
        <div className="flex justify-center w-full text-sm bg-back min-h-screen text-[1.25em] sm:text-[1.3em]">
          <div className="flex flex-col items-start justify-center leading-9 gap-y-4 my-[4em] mx-[2em] sm:m-16 max-w-2xl text-content font-[klima-web]">
            <Signature />
            <p>
              🧑🏾‍💻 Hey there! I&apos;m Jason Antwi-Appah. I&apos;m a 17-year-old
              student and maker that loves all sorts of tech.
            </p>
            <p>
              🛬 I was raised in London, but now live in Austin, TX and attend
              school at the University of Texas at Dallas.
            </p>
            <p>Right now, I&apos;m:</p>
            <ul>
              <li>
                🛠️ Building tools for developers at{' '}
                <Link href="https://allotrope.dev/">Allotrope</Link>
              </li>
              <li>
                ✨ Learning and hacking with friends in{' '}
                <Link href="https://hackclub.com">Hack Club</Link>
              </li>
              <li>
                🎓 Completing a Computer Science degree at{' '}
                <Link href="https://utdallas.edu">UT Dallas</Link>
              </li>
            </ul>
            <p>
              Outside of software engineering, I love music production,
              broadcast/audiovisual technology, and all things technical
              theatre!{' '}
              <Link href="https://scrapbook.hackclub.com/jasonaa">
                My Scrapbook
              </Link>{' '}
              has some of the things I&apos;m working on.
            </p>

            <p>
              Feel free to shoot me an email →&nbsp;
              <Link href={`mailto:${electronicMailIdentifier}`}>
                <noscript>sorry, you need JavaScript enabled for this</noscript>
                {electronicMailIdentifier}
              </Link>
              . You also can find me on{' '}
              <Link href="https://github.com/jasonappah">GitHub</Link>,{' '}
              <Link href="https://twitter.com/jasonaa_">Twitter</Link> and{' '}
              <Link href="https://linkedin.com/in/jasonaa">LinkedIn</Link>.
            </p>
            <p>
              Here&apos;s this site&apos;s{' '}
              <Link
                href={`https://github.com/jasonappah/v2/tree/${
                  process.env.NEXT_PUBLIC_VERCEL_GIT_COMMIT_SHA || 'main'
                }`}
              >
                source code
              </Link>.
            </p>
            <p className="text-[0.01em]">
              psssst if you&apos;re a teen interested in joining a community of
              other teens in computer science or tech in general, you should
              check out <Link href="https://hackclub.com">Hack Club!</Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default Index;
