# Kuma UI

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

🐻 Kuma UI is a utility-first, zero-runtime CSS-in-JS library that offers an outstanding developer experience and optimized performance.


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

const styles = css({ color: 'red', fontSize: '24px' });

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

Please note that as of now, App Router is an experimental feature. A `.kuma` directory will be produced in the process, which should be added to your `.gitignore` file. If you delete the `.kuma` directory, make sure to also clear the `.next` cache.


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

## Contributing
Contributions are welcome! Please feel free to submit issues or pull requests with any improvements or suggestions.

## License
MIT
