import { StyledProps } from "@kuma-ui/system";

// eslint-disable-next-line @typescript-eslint/ban-types
export type VStackSpecificProps = {};

const vstackSpecificProps: (keyof VStackSpecificProps)[] = [];

export const isVStackProps = (
  propName: unknown
): propName is VStackSpecificProps => {
  return vstackSpecificProps.some((k) => k === propName);
};

export const VStackDefaultProps: StyledProps = {
  display: "flex",
  flexDir: "column",
};

export const vstackHandler = (props: VStackSpecificProps) => ({});
