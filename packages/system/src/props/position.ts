import { PositionKeys } from "../keys";
import { CSSProperties } from "../types";

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
