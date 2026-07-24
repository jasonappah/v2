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
            <li>
              Interning as a software engineer at Rivian and Volkswagen Group
              Technologies
            </li>
            <li>Exploring California for the next few months</li>
            <li>Thinking about what's next after graduation (where to live and who to work for)</li>
            <li>Learning piano</li>
          </ul>
        </p>
      </div>
      

      <StyledLink href={"/"}>&larr; home</StyledLink>
      <div className="h-[40vh]"></div>
    </div>
  );
}

export default Content;
