import Email from '../components/Email';
import Signature from '../components/Signature';
import StyledLink from '../components/StyledLink';

function Content() {
  const nav = [
    {
      name: 'source code',
      href: `https://github.com/jasonappah/v2/tree/${
        process.env.NEXT_PUBLIC_VERCEL_GIT_COMMIT_SHA || 'main'
      }`,
    },
    {
      name: 'links',
      href: '/links',
    },
  ];
  return (
    <>
      <Signature />
      <p>
        🧑🏾‍💻 Hey there! I&apos;m Jason Antwi-Appah. I&apos;m a 17-year-old student
        and maker that loves all sorts of tech.
      </p>
      <p>
        🛬 I was raised in London, but now live in Austin, TX and attend school
        at the University of Texas at Dallas.
      </p>
      <p>
      🎓 Right now, I&apos;m a computer science undergrad at{' '}
        <StyledLink href="https://utdallas.edu">UT Dallas</StyledLink> (c/o
        2025). I'm involved in student organizations on campus, like{' '}
        <StyledLink href="https://about.utdnebula.com">Nebula Labs</StyledLink>, where
        I help lead development of a web-based degree planning tool for
        students.
      </p>
      <p>
      ✨ Outside of software engineering, I love music production,
        broadcast/audiovisual technology, and all things technical theatre!{' '}
        <StyledLink href="https://scrapbook.hackclub.com/jasonaa">
          My Scrapbook
        </StyledLink>{' '}
        has some of the things I&apos;m working on.
      </p>

      <p>
        Feel free to shoot me an email →&nbsp;
        <Email />. You also can find me on{' '}
        <StyledLink href="https://github.com/jasonappah">
          GitHub
        </StyledLink>,{' '}
        <StyledLink href="https://twitter.com/jasonaa_">Twitter</StyledLink> and{' '}
        <StyledLink href="https://linkedin.com/in/jasonaa">LinkedIn</StyledLink>
        .
      </p>
      <ol className="flex gap-3">
        {nav.map(({ name, href }) => (
          <StyledLink key={name} href={href}>
            {name}
          </StyledLink>
        ))}
      </ol>
      <p className="text-[0.01em]">
        psssst if you&apos;re a teen interested in joining a community of other
        teens in computer science or tech in general, you should check out{' '}
        <StyledLink href="https://hackclub.com">Hack Club!</StyledLink>
      </p>
    </>
  );
}

export default Content;
