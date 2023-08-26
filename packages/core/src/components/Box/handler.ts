import { theme } from "@kuma-ui/sheet";
import { StyledProps } from "@kuma-ui/system";

export const defaultBoxTag = "div";

// eslint-disable-next-line @typescript-eslint/ban-types
export type BoxSpecificProps = {};

const boxSpecificProps: (keyof BoxSpecificProps)[] = [];

export const isBoxProps = (propName: unknown): propName is BoxSpecificProps => {
  return boxSpecificProps.some((k) => k === propName);
};

export const boxDefaultProps: StyledProps = {};

export const boxHandler = (props: BoxSpecificProps) => ({});
