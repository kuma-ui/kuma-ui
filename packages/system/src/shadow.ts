import { CSSProperties, ResponsiveStyle, ValueConverter } from "./types";
import { ShadowKeys } from "./keys";
import { applyResponsiveStyles } from "./responsive";

export type ShadowProps = Partial<CSSProperties<"boxShadow" | "textShadow">>;

export const shadowMappings: Record<ShadowKeys, string> = {
  boxShadow: "box-shadow",
  textShadow: "text-shadow",
} as const;

export const shadowConverters: Partial<Record<ShadowKeys, ValueConverter>> = {};

export const shadow = (props: ShadowProps): ResponsiveStyle => {
  let base = "";
  const media: ResponsiveStyle["media"] = {};

  for (const key in shadowMappings) {
    const cssValue = props[key as ShadowKeys];
    if (cssValue != undefined) {
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
