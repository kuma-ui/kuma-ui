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
      z: 200,
    },
  },
  fonts: {
    a: "font a",
  },
  fontWeights: {
    super_bold: "bold",
    super_bold_2: 900,
  },
  letterSpacings: {
    space_200: ".2rem",
    space_300: 300,
  },
  lineHeights: {
    sx: 300,
    s: "400",
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
