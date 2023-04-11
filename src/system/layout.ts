import { toCssUnit } from "./toCSS";
import { LayoutKeys } from "./keys";
import { ResponsiveStyle } from "./compose";
import { applyResponsiveStyles } from "./responsive";

export type LayoutProps = Partial<
  Record<LayoutKeys, string | number | (string | number)[]>
>;

const layoutMappings: Record<LayoutKeys, string> = {
  width: "width",
  height: "height",
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
      const converter = [layoutMappings.height, layoutMappings.width].includes(
        property
      )
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
