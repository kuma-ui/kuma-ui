import { Flex, Spacer, Text, Heading } from "./index";
import { Box, isBoxProps, boxHandler, boxDefaultProps } from "./Box";
import {
  Button,
  isButtonProps,
  buttonHandler,
  buttonDefaultProps,
} from "./Button";
import { match } from "ts-pattern";

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
      .with("Box", isBoxProps)
      .otherwise(() => false);
    // .exhaustive();
  };

export const componentDefaultProps = (componentName: ComponentName) => {
  return match(componentName)
    .with("Box", () => boxDefaultProps)
    .with("Button", () => buttonDefaultProps)
    .otherwise(() => ({}));
};

export const componentHandler =
  (componentName: ComponentName) => (props: Record<string, any>) => {
    return match(componentName)
      .with("Box", boxHandler)
      .with("Button", buttonHandler)
      .otherwise(() => ({}));
  };
