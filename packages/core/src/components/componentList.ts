import {
  isBoxProps,
  boxHandler,
  boxDefaultProps,
  defaultBoxTag,
} from "./Box/handler";
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
import { StyledProps } from "@kuma-ui/system";
import "react";

export const componentList = Object.freeze({
  Box: "Box",
  Flex: "Flex",
  Spacer: "Spacer",
  Text: "Text",
  Button: "Button",
  Heading: "Heading",
  Select: "Select",
  Input: "Input",
  HStack: "HStack",
  VStack: "VStack",
  Image: "Image",
  Link: "Link",
  Grid: "Grid",
} as const);

export const defaultComponentTag: Record<
  keyof typeof componentList,
  keyof JSX.IntrinsicElements
> = {
  Box: defaultBoxTag,
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
    switch (componentName) {
      case "Box":
        return isBoxProps(propName);
      case "Button":
        return isButtonProps(propName);
      case "Flex":
        return isFlexProps(propName);
      case "Heading":
        return isHeadingProps(propName);
      case "Spacer":
        return isSpacerProps(propName);
      case "Text":
        return isTextProps(propName);
      case "Select":
        return isSelectProps(propName);
      case "Input":
        return isInputProps(propName);
      case "HStack":
        return isHStackProps(propName);
      case "VStack":
        return isVStackProps(propName);
      case "Image":
        return isImageProps(propName);
      case "Link":
        return isLinkProps(propName);
      case "Grid":
        return isGridProps(propName);
      default:
        return componentName satisfies never;
    }
  };

export const componentDefaultProps = (
  componentName: ComponentName,
): StyledProps => {
  switch (componentName) {
    case "Box":
      return boxDefaultProps;
    case "Button":
      return buttonDefaultProps;
    case "Flex":
      return flexDefaultProps;
    case "Heading":
      return headingDefaultProps;
    case "Spacer":
      return spacerDefaultProps;
    case "Text":
      return textDefaultProps;
    case "Select":
      return selectDefaultProps;
    case "Input":
      return inputDefaultProps;
    case "HStack":
      return hstackDefaultProps;
    case "VStack":
      return vstackDefaultProps;
    case "Image":
      return imageDefaultProps;
    case "Link":
      return linkDefaultProps;
    case "Grid":
      return gridDefaultProps;
    default:
      return componentName satisfies never;
  }
};

export const componentHandler =
  (componentName: ComponentName) =>
  // eslint-disable-next-line @typescript-eslint/no-explicit-any -- FIXME
  (props: Record<string, any>): StyledProps => {
    switch (componentName) {
      case "Box":
        return boxHandler(props);
      case "Button":
        return buttonHandler(props);
      case "Flex":
        return flexHandler(props);
      case "Heading":
        return headingHandler(props);
      case "Spacer":
        return spacerHandler(props);
      case "Text":
        return textHandler(props);
      case "Select":
        return selectHandler(props);
      case "Input":
        return inputHandler(props);
      case "HStack":
        return hstackHandler(props);
      case "VStack":
        return vstackHandler(props);
      case "Image":
        return imageHandler(props);
      case "Link":
        return linkHandler(props);
      case "Grid":
        return gridHandler(props);
      default:
        return componentName satisfies never;
    }
  };
