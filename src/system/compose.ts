import { SpaceProps } from "./space";
import { TypographyProps } from "./typography";
import { LayoutProps } from "./layout";

export type StyledProps = SpaceProps & TypographyProps & LayoutProps;

type StyleFunction = (props: StyledProps) => string;

export const compose = (...styleFunctions: StyleFunction[]): StyleFunction => {
  return (props: any): string => {
    return styleFunctions.reduce((styles, styleFunction) => {
      return styles + styleFunction(props);
    }, "");
  };
};
