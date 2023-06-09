---
title: "Getting started"
description: Learn how to quickly set up and start using Kuma UI, the incredibly lightweight zero-runtime CSS-in-JS library, in your Next.js or Vite project.
---


Welcome to the Kuma UI! This guide will help you get up and running with Kuma UI in your project, whether you're using Next.js or Vite.

## Installation

To get started with Kuma UI, first, you need to install the core package in your project. This can be done using either npm or yarn. Here's how:

```bash
npm install @kuma-ui/core
```

or 

```bash
yarn add @kuma-ui/core
```

One of the great advantages of Kuma UI is its **incredibly lightweight** footprint. The minified and gzipped size of `@kuma-ui/core` is only 273 bytes! Check it out on [Bundlephobia](https://bundlephobia.com/package/@kuma-ui/core@0.2.0).

Once the core package is successfully installed, you can proceed to set up Kuma UI for your specific framework (Next.js or Vite) as detailed in the next section.


## Setting Up Kuma UI

### For Next.js Applications

First, you need to add the Kuma UI Next.js plugin to your project. You can do this by running the following command:

```bash
yarn add -D @kuma-ui/next-plugin
```

Once you've installed the plugin, you need to configure it in your Next.js project. You can do this in the `next.config.js` file:

#### Pages Directory

```js
const { withKumaUI } = require("@kuma-ui/next-plugin");

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
};

module.exports = withKumaUI(nextConfig);
```

#### App Router (Experimental)

```js
const { withKumaUI } = require("@kuma-ui/next-plugin");

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    appDir: true
  }
};

module.exports = withKumaUI(nextConfig);
```

### For Vite Applications

Add the Kuma UI Vite plugin to your project:

```bash
yarn add -D @kuma-ui/vite
```

After installation, you need to configure it in your Vite project. You can do this in the `vite.config.ts` file:

```ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import KumaUI from "@kuma-ui/vite";

export default defineConfig({
  plugins: [
    react({
      jsxRuntime: "classic",
    }),
    KumaUI(),
  ],
});
```

With this, you are now ready to start using Kuma UI in your Next.js or Vite application. Happy coding! 🎉
