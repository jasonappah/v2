import Head from "next/head"
import { useEffect, useState } from "react";
import Signature from "../components/Signature";

const Index = () => {
    const [electronicMailIdentifier, setEmail] = useState("...");
    useEffect(()=>{
        setEmail(Buffer.from("aGV5QGphc29uYWEubWU=", "base64").toString("utf8"));
        
      console.log("👋 you should also follow my Instagram: https://instagram.com/jasonaa_");

    },[])
  return (
  <>
  <Head>
    <title>Jason Antwi-Appah</title>
    <meta name="viewport" content="width=device-width" />
    <meta property="og:type" content="website" />
    <meta property="og:title" content="Jason Antwi-Appah" />
    <meta property="og:description" content="Hi! I'm a 17-year-old student and maker that loves all sorts of tech." />
    <meta property="og:url" content="https://jasonaa.me" />
    <meta property="og:image" content="/og.png"/>
  </Head>
    <div className={`flex justify-center w-full text-sm bg-back text-[1.25em] sm:text-[1.3em]`}>
    <div className={`flex flex-col items-start justify-center leading-9 gap-y-4 my-[4em] mx-[2em] sm:m-16 max-w-2xl text-content font-[klima-web]`}>
      <Signature/>
        
      <p>
      🧑🏾‍💻 Hey there! I&apos;m Jason Antwi-Appah. I&apos;m a 17-year-old student and maker that loves all sorts of tech. 
      </p>
      <p>
      🛬 Just in case you&apos;re stalking my website wondering where I got my accent from, I was raised in London 🇬🇧, but now live in Austin, TX 🤠 and attend school at the University of Texas at Dallas.
      </p>
      <p>Right now, I&apos;m:</p>
      <ul>
        <li>
          🛠️ Building tools for developers at <Link href="https://allotrope.dev/">Allotrope</Link>
        </li>
        <li>✨ Learning and hacking with friends in <Link href="https://hackclub.com">Hack Club</Link>
        
        <br/><span className="text-size-[0.2rem]">psssst if you’re&nbsp;<span className="strike">young enough to read this</span> a teen interested in a community of other teens in computer science or tech in general, you should join!</span>

        </li>

        <li>
          🎓 Completing a Computer Science degree at <Link href="https://utdallas.edu">UT Dallas</Link>
        </li>
      </ul>
      <p>
        Outside of software engineering, I love music production 🎧, broadcast/audiovisual technology 📹, and all things technical theatre 🎭&nbsp;! <Link href="https://scrapbook.hackclub.com/jasonaa">My Scrapbook</Link> has some of the things I&apos;m working on.
      </p>
      
      <p>
        Feel free to shoot me an email →&nbsp;
        <Link href={`mailto:${electronicMailIdentifier}`}>{electronicMailIdentifier}</Link>. You also can find me on <Link href="https://github.com/jasonappah">GitHub</Link>, <Link href="https://twitter.com/jasonaa_">Twitter</Link> and <Link href="https://linkedin.com/in/jasonaa">LinkedIn</Link>. 
      </p>
      <p>Here&apos;s this site&apos;s <Link href={`https://github.com/jasonappah/v2/tree/${process.env.NEXT_PUBLIC_VERCEL_GIT_COMMIT_SHA || "main"}`}>source code</Link>, if you&apos;re into that.</p>
    </div>
    </div>
    </>
  );
}

function Link(props) {
  return (
    <a {...props} className={`${props.className || ""} text-accent hover:text-back hover:bg-content transition`}>{props?.children}</a>
  )
}

export default Index;