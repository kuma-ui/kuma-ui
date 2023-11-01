import { OutlineKeys } from "../keys";
import { CSSProperties, ResponsiveStyle, ValueConverter } from "../types";
import { applyResponsiveStyles } from "../responsive";
import { toCssUnit } from "../toCSS";

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

export const outlineConverters: Partial<Record<OutlineKeys, ValueConverter>> = {
  outlineWidth: toCssUnit,
  outlineOffset: toCssUnit,
};
