import { toCssUnit } from "./toCSS";
import { TypographyKeys } from "./keys";
import {
  ResponsiveStyle,
  CSSProperties,
  ThemeSystemType,
  AddProperty,
  ValueConverter,
} from "./types";

export type TypographyProps<T extends ThemeSystemType = ThemeSystemType> =
  Partial<
    CSSProperties<"hyphenateCharacter" | "hyphens"> &
      CSSProperties<"hyphenateLimitChars", true> &
      CSSProperties<"hangingPunctuation"> &
      AddProperty<CSSProperties<"lineHeight", true>, T["lineHeights"]> &
      CSSProperties<"lineBreak"> &
      CSSProperties<"orphans", true> &
      CSSProperties<"quotes"> &
      CSSProperties<"rubyPosition"> &
      CSSProperties<"unicodeBidi"> &
      CSSProperties<"widows", true> &
      CSSProperties<"whiteSpace"> &
      AddProperty<CSSProperties<"letterSpacing", true>, T["letterSpacings"]> &
      CSSProperties<"wordSpacing", true> &
      CSSProperties<"wordBreak" | "writingMode">
  >;

export const typographyMappings: Record<TypographyKeys, string> = {
  hyphenateCharacter: "hyphenate-character",
  hyphenateLimitChars: "hyphenate-limit-chars",
  hyphens: "hyphens",
  hangingPunctuation: "hanging-punctuation",
  lineHeight: "line-height",
  lineBreak: "line-break",
  orphans: "orphans",
  quotes: "quotes",
  rubyPosition: "ruby-position",
  unicodeBidi: "unicode-bidi",
  widows: "widows",
  whiteSpace: "white-space",
  letterSpacing: "letter-spacing",
  wordBreak: "word-break",
  wordSpacing: "word-spacing",
  writingMode: "writing-mode",
} as const;

export const typographyConverters: Partial<
  Record<TypographyKeys, ValueConverter>
> = {
  wordSpacing: toCssUnit,
  letterSpacing: toCssUnit,
};
