import React from "react";
import { space } from "./space";
import { typography } from "./typography";
import { layout } from "./layout";
import { color } from "./color";
import { flex } from "./flex";
import { border } from "./border";
import { position } from "./position";
import { compose, StyledProps, ResponsiveStyle } from "./compose";
export { StyledKeyType, isStyledProp } from "./keys";

export const combinedStyles = compose(
  space,
  typography,
  layout,
  color,
  flex,
  border,
  position
);

export { compose, space, typography, layout, color, flex, border, position };
export type { StyledProps, ResponsiveStyle };
