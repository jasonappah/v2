import Signature from "../../components/Signature";
import StyledLink from "../../components/StyledLink";

function Content() {
  return (
    <div className="flex flex-col items-start justify-center gap-4 max-w-2xl">
      <Signature />

      <h1 className="font-bold text-4xl">/now</h1>
      <small className="leading-6">
        Last updated July 3rd, 2026. You should{" "}
        <StyledLink href="/links">shoot me a message</StyledLink> if it's been a
        while since I updated this :p
      </small>
      <small className="leading-6">
        Inspired by{" "}
        <StyledLink href="https://nownownow.com/about">
          many other folks' personal websites
        </StyledLink>
        , this is the 'what-is-jason-up-to-and-thinking-about-these-days' page,
        for your enjoyment.
      </small>

      <div className="p-2 rounded-lg bg-content text-back text-sm">
        <h2 className="uppercase font-bold">In short</h2>
        <p>
          Right now I'm:
          <ul className="list-inside list-disc pl-1">
            <li>Exploring California for the next few months.</li>
            <li>
              Interning as a software engineer at Rivian and Volkswagen Group
              Technologies.
            </li>
            <li>Thinking about what's next after graduation (where to live, who to work for).</li>
            <li>Learning piano.</li>
          </ul>
        </p>
      </div>
      <p>
        I'm writing from my new home for the summer in the Bay Area, where I'm
        interning at Rivian and Volkswagen Group Technologies as a software
        engineer through mid-September. Living here is a dream come true in a
        lot of ways, as someone that's been writing code since I was 8 and been
        interested in tech for as long as I can remember. It's been a fun 3
        weeks.
      </p>
      <p>
        Currently I'm thinking a lot about where to live after I graduate and
        what I want my life to look like in the future. Staying in Dallas,
        moving back with family in Austin, or moving to the Bay Area are options
        I'm considering.
      </p>
      <p>
        There's a lot of benefits and trade-offs to weigh with all of these
        options, and this has led to some tough questions about what I want from
        life. Out of the people I know now, who would I most want to be my
        lifelong friends, and where are they living? Between friends, family,
        and career, what's most important to me? Where would I rather raise my
        own family? What do I want my career to look like?
      </p>
      <p>
        I'm also figuring out where my faith in Jesus fits in all of this: What
        does it look like for me to let Him lead my life? Am I really, in my
        heart of hearts, willing to listen to His guidance and surrender my
        desires if what I believe He wants is not what I want? How do I need to
        be letting Him shape these big decisions that I'm making? Is one of
        these options "better" for me from a missional perspective (considering
        how I can serve others and minister to people around me)?
      </p>
      <p>
        That's just a selection of the many questions that have been on my mind.
        I'm really lucky to have had random conversations with people that I've
        met here and also some earlier conversations with close friends and
        people I trust about this too. But nothing seems to have really cleared
        things up in my mind yet. It feels like the more I talk and think
        through this, the less clarity I get and the murkier things feel. I'm
        hoping that this summer, I can at least get a better feel for whether I
        could actually see myself living in the Bay Area at all.
      </p>
      <p>
        Anyway. In the midst of all that, I'm trying to keep learning piano
        (slowly), keep up with friends from Texas, stay involved in a local
        church and explore as much of California as I can, but I feel like I'm
        really doing a terrible job at doing all of it at once, and I miss my
        friends and family more than I was expecting to.
      </p>
      <p>
        But overall it's been pretty cool. Some days are better than others,
        honestly, but I'm excited to see what the rest of the summer holds!
      </p>

      <StyledLink href={"/"}>&larr; home</StyledLink>
      <div className="h-[40vh]"></div>
    </div>
  );
}

export default Content;
