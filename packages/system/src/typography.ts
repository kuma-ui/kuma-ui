import { toCssUnit } from "./toCSS";
import { TypographyKeys } from "./keys";
import { ResponsiveStyle, CSSProperties } from "./types";
import { applyResponsiveStyles } from "./responsive";

export type TypographyProps = Partial<
  CSSProperties<"hyphenateCharacter" | "hyphens"> &
    CSSProperties<"hyphenateLimitChars", true> &
    CSSProperties<"hangingPunctuation"> &
    CSSProperties<"lineHeight", true> &
    CSSProperties<"lineBreak"> &
    CSSProperties<"orphans", true> &
    CSSProperties<"rubyPosition"> &
    CSSProperties<"unicodeBidi"> &
    CSSProperties<"widows", true> &
    CSSProperties<"whiteSpace"> &
    CSSProperties<"wordSpacing" | "letterSpacing", true> &
    CSSProperties<"wordBreak" | "writingMode">
>;

const typographyMappings: Record<TypographyKeys, string> = {
  hyphenateCharacter: "hyphenate-character",
  hyphenateLimitChars: "hyphenate-limit-chars",
  hyphens: "hyphens",
  hangingPunctuation: "hanging-punctuation",
  lineHeight: "line-height",
  lineBreak: "line-break",
  orphans: "orphans",
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
    if (cssValue) {
      const property = typographyMappings[key as TypographyKeys];
      const converter = [
        typographyMappings.letterSpacing,
        typographyMappings.wordSpacing,
      ].includes(property)
        ? toCssUnit
        : undefined;
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
