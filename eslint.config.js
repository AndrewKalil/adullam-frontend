import kalortech from "@kalortech/eslint-config";

export default [
  ...kalortech,
  {
    rules: {
      // Allow default exports for App.tsx and page files (required by react-router)
      "import/no-default-export": "off",
    },
    files: ["src/App.tsx", "src/pages/**/*.tsx"],
  },
];
