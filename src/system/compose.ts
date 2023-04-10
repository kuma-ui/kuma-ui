import { SpaceProps } from "./space";
import { TypographyProps } from "./typography";
import { LayoutProps } from "./layout";
import { ColorProps } from "./color";
import { FlexProps } from "./flex";

export type StyledProps = SpaceProps &
  TypographyProps &
  LayoutProps &
  ColorProps &
  FlexProps;

type StyleFunction = (props: StyledProps) => string;

export const compose = (...styleFunctions: StyleFunction[]): StyleFunction => {
  return (props: any): string => {
    return styleFunctions.reduce((styles, styleFunction) => {
      return styles + styleFunction(props);
    }, "");
  };
};
