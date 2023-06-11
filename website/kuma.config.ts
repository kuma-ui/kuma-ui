import { createTheme } from "@kuma-ui/core";

const theme = createTheme({
  colors: {
    red: {
      dark: "#ff0000",
      light: "#ff0000",
      red:{
        red: {
          red: {
            100: '#ff1111'
          }
        }
      }
    },
    blue: "#00ff00",
    green: "#00ff00",
  },
});

type UserTheme = typeof theme;

declare module "@kuma-ui/core" {
  export interface Theme extends UserTheme {}
}

export default theme;
