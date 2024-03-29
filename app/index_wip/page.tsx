/* eslint-disable @next/next/no-img-element */
export default function Home() {
  return (
    <div className="h-screen bg-special-blue">
      <img
        src="/assets/mode-new.png"
        className="absolute blur-lg mix-blend-color-burn"
        alt=""
      />

      <img
        src="/assets/stationary.png"
        className="absolute opacity-75 mix-blend-lighten"
        alt=""
      />
      <img
        src="/assets/motion.png"
        className="absolute mix-blend-difference blur-sm"
        alt=""
      />
    </div>
  );
}
