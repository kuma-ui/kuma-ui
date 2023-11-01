import {
  AnimationProps,
  animationConverters,
  animationMappings,
} from "./animation";
import { SpaceProps, spaceConverters, spaceMappings } from "./space";
import {
  TypographyProps,
  typographyConverters,
  typographyMappings,
} from "./typography";
import { LayoutProps, layoutConverters, layoutMappings } from "./layout";
import { ColorProps, colorConverters, colorMappings } from "./color";
import { FlexProps, flexConverters, flexMappings } from "./flex";
import { BorderProps, borderConverters, borderMappings } from "./border";
import { OutlineProps, outlineConverters, outlineMappings } from "./outline";
import {
  PositionProps,
  positionConverters,
  positionMappings,
} from "./position";
import { ShadowProps, shadowConverters, shadowMappings } from "./shadow";
import { PseudoProps } from "./pseudo";
import { ThemeSystemType, ResponsiveStyle, ValueConverter } from "./types";
import { styleCache } from "@kuma-ui/sheet";
import { GridProps, gridConverters, gridMappings } from "./grid";
import { ListProps, listConverters, listMappings } from "./list";
import { EffectProps, effectConverters, effectMappings } from "./effect";
import { TextProps, textConverters, textMappings } from "./text";
import { FontProps, fontConverters, fontMappings } from "./font";
import { MaskProps, maskConverters, maskMappings } from "./mask";
import { ColumnProps, columnConverters, columnMappings } from "./column";
import {
  BackgroundProps,
  backgroundConverters,
  backgroundMappings,
} from "./background";
import { FilterProps, filterConverters, filterMappings } from "./filter";
import { StyledKeyType } from "./keys";
import { applyResponsiveStyles } from "./responsive";

export type StyledProps<T extends ThemeSystemType = ThemeSystemType> =
  TypographyProps<T> &
    FontProps<T> &
    ColorProps<T> &
    SpaceProps<T> &
    AnimationProps &
    TextProps &
    LayoutProps<T> &
    FlexProps<T> &
    BorderProps<T> &
    OutlineProps &
    PositionProps &
    ShadowProps &
    GridProps<T> &
    ListProps &
    EffectProps &
    MaskProps &
    ColumnProps<T> &
    BackgroundProps &
    // eslint-disable-next-line @typescript-eslint/no-duplicate-type-constituents -- FIXME
    EffectProps &
    FilterProps;

export type StyleFunction = (props: StyledProps) => ResponsiveStyle;

// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment -- FIXME
const styleMappings: Record<StyledKeyType, string> = Object.assign(
  {},
  animationMappings,
  spaceMappings,
  typographyMappings,
  layoutMappings,
  colorMappings,
  flexMappings,
  borderMappings,
  outlineMappings,
  positionMappings,
  shadowMappings,
  gridMappings,
  listMappings,
  effectMappings,
  textMappings,
  fontMappings,
  maskMappings,
  columnMappings,
  backgroundMappings,
  filterMappings,
);

const styleConverters: Partial<Record<StyledKeyType, ValueConverter>> =
  Object.assign(
    {},
    animationConverters,
    spaceConverters,
    typographyConverters,
    layoutConverters,
    colorConverters,
    flexConverters,
    borderConverters,
    outlineConverters,
    positionConverters,
    shadowConverters,
    gridConverters,
    listConverters,
    effectConverters,
    textConverters,
    fontConverters,
    maskConverters,
    columnConverters,
    backgroundConverters,
    filterConverters,
  ) as Partial<Record<StyledKeyType, ValueConverter>>;

export const compose = (): StyleFunction => {
  return (props: StyledProps): ResponsiveStyle => {
    const cacheKey = JSON.stringify(props);

    const cachedStyles = styleCache.get(cacheKey);
    if (cachedStyles) {
      return cachedStyles;
    }

    let base = "";
    const media: { [breakpoint: string]: string } = {};
    for (const key in props) {
      const cssValue = props[key as StyledKeyType];
      if (!cssValue) continue;

      const properties = styleMappings[key as StyledKeyType]?.split(",") ?? [];
      for (const property of properties) {
        const converter = styleConverters[key as StyledKeyType];
        const responsiveStyles = applyResponsiveStyles(
          property,
          cssValue,
          converter,
        );
        base += responsiveStyles.base;
        for (const [breakpoint, css] of Object.entries(
          responsiveStyles.media,
        )) {
          if (media[breakpoint]) {
            media[breakpoint] += css;
          } else {
            media[breakpoint] = css;
          }
        }
      }
    }

    const combinedStyles = { base, media };

    styleCache.set(cacheKey, combinedStyles);

    return combinedStyles;
  };
};
