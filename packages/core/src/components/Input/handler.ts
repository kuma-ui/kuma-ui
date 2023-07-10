import { StyledProps } from "@kuma-ui/system";

// eslint-disable-next-line @typescript-eslint/ban-types
export type InputSpecificProps = {};

const inputSpecificProps: (keyof InputSpecificProps)[] = [];

export const isInputProps = (
  propName: unknown
): propName is InputSpecificProps => {
  return inputSpecificProps.some((k) => k === propName);
};

export const inputDefaultProps: StyledProps = {};

export const inputHandler = (props: InputSpecificProps) => ({});
