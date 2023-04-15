# Zero-Styled

Zero-Styled is a utility-first, zero-runtime CSS-in-JS library that offers an outstanding developer experience and optimized performance.


```tsx
import { styled } from "zero-styled/styled";
import { TypographyProps, ColorProps, StyledProps } from "zero-styled/system";

function App() {
  return (
    <VStack p={[4, 8]} m="2px" _hover={{ flexDir: "row" }}>
      <Text fontSize="40px" color="orange">
        hello world
      </Text>
    </VStack>
  );
}

// VStack uses all StyledProps by default
// You can also explicitly specify the StyledProps generic type like this:
// const VStack = styled("div")<StyledProps>`...`
export const VStack = styled("div")`
  display: flex;
  flex-direction: column;
`;

// Text component is restricted to TypographyProps and ColorProps
const Text = styled("p")<TypographyProps & ColorProps>``;

export default App;

```

# Features

- Blazing-fast performance with zero-runtime CSS extraction
- Build-time CSS generation
- Responsive design with breakpoints and media queries
- Utility-first approach for rapid UI development

# Installation

```sh
npm install zero-styled
```

or 

```sh
yarn add zero-styled
```

# Setup

## Vite

```js:vite.config.cjs
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import zeroStyled from "zero-styled/vite";

export default defineConfig({
  plugins: [
    react({
      jsxRuntime: "classic",
    }),
    zeroStyled(),
  ],
  optimizeDeps: {
    include: ["@babel/core"],
  },
});
```

# Contributing
Contributions are welcome! Please feel free to submit issues or pull requests with any improvements or suggestions.

# License
MIT
