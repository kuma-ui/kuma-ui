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
      baseStyle: {
        bg: "black",
        p: "10px",
      },
    },
  },
});

type UserTheme = typeof theme;

declare module "@kuma-ui/core" {
  export interface Theme extends UserTheme {}
}

export default theme;
