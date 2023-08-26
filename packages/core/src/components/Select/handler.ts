import { StyledProps } from "@kuma-ui/system";

export const defaultSelectTag = "select";

// eslint-disable-next-line @typescript-eslint/ban-types
export type SelectSpecificProps = {};

const selectSpecificProps: (keyof SelectSpecificProps)[] = [];

export const isSelectProps = (
  propName: unknown
): propName is SelectSpecificProps => {
  return selectSpecificProps.some((k) => k === propName);
};

export const selectDefaultProps: StyledProps = {};

export const selectHandler = (props: SelectSpecificProps) => ({});
