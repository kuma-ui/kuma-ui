const { withKumaUI } = require("@kuma-ui/next-plugin");

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  experimental: {
    appDir: true,
  },
  output: "export",
};

module.exports = withKumaUI(nextConfig, {
  breakpoints: {
    sm: "700px",
    md: "1200px",
  },
});
