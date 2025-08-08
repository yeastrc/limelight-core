// eslint.config.js
import { defineConfig } from "eslint/config";
import js from "@eslint/js";

export default defineConfig([
    // Base recommended JavaScript rules
    {
        files: ["**/*.js", "**/*.mjs", "**/*.cjs"],
        extends: [js.configs.recommended],
        rules: {
            // Custom rule overrides or additions
            // "no-unused-vars": "warn", // Warn about unused variables
            // "no-undef": "error", // Error on undefined variables
            // "semi": ["error", "always"], // Require semicolons at the end of statements
            // "quotes": ["error", "double"], // Enforce double quotes
            // "indent": ["error", 2], // Enforce 2-space indentation
        },
    },

    //  Most files are .ts or .tsx files now
    
    // Configuration for specific file types or overrides
    {
        files: ["src/**/*.js"], // Apply these rules only to files in the 'src' directory
        rules: {
            "no-console": "off", // Disable console.log in production code
        },
    },

    // used to have plugin for react
    //  not sure if still want it since now all code is typescript .tsx files

    // Example for integrating a plugin (e.g., React plugin)
    // You would need to install 'eslint-plugin-react' and '@eslint/compat' for this
    // import react from "eslint-plugin-react";
    // import { fixupConfigAsPlugin } from "@eslint/compat";
    // {
    //   files: ["**/*.jsx"],
    //   plugins: {
    //     react: fixupConfigAsPlugin(react),
    //   },
    //   rules: {
    //     "react/jsx-uses-vars": "error",
    //     "react/jsx-uses-react": "error",
    //   },
    // },
]);