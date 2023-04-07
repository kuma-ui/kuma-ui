import { space } from "./space";
import { typography } from "./typography";
import { layout } from "./layout";
import { compose, StyledProps } from "./compose";
export { StyledKeyType } from "./keys";

export const combinedStyles = compose(space, typography, layout);

export { space, typography, layout };
export type { StyledProps };
