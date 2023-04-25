import { styled } from "./styled";
import { StyledProps } from "../system";

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

const createStyledComponent = (tag: keyof JSX.IntrinsicElements) => {
  return styled(tag)<StyledProps>``;
};

const z: {
  [K in (typeof htmlTags)[number]]: ReturnType<typeof createStyledComponent>;
} = {} as any;

for (const tag of htmlTags) {
  z[tag] = createStyledComponent(tag);
}

export { z, createStyledComponent };
