import {
  FlattenObject,
  NestedObject,
  Pretty,
  flattenObject,
} from "./utils/object";
import { If, IsNever, Stringify, _String } from "./utils/types";
import { componentList } from "./components/componentList";

export type ThemeInput = {
  colors?: NestedObject<string>;
  fonts?: NestedObject<string>;
  breakpoints?: Record<string, string>;
  components?: {
    [_ in keyof typeof componentList]?: {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any -- FIXME
      baseStyle?: any;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any -- FIXME
      variants?: { [key: string]: any };
    };
  };
};

type ThemeResult<T extends ThemeInput> = Pretty<
  ThemeColorResult<T> & ThemeComponentsResult<T> & ThemeBreakPointsResult<T>
>;

type ThemeColorResult<T extends ThemeInput> = {
  colors: T["colors"] extends NestedObject<string>
    ? Pretty<FlattenObject<Pick<T, "colors">>>
    : undefined;
};

type ThemeComponentsResult<T extends ThemeInput> = {
  components: T["components"];
};

type ThemeBreakPointsResult<T extends ThemeInput> = {
  breakpoints: T["breakpoints"];
};

export interface Theme {}

type ThemeColors = Theme extends { colors: unknown } ? Theme["colors"] : never;
type ThemeFonts = Theme extends { fonts: unknown } ? Theme["fonts"] : never;

type ThemeComponents = Theme extends { components: unknown }
  ? Theme["components"]
  : never;
type ThemeBreakPoints = Theme extends { breakPoints: unknown }
  ? Theme["breakPoints"]
  : never;

type ThemeTokens = {
  colors: If<IsNever<ThemeColors>, _String, Stringify<keyof ThemeColors>>;
};

export type ThemeSystem = {
  colors: If<IsNever<ThemeColors>, _String, Stringify<keyof ThemeColors>>;
  components: If<IsNever<ThemeComponents>, unknown, ThemeComponents>;
  breakpoints: If<IsNever<ThemeBreakPoints>, unknown, ThemeBreakPoints>;
};

export function createTheme<const T extends ThemeInput>(
  theme: T
): ThemeResult<T> {
  return {
    colors: theme.colors ?? flattenObject({ colors: theme.colors }),
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment -- FIXME
    components: theme.components,
    breakpoints: theme.breakpoints,
  } as unknown as ThemeResult<T>;
}
