/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{jsx,tsx}"
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        inter: ['Inter']
      },
      colors: {
        primary: "rgba(var(--primary))",
        accent: "rgba(var(--accent))",
        "lighter-accent": "rgba(var(--lighter-accent))",
        "darker-accent": "rgba(var(--darker-accent))",
        text: "rgba(var(--text))",
        "text-secondary": "rgba(var(--text-secondary))",
        skeleton: "rgba(var(--skeleton))",
        "modal-backdrop": "rgba(var(--modal-backdrop))",
        "dropdown-shadow": "rgba(var(--dropdown-shadow))",
      },
      minHeight: (theme) => ({
        ...theme('spacing'),
      }),
    },
  },
  plugins: [],
}
