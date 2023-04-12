import { StyledProps } from "../compose";

const pseudoKeys = ["_hover", "_focus"] as const;

// export type PseudoProps = Record<keyof typeof pseudoKeys, StyledProps>;

export type PseudoProps = {
  [key in (typeof pseudoKeys)[number]]?: StyledProps;
};
