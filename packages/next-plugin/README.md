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


```tsx
import { styled, k } from "@kuma-ui/core";

const color = "orange"
function App() {
  return (
    <VStack p={[4, 8]} m="2px" _hover={{ flexDir: "row" }}>
      <k.div fontSize="40px" color={color}>
        hello world
      </k.div>
    </VStack>
  );
}

export const VStack = styled("div")`
  display: flex;
  flex-direction: column;
`;

export default App;
```

# Features

🔥 &nbsp; Blazing-fast performance with zero-runtime CSS extraction

🦄 &nbsp; Build-time CSS generation

🌳 &nbsp; Responsive design with breakpoints and media queries

🎨 &nbsp; Utility-first approach for rapid UI development

👋 &nbsp; Support for pseudo-classes and pseudo-elements

# Installation

```sh
npm install @kuma-ui/core
```

or 

```sh
yarn add @kuma-ui/core
```

# Setup

```sh
yarn add @kuma-ui/next-plugin
```

**next.config.js**

```js:next.config.js
const { withKumaUI } = require("@kuma-ui/next-plugin");

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
};

module.exports = withKumaUI(nextConfig);
```

# Contributing
Contributions are welcome! Please feel free to submit issues or pull requests with any improvements or suggestions.

# License
MIT
