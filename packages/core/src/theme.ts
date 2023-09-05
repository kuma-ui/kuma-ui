import {
  FlattenObject,
  NestedObject,
  Pretty,
  flattenObject,
} from "./utils/object";
import { If, IsNever, Stringify, _String } from "./utils/types";
import {
  ResultThemeTokens,
  SystemThemeTokens,
  InputThemeTokens,
  NumberToken,
} from "./themeTokens";
import { componentList } from "./components/componentList";
import { StyledProps, PseudoProps, ThemeSystemType } from "@kuma-ui/system";

type StyleProps = StyledProps & PseudoProps;

type RawThemeComponent = {
  /**
   * @deprecated use `defaultProps` instead
   */
  baseStyle?: StyleProps;
  variants?: { [key: string]: StyleProps };
  defaultProps?: { variant?: string } & StyleProps & Record<string, unknown>;
};

type RawThemeComponents = {
  [_ in keyof typeof componentList]?: RawThemeComponent;
};

export type RawThemeInput = InputThemeTokens & {
  components?: RawThemeComponents;
};

type ThemeComponent<T> = {
  [K in keyof T]?: K extends "baseStyle"
    ? StyleProps
    : K extends "variants"
    ? {
        [_ in keyof T[K]]: StyleProps;
      }
    : K extends "defaultProps"
    ? {
        variant?: T extends RawThemeComponent ? keyof T["variants"] : never;
      }
    : never;
};

export type ThemeInput<T> = RawThemeInput & {
  [K in keyof T]: K extends "components"
    ? T[K] extends RawThemeComponents
      ? { [K2 in keyof T[K]]?: ThemeComponent<T[K][K2]> }
      : never
    : K extends keyof InputThemeTokens
    ? T[K] extends
        | NestedObject<K extends NumberToken ? string | number : string>
        | undefined
      ? T[K]
      : never
    : never;
};

type ThemeResult<T> = Pretty<
  ResultThemeTokens<Omit<T, "components">> & ThemeComponentsResult<T>
>;

type ThemeComponentsResult<T> = {
  components: T extends Record<"components", unknown>
    ? T["components"]
    : undefined;
};

export interface Theme {}

type ThemeComponents = Theme extends { components: unknown }
  ? Theme["components"]
  : never;
export type ThemeSystem = {
  components: If<IsNever<ThemeComponents>, unknown, ThemeComponents>;
} & SystemThemeTokens;

export function createTheme<T>(theme: ThemeInput<T>): ThemeResult<T> {
  const rawTheme = theme as RawThemeInput;
  const resolvedTokens = {};
  for (const key in rawTheme) {
    if (key !== "components") {
      // @ts-expect-error type
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment -- FIXME
      resolvedTokens[key] = flattenObject({ [key]: rawTheme[key] });
    }
  }

  return {
    ...resolvedTokens,
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment -- FIXME
    components: rawTheme.components,
  } as unknown as ThemeResult<T>;
}
