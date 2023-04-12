# Zero-Styled

Zero-Styled is a utility-first, zero-runtime CSS-in-JS library that delivers outstanding developer experience and optimized performance.


```tsx
import styled from "zero-styled/styled";
import { typography, all, compose, color } from "zero-styled/system";

function App() {
  return (
    <Box p={[4, 8]} m="2px" fontSize={["22px", "44px"]} display="flex">
      <Text fontSize={40} color={["red", "blue"]}>
        hello world
      </Text>
    </Box>
  );
}

const Box = styled("div")`
  ${all}
`;

const Text = styled("p")`
  ${compose(color, typography)}
`;
```

# Features

- Blazing-fast performance with zero-runtime CSS extraction
- Build-time CSS generation
- Responsive design with breakpoints and media queries
- Utility-first approach for rapid UI development

# Contributing
Contributions are welcome! Please feel free to submit issues or pull requests with any improvements or suggestions.

# License
MIT
