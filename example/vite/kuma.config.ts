import { createTheme } from "@kuma-ui/core";

const theme = createTheme({
  colors: {
    red: 'red',
    blue: {
      light: "blue"
    },
    green: "green",
  },
});

type UserTheme = typeof theme;

declare module "@kuma-ui/core" {
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  export interface Theme extends UserTheme {}
}

export default theme;
