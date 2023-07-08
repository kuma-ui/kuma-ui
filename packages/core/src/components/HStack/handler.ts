import { StyledProps } from "@kuma-ui/system";

// eslint-disable-next-line @typescript-eslint/ban-types
export type HStackSpecificProps = {};

const hstackSpecificProps: (keyof HStackSpecificProps)[] = [];

export const isHStackProps = (
  propName: unknown
): propName is HStackSpecificProps => {
  return hstackSpecificProps.some((k) => k === propName);
};

export const hstackDefaultProps: StyledProps = {
  display: "flex",
  flexDir: "column",
};

export const hstackHandler = (props: HStackSpecificProps) => ({});
