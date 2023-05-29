---
title: "API"
description: Explore Kuma UI's main APIs - k, css, and styled - and learn how they provide a flexible, efficient workflow for styling React applications.
---

Kuma UI provides three main APIs that you can use to style your React components: `k`, `css`, and `styled`.

These powerful tools, when combined, provide an **extraordinarily flexible and streamlined workflow** for developing applications with optimal performance and maximum developer efficiency. Let's take a closer look at each of these APIs:

## `k`

The `k` API allows you to use utility style props directly on a React component. These elements accept utility props for inline styling that are type-safe and intuitively named. This means you can apply styles directly on the components while maintaining code readability and ease of use.

Here's a simple example of how you can use the `k` API:

```tsx
import { k } from "@kuma-ui/core";

function App() {
  return (
    <k.div p={4} m={["2px", "4px"]} _hover={{ flexDir: "row" }}>
      Hello world
    </k.div>
  );
}
```

In this example, we used the `k.div` component and styled it using utility props. The `p` and `m` props correspond to padding and margin, respectively. Note how we can provide an array to the `m` prop for responsive margin values, a feature we'll explore in detail in a later section.

## `css`

The `css` function allows you to define a set of styles as a JavaScript object and generates a unique className that you can apply to your components. 

```tsx
import { css } from "@kuma-ui/core";

const styles = css({ color: 'red', fontSize: '24px' });

function App() {
  return <div className={styles}>Hello world!</div>;
}
```

In this example, the `css` function takes an object of styles and returns a className string. This className can then be applied to your component using the `className` prop.

## `styled`

The `styled` API works just like `styled-components` or `Emotion`, allowing you to create styled React components using tagged template literals. This makes it a familiar and comfortable choice for developers who have worked with these libraries.

```tsx
const H2 = styled("h2")`
  margin-top: 2rem;
  margin-bottom: 0.5rem;
  line-height: 1.3;
  font-weight: 600;
  font-size: 1.5rem;
  letter-spacing: -0.025em;
  scroll-margin-block: 6.875rem;
`;

// Then use it like so:
<H2>{title}</H2>
```

In this example, we've defined a styled H2 component with a set of CSS properties and then used it just like any other React component.