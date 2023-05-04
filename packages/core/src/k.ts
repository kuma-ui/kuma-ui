import { StyledComponentProps } from "./styled";
import { StyledProps, StyledKeyType, PseudoProps } from "@kuma-ui/system";

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

type StyledComponent<T extends (typeof htmlTags)[number]> = React.FC<
  Omit<StyledComponentProps<T>, StyledKeyType> &
    StyledProps &
    Partial<PseudoProps>
>;

const k: {
  [K in (typeof htmlTags)[number]]: StyledComponent<K>;
} = {} as any;

export { k };
