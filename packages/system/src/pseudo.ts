import { StyledProps } from "./compose";

export const pseudoMappings = {
  _hover: ":hover",
  _focus: ":focus",
} as const;

export type PseudoProps = {
  [key in keyof typeof pseudoMappings]?: StyledProps;
};

export const isPseudoProps = (
  _props: unknown
): _props is keyof typeof pseudoMappings => {
  const props = _props as keyof typeof pseudoMappings;
  return Object.keys(pseudoMappings).includes(props);
};
