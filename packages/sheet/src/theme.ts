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

type RuntimeUserTheme = {
  components: Record<string, Record<string, string>>;
  tokens: Record<string, string>;
  breakpoints: Record<string, string>;
};

declare global {
  // eslint-disable-next-line no-var
  var __KUMA_USER_THEME__: UserTheme | undefined;
  // eslint-disable-next-line no-var
  var __KUMA_RUNTIME_USER_THEME__: RuntimeUserTheme | undefined;
}

export class Theme {
  private static instance: Theme;
  private _runtimeUserTheme: RuntimeUserTheme =
    globalThis.__KUMA_RUNTIME_USER_THEME__ ?? {
      breakpoints: {},
      components: {},
      tokens: {},
    };
  private _userTheme: UserTheme = globalThis.__KUMA_USER_THEME__ ?? {
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

  setUserTheme(userTheme: UserTheme) {
    this._userTheme = userTheme;
  }

  setRuntimeUserTheme(runtimeUserTheme: RuntimeUserTheme) {
    this._runtimeUserTheme = runtimeUserTheme;
  }

  getUserTheme() {
    return this._userTheme;
  }

  getRuntimeUserTheme() {
    return this._runtimeUserTheme;
  }

  getVariants(
    componentName: string
  ): Record<string /*VariantKey*/, string /*VariantKey*/> {
    return this._runtimeUserTheme.components[componentName] || {};
  }

  getTokens(): Record<string, string> {
    return this._runtimeUserTheme.tokens || {};
  }

  getBreakPoints(): Record<string, string> {
    return this._runtimeUserTheme.breakpoints || {};
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
