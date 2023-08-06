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
} from "./themeTokens";
import { componentList } from "./components/componentList";

export type ThemeInput = InputThemeTokens & {
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
  ResultThemeTokens<Omit<T, "components">> & ThemeComponentsResult<T>
>;

type ThemeComponentsResult<T extends ThemeInput> = {
  components: T["components"];
};

export interface Theme {}

type ThemeComponents = Theme extends { components: unknown }
  ? Theme["components"]
  : never;
export type ThemeSystem = {
  components: If<IsNever<ThemeComponents>, unknown, ThemeComponents>;
} & SystemThemeTokens;

export function createTheme<const T extends ThemeInput>(
  theme: T
): ThemeResult<T> {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment -- FIXME
  const { components, ...tokens } = theme;
  const resolvedTokens = {};
  for (const key in tokens) {
    // @ts-expect-error type
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment -- FIXME
    resolvedTokens[key] = flattenObject({ [key]: tokens[key] });
  }

  return {
    ...resolvedTokens,
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment -- FIXME
    components: components,
  } as unknown as ThemeResult<T>;
}
