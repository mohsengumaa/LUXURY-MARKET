/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        luxury: {
          50: '#f8f7f4',
          100: '#ede9e0',
          200: '#ddd4c0',
          300: '#c8b896',
          400: '#b39c6d',
          500: '#a08652',
          600: '#8c7147',
          700: '#745a3c',
          800: '#5f4a36',
          900: '#4f3e30',
        },
        gold: {
          50: '#fefdf8',
          100: '#fef7cd',
          200: '#feec9b',
          300: '#fddd68',
          400: '#fbc638',
          500: '#f5a623',
          600: '#d97706',
          700: '#b45309',
          800: '#92400e',
          900: '#78350f',
        }
      },
      fontFamily: {
        'luxury': ['Playfair Display', 'serif'],
        'modern': ['Inter', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.5s ease-out',
      }
    },
  },
  plugins: [],
}
console.log(">>> BUILD ENV CHECK <<<");
console.log("MONGODB_URI:", process.env.MONGODB_URI ? "✅ SET" : "❌ MISSING");

module.exports = {
  reactStrictMode: true,
};
