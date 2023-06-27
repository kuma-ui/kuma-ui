import { UserTheme } from "./theme";

class GlobalSheet {
  private theme: UserTheme;

  private constructor(theme: UserTheme) {
    this.theme = theme;
  }
}
