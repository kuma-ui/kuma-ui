import {
  Project,
  Node,
  SyntaxKind,
  JsxOpeningElement,
  JsxSelfClosingElement,
} from "ts-morph";
import {
  isStyledProp,
  isPseudoProps,
  normalizePseudo,
  all,
  SystemStyle,
  StyleGenerator,
} from "@kuma-ui/system";

export const extractProps = (
  jsx: JsxOpeningElement | JsxSelfClosingElement,
  propsMap: Record<string, any>
) => {
  const styledProps: { [key: string]: any } = {};
  const pseudoProps: { [key: string]: any } = {};

  for (const [propName, propValue] of Object.entries(propsMap)) {
    if (isStyledProp(propName.trim())) {
      styledProps[propName.trim()] = propValue;
    } else if (isPseudoProps(propName.trim())) {
      pseudoProps[propName.trim()] = propValue;
    }
  }

  if (
    !(!!Object.keys(styledProps).length || !!Object.keys(pseudoProps).length)
  ) {
    return;
  }
  const combinedProps = { ...styledProps, ...pseudoProps };
  const key = generateKey(combinedProps);
  let generatedStyle = styleCache[key];
  // If the result isn't in the cache, generate it and save it to the cache
  if (!generatedStyle) {
    generatedStyle = new StyleGenerator(combinedProps).getStyle();
    styleCache[key] = generatedStyle;
  }
  const { className: generatedClassName, css } = generatedStyle;
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

  jsx.addAttribute({
    name: "className",
    initializer: `{${newClassNameInitializer}}`,
  });
  return { css };
};

/**
 * Generates a unique key for props, aiding cache efficiency.
 * Incurs O(n log n) cost due to sorting, but it's acceptable given the
 * expensive nature of StyleGenerator's internals.
 */
const generateKey = (props: Record<string, any>) => {
  return Object.entries(props)
    .sort((a, b) => a[0].localeCompare(b[0]))
    .map(([key, value]) => `${key}:${value}`)
    .join("|");
};
const styleCache: { [key: string]: { className: string; css: string } } = {};
