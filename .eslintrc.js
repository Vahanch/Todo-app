const aliases = require("./aliases");

module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: ["prettier"],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    project: "./tsconfig.eslint.json",
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: "module",
  },
  plugins: ["@typescript-eslint", "import"],
  rules: {
    semi: [2, "always"],
    "react/jsx-uses-react": 0,
    "react/react-in-jsx-scope": 0,
    "react/prop-types": 0,
    "react/require-default-props": 0,
    "react/jsx-filename-extension": 0,
    "react/function-component-definition": 0,
    "@typescript-eslint/no-explicit-any": 1,
    "@typescript-eslint/no-unused-vars": 1,
    "no-use-before-define": 0,
    "no-param-reassign": 0,
    "operator-linebreak": 0,
    "object-curly-newline": 0,
    "no-console": 1,
    "no-debugger": 1,
    camelcase: 0,
    "import/prefer-default-export": 0,
    "import/extensions": 0,
    "import/order": [
      "error",
      {
        pathGroupsExcludedImportTypes: [],
        pathGroups: [
          {
            pattern: "src/**",
            group: "internal",
          },
        ],
        groups: [
          "builtin",
          "external",
          "internal",
          "parent",
          "sibling",
          "index",
        ],
        "newlines-between": "always",
      },
    ],
  },
  settings: {
    react: {
      version: "detect",
    },
    "import/resolver": {
      alias: {
        map: Object.keys(aliases).reduce((acc, aliasKey) => {
          acc[aliasKey] = aliases[aliasKey];
          return acc;
        }, {}),
        extensions: [".ts", ".tsx", ".js", ".jsx", ".json"],
      },
    },
  },
};
