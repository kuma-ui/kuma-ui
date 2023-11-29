import { CSSProperties } from "../types";
import { MaskKeys } from "../keys";

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
