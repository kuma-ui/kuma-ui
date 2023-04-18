import { ResponsiveStyle } from "./types";
import { ShadowKeys } from "./keys";
import { applyResponsiveStyles } from "./responsive";

export type ShadowProps = Partial<Record<ShadowKeys, string | string[]>>;

const shadowMappings: Record<ShadowKeys, string> = {
  boxShadow: "box-shadow",
  textShadow: "text-shadow",
} as const;

export const shadow = (props: ShadowProps): ResponsiveStyle => {
  let base = "";
  const media: ResponsiveStyle["media"] = {};

  for (const key in shadowMappings) {
    const cssValue = props[key as ShadowKeys];
    if (cssValue) {
      const property = shadowMappings[key as ShadowKeys];
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
