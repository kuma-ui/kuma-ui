const path = require("path");

module.exports = {
  plugins: [
    [
      "./dist/babel-plugin/index.js",
      {
        tagName: "styled",
      },
    ],
  ],
  presets: [
    [
      "@babel/preset-env",
      {
        targets: {
          node: 12,
        },
      },
    ],
    "@babel/preset-typescript",
    "@babel/preset-react",
  ],
};
