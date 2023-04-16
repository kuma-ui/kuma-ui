# Zero-Styled

Zero-Styled is a utility-first, zero-runtime CSS-in-JS library that offers an outstanding developer experience and optimized performance.


```tsx
import { styled } from "zero-styled/styled";
import { TypographyProps, ColorProps } from "zero-styled/system";

function App() {
  return (
    <VStack p={[4, 8]} m="2px" _hover={{ flexDir: "row" }}>
      <Text fontSize="40px" color="orange">
        hello world
      </Text>
    </VStack>
  );
}

export const VStack = styled("div")`
  display: flex;
  flex-direction: column;
`;

// You can also explicitly specify the StyledProps generic type like this:
const Text = styled("p")<TypographyProps & ColorProps>``;

export default App;

```

# Features

🔥 &nbsp; Blazing-fast performance with zero-runtime CSS extraction
🦄 &nbsp; Build-time CSS generation
🌳 &nbsp; Responsive design with breakpoints and media queries
🎨 &nbsp; Utility-first approach for rapid UI development

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

**vite.config.ts**

```js:vite.config.ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import zeroStyled from "zero-styled/vite";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react({
      jsxRuntime: "classic",
    }),
    zeroStyled(),
  ],
});
```

# Contributing
Contributions are welcome! Please feel free to submit issues or pull requests with any improvements or suggestions.

# License
MIT
