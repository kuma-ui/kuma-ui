import { StyledKeyType, styleKeys } from "./keys";
export const toCssUnit = (token: string | number) => {
  if (typeof token === "string") return token;
  else return `${token}px`;
};

export const isStyledProp = (_prop: string): _prop is StyledKeyType => {
  const prop = _prop as any;
  return (
    styleKeys.space.includes(prop) ||
    styleKeys.typography.includes(prop) ||
    styleKeys.layout.includes(prop)
  );
};
