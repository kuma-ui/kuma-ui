import { StyledComponentProps } from "./styled";
import React, { ComponentProps } from "react";
import { StyledProps, StyledKeyType, PseudoProps } from "../system";

const htmlTags: Array<Partial<keyof JSX.IntrinsicElements>> = [
  "div",
  "a",
  "p",
  "h1",
  "h2",
  "h3",
  "h4",
  "h5",
  "header",
  "main",
  "footer",
  "section",
  "input",
  "button",
  "ul",
  "ol",
  "li",
  "img",
  "span",
];

type StyledComponent = React.FC<
  Omit<StyledComponentProps<"div">, StyledKeyType> &
    StyledProps &
    Partial<PseudoProps>
>;

const z: {
  [K in (typeof htmlTags)[number]]: StyledComponent;
} = {} as any;

export const isHTMLElement = (
  _tag: unknown
): _tag is keyof JSX.IntrinsicElements => {
  const tag = _tag as keyof JSX.IntrinsicElements;
  return htmlTags.includes(tag);
};

export { z };
