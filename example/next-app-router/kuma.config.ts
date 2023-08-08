import { createTheme } from "@kuma-ui/core";

const theme = createTheme({
  colors: {
    red: {
      100: "red",
    },
    blue: "blue",
    green: "green",
  },

  fontSizes: {
    x: "100px",
    y: {
      z: "200px",
    },
  },
  fonts: {
    a: "font a",
  },
  fontWeights: {
    super_bold: "bold",
  },
  letterSpacings: {
    space_200: ".2rem",
  },
  lineHeights: {
    sx: "300",
  },
  components: {
    Box: {
      baseStyle: {
        color: "ThemeBoxRed",
      },
      variants: {
        action: {
          bg: "pink",
        },
        action2: {
          bg: "red",
        },
      },
    },
    Flex: {
      baseStyle: {
        color: "gray",
      },
      variants: {
        action: {
          color: "orange",
        },
      },
    },
  },
  breakpoints: {
    sm: "1000px",
  },
});

type UserTheme = typeof theme;

declare module "@kuma-ui/core" {
  export interface Theme extends UserTheme {}
}

export default theme;
