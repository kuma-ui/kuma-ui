import {
  Box,
  Button,
  Flex,
  Spacer,
  Text,
  Heading,
  Select,
  Input,
  HStack,
  VStack,
  Image,
  Link,
  Grid,
} from "./index";
import { isBoxProps, boxHandler, boxDefaultProps } from "./Box/handler";
import {
  defaultButtonTag,
  isButtonProps,
  buttonHandler,
  buttonDefaultProps,
} from "./Button/handler";
import {
  defaultFlexTag,
  isFlexProps,
  flexHandler,
  flexDefaultProps,
} from "./Flex/handler";
import {
  defaultHeadingTag,
  isHeadingProps,
  headingHandler,
  headingDefaultProps,
} from "./Heading/handler";
import {
  defaultSpacerTag,
  isSpacerProps,
  spacerHandler,
  spacerDefaultProps,
} from "./Spacer/handler";
import {
  defaultTextTag,
  isTextProps,
  textHandler,
  textDefaultProps,
} from "./Text/handler";
import {
  defaultSelectTag,
  isSelectProps,
  selectHandler,
  selectDefaultProps,
} from "./Select/handler";
import {
  defaultInputTag,
  isInputProps,
  inputHandler,
  inputDefaultProps,
} from "./Input/handler";
import {
  defaultHStackTag,
  isHStackProps,
  hstackHandler,
  hstackDefaultProps,
} from "./HStack/handler";
import {
  defaultVStackTag,
  isVStackProps,
  vstackHandler,
  vstackDefaultProps,
} from "./VStack/handler";
import {
  defaultImageTag,
  isImageProps,
  imageHandler,
  imageDefaultProps,
} from "./Image/handler";
import {
  defaultLinkTag,
  isLinkProps,
  linkHandler,
  linkDefaultProps,
} from "./Link/handler";
import {
  defaultGridTag,
  isGridProps,
  gridHandler,
  gridDefaultProps,
} from "./Grid/handler";
import { match } from "ts-pattern";
import { StyledProps } from "@kuma-ui/system";

export const componentList = Object.freeze({
  Box: Box.name as "Box",
  Flex: Flex.name as "Flex",
  Spacer: Spacer.name as "Spacer",
  Text: Text.name as "Text",
  Button: Button.name as "Button",
  Heading: Heading.name as "Heading",
  Select: Select.name as "Select",
  Input: Input.name as "Input",
  HStack: HStack.name as "HStack",
  VStack: VStack.name as "VStack",
  Image: Image.name as "Image",
  Link: Link.name as "Link",
  Grid: Grid.name as "Grid",
} as const);

export const defaultComponentTag: Partial<
  Record<keyof typeof componentList, keyof JSX.IntrinsicElements>
> = {
  Button: defaultButtonTag,
  Flex: defaultFlexTag,
  Heading: defaultHeadingTag,
  Spacer: defaultSpacerTag,
  Text: defaultTextTag,
  Select: defaultSelectTag,
  Input: defaultInputTag,
  HStack: defaultHStackTag,
  VStack: defaultVStackTag,
  Image: defaultImageTag,
  Link: defaultLinkTag,
  Grid: defaultGridTag,
};

type ComponentName = keyof typeof componentList;

export const isComponentProps =
  (componentName: ComponentName) => (propName: string) => {
    return match(componentName)
      .with("Box", () => isBoxProps(propName))
      .with("Button", () => isButtonProps(propName))
      .with("Flex", () => isFlexProps(propName))
      .with("Heading", () => isHeadingProps(propName))
      .with("Spacer", () => isSpacerProps(propName))
      .with("Text", () => isTextProps(propName))
      .with("Select", () => isSelectProps(propName))
      .with("Input", () => isInputProps(propName))
      .with("HStack", () => isHStackProps(propName))
      .with("VStack", () => isVStackProps(propName))
      .with("Image", () => isImageProps(propName))
      .with("Link", () => isLinkProps(propName))
      .with("Grid", () => isGridProps(propName))
      .exhaustive();
  };

export const componentDefaultProps = (
  componentName: ComponentName
): StyledProps => {
  return match(componentName)
    .with("Box", () => boxDefaultProps)
    .with("Button", () => buttonDefaultProps)
    .with("Flex", () => flexDefaultProps)
    .with("Heading", () => headingDefaultProps)
    .with("Spacer", () => spacerDefaultProps)
    .with("Text", () => textDefaultProps)
    .with("Select", () => selectDefaultProps)
    .with("Input", () => inputDefaultProps)
    .with("HStack", () => hstackDefaultProps)
    .with("VStack", () => vstackDefaultProps)
    .with("Image", () => imageDefaultProps)
    .with("Link", () => linkDefaultProps)
    .with("Grid", () => gridDefaultProps)
    .exhaustive();
};

export const componentHandler =
  (componentName: ComponentName) =>
  (props: Record<string, any>): StyledProps => {
    return match(componentName)
      .with("Box", () => boxHandler(props))
      .with("Button", () => buttonHandler(props))
      .with("Flex", () => flexHandler(props))
      .with("Heading", () => headingHandler(props))
      .with("Spacer", () => spacerHandler(props))
      .with("Text", () => textHandler(props))
      .with("Select", () => selectHandler(props))
      .with("Input", () => inputHandler(props))
      .with("HStack", () => hstackHandler(props))
      .with("VStack", () => vstackHandler(props))
      .with("Image", () => imageHandler(props))
      .with("Link", () => linkHandler(props))
      .with("Grid", () => gridHandler(props))
      .exhaustive();
  };
