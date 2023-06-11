import {
  FlattenObject,
  NestedObject,
  Pretty,
  flattenObject,
} from "./utils/object";

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
export type ThemeColors = Theme['colors'];

export function createTheme<const T extends ThemeInput>(
  theme: T
): ThemeResult<T> {
  return {
    colors: theme.colors ? flattenObject({ colors: theme.colors }) : undefined,
  } as unknown as ThemeResult<T>;
}
