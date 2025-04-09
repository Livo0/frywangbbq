import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

// Extend from Next.js core web vitals, React, React hooks, and optionally TailwindCSS
const eslintConfig = [
  ...compat.extends("next/core-web-vitals"),
  "plugin:react/recommended",  // Add React plugin rules
  "plugin:react-hooks/recommended",  // Add React hooks plugin rules
  // "plugin:tailwindcss/recommended",  // Uncomment if using TailwindCSS and need linting for classes
];

export default {
  root: true,
  extends: eslintConfig,
  parserOptions: {
    ecmaVersion: 2021, // Use modern ECMAScript features
    sourceType: "module", // Required for ES module syntax
    ecmaFeatures: {
      jsx: true, // Enable JSX parsing
    },
  },
  settings: {
    react: {
      version: "detect", // Automatically detect React version
    },
  },
  rules: {
    "react/no-unescaped-entities": "off", // Disable unescaped entities rule
    "react-hooks/exhaustive-deps": "warn", // Warn for missing dependencies in useEffect (or turn off if you prefer)
    // Add or modify additional rules here as needed
  },
};
