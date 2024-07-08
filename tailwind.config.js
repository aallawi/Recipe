/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    // Note the addition of the `app` directory.
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",

    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        primary: {
          DEFAULT: "#f8da5b",
          // hover: "#22313f",
        },
        secondary: {
          DEFAULT: "#247291",
          hover: "#164f66",
        },
        body: "#f5f9ee",
      },
      screens: {
        sm: "640px",
        md: "768px",
        lg: "1024px",
        xl: "1300px",
      },
    },
  },
  plugins: [],
};
