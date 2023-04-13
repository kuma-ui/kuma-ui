import { StyledProps } from "../compose";

const pseudoKeys = ["_hover", "_focus"] as const;

const pseudoMappings = {
  _hover: ":hover",
  _focus: ":focus",
} as const;

export type PseudoProps = {
  [key in keyof typeof pseudoMappings]?: StyledProps;
};
