import { createTheme } from "@kuma-ui/core";

const theme = createTheme({
  colors: {
    red: {
      100: "red",
    },
    blue: "blue",
    green: "green",
  },
  breakpoints: {
    sm: "400px",
    md: "700px",
  },
  components: {
    Button: {
      variants: {
        primary: {
          bg: "#576ddf",
          borderRadius: "14px",
          p: "16px 32px",
          color: "white",
          fontWeight: 600,
          _hover: {
            opacity: 0.8,
          },
        },
      },
    },
  },
});

type UserTheme = typeof theme;

declare module "@kuma-ui/core" {
  export interface Theme extends UserTheme {}
}

export default theme;
