module.exports = {
  presets: ["@babel/preset-typescript", "@babel/preset-env"],
  plugins: [require("./dist/babel-plugin")],
};
