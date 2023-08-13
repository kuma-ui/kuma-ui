import { createTheme } from "@kuma-ui/core";

const theme = createTheme({
  colors: {
    red: "red",
    blue: {
      light: "blue",
    },
    green: "green",
  },
  spacings: {
    sm: "8px",
    1: "0.25rem",
    4: "1rem",
  },
  components: {
    Box: {
      baseStyle: {
        color: "green",
      },
      variants: {
        action: {
          color: "red",
        },
      },
    },
    HStack: {
      baseStyle: {
        gap: "12px",
      },
    },
    Text: {
      baseStyle: {
        color: "red",
      },
      variants: {
        primary: {
          color: "green",
        },
      },
    },
  },
});

type UserTheme = typeof theme;

declare module "@kuma-ui/core" {
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  export interface Theme extends UserTheme {}
}

export default theme;
