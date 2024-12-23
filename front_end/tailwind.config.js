/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        'custom-yellow': '#866F46',
        'custom-beige': '#DEB887',
        'custom-white': '#F8F8FF',
        'custom-brown':'#6F4E37',
        'custom-beige-2': '#F5EFE6',
        
      },
      fontFamily: {
        'mono': ['Inconsolata', 'monospace'], // Thêm font 'Inconsolata' vào danh sách font family mono
      },
    },
  },
  plugins: [],
};