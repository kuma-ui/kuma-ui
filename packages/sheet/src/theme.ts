export const defaultBreakpoints = Object.freeze({
  sm: "576px",
  md: "768px",
  lg: "992px",
  xl: "1200px",
});

// to avoid cyclic dependency, we declare an exact same type declared in @kuma-ui/core
type ComponentName =
  | "Box"
  | "Flex"
  | "Spacer"
  | "Text"
  | "Button"
  | "Heading"
  | "Input"
  | "Select"
  | "HStack"
  | "VStack"
  | "Image"
  | "Link"
  | "Grid";

export type UserTheme = {
  colors: Record<string, string> | undefined;
  breakpoints: Record<string, string>;
  components?: {
    [_ in ComponentName]?: {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any -- FIXME
      baseStyle?: any;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any -- FIXME
      variants?: { [key: string]: any };
    };
  };
};

declare global {
  // eslint-disable-next-line no-var
  var __KUMA_USER_THEME__: UserTheme | undefined;
}

export class Theme {
  private static instance: Theme;
  private _userTheme: UserTheme = {
    colors: globalThis.__KUMA_USER_THEME__?.colors,
    breakpoints:
      globalThis.__KUMA_USER_THEME__?.breakpoints ?? defaultBreakpoints,
    components: globalThis.__KUMA_USER_THEME__?.components,
  };

  private constructor() {}

  static getInstance() {
    if (!Theme.instance) {
      Theme.instance = new Theme();
    }
    return Theme.instance;
  }

  setUserTheme(userTheme: Partial<UserTheme>) {
    if (Object.keys(userTheme.breakpoints || {}).length === 0) {
      delete userTheme.breakpoints;
    }
    this._userTheme = {
      ...this._userTheme,
      ...userTheme,
    };
  }

  getUserTheme() {
    return this._userTheme;
  }

  getVariants(componentName: ComponentName):
    | {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any -- FIXME
        baseStyle?: any;
        variants?:
          | {
              // eslint-disable-next-line @typescript-eslint/no-explicit-any -- FIXME
              [key: string]: any;
            }
          | undefined;
      }
    | undefined {
    return this._userTheme.components?.[componentName] || {};
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
