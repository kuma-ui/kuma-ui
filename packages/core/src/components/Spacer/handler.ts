import { theme } from "@kuma-ui/sheet";
import { StyleGenerator, StyledProps } from "@kuma-ui/system";
import { toCssUnit } from "@kuma-ui/system";

export const defaultSpacerTag = "div";

export type SpacerSpecificProps = {
  horizontal?: boolean;
  size?: number | string;
};

const spacerSpecificProps: (keyof SpacerSpecificProps)[] = [
  "horizontal",
  "size",
];

export const isSpacerProps = (
  propName: unknown,
): propName is SpacerSpecificProps => {
  return spacerSpecificProps.some((k) => k === propName);
};

export const spacerDefaultProps: StyledProps = {};

export const spacerHandler = (props: SpacerSpecificProps): StyledProps => {
  if (!props.horizontal && !props.size) return {};
  const px =
    typeof props.size === "undefined" ? "0px" : toCssUnit("width", props.size);

  return props.horizontal
    ? {
        width: px,
        height: "auto",
        display: "inline-block",
        flexShrink: 0,
      }
    : { width: "auto", height: px, display: "block", flexShrink: 0 };
};
