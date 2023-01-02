import styles from '../../styles/palettes.module.css';

export const revalidate = 60;

function Index({ children }: { children: React.ReactNode }) {
  const paletteOptions = Object.keys(styles);
  const palette =
    paletteOptions[Math.floor(Math.random() * paletteOptions.length)];
  return (
    <div className={styles[palette]}>
      <div className="flex justify-center w-full text-sm bg-back min-h-screen text-[1.25em] sm:text-[1.3em]">
        <div className="flex flex-col items-start justify-center leading-9 gap-y-4 my-[4em] mx-[2em] sm:m-16 max-w-2xl text-content font-sans">
          {children}
        </div>
      </div>
    </div>
  );
}

export default Index;
