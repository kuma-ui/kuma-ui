import { PositionKeys } from "./keys";
import { toCssUnit } from "./toCSS";
import { CSSProperties, ResponsiveStyle, ValueConverter } from "./types";
import { applyResponsiveStyles } from "./responsive";

export type PositionProps = Partial<
  CSSProperties<"top" | "right" | "left" | "bottom" | "inset", true>
>;

export const positionMappings: Record<PositionKeys, string> = {
  top: "top",
  right: "right",
  left: "left",
  bottom: "bottom",
  inset: "inset",
};

export const positionConverters: Partial<Record<PositionKeys, ValueConverter>> =
  Object.fromEntries(
    Object.keys(positionMappings).map((key) => [key, toCssUnit]),
  );
