import { ColorKeys } from "./keys";
import { CSSProperties, CSSValue, ResponsiveStyle } from "./types";
import { applyResponsiveStyles } from "./responsive";

// eslint-disable-next-line @typescript-eslint/ban-types
export type ColorProps<AutoPrefix extends string = string & {}> = Partial<
  {
    /**
     * @see background
     */
    bg: CSSValue<"background"> | AutoPrefix;
    /**
     * @see backgroundColor
     */
    bgColor: CSSValue<"backgroundColor"> | AutoPrefix;
  } & CSSProperties<"borderColor" | "color" | "opacity", false, AutoPrefix>
>;

const colorMappings: Record<ColorKeys, string> = {
  bg: "background",
  bgColor: "background-color",
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
