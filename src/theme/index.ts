export const defaultBreakpoints = Object.freeze({
  sm: "576px",
  md: "768px",
  lg: "992px",
  xl: "1200px",
});

export class Theme {
  private static instance: Theme;
  private _breakpoints: Record<string, string>;

  constructor() {
    this._breakpoints = defaultBreakpoints;
    if (Theme.instance) {
      throw new Error("You can only create one instance!");
    }
    Theme.instance = this;
  }

  setBreakpoints(breakpoints: Record<string, string>) {
    this._breakpoints = breakpoints;
  }

  getBreakpoints(): Record<string, string> {
    return this._breakpoints;
  }

  reset() {
    this._breakpoints = defaultBreakpoints;
  }
}

export const theme = new Theme();
