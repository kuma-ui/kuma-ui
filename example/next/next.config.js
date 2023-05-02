// import { withKumUI } from "@kuma-ui/next-plugin";
const { withKumUI } = require("@kuma-ui/next-plugin");

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
};

module.exports = withKumUI({
  webpack(config) {
    return config;
  },
});
