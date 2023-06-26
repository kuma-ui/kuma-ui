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
} from "@kuma-ui/system";
import { sheet, SystemStyle } from "@kuma-ui/sheet";
import { componentList, isComponentProps } from "@kuma-ui/core";

export const extractProps = (
  componentName: keyof typeof componentList,
  jsx: JsxOpeningElement | JsxSelfClosingElement,
  propsMap: Record<string, any>
) => {
  const styledProps: { [key: string]: any } = {};
  const pseudoProps: { [key: string]: any } = {};
  const componentProps: { [key: string]: any } = {};

  for (const [propName, propValue] of Object.entries(propsMap)) {
    if (isStyledProp(propName.trim())) {
      styledProps[propName.trim()] = propValue;
    } else if (isPseudoProps(propName.trim())) {
      pseudoProps[propName.trim()] = propValue;
    } else if (isComponentProps(componentName)(propName.trim())) {
      componentProps[propName.trim()] = propValue;
    }
  }

  if (
    !(
      !!Object.keys(styledProps).length ||
      !!Object.keys(pseudoProps).length ||
      !!Object.keys(componentProps).length
    )
  ) {
    return;
  }
  const convertedPseudoProps: SystemStyle["pseudo"] = Object.keys(pseudoProps)
    .length
    ? Object.entries(pseudoProps).map(([pseudoKey, pseudoValue]) => {
        const pseudoStyle = all(pseudoValue);
        return {
          key: normalizePseudo(pseudoKey),
          base: pseudoStyle.base,
          responsive: pseudoStyle.media,
        };
      })
    : [];
  const style: SystemStyle = {
    base: all(styledProps).base,
    responsive: all(styledProps).media,
    pseudo: convertedPseudoProps,
  };

  const generatedClassName = sheet.addRule(style);
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
};
