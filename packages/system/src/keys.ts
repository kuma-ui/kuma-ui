export const styleKeys = {
  animation: [
    "animation",
    "animationComposition",
    "animationDelay",
    "animationDirection",
    "animationDuration",
    "animationFillMode",
    "animationIterationCount",
    "animationName",
    "animationPlayState",
    "animationTimeline",
    "animationTimingFunction",
  ] as const,
  space: [
    "margin",
    "m",
    "marginTop",
    "mt",
    "marginBottom",
    "mb",
    "marginLeft",
    "ml",
    "marginRight",
    "mr",
    "marginX",
    "mx",
    "marginY",
    "my",
    "padding",
    "p",
    "paddingTop",
    "pt",
    "paddingBottom",
    "pb",
    "paddingLeft",
    "pl",
    "paddingRight",
    "pr",
    "paddingX",
    "px",
    "paddingY",
    "py",
  ] as const,
  typography: [
    "hyphenateCharacter",
    "hyphenateLimitChars",
    "hyphens",
    "hangingPunctuation",
    "lineHeight",
    "lineBreak",
    "letterSpacing",
    "orphans",
    "quotes",
    "rubyPosition",
    "unicodeBidi",
    "widows",
    "whiteSpace",
    "wordBreak",
    "wordSpacing",
    "writingMode",
  ] as const,
  fontKeys: [
    "font",
    "fontFamily",
    "fontFeatureSettings",
    "fontKerning",
    "fontLanguageOverride",
    "fontOpticalSizing",
    "fontPalette",
    "fontSize",
    "fontSizeAdjust",
    "fontStretch",
    "fontStyle",
    "fontSynthesis",
    "fontVariant",
    "fontVariantAlternates",
    "fontVariantCaps",
    "fontVariantEastAsian",
    "fontVariantEmoji",
    "fontVariantLigatures",
    "fontVariantNumeric",
    "fontVariantPosition",
    "fontVariationSettings",
    "fontWeight",
  ] as const,
  textKeys: [
    "textAlign",
    "textAlignLast",
    "textCombineUpright",
    "textDecoration",
    "textDecorationColor",
    "textDecorationLine",
    "textDecorationSkipInk",
    "textDecorationStyle",
    "textDecorationThickness",
    "textEmphasis",
    "textEmphasisColor",
    "textEmphasisPosition",
    "textEmphasisStyle",
    "textIndent",
    "textJustify",
    "textOrientation",
    "textOverflow",
    "textRendering",
    "textShadow",
    "textTransform",
    "textUnderlineOffset",
    "textUnderlinePosition",
  ] as const,
  layout: [
    "width",
    "w",
    "minWidth",
    "minW",
    "maxWidth",
    "maxW",
    "height",
    "h",
    "minHeight",
    "minH",
    "maxHeight",
    "maxH",
    "display",
    "overflow",
    "overflowX",
    "overflowY",
    "position",
    "zIndex",
    "cursor",
    "userSelect",
    "aspectRatio",
    "boxSizing",
    "float",
    "clear",
    "objectFit",
    "objectPosition",
    "resize",
    "verticalAlign",
  ] as const,
  flex: [
    "flexDirection",
    "flexDir",
    "justifyContent",
    "justify",
    "alignItems",
    "alignContent",
    "alignSelf",
    "flex",
    "flexFlow",
    "flexWrap",
    "flexGrow",
    "flexShrink",
    "flexBasis",
    "justifyItems",
    "justifySelf",
    "placeItems",
    "placeContent",
    "gap",
  ] as const,
  color: [
    "background",
    "bg",
    "backgroundColor",
    "bgColor",
    "color",
    "borderColor",
    "outlineColor",
    "accentColor",
    "caretColor",
    "opacity",
    "visibility",
  ] as const,
  border: [
    "border",
    "borderWidth",
    "borderTopWidth",
    "borderBottomWidth",
    "borderLeftWidth",
    "borderRightWidth",
    "borderStyle",
    "borderTopStyle",
    "borderBottomStyle",
    "borderLeftStyle",
    "borderRightStyle",
    "borderRadius",
    "borderTopLeftRadius",
    "borderTopRightRadius",
    "borderBottomLeftRadius",
    "borderBottomRightRadius",
    "borderTop",
    "borderRight",
    "borderBottom",
    "borderLeft",
    "borderX",
    "borderY",
    "borderStart",
    "borderEnd",
    "borderStartWidth",
    "borderEndWidth",
    "borderStartStyle",
    "borderEndStyle",
    "borderStartRadius",
    "borderEndRadius",
  ] as const,
  outline: [
    "outline",
    "outlineWidth",
    "outlineStyle",
    "outlineOffset",
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
  column: [
    "columnCount",
    "columnFill",
    "columnGap",
    "columnRule",
    "columnRuleColor",
    "columnRuleStyle",
    "columnRuleWidth",
    "columnSpan",
    "columnWidth",
    "columns",
  ] as const,
  effect: [
    "transition",
    "transitionDuration",
    "transitionProperty",
    "transitionTimingFunction",
    "transitionDelay",
    "transform",
    "transformBox",
    "transformOrigin",
    "transformStyle",
    "clipPath",
  ] as const,
  mask: [
    "mask",
    "maskBorder",
    "maskBorderMode",
    "maskBorderOutset",
    "maskBorderRepeat",
    "maskBorderSlice",
    "maskBorderSource",
    "maskBorderWidth",
    "maskClip",
    "maskComposite",
    "maskImage",
    "maskMode",
    "maskOrigin",
    "maskPosition",
    "maskRepeat",
    "maskSize",
    "maskType",
  ] as const,
  background: [
    "backgroundImage",
    "bgImage",
    "backgroundPosition",
    "bgPosition",
    "backgroundPositionX",
    "bgPositionX",
    "backgroundPositionY",
    "bgPositionY",
    "backgroundSize",
    "bgSize",
    "backgroundRepeat",
    "bgRepeat",
    "backgroundAttachment",
    "bgAttachment",
    "backgroundClip",
    "bgClip",
    "backgroundOrigin",
    "bgOrigin",
    "backgroundBlendMode",
    "bgBlendMode",
  ] as const,
  filter: ["filter", "backdropFilter"] as const,
};

export type AnimationKeys = (typeof styleKeys.animation)[number];
export type SpaceKeys = (typeof styleKeys.space)[number];
export type TypographyKeys = (typeof styleKeys.typography)[number];
export type FontKeys = (typeof styleKeys.fontKeys)[number];
export type TextKeys = (typeof styleKeys.textKeys)[number];
export type LayoutKeys = (typeof styleKeys.layout)[number];
export type ColorKeys = (typeof styleKeys.color)[number];
export type FlexKeys = (typeof styleKeys.flex)[number];
export type BorderKeys = (typeof styleKeys.border)[number];
export type OutlineKeys = (typeof styleKeys.outline)[number];
export type PositionKeys = (typeof styleKeys.position)[number];
export type ShadowKeys = (typeof styleKeys.shadow)[number];
export type ListKeys = (typeof styleKeys.list)[number];
export type GridKeys = (typeof styleKeys.grid)[number];
export type ColumnKeys = (typeof styleKeys.column)[number];
export type EffectKeys = (typeof styleKeys.effect)[number];
export type MaskKeys = (typeof styleKeys.mask)[number];
export type BackgroundKeys = (typeof styleKeys.background)[number];
export type FilterKeys = (typeof styleKeys.filter)[number];

export type StyledKeyType =
  | AnimationKeys
  | SpaceKeys
  | TypographyKeys
  | FontKeys
  | TextKeys
  | LayoutKeys
  | ColorKeys
  | FlexKeys
  | BorderKeys
  | OutlineKeys
  | PositionKeys
  | ShadowKeys
  | ListKeys
  | GridKeys
  | BackgroundKeys
  | MaskKeys
  | ColumnKeys
  | EffectKeys
  | FilterKeys;

function memo<T>(fn: (value: string) => T): (value: string) => T {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment -- FIXME
  const cache = Object.create(null);
  return (arg: string) => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access -- FIXME
    if (cache[arg] === undefined) cache[arg] = fn(arg);
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-member-access -- FIXME
    return cache[arg];
  };
}

export const isStyledProp = memo((_prop: string): _prop is StyledKeyType => {
  const prop = _prop as StyledKeyType;
  return Object.values(styleKeys).some((keyGroup) =>
    (keyGroup as readonly string[]).includes(prop),
  );
});
