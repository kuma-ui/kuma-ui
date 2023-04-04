import { space } from "./space";
import { typography } from "./typography";
import { layout } from "./layout";
import { compose } from "./compose";

export const combinedStyles = compose(space, typography, layout);
