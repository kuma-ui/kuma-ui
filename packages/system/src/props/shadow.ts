import { CSSProperties, ResponsiveStyle, ValueConverter } from "../types";
import { ShadowKeys } from "../keys";
import { applyResponsiveStyles } from "../responsive";

export type ShadowProps = Partial<CSSProperties<"boxShadow" | "textShadow">>;

export const shadowMappings: Record<ShadowKeys, string> = {
  boxShadow: "box-shadow",
  textShadow: "text-shadow",
} as const;

export const shadowConverters: Partial<Record<ShadowKeys, ValueConverter>> = {};
