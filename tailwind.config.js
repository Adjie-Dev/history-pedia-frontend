module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      // Palet diambil dari foto latar: kayu ek gelap, lantai emas, marmer patung,
      // dan tali hijau pembatas di Long Room Trinity College.
      colors: {
        espresso: '#1A120C',
        oak: '#2E1F14',
        parchment: '#FAF5EA',
        brass: '#D6A03C',
        rope: '#1E6A57',
      },
      fontFamily: {
        display: ['Fraunces', 'Georgia', 'serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      keyframes: {
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(6px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        'fade-up': 'fade-up 200ms ease-out both',
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}