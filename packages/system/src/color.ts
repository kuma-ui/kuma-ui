import { ColorKeys } from "./keys";
import { CSSProperties, CSSValue, ResponsiveStyle } from "./types";
import { applyResponsiveStyles } from "./responsive";

export type ColorProps = Partial<
  {
    /**
     * @see backgroundColor
     */
    bg: CSSValue<"background">;
    /**
     * @see backgroundColor
     */
    bgColor: CSSValue<"backgroundColor">;
  } & CSSProperties<"borderColor" | "color" | "opacity">
>;

const colorMappings: Record<ColorKeys, string> = {
  bg: "background",
  bgColor: "ackground-color",
  color: "color",
  borderColor: "border-color",
  opacity: "opacity",
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
