import {
  Project,
  Node,
  SyntaxKind,
  JsxOpeningElement,
  JsxSelfClosingElement,
} from "ts-morph";
import { componentList } from "@kuma-ui/core/dist/components/componentList";
import {
  isStyledProp,
  isPseudoProps,
  normalizePseudo,
  all,
} from "@kuma-ui/system";
import { sheet, SystemStyle } from "@kuma-ui/sheet";

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

  if (classNameAttr && Node.isJsxAttribute(classNameAttr)) {
    const existingClassName = classNameAttr
      .getFirstChildByKind(SyntaxKind.StringLiteral)
      ?.getLiteralText();
    if (existingClassName) newClassName += " " + existingClassName;
    classNameAttr.remove();
  }

  // remove props if statically analizable
  for (const styledPropKey of Object.keys(styledProps)) {
    jsx.getAttribute(styledPropKey)?.remove();
  }

  for (const pseudoPropKey of Object.keys(pseudoProps)) {
    jsx.getAttribute(pseudoPropKey)?.remove();
  }

  jsx.addAttribute({
    name: "className",
    initializer: `"${newClassName}"`,
  });
};
