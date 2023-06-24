import {
  FlattenObject,
  NestedObject,
  Pretty,
  flattenObject,
} from "./utils/object";
import { If, IsAny, Stringify, _String } from "./utils/types";

type ThemeInput = {
  colors?: NestedObject<string>;
};

type ThemeResult<T extends ThemeInput> = Pretty<{
  colors: T["colors"] extends NestedObject<string>
    ? Pretty<FlattenObject<Pick<T, "colors">>>
    : undefined;
}>;

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface Theme {}

//　@ts-expect-error　To inject types, the user needs to provide values, which are not present by default.
type ThemeColors = Theme["colors"];
//　@ts-expect-error　To inject types, the user needs to provide values, which are not present by default.
type ThemeComponents = Theme["components"];

export type ThemeSystem = {
  colors: If<IsAny<ThemeColors>, _String, Stringify<keyof ThemeColors>>;
  components: {
    baseStyle: "Style",
    variants: {
      [key: string]: "Style"
    }
  }
};

export function createTheme<const T extends ThemeInput>(
  theme: T
): ThemeResult<T> {
  return {
    colors: theme.colors ? flattenObject({ colors: theme.colors }) : undefined,
  } as unknown as ThemeResult<T>;
}
