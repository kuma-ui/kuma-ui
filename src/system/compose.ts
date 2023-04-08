import { SpaceProps } from "./space";
import { TypographyProps } from "./typography";
import { LayoutProps } from "./layout";
import { ColorProps } from "./color";

export type StyledProps = SpaceProps &
  TypographyProps &
  LayoutProps &
  ColorProps;

type StyleFunction = (props: StyledProps) => string;

export const compose = (...styleFunctions: StyleFunction[]): StyleFunction => {
  return (props: any): string => {
    return styleFunctions.reduce((styles, styleFunction) => {
      return styles + styleFunction(props);
    }, "");
  };
};
