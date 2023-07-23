import { toCssUnit } from "./toCSS";
import { LayoutKeys } from "./keys";
import { CSSProperties, ResponsiveStyle } from "./types";
import { applyResponsiveStyles } from "./responsive";

export type LayoutProps = Partial<
  CSSProperties<"width" | "minWidth" | "maxWidth", true> &
    CSSProperties<"height" | "minHeight" | "maxHeight", true> &
    CSSProperties<"display" | "overflow" | "position"> &
    CSSProperties<"zIndex", true> &
    CSSProperties<"cursor">
>;

const layoutMappings: Record<LayoutKeys, string> = {
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

export const layout = (props: LayoutProps): ResponsiveStyle => {
  let base = "";
  const media: ResponsiveStyle["media"] = {};
  for (const key in layoutMappings) {
    const cssValue = props[key as LayoutKeys];
    if (cssValue != undefined) {
      const property = layoutMappings[key as LayoutKeys];
      const converter = [
        layoutMappings.width,
        layoutMappings.minWidth,
        layoutMappings.maxWidth,
        layoutMappings.height,
        layoutMappings.minHeight,
        layoutMappings.maxHeight,
      ].includes(property)
        ? toCssUnit
        : undefined;
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
