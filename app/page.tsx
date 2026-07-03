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
      name: 'more links',
      href: '/links',
    },
  ];
  return (
    <div className="flex flex-col items-start justify-center gap-4 max-w-2xl">
      <Signature />
      <p>
        🧑🏾‍💻 Hey there! I&apos;m Jason Antwi-Appah. I&apos;m a student and
        software engineer with a passion for building and learning about all
        sorts of tech.
      </p>
      <p>
        🛬 I was raised in London, but now live in Austin, TX and attend school
        at the University of Texas at Dallas.
      </p>
      <p>
        🎓 Currently I&apos;m a computer science undergrad at{' '}
        <StyledLink href="https://utdallas.edu">UT Dallas</StyledLink> (c/o 2026). During my time here I've gotten to sing in a choir, build all sorts of software, worked at some pretty cool places, led in various student orgs, along with a whole bunch of other stuff I can't fit into this already long sentence, but has definitely changed me for the better.
      </p>
      <p>
        😇  I'm up to some other stuff <StyledLink href="/now">right now</StyledLink>. You can check out my <StyledLink href="/resume">resume</StyledLink> if you want to see a more complete list of my software experience.
      </p>
      <p>
        ✨ Outside of software engineering, I love music production,
        broadcast/audiovisual technology, and all things technical theatre!{' '}
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
      <ul className="flex gap-5 list-inside list-disc">
        {nav.map(({ name, href }) => (
          <li className="first:list-none not-first:pl-5" key={name}>
            <StyledLink href={href}>
              {name}
            </StyledLink>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Content;
