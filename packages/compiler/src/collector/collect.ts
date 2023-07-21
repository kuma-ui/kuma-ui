import {
  Project,
  Node,
  SyntaxKind,
  JsxOpeningElement,
  JsxSelfClosingElement,
  JsxAttribute,
} from "ts-morph";
import { match } from "ts-pattern";
import { decode } from "./decode";
import { handleJsxExpression } from "./expression";
import { extractPseudoAttribute } from "./pseudo";

export const collectPropsFromJsx = (
  node: JsxOpeningElement | JsxSelfClosingElement
) => {
  const jsxAttributes = node.getAttributes();
  const extracted: Record<string, any> = {};
  jsxAttributes.forEach((jsxAttribute) => {
    if (Node.isJsxAttribute(jsxAttribute)) {
      const propName = jsxAttribute.getNameNode().getFullText();
      let propValue;
      // If the propName starts with underscore, use extractPseudoAttribute
      if (propName.trim().startsWith("_")) {
        propValue = extractPseudoAttribute(jsxAttribute);
      } else {
        propValue = extractAttribute(jsxAttribute);
      }
      // If the value is returned, it means that it can be statically analyzed, so we remove the corresponding prop from the Jsx tag and generate CSS.
      if (!propValue && propValue !== 0) return;
      extracted[propName] = propValue;
    }
  });
  return extracted;
};

const extractAttribute = (jsxAttribute: JsxAttribute) => {
  const initializer = jsxAttribute.getInitializer();

  return (
    match(initializer)
      // fontSize='24px'
      .when(Node.isStringLiteral, (initializer) => {
        const value = initializer.getLiteralText();
        return value;
      })
      // fontSize={...}
      .when(Node.isJsxExpression, (initializer) => {
        const expression = initializer.getExpression();
        if (!expression) return;

        const decodedNode = decode(expression);
        return handleJsxExpression(decodedNode);
      })
      // If no initializer is present (e.g., <Spacer horizontal />), treat the prop as true
      .when(
        () => initializer === undefined,
        () => true
      )
      .otherwise(() => undefined)
  );
};
