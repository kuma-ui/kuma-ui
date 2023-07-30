import {
  Node,
  JsxOpeningElement,
  JsxSelfClosingElement,
  JsxAttribute,
} from "ts-morph";
import { match } from "ts-pattern";
import { handleJsxExpression } from "./expression";
import * as types from "../types";

export const collectPropsFromJsx = (
  node: JsxOpeningElement | JsxSelfClosingElement
): Record<string, types.Value> => {
  const jsxAttributes = node.getAttributes();
  const extracted: Record<string, types.Value> = {};

  jsxAttributes.forEach((jsxAttribute) => {
    if (Node.isJsxAttribute(jsxAttribute)) {
      const propName = jsxAttribute.getNameNode().getText();
      const propValue = extractAttribute(jsxAttribute);
      // If the value is returned, it means that it can be statically analyzed, so we remove the corresponding prop from the Jsx tag and generate CSS.
      if (propValue == undefined) return;
      extracted[propName] = propValue;
    }
  });

  return extracted;
};

const extractAttribute = (
  jsxAttribute: JsxAttribute
): types.Value | undefined => {
  const initializer = jsxAttribute.getInitializer();

  return (
    match(initializer)
      // fontSize='24px'
      .when(Node.isStringLiteral, (initializer) => {
        const value = initializer.getLiteralText();
        return types.staticValue(value);
      })
      // fontSize={...}
      .when(Node.isJsxExpression, (initializer) => {
        const expression = initializer.getExpression();
        if (!expression) return;
        return handleJsxExpression(expression);
      })
      // If no initializer is present (e.g., <Spacer horizontal />), treat the prop as true
      .when(
        () => initializer === undefined,
        () => types.staticValue(true)
      )
      .otherwise(() => undefined)
  );
};
