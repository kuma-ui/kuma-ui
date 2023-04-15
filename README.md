# Zero-Styled

Zero-Styled is a utility-first, zero-runtime CSS-in-JS library that delivers outstanding developer experience and optimized performance.


```tsx
import { styled } from "zero-styled/styled";
import {
  typography,
  compose,
  color,
  all,
  TypographyProps,
  ColorProps,
  StyledProps,
} from "zero-styled/system";

function App() {
  return (
    <VStack p={[4, 8]} m="2px">
      <Text
        fontSize="40px"
        _hover={{ color: "orange"}}
      >
        hello world
      </Text>
    </VStack>
  );
}

export const VStack = styled("div")<StyledProps>`
  ${all}
  display: flex;
  flex-direction: column;
`;

const Text = styled("p")<TypographyProps & ColorProps>`
  ${compose(color, typography)}
`;
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
