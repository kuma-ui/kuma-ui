export const styleKeys = {
  space: [
    "m",
    "mt",
    "mb",
    "ml",
    "mr",
    "mx",
    "my",
    "p",
    "pt",
    "pb",
    "pl",
    "pr",
    "px",
    "py",
  ] as const,
  typography: [
    "fontSize",
    "fontWeight",
    "lineHeight",
    "letterSpacing",
    "textAlign",
    "fontFamily",
  ] as const,
  layout: [
    "width",
    "height",
    "display",
    "overflow",
    "position",
    "zIndex",
  ] as const,
};

export type SpaceKeys = typeof styleKeys.space[number];
export type TypographyKeys = typeof styleKeys.typography[number];
export type LayoutKeys = typeof styleKeys.layout[number];

export type StyledKeyType = SpaceKeys | TypographyKeys | LayoutKeys;

export const isStyledProp = (_prop: string): _prop is StyledKeyType => {
  const prop = _prop as StyledKeyType;
  return Object.values(styleKeys).some((keyGroup) =>
    (keyGroup as readonly string[]).includes(prop)
  );
};
