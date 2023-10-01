import { StyledProps } from "@kuma-ui/system";

export const defaultFlexTag = "div";

// eslint-disable-next-line @typescript-eslint/ban-types
export type FlexSpecificProps = {};

const flexSpecificProps: (keyof FlexSpecificProps)[] = [];

export const isFlexProps = (
  propName: unknown,
): propName is FlexSpecificProps => {
  return flexSpecificProps.some((k) => k === propName);
};

export const flexDefaultProps: StyledProps = {
  display: "flex",
};

export const flexHandler = (props: FlexSpecificProps) => ({});
