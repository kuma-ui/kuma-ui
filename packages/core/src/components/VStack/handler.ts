import { StyledProps } from "@kuma-ui/system";

export const defaultVStackTag = "div";

// eslint-disable-next-line @typescript-eslint/ban-types
export type VStackSpecificProps = {};

const vstackSpecificProps: (keyof VStackSpecificProps)[] = [];

export const isVStackProps = (
  propName: unknown,
): propName is VStackSpecificProps => {
  return vstackSpecificProps.some((k) => k === propName);
};

export const vstackDefaultProps: StyledProps = {
  display: "flex",
  flexDir: "column",
};

export const vstackHandler = (props: VStackSpecificProps) => ({});
