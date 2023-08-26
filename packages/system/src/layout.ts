import { toCssUnit } from "./toCSS";
import { LayoutKeys } from "./keys";
import {
  AddProperty,
  CSSProperties,
  ResponsiveStyle,
  ThemeSystemType,
} from "./types";
import { applyResponsiveStyles } from "./responsive";
import {
  ValueConverter,
  sizeConverter,
  zIndexConverter,
} from "./valueConverters";

export type LayoutProps<T extends ThemeSystemType = ThemeSystemType> = Partial<
  AddProperty<
    CSSProperties<"width" | "minWidth" | "maxWidth", true>,
    T["sizes"]
  > &
    AddProperty<
      CSSProperties<"height" | "minHeight" | "maxHeight", true>,
      T["sizes"]
    > &
    CSSProperties<"display" | "overflow" | "position"> &
    AddProperty<CSSProperties<"zIndex", true>, T["zIndices"]> &
    CSSProperties<"cursor">
>;

export const layoutMappings: Record<LayoutKeys, string> = {
  width: "width",
  minWidth: "min-width",
  maxWidth: "max-width",
  height: "height",
  minHeight: "min-height",
  maxHeight: "max-height",
  display: "display",
  overflow: "overflow",
  position: "position",
  zIndex: "z-index",
  cursor: "cursor",
} as const;

const converters: Partial<Record<LayoutKeys, ValueConverter>> = {
  width: sizeConverter,
  minWidth: sizeConverter,
  maxWidth: sizeConverter,
  height: sizeConverter,
  minHeight: sizeConverter,
  maxHeight: sizeConverter,
  zIndex: zIndexConverter,
};

export const layout = (props: LayoutProps): ResponsiveStyle => {
  let base = "";
  const media: ResponsiveStyle["media"] = {};
  for (const key in layoutMappings) {
    const cssValue = props[key as LayoutKeys];
    if (cssValue != undefined) {
      const property = layoutMappings[key as LayoutKeys];
      const converter = converters[key as LayoutKeys];
      const responsiveStyles = applyResponsiveStyles(
        property,
        cssValue,
        converter
      );
      base += responsiveStyles.base;
      for (const [breakpoint, css] of Object.entries(responsiveStyles.media)) {
        if (media[breakpoint]) media[breakpoint] += css;
        else media[breakpoint] = css;
      }
    }
  }

  return { base, media };
};
