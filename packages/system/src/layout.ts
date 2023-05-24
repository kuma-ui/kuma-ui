import { toCssUnit, toCssUnitWithPx } from "./toCSS";
import { LayoutKeys } from "./keys";
import { CSSProperties, ResponsiveStyle } from "./types";
import { applyResponsiveStyles } from "./responsive";

const withPxUnitKeys: string[] = [
  "width",
  "minWidth",
  "maxWidth",
  "height",
  "minHeight",
  "maxHeight",
];
const unitKeys: string[] = ["zIndex"];

export type LayoutProps = Partial<
  CSSProperties<"width" | "minWidth" | "maxWidth", true> &
    CSSProperties<"height" | "minHeight" | "maxHeight", true> &
    CSSProperties<"display" | "overflow" | "position"> &
    CSSProperties<"zIndex">
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
} as const;

export const layout = (props: LayoutProps): ResponsiveStyle => {
  let base = "";
  const media: ResponsiveStyle["media"] = {};
  for (const key in layoutMappings) {
    const cssValue = props[key as LayoutKeys];
    if (cssValue) {
      const property = layoutMappings[key as LayoutKeys];
      const converter = withPxUnitKeys.includes(property)
        ? toCssUnitWithPx
        : unitKeys.includes(property)
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
