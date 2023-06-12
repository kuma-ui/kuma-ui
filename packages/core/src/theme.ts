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

//　@ts-expect-error type
type ThemeColors = Theme["colors"];

export type ThemeSystem = {
  colors: If<IsAny<ThemeColors>, _String, Stringify<keyof ThemeColors>>;
};

export function createTheme<const T extends ThemeInput>(
  theme: T
): ThemeResult<T> {
  return {
    colors: theme.colors ? flattenObject({ colors: theme.colors }) : undefined,
  } as unknown as ThemeResult<T>;
}
