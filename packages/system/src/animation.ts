import { AnimationKeys } from "./keys";
import { CSSProperties, ResponsiveStyle, ValueConverter } from "./types";
import { applyResponsiveStyles } from "./responsive";

export type AnimationProps = Partial<
  CSSProperties<
    | "animation"
    | "animationComposition"
    | "animationDelay"
    | "animationDirection"
    | "animationDuration"
    | "animationFillMode"
    | "animationName"
    | "animationPlayState"
    | "animationTimeline"
    | "animationTimingFunction"
  > &
    CSSProperties<"animationIterationCount", true>
>;

export const animationMappings: Record<AnimationKeys, string> = {
  animation: "animation",
  animationComposition: "animation-composition",
  animationDelay: "animation-delay",
  animationDirection: "animation-direction",
  animationDuration: "animation-duration",
  animationFillMode: "animation-fill-mode",
  animationName: "animation-name",
  animationIterationCount: "animation-iteration-count",
  animationPlayState: "animation-play-state",
  animationTimeline: "animation-timeline",
  animationTimingFunction: "animation-timing-function",
};

export const animationConverters: Partial<
  Record<AnimationKeys, ValueConverter>
> = {};
