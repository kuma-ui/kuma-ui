<div align="center">
  <img src="https://raw.githubusercontent.com/poteboy/kuma-ui/main/media/logo.webp" alt="Kuma UI logo" width="300" />
</div>

<h1 align='center'>Ultra Fast, Zero Runtime, Utility-First CSS-in-JS</h1>

**[Documentation](https://kuma-ui.com)**

 <div>
    <a href='https://www.npmjs.com/package/@kuma-ui/core'>
      <img src='https://img.shields.io/npm/v/@kuma-ui/core'>
    </a>
    <a href='https://bundlephobia.com/package/@kuma-ui/core'>
      <img src='https://img.shields.io/bundlephobia/minzip/@kuma-ui/core'>
    </a>
  </div>
  <br />
</div>

🐻‍❄️ Kuma UI is a utility-first, zero-runtime CSS-in-JS library that offers an outstanding developer experience and optimized performance.

## Features

🔥 &nbsp; Blazing-fast performance with zero-runtime CSS extraction

🦄 &nbsp; Build-time CSS generation

🌳 &nbsp; Responsive design with breakpoints and media queries

🎨 &nbsp; Utility-first approach for rapid UI development

👋 &nbsp; Support for pseudo-classes and pseudo-elements

🔬 &nbsp; Experimental support for Next.js 13.4 App router & React server components(RSC).

## Installation

```sh
npm install @kuma-ui/core
```

or

```sh
yarn add @kuma-ui/core
```

## Usage

## styled API

The styled API works just like styled-components or Emotion, allowing you to create styled React components using tagged template literals. This makes it a familiar and comfortable choice for developers who have worked with these libraries.

```tsx
import { styled } from "@kuma-ui/core";

const Box = styled("div")`
  position: relative;
  &:hover {
    background-color: rgba(0, 0, 255, 0.5);
  }
  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

// Then use it like so:
<Box>Hello, world!</Box>;
```

### k object

The `k` object is a key part of Kuma UI's API. It provides pre-styled HTML elements that you can use as components in your application. These elements can be styled using utility props for inline styling. The utility props are type-safe and make it easy to write responsive styles.

```tsx
import { k } from "@kuma-ui/core";

function App() {
  return (
    <k.div p={[4, 8]} m="2px" _hover={{ flexDir: "row" }}>
      hello world
    </k.div>
  );
}
```

### css function

The `css` function is another way to style your components. It takes an object of styles and returns a string of hashed classNames that you can apply to your component using the `className` prop.

```tsx
import { css } from "@kuma-ui/core";

const styles = css({ color: "red", fontSize: "24px" });

function App() {
  return <div className={styles}>Hello, world!</div>;
}
```

## Setup

### Next.js

```sh
yarn add @kuma-ui/next-plugin
```

#### Pages Directory Version

**next.config.js**

```js
const { withKumaUI } = require("@kuma-ui/next-plugin");

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
};

module.exports = withKumaUI(nextConfig);
```

#### App Router Version (Experimental)

**next.config.js**

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

### Vite

```sh
yarn add @kuma-ui/vite
```

**vite.config.ts**

```js
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import KumaUI from "@kuma-ui/vite";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react({
      jsxRuntime: "classic",
    }),
    KumaUI(),
  ],
});
```

## Responsive Design

Kuma UI supports responsive design. Use arrays to specify different styles for different viewport widths. For example, <k.div fontSize={[16, 24]} /> changes the font size from 16px to 24px based on the window size.

Define the breakpoints in your config file:
```js
import kumaUI from "@kuma-ui/vite";

kumaUI({
  breakpoints: { sm: "400px", md: "700px" },
});
```

## Roadmap

Our ultimate goal is to develop **a zero-runtime headless component library**. We're currently focusing on enhancing the core and expanding our range of components. We aim to create a unique library that allows users to pass style props, operates with zero runtime, and remains accessible. In the future, we plan to introduce a `kuma.config.js` that allows users to define their own variants, making Kuma UI a go-to tool for creating design systems with high performance.


## Contributing
Contributions are welcome! Please feel free to submit issues or pull requests with any improvements or suggestions.

### Adding a changeset
Don't forget to include a changeset as well, by running this command at the root of the project:

```sh
pnpm changeset
```

## License
MIT
