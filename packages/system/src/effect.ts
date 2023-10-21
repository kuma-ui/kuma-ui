import { EffectKeys } from "./keys";
import {
  CSSProperties,
  CSSValue,
  ResponsiveStyle,
  ValueConverter,
} from "./types";
import { applyResponsiveStyles } from "./responsive";

export type EffectProps = Partial<
  CSSProperties<
    | "transition"
    | "transitionDuration"
    | "transitionProperty"
    | "transitionTimingFunction"
    | "transitionDelay"
    | "transform"
    | "transformBox"
    | "transformOrigin"
    | "transformStyle"
    | "clipPath"
  >
>;

export const effectMappings: Record<EffectKeys, string> = {
  transition: "transition",
  transitionDuration: "transition-duration",
  transitionProperty: "transition-property",
  transitionTimingFunction: "transition-timing-function",
  transitionDelay: "transition-delay",
  transform: "transform",
  transformBox: "transform-box",
  transformOrigin: "transform-origin",
  transformStyle: "transform-style",
  clipPath: "clip-path",
} as const;

export const effectConverters: Partial<Record<EffectKeys, ValueConverter>> = {};

export const effect = (props: EffectProps): ResponsiveStyle => {
  let base = "";
  const media: ResponsiveStyle["media"] = {};

  for (const key in effectMappings) {
    const cssValue = props[key as EffectKeys];
    if (cssValue) {
      const property = effectMappings[key as EffectKeys];
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
