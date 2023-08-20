import { toCssUnit } from "./toCSS";
import { FontKeys } from "./keys";
import {
  ResponsiveStyle,
  CSSProperties,
  AddProperty,
  ThemeSystemType,
} from "./types";
import { applyResponsiveStyles } from "./responsive";
import { theme } from "@kuma-ui/sheet";

export type FontProps<T extends ThemeSystemType = ThemeSystemType> = Partial<
  CSSProperties<"font"> &
    AddProperty<CSSProperties<"fontFamily">, T["fonts"]> &
    CSSProperties<"fontFeatureSettings"> &
    CSSProperties<"fontKerning"> &
    CSSProperties<"fontLanguageOverride"> &
    CSSProperties<"fontOpticalSizing"> &
    CSSProperties<"fontPalette"> &
    AddProperty<CSSProperties<"fontSize", true>, T["fontSizes"]> &
    CSSProperties<"fontSizeAdjust"> &
    CSSProperties<"fontStretch"> &
    CSSProperties<"fontStyle"> &
    CSSProperties<"fontSynthesis"> &
    CSSProperties<"fontVariant"> &
    CSSProperties<"fontVariantAlternates"> &
    CSSProperties<"fontVariantCaps"> &
    CSSProperties<"fontVariantEastAsian"> &
    CSSProperties<"fontVariantEmoji"> &
    CSSProperties<"fontVariantLigatures"> &
    CSSProperties<"fontVariantNumeric"> &
    CSSProperties<"fontVariantPosition"> &
    CSSProperties<"fontVariationSettings"> &
    AddProperty<CSSProperties<"fontWeight", true>, T["fontWeights"]>
>;

const fontMappings: Record<FontKeys, string> = {
  font: "font",
  fontFamily: "font-family",
  fontFeatureSettings: "font-feature-settings",
  fontKerning: "font-kerning",
  fontLanguageOverride: "font-language-override",
  fontOpticalSizing: "font-optical-sizing",
  fontPalette: "font-palette",
  fontSize: "font-size",
  fontSizeAdjust: "font-size-adjust",
  fontStretch: "font-stretch",
  fontStyle: "font-style",
  fontSynthesis: "font-synthesis",
  fontVariant: "font-variant",
  fontVariantAlternates: "font-variant-alternates",
  fontVariantCaps: "font-variant-caps",
  fontVariantEastAsian: "font-variant-east-asian",
  fontVariantEmoji: "font-variant-emoji",
  fontVariantLigatures: "font-variant-ligatures",
  fontVariantNumeric: "font-variant-numeric",
  fontVariantPosition: "font-variant-position",
  fontVariationSettings: "font-variation-settings",
  fontWeight: "font-weight",
};

export const font = (props: FontProps): ResponsiveStyle => {
  let baseStyles = "";
  const mediaStyles: ResponsiveStyle["media"] = {};

  for (const key in fontMappings) {
    const cssValue = props[key as FontKeys];
    if (cssValue != undefined) {
      const property = fontMappings[key as FontKeys];

      const userTheme = theme.getUserTheme();
      const converter = (value: string | number): string | number => {
        if (property === "font-family") {
          if (value in (userTheme.fonts ?? {})) {
            return userTheme.fonts?.[value] as string;
          }
        } else if (property === "font-size") {
          if (value in (userTheme.fontSizes ?? {})) {
            return toCssUnit(userTheme.fontSizes?.[value] as string | number);
          }
          return toCssUnit(value);
        } else if (property === "font-weight") {
          if (value in (userTheme.fontWeights ?? {})) {
            return userTheme.fontWeights?.[value] as string | number;
          }
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
