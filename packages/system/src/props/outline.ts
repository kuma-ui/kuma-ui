import { OutlineKeys } from "../keys";
import { CSSProperties } from "../types";

export type OutlineProps = Partial<
  CSSProperties<"outline"> &
    CSSProperties<"outlineOffset", true> &
    CSSProperties<"outlineWidth", true> &
    CSSProperties<"outlineStyle">
>;

export const outlineMappings: Record<OutlineKeys, string> = {
  outline: "outline",
  outlineOffset: "outline-offset",
  outlineWidth: "outline-width",
  outlineStyle: "outline-style",
} as const;
