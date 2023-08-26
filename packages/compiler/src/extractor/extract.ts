import { Node, JsxOpeningElement, JsxSelfClosingElement } from "ts-morph";
import { isStyledProp, isPseudoProps, StyleGenerator } from "@kuma-ui/system";
import {
  componentDefaultProps,
  componentList,
  isComponentProps,
  componentHandler,
} from "@kuma-ui/core/components/componentList";
import { Tokens, theme } from "@kuma-ui/sheet";
import { stableStringify } from "../utils/stableStringify";

export const extractProps = (
  componentName: (typeof componentList)[keyof typeof componentList],
  jsx: JsxOpeningElement | JsxSelfClosingElement,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any -- FIXME
  propsMap: Record<string, any>
) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any -- FIXME
  const styledProps: { [key: string]: any } = {};
  // eslint-disable-next-line @typescript-eslint/no-explicit-any -- FIXME
  const pseudoProps: { [key: string]: any } = {};
  // eslint-disable-next-line @typescript-eslint/no-explicit-any -- FIXME
  const componentProps: { [key: string]: any } = {};

  const variant = theme.getVariants(componentName);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any -- FIXME
  const componentVariantProps: { [key: string]: any } = {
    ...(variant?.baseStyle as Record<string, string>),
  };

  const defaultProps = componentDefaultProps(componentName);

  let isDefault = false;

  for (const [propName, propValue] of Object.entries({
    ...defaultProps,
    ...propsMap,
  })) {
    if (
      typeof propValue === "string" &&
      /[a-zA-Z]+\.[a-zA-Z0-9]+/.test(propValue)
    ) {
      const userTheme = theme.getUserTheme();
      const propKey = propValue.split(".")[0] as Tokens;
      if (userTheme[propKey] !== undefined) {
        for (const key in userTheme[propKey]) {
          if (propValue.trim() === key) {
            styledProps[propName.trim()] = userTheme[propKey]![key];
            break;
          }
        }
      }
    } else if (isStyledProp(propName.trim())) {
      styledProps[propName.trim()] = propValue;
    } else if (isPseudoProps(propName.trim())) {
      pseudoProps[propName.trim()] = propValue;
    } else if (isComponentProps(componentName)(propName.trim())) {
      componentProps[propName.trim()] = propValue;
    } else if (propName.trim() === "variant") {
      Object.assign(
        componentVariantProps,
        variant?.variants?.[propValue as string]
      );
      jsx.getAttribute("variant")?.remove();
    } else if (propName.trim() === "IS_KUMA_DEFAULT") {
      isDefault = true;
    }
  }

  if (
    !(
      !!Object.keys(styledProps).length ||
      !!Object.keys(pseudoProps).length ||
      !!Object.keys(componentProps)
    )
  ) {
    return;
  }

  const specificProps = componentHandler(componentName)(componentProps);

  // Every component internally uses the Box component.
  // However, we do not want to apply the Box theme in those cases.
  if (componentName === "Box" && isDefault) {
    for (const prop in componentVariantProps) {
      if (Object.hasOwn(componentVariantProps, prop)) {
        delete componentVariantProps[prop];
      }
    }
  }
  const combinedProps = {
    ...componentVariantProps,
    ...specificProps,
    ...styledProps,
    ...pseudoProps,
  };
  const key = stableStringify(combinedProps);
  let generatedStyle = styleCache[key];
  // If the result isn't in the cache, generate it and save it to the cache
  if (!generatedStyle) {
    generatedStyle = new StyleGenerator(combinedProps).getStyle();
    styleCache[key] = generatedStyle;
  }
  const { className: generatedClassName, css } = generatedStyle;

  // If no generatedClassName is returned, the component should remain intact
  if (!generatedClassName) return { css };

  const classNameAttr = jsx.getAttribute("className");
  let newClassName = generatedClassName;
  let newClassNameInitializer = "";

  // Check if a className attribute already exists
  if (classNameAttr && Node.isJsxAttribute(classNameAttr)) {
    const initializer = classNameAttr.getInitializer();
    // If the initializer is a string literal, simply concatenate the new className (i.e., className="hoge")
    if (Node.isStringLiteral(initializer)) {
      const existingClassName = initializer.getLiteralText();
      if (existingClassName) newClassName += " " + existingClassName;
      newClassNameInitializer = `"${newClassName}"`;
    }
    // If the initializer is a JsxExpression, create a template literal to combine the classNames at runtime (i.e., className={hoge})
    else if (Node.isJsxExpression(initializer)) {
      const expression = initializer.getExpression();
      if (expression) {
        newClassNameInitializer = `\`${newClassName} \${${expression.getText()}}\``;
      }
    }
    classNameAttr.remove();
  } else {
    newClassNameInitializer = `"${newClassName}"`;
  }

  for (const styledPropKey of Object.keys(styledProps)) {
    jsx.getAttribute(styledPropKey)?.remove();
  }

  for (const pseudoPropKey of Object.keys(pseudoProps)) {
    jsx.getAttribute(pseudoPropKey)?.remove();
  }

  for (const componentPropsKey of Object.keys(componentProps)) {
    jsx.getAttribute(componentPropsKey)?.remove();
  }

  jsx.addAttribute({
    name: "className",
    initializer: `{${newClassNameInitializer}}`,
  });
  return { css };
};

const styleCache: {
  [key: string]: { className: string; css: string } | undefined;
} = {};
