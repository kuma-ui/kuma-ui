import { FontKeys } from "../keys";
import { CSSProperties, AddProperty, ThemeSystemType } from "../types";

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

export const fontMappings: Record<FontKeys, string> = {
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
