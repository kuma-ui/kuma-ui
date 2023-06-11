export const defaultBreakpoints = Object.freeze({
  sm: "576px",
  md: "768px",
  lg: "992px",
  xl: "1200px",
});

type UserTheme = {
  colors: Record<string, string> | undefined;
}

export class Theme {
  private static instance: Theme;
  private _breakpoints: Record<string, string>;
  private _userTheme: UserTheme = {
    colors: undefined,
  };

  private constructor() {
    this._breakpoints = defaultBreakpoints;
  }

  static getInstance() {
    if (!Theme.instance) {
      Theme.instance = new Theme();
    }
    return Theme.instance;
  }

  setBreakpoints(breakpoints: Record<string, string>) {
    this._breakpoints = breakpoints;
  }

  getBreakpoints(): Record<string, string> {
    return this._breakpoints;
  }

  setUserTheme(userTheme: UserTheme) {
  this._userTheme = userTheme;
  }

  getUserTheme() {
    return this._userTheme;
  }

  reset() {
    this._breakpoints = defaultBreakpoints;
  }
}

export const theme = Theme.getInstance();
