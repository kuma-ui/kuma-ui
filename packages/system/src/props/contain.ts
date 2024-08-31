import { CSSProperties } from "../types";

export type ContainProps = Partial<
  CSSProperties<"contain"> &
    CSSProperties<
      | "containIntrinsicBlockSize"
      | "containIntrinsicHeight"
      | "containIntrinsicInlineSize"
      | "containIntrinsicSize"
      | "containIntrinsicWidth",
      true
    >
>;

export const containMappings: Record<keyof ContainProps, string> = {
  contain: "contain",
  containIntrinsicBlockSize: "contain-intrinsic-block-size",
  containIntrinsicHeight: "contain-intrinsic-height",
  containIntrinsicInlineSize: "contain-intrinsic-inline-size",
  containIntrinsicSize: "contain-intrinsic-size",
  containIntrinsicWidth: "contain-intrinsic-width",
} as const;
