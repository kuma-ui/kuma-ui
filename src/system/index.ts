import React from "react";
import { space } from "./space";
import { typography } from "./typography";
import { layout } from "./layout";
import { color } from "./color";
import { compose, StyledProps } from "./compose";
export { StyledKeyType, isStyledProp } from "./keys";

export const combinedStyles = compose(space, typography, layout, color);

export { space, typography, layout };
export type { StyledProps };
