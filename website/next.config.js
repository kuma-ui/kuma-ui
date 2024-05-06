const { withKumaUI } = require("@kuma-ui/next-plugin");

const withNextra = require("nextra")({
  theme: "nextra-theme-docs",
  themeConfig: "./theme.config.jsx",
});

module.exports = withKumaUI(
  withNextra({
    images: {
      remotePatterns: [
        {
          protocol: "https",
          hostname: "github.com",
        },
      ],
    },
  }),
  {
    wasm: true,
  }
);
