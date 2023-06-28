import { Flex, Spacer, Text, Button, Heading } from "./index";
import { Box, isBoxProps, handleBoxProps } from "./Box";
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
  (componentName: ComponentName) =>
  (propName: string): boolean => {
    return match(componentName)
      .with("Box", () => isBoxProps(propName))
      .otherwise(() => false);
    // .exhaustive();
  };

export const componentHandler =
  (componentName: ComponentName) =>
  (props: Record<string, any>): string | undefined => {
    return match(componentName)
      .with("Box", () => handleBoxProps(props as any))
      .otherwise(() => undefined);
  };
