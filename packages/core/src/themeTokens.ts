import { Theme } from "./theme";
import { FlattenObject, NestedObject, Pretty } from "./utils/object";
import { If, IsNever, _String, Stringify } from "./utils/types";

type ThemeTokens<T extends string> = Theme extends Record<T, unknown>
  ? Theme[T]
  : never;

type Tokens = "colors" | "fonts" | "breakpoints";

export type InputThemeTokens = Partial<Record<Tokens, NestedObject<string>>>;

export type ResultThemeTokens<T extends InputThemeTokens> = {
  [K in keyof T]: Pretty<FlattenObject<Pick<T, K>>>;
};

export type SystemThemeTokens = {
  [K in Tokens]: If<
    IsNever<ThemeTokens<K>>,
    _String,
    Stringify<keyof ThemeTokens<K>>
  >;
};
