import { CSSProperties } from "../types";
import { ShadowKeys } from "../keys";

export type ShadowProps = Partial<CSSProperties<"boxShadow" | "textShadow">>;

export const shadowMappings: Record<ShadowKeys, string> = {
  boxShadow: "box-shadow",
  textShadow: "text-shadow",
} as const;
