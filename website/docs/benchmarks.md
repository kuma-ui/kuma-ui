---
title: "Benchmarks"
description: See how Kuma UI performs compared to other CSS-in-JS libraries.
---

We know that performance is one of the crucial aspects when it comes to choosing a CSS-in-JS library for your application. In this section, we compare Kuma UI with other CSS-in-JS libraries in terms of bundle size and rendering performance.

## Rendering Performance

We conducted a benchmark to measure the rendering speed of Kuma UI against Emotion and Stitches. We measured the time it took to render 1000 components with identical styles. Here's the styling we used:

```tsx
// Emotion
import styled from "@emotion/styled";
const Button = styled.button`
  color: turquoise;
  background-color: "gainsboro";
  border-radius: "9999px";
  fontSize: "13px";
  border: "0";
`;

// Stitches
import { styled } from "@stitches/react";
const Button = styled("button", {
  color: "turquoise",
  backgroundColor: "gainsboro",
  borderRadius: "9999px",
  fontSize: "13px",
  border: "0",
});

// Kuma
import { styled } from "@kuma-ui/core";
const Button = styled("button")`
  color: turquoise;
  background-color: "gainsboro";
  border-radius: "9999px";
  fontSize: "13px";
  border: "0";
`;
```

Here are the results:

| Library | Rendering Time (ms)|
|-------|--------------|
| Emotion | 61.69 |
| Stitches | 35.30 |
| **Kuma UI** | **10.29** |


The benchmark results clearly show that Kuma UI leads in performance, rendering the components **significantly faster** than Emotion and Stitches.

## Bundle Size

Bundle size is another essential factor when choosing a library. Here's a comparison of the unpacked sizes of the three libraries:

| Library | Unpacked Size|
|-------|--------------|
| @emotion/styled | 177 kB |
| @stitches/react | 511 kB |
| **@kuma-ui/core** | **13 kB** |

As shown above, Kuma UI is not only more performant but also **incredibly lightweight**, which contributes to faster load times and a better user experience.

It's worth mentioning that Kuma UI relies on build plugins (like `@kuma-ui/webpack-plugin` or `@kuma-ui/vite`) for its zero-runtime feature. These plugins operate during the build process, and their size does not affect the final bundle size of your application. Therefore, the size of these plugins was not included in the above comparison.

Please note that these benchmark results were produced under specific conditions, and your results may vary depending on various factors such as the complexity of components, the environment in which your application is running, etc. Nonetheless, these results highlight Kuma UI's commitment to providing a performant and efficient solution for your CSS-in-JS needs.