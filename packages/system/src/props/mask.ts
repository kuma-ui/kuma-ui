import { CSSProperties, ResponsiveStyle, ValueConverter } from "../types";
import { MaskKeys } from "../keys";
import { applyResponsiveStyles } from "../responsive";
import { toCssUnit } from "../toCSS";

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
