import { theme } from "@kuma-ui/sheet";
import { StyleGenerator, StyledProps } from "@kuma-ui/system";
import { toCssUnit } from "@kuma-ui/system";

export type SpacerSpecificProps = {
  horizontal?: boolean;
  size?: number | string;
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

export const spacerHandler = (props: SpacerSpecificProps): StyledProps => {
  if (!props.horizontal && !props.size) return {};
  const px =
    typeof props.size === "number"
      ? toCssUnit(props.size)
      : // eslint-disable-next-line no-extra-boolean-cast -- FIXME
      !!props.size
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
