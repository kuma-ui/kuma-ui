import { toCssUnit } from "./toCSS";
import { TypographyKeys } from "./keys";
import {
  ResponsiveStyle,
  CSSProperties,
  ThemeSystemType,
  AddProperty,
} from "./types";
import { applyResponsiveStyles } from "./responsive";

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

export const typography = (props: TypographyProps): ResponsiveStyle => {
  let baseStyles = "";
  const mediaStyles: ResponsiveStyle["media"] = {};

  for (const key in typographyMappings) {
    const cssValue = props[key as TypographyKeys];
    if (cssValue != undefined) {
      const property = typographyMappings[key as TypographyKeys];

      const converter = (value: string | number): string | number => {
        if (property === "word-spacing" || property === "letter-spacing") {
          return toCssUnit(value);
        }
        return value;
      };

      const responsiveStyles = applyResponsiveStyles(
        property,
        cssValue,
        converter
      );
      baseStyles += responsiveStyles.base;
      for (const [breakpoint, css] of Object.entries(responsiveStyles.media)) {
        if (mediaStyles[breakpoint]) mediaStyles[breakpoint] += css;
        else mediaStyles[breakpoint] = css;
      }
    }
  }
  return { base: baseStyles, media: mediaStyles };
};
