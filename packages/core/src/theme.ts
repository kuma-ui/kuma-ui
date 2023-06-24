import {
  FlattenObject,
  NestedObject,
  Pretty,
  flattenObject,
} from "./utils/object";
import { If, IsAny, Stringify, _String } from "./utils/types";
import { componentList } from "./components/componentList";

type ThemeInput = {
  colors?: NestedObject<string>;
  breakpoints?: Record<string, string>;
  components?: {
    [_ in keyof typeof componentList]?: {
      base?: any;
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

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface Theme {}

//　@ts-expect-error　To inject types, the user needs to provide values, which are not present by default.
type ThemeColors = Theme["colors"];
//　@ts-expect-error　To inject types, the user needs to provide values, which are not present by default.
type ThemeComponents = Theme["components"];

export type ThemeSystem = {
  colors: If<IsAny<ThemeColors>, _String, Stringify<keyof ThemeColors>>;
  components: If<
    IsAny<ThemeComponents>,
    _String,
    Stringify<keyof ThemeComponents>
  >;
};

export function createTheme<const T extends ThemeInput>(
  theme: T
): ThemeResult<T> {
  return {
    colors: theme.colors ? flattenObject({ colors: theme.colors }) : undefined,
    components: theme.colors
      ? flattenObject({ colors: theme.colors })
      : undefined,
  } as unknown as ThemeResult<T>;
}

const s = createTheme({
  colors: {
    red: "red",
  },
  components: {
    Box: {
      base: {
        color: "red",
      },
      variants: {
        primary: {
          color: "red",
        },
      },
    },
  },
});
