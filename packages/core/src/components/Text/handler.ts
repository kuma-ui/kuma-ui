import { theme } from "@kuma-ui/sheet";
import { StyleGenerator, StyledProps } from "@kuma-ui/system";

export const defaultTextTag = "p";

// eslint-disable-next-line @typescript-eslint/ban-types
export type TextSpecificProps = {};

const textSpecificProps: (keyof TextSpecificProps)[] = [];

export const isTextProps = (
  propName: unknown
): propName is TextSpecificProps => {
  return textSpecificProps.some((k) => k === propName);
};

export const textDefaultProps: StyledProps = {};

export const textHandler = (props: TextSpecificProps) => ({});
