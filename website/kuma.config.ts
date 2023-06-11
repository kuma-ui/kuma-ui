import { createTheme } from "@kuma-ui/core";

const theme = createTheme({
  colors: {
    red: {
      dark: "#ff0000",
      light: "#ff0000",
      red:{
        red: {
          red: {
            red: 'red'
          }
        }
      }
    },
    blue: "#00ff00",
    green: "#00ff00",
  },
});

type Theme = typeof theme;

declare module "@kuma-ui/core" {
  export interface ThemeInput extends Theme {}
}

export default theme;
