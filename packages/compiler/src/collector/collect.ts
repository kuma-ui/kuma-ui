import {
  Project,
  Node,
  SyntaxKind,
  JsxOpeningElement,
  JsxSelfClosingElement,
  JsxAttribute,
} from "ts-morph";
import { decode } from "./decode";
import { handleJsxExpression } from "./expression";
import { extractPseudoAttribute } from "./pseudo";

export const collectPropsFromJsx = (
  node: JsxOpeningElement | JsxSelfClosingElement,
) => {
  const jsxAttributes = node.getAttributes();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any -- FIXME
  const extracted: Record<string, any> = {};
  jsxAttributes.forEach((jsxAttribute) => {
    if (Node.isJsxAttribute(jsxAttribute)) {
      const propName = jsxAttribute.getNameNode().getText();
      let propValue;
      // If the propName starts with underscore, use extractPseudoAttribute
      if (propName.trim().startsWith("_")) {
        propValue = extractPseudoAttribute(jsxAttribute);
      } else {
        propValue = extractAttribute(jsxAttribute);
      }
      // If the value is returned, it means that it can be statically analyzed, so we remove the corresponding prop from the Jsx tag and generate CSS.
      if (propValue == undefined) return;
      extracted[propName] = propValue;
    }
  });
  return extracted;
};

const extractAttribute = (jsxAttribute: JsxAttribute) => {
  const initializer = jsxAttribute.getInitializer();
  // fontSize='24px'
  if (Node.isStringLiteral(initializer)) {
    const value = initializer.getLiteralText();
    return value;
  }
  // fontSize={...}
  if (Node.isJsxExpression(initializer)) {
    const expression = initializer.getExpression();
    if (!expression) return;

    const decodedNode = decode(expression);
    return handleJsxExpression(decodedNode);
  }
  // If no initializer is present (e.g., <Spacer horizontal />), treat the prop as true
  if (initializer === undefined) {
    return true;
  }
  return undefined;
};
