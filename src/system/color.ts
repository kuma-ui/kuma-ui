import { ColorKeys } from "./keys";
import { ResponsiveStyle } from "./compose";
import { applyResponsiveStyles } from "./responsive";

export type ColorProps = Partial<Record<ColorKeys, string>>;

const colorMappings: Record<ColorKeys, string> = {
  bg: "background-color",
  color: "color",
};

export const color = (props: ColorProps): ResponsiveStyle => {
  let base = "";
  const media: ResponsiveStyle["media"] = {};
  for (const key in colorMappings) {
    const cssValue = props[key as ColorKeys];
    if (cssValue) {
      const property = colorMappings[key as ColorKeys];
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
