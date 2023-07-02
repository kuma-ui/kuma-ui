import { theme } from "@kuma-ui/sheet";
import { StyleGenerator } from "@kuma-ui/system";

// eslint-disable-next-line @typescript-eslint/ban-types
export type BoxSpecificProps = {};

const boxSpecificProps: (keyof BoxSpecificProps)[] = [];

export const isBoxProps = (propName: unknown): propName is BoxSpecificProps => {
  return boxSpecificProps.some((k) => k === propName);
};

export const boxHandler = (props: BoxSpecificProps) => ({});
