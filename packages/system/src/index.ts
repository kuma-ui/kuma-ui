import { space, SpaceProps } from "./space";
import { typography, TypographyProps } from "./typography";
import { layout, LayoutProps } from "./layout";
import { color, ColorProps } from "./color";
import { flex, FlexProps } from "./flex";
import { border, BorderProps } from "./border";
import { outline, OutlineProps } from "./outline";
import { position, PositionProps } from "./position";
import { shadow, ShadowProps } from "./shadow";
import { compose, StyledProps } from "./compose";
import { ResponsiveStyle } from "./types";
import { PseudoProps, normalizePseudo, isPseudoProps } from "./pseudo";
import { grid } from "./grid";
import { list } from "./list";
import { effect } from "./effect";
import { text } from "./text";
import { font } from "./font";
export { StyledKeyType, isStyledProp } from "./keys";

export * from "./types";

export const all = compose(
  space,
  typography,
  layout,
  color,
  flex,
  border,
  outline,
  position,
  shadow,
  grid,
  list,
  effect,
  text,
  font
);

export { normalizePseudo, isPseudoProps };
export type {
  SpaceProps,
  TypographyProps,
  LayoutProps,
  ColorProps,
  FlexProps,
  BorderProps,
  OutlineProps,
  PositionProps,
  ShadowProps,
  StyledProps,
  ResponsiveStyle,
  PseudoProps,
};
export * from "./generator";
