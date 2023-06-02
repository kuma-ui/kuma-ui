---
title: "Responsive Styles"
description: Kuma UI - zero-runtime CSS-in-JS with type-safe utility props
---

Kuma UI supports responsive design out of the box. This framework allows you to adapt styles based on viewport size by using arrays as style property values. For example, `<k.div fontSize={[16, 24]} />` changes the font size from 16px to 24px as the window size changes.

## Configuring Breakpoints

Breakpoints for responsive styles are defined in the configuration of Kuma UI. These breakpoints are then used as the trigger points for applying different style values. If you don't explicitly specify breakpoints in your configuration, Kuma UI uses the following default breakpoints:

```js
{
  sm: "576px",
  md: "768px",
  lg: "992px",
  xl: "1200px",
}
```

You can override these defaults by setting custom values in your Kuma UI plugin configuration.

### Configuring Breakpoints in Vite

In a Vite setup, the Kuma UI plugin configuration looks like this:

```js
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import kumaUI from "@kuma-ui/vite";

export default defineConfig({
  plugins: [
    react({
      jsxRuntime: "classic",
    }),
    kumaUI({
      breakpoints: { sm: "400px", md: "700px" },
    }),
  ],
});
```

### Configuring Breakpoints in Next.js

For a Next.js project, use the withKumaUI function from the @kuma-ui/next-plugin package. Here's how you can configure it:

```js
const { withKumaUI } = require("@kuma-ui/next-plugin");

const nextConfig = {
  reactStrictMode: true,
};

module.exports = withKumaUI(nextConfig, {
  breakpoints: {
    sm: "700px",
    md: "1200px",
  },
});
```

## Array Syntax for Responsive Styles

Kuma UI uses array values to represent different style values for different viewport sizes, going from smaller to larger viewport widths.

Here's an example of making the `width` property responsive:

```tsx
<k.div bg='red.200' w={[300, 400, 500]} />
```

This array is interpreted in relation to the breakpoints defined in the Kuma UI configuration:

- `300px`: From 0em upwards
- `400px`: From the configured "sm" breakpoint upwards
- `500px`: From the configured "md" breakpoint upwards

## Responsive Styles with styled API

With `styled` API, you can write media queries in your CSS as you would do traditionally. This can be useful when you want to declare styles that don't depend on the pre-defined breakpoints.

Here's an example:

```tsx
const Box = styled("div")`
  display: flex;
  flex-direction: row;
  @media (max-width: 768px) {
      flex-direction: column;
  }
`;
```

In this example, we used CSS media query `@media (max-width: 768px)` inside the styled component to make styles responsive. When the viewport is less than or equal to 768px, flex-direction changes to column. This makes Kuma UI a powerful tool for building responsive design layouts.