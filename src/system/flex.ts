import { toCssUnit } from "./toCSS";
import { FlexKeys } from "./keys";
import { applyResponsiveStyles } from "./responsive";
import { ResponsiveStyle } from "./compose";

export type FlexProps = Partial<Record<FlexKeys, string | string[]>>;

const flexMappings: Record<FlexKeys, string> = {
  flexDir: "flex-direction",
  justify: "justify-content",
  alignItems: "align-items",
  alignContent: "align-content",
  flexWrap: "flex-wrap",
  flexGrow: "flex-grow",
  flexShrink: "flex-shrink",
  flexBasis: "flex-basis",
} as const;

export const flex = (props: FlexProps): ResponsiveStyle => {
  let base = "";
  const media: ResponsiveStyle["media"] = {};

  for (const key in flexMappings) {
    const cssValue = props[key as FlexKeys];
    if (cssValue) {
      const property = flexMappings[key as FlexKeys];
      const responsiveStyles = applyResponsiveStyles(property, cssValue);
      base += responsiveStyles.base;
      for (const [breakpoint, css] of Object.entries(responsiveStyles.media)) {
        if (media[breakpoint]) media[breakpoint] += css;
        else media[breakpoint] = css;
      }
    }
  }
  return { base, media };
};
