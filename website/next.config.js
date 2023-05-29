const { withKumaUI } = require("@kuma-ui/next-plugin");

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  experimental: {
    appDir: true,
  },
  async redirects() {
    return [
      {
        source: "/",
        destination: "/docs/introduction",
        permanent: true,
      },
    ];
  },
};

module.exports = withKumaUI(nextConfig, {
  breakpoints: {
    sm: "700px",
    md: "1200px",
  },
});
