import { CSSProperties, ResponsiveStyle, ValueConverter } from "./types";
import { MaskKeys } from "./keys";
import { applyResponsiveStyles } from "./responsive";
import { toCssUnit } from "./toCSS";

export type MaskProps = Partial<
  CSSProperties<
    | "mask"
    | "maskBorder"
    | "maskBorderMode"
    | "maskBorderRepeat"
    | "maskBorderSource"
    | "maskClip"
    | "maskComposite"
    | "maskImage"
    | "maskMode"
    | "maskOrigin"
    | "maskPosition"
    | "maskRepeat"
    | "maskType"
  > &
    CSSProperties<
      "maskBorderOutset" | "maskBorderSlice" | "maskBorderWidth" | "maskSize",
      true
    >
>;

export const maskMappings: Record<MaskKeys, string> = {
  mask: "mask",
  maskBorder: "mask-border",
  maskBorderMode: "mask-border-mode",
  maskBorderOutset: "mask-border-outset",
  maskBorderRepeat: "mask-border-repeat",
  maskBorderSlice: "mask-border-slice",
  maskBorderSource: "mask-border-source",
  maskBorderWidth: "mask-border-width",
  maskClip: "mask-clip",
  maskComposite: "mask-composite",
  maskImage: "mask-image",
  maskMode: "mask-mode",
  maskOrigin: "mask-origin",
  maskPosition: "mask-position",
  maskRepeat: "mask-repeat",
  maskSize: "mask-size",
  maskType: "mask-type",
} as const;

export const maskConverters: Partial<Record<MaskKeys, ValueConverter>> = {
  maskSize: toCssUnit,
};

export const mask = (props: MaskProps): ResponsiveStyle => {
  let base = "";
  const media: ResponsiveStyle["media"] = {};

  for (const key in maskMappings) {
    const cssValue = props[key as MaskKeys];
    if (cssValue != undefined) {
      const property = maskMappings[key as MaskKeys];
      const converter = [maskMappings.maskSize].includes(property)
        ? toCssUnit
        : undefined;
      const responsiveStyles = applyResponsiveStyles(
        property,
        cssValue,
        converter,
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
