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
    "textDecoration",
  ] as const,
  layout: [
    "width",
    "minWidth",
    "maxWidth",
    "height",
    "minHeight",
    "maxHeight",
    "display",
    "overflow",
    "position",
    "zIndex",
    "cursor",
  ] as const,
  flex: [
    "flexDir",
    "justify",
    "alignItems",
    "alignContent",
    "flexWrap",
    "flexGrow",
    "flexShrink",
    "flexBasis",
    "gap",
  ] as const,
  color: [
    "bg",
    "bgColor",
    "color",
    "borderColor",
    "accentColor",
    "caretColor",
    "opacity",
  ] as const,
  border: [
    "borderWidth",
    "borderStyle",
    "borderRadius",
    "borderTop",
    "borderRight",
    "borderBottom",
    "borderLeft",
  ] as const,
  position: ["top", "right", "bottom", "left", "inset"] as const,
  shadow: ["textShadow", "boxShadow"] as const,
  list: [
    "listStyle",
    "listStyleImage",
    "listStylePosition",
    "listStyleType",
  ] as const,
  grid: [
    "grid",
    "gridArea",
    "gridAutoColumns",
    "gridAutoFlow",
    "gridAutoRows",
    "gridColumn",
    "gridColumnEnd",
    "gridColumnStart",
    "gridRow",
    "gridRowEnd",
    "gridRowStart",
    "gridTemplate",
    "gridTemplateAreas",
    "gridTemplateColumns",
    "gridTemplateRows",
    "gridGap",
    "gridColumnGap",
    "gridRowGap",
  ] as const,
  effect: [
    "transition",
    "transitionDuration",
    "transitionProperty",
    "transitionTimingFunction",
    "transitionDelay",
    "transform",
    "transformOrigin",
  ] as const,
};

export type SpaceKeys = (typeof styleKeys.space)[number];
export type TypographyKeys = (typeof styleKeys.typography)[number];
export type LayoutKeys = (typeof styleKeys.layout)[number];
export type ColorKeys = (typeof styleKeys.color)[number];
export type FlexKeys = (typeof styleKeys.flex)[number];
export type BorderKeys = (typeof styleKeys.border)[number];
export type PositionKeys = (typeof styleKeys.position)[number];
export type ShadowKeys = (typeof styleKeys.shadow)[number];
export type ListKeys = (typeof styleKeys.list)[number];
export type GridKeys = (typeof styleKeys.grid)[number];

export type EffectKeys = (typeof styleKeys.effect)[number];

export type StyledKeyType =
  | SpaceKeys
  | TypographyKeys
  | LayoutKeys
  | ColorKeys
  | FlexKeys
  | BorderKeys
  | PositionKeys
  | ShadowKeys
  | ListKeys
  | GridKeys
  | EffectKeys;

function memo<T>(fn: (value: string) => T): (value: string) => T {
  const cache = Object.create(null);
  return (arg: string) => {
    if (cache[arg] === undefined) cache[arg] = fn(arg);
    return cache[arg];
  };
}

export const isStyledProp = memo((_prop: string): _prop is StyledKeyType => {
  const prop = _prop as StyledKeyType;
  return Object.values(styleKeys).some((keyGroup) =>
    (keyGroup as readonly string[]).includes(prop)
  );
});
