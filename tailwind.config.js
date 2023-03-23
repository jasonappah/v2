module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    "./app/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'special-blue': '#CED3FE',
        back: 'var(--background)',
        content: 'var(--foreground)',
        accent: 'var(--accent)',
      },
      fontFamily: {
        sans: ['var(--font-klima)']
      },
    },
  },
};
