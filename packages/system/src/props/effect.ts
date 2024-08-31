import { EffectKeys } from "../keys";
import { CSSProperties } from "../types";

export type EffectProps = Partial<
  CSSProperties<
    | "transition"
    | "transitionDuration"
    | "transitionProperty"
    | "transitionTimingFunction"
    | "transitionDelay"
    | "transform"
    | "transformBox"
    | "transformOrigin"
    | "transformStyle"
    | "clipPath"
    | "content"
    | "contentVisibility"
  >
>;

export const effectMappings: Record<EffectKeys, string> = {
  transition: "transition",
  transitionDuration: "transition-duration",
  transitionProperty: "transition-property",
  transitionTimingFunction: "transition-timing-function",
  transitionDelay: "transition-delay",
  transform: "transform",
  transformBox: "transform-box",
  transformOrigin: "transform-origin",
  transformStyle: "transform-style",
  clipPath: "clip-path",
  content: "content",
  contentVisibility: "content-visibility",
} as const;
