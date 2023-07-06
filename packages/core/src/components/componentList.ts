import { Box, Button, Flex, Spacer, Text, Heading } from "./index";
import { isBoxProps, boxHandler, boxDefaultProps } from "./Box/handler";
import {
  isButtonProps,
  buttonHandler,
  buttonDefaultProps,
} from "./Button/handler";
import { isFlexProps, flexHandler, flexDefaultProps } from "./Flex/handler";
import {
  isHeadingProps,
  headingHandler,
  headingDefaultProps,
} from "./Heading/handler";
import {
  isSpacerProps,
  spacerHandler,
  spacerDefaultProps,
} from "./Spacer/handler";
import { isTextProps, textHandler, textDefaultProps } from "./Text/handler";
import { match } from "ts-pattern";
import { StyledProps } from "@kuma-ui/system";

export const componentList = Object.freeze({
  Box: Box.name as "Box",
  Flex: Flex.name as "Flex",
  Spacer: Spacer.name as "Spacer",
  Text: Text.name as "Text",
  Button: Button.name as "Button",
  Heading: Heading.name as "Heading",
} as const);

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
      .exhaustive();
  };
