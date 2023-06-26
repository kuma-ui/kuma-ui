import { theme as _theme, sheet } from "@kuma-ui/sheet";
import { PseudoProps, StyledProps, isStyledProp } from "@kuma-ui/system";
const boxSpecificProps = ["variant"] as const;

const boxSpecificPropMap = new Map(
  boxSpecificProps.map((prop) => [prop, true])
);

type BoxSpecificProp = (typeof boxSpecificProps)[number];

export const isBoxProps = (propName: unknown): propName is BoxSpecificProp => {
  return Object.keys(boxSpecificPropMap).some((k) => k === propName);
};

export const handleBoxProps = (
  props: { [key in BoxSpecificProp]: any },
  theme = _theme
): string => {
  let style: StyledProps & PseudoProps = {};
  if (props["variant"]) {
    const variantStyle: StyledProps =
      theme.getUserTheme().components?.["Box"]?.variants?.[props["variant"]];
    style = { ...style, ...variantStyle };
  }

  return "";
};
