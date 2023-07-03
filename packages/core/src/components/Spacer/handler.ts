import { theme } from "@kuma-ui/sheet";
import { StyleGenerator, StyledProps } from "@kuma-ui/system";
import { toCssUnit } from "@kuma-ui/system";

// eslint-disable-next-line @typescript-eslint/ban-types
export type SpacerSpecificProps = {
  horizontal: boolean;
  size: number | string;
};

const spacerSpecificProps: (keyof SpacerSpecificProps)[] = [
  "horizontal",
  "size",
];

export const isSpacerProps = (
  propName: unknown
): propName is SpacerSpecificProps => {
  return spacerSpecificProps.some((k) => k === propName);
};

export const spacerDefaultProps: StyledProps = {};

export const spacerHandler = (
  props: Partial<SpacerSpecificProps>
): StyledProps => {
  const px =
    typeof props.size === "number"
      ? toCssUnit(props.size)
      : !!props.size
      ? props.size
      : "0px";

  return props.horizontal
    ? {
        width: px,
        height: "auto",
        display: "inline-block",
        flexShrink: 0,
      }
    : { width: "auto", height: px, display: "block", flexShrink: 0 };
};
