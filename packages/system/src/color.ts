import { ColorKeys } from "./keys";
import { CSSProperties, CSSValue, ResponsiveStyle } from "./types";
import { applyResponsiveStyles } from "./responsive";

export type ColorProps = Partial<
  {
    /**
     * @see background
     */
    bg: CSSValue<"background">;
    /**
     * @see backgroundColor
     */
    bgColor: CSSValue<"backgroundColor">;
  } & CSSProperties<
    | "borderColor"
    | "outlineColor"
    | "color"
    | "accentColor"
    | "caretColor"
    | "opacity"
  >
>;

const colorMappings: Record<ColorKeys, string> = {
  bg: "background",
  bgColor: "background-color",
  color: "color",
  borderColor: "border-color",
  outlineColor: "outline-color",
  accentColor: "accent-color",
  caretColor: "caret-color",
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
