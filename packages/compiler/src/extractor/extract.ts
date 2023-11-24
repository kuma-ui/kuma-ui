import { Node, JsxOpeningElement, JsxSelfClosingElement } from "ts-morph";
import { isStyledProp, isPseudoProps, StyleGenerator } from "@kuma-ui/system";
import {
  componentDefaultProps,
  componentList,
  isComponentProps,
  componentHandler,
} from "@kuma-ui/core/components/componentList";
import { theme } from "@kuma-ui/sheet";

// eslint-disable-next-line @typescript-eslint/no-explicit-any -- FIXME
type PropValue = any;

/**
 * Extracts props from a component and returns the generated className and css.
 */
export const extractProps = (
  componentName: (typeof componentList)[keyof typeof componentList],
  jsx: JsxOpeningElement | JsxSelfClosingElement,
  propsMap: Record<string, PropValue>,
) => {
  const styledProps: { [key: string]: PropValue } = {};
  const pseudoProps: { [key: string]: PropValue } = {};
  // props that are unique to the component (i.e., horizontal in <Spacer horizontal />)
  const componentProps: { [key: string]: PropValue } = {};

  const variant = theme.getVariants(componentName);
  const baseStyleProps: { [key: string]: PropValue } = {
    ...(variant?.baseStyle as Record<string, string>),
  };

  // pre-defined props to be passed to the component (i.e., display="flex" is pre-defined in )
  const systemDefaultProps = componentDefaultProps(componentName);
  const userDefaultProps = variant?.defaultProps;

  let isDefault = false;

  for (const [propName, propValue] of Object.entries({
    ...systemDefaultProps,
    ...userDefaultProps,
    ...propsMap,
  })) {
    if (isStyledProp(propName)) {
      styledProps[propName] = propValue;
    } else if (isPseudoProps(propName)) {
      pseudoProps[propName] = propValue;
    } else if (isComponentProps(componentName)(propName)) {
      componentProps[propName] = propValue;
    } else if (propName === "variant") {
      Object.assign(baseStyleProps, variant?.variants?.[propValue as string]);
      jsx.getAttribute("variant")?.remove();
    } else if (propName === "IS_KUMA_DEFAULT") {
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
    for (const prop in baseStyleProps) {
      if (Object.hasOwn(baseStyleProps, prop)) {
        delete baseStyleProps[prop];
      }
    }
  }
  const combinedProps = {
    ...baseStyleProps,
    ...specificProps,
    ...styledProps,
    ...pseudoProps,
  };
  const { className: generatedClassName, css } = new StyleGenerator(
    combinedProps,
  ).getStyle();

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
