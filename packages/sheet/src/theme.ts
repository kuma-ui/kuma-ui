export const defaultBreakpoints = Object.freeze({
  sm: "576px",
  md: "768px",
  lg: "992px",
  xl: "1200px",
});

// to avoid cyclic dependency, we declare an exact same type declared in @kuma-ui/core
type ComponentName = "Box" | "Flex" | "Spacer" | "Text" | "Button" | "Heading";

export type UserTheme = {
  colors: Record<string, string> | undefined;
  breakpoints: Record<string, string>;
  components?: {
    [_ in ComponentName]?: {
      base?: any;
      variants?: { [key: string]: any };
    };
  };
};

export class Theme {
  private static instance: Theme;
  private _userTheme: UserTheme = {
    colors: undefined,
    breakpoints: defaultBreakpoints,
    components: undefined,
  };

  private constructor() {}

  static getInstance() {
    if (!Theme.instance) {
      Theme.instance = new Theme();
    }
    return Theme.instance;
  }

  getBreakpoints(): Record<string, string> {
    return this._userTheme.breakpoints;
  }

  setUserTheme(userTheme: UserTheme) {
    this._userTheme = userTheme;
    if (!this._userTheme.breakpoints) {
      this._userTheme.breakpoints = defaultBreakpoints;
    }
  }

  getUserTheme() {
    return this._userTheme;
  }

  reset() {
    this._userTheme = {
      colors: undefined,
      breakpoints: defaultBreakpoints,
      components: undefined,
    };
  }
}

export const theme = Theme.getInstance();
