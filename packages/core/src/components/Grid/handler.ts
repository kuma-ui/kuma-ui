import { StyledProps } from "@kuma-ui/system";

// eslint-disable-next-line @typescript-eslint/ban-types
export type GridSpecificProps = {};

const gridSpecificProps: (keyof GridSpecificProps)[] = [];

export const isGridProps = (
  propName: unknown
): propName is GridSpecificProps => {
  return gridSpecificProps.some((k) => k === propName);
};

export const gridDefaultProps: StyledProps = {
  display: "grid",
};

export const gridHandler = (props: GridSpecificProps) => ({});
