import { StyledProps } from "@kuma-ui/system";

export const defaultLinkTag = "a";

// eslint-disable-next-line @typescript-eslint/ban-types
export type LinkSpecificProps = {};

const linkSpecificProps: (keyof LinkSpecificProps)[] = [];

export const isLinkProps = (
  propName: unknown
): propName is LinkSpecificProps => {
  return linkSpecificProps.some((k) => k === propName);
};

export const linkDefaultProps: StyledProps = {
  cursor: "pointer",
};

export const linkHandler = (props: LinkSpecificProps) => ({});
