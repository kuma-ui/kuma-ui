import { theme } from "@kuma-ui/sheet";
import { StyleGenerator, StyledProps } from "@kuma-ui/system";

export const defaultButtonTag = "button";

// eslint-disable-next-line @typescript-eslint/ban-types
export type ButtonSpecificProps = {};

const buttonSpecificProps: (keyof ButtonSpecificProps)[] = [];

export const isButtonProps = (
  propName: unknown
): propName is ButtonSpecificProps => {
  return buttonSpecificProps.some((k) => k === propName);
};

export const buttonDefaultProps: StyledProps = {
  cursor: "pointer",
};

export const buttonHandler = (props: ButtonSpecificProps) => ({});
