import {
  Node,
  JsxOpeningElement,
  JsxSelfClosingElement,
  JsxAttribute,
} from "ts-morph";
import { match } from "ts-pattern";
import { decode } from "./decode";
import { handleJsxExpression } from "./expression";
import { extractPseudoAttribute } from "./pseudo";
import { UnevaluatedConditionalExpression, unevaluatedConditionalExpression } from "../static-branching";

export const collectPropsFromJsx = (
  node: JsxOpeningElement | JsxSelfClosingElement
): Record<string, any> => {
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
      if (!propValue) return;
      extracted[propName] = propValue;
    }
  });

  return extracted;
};


type AttributeValue = string | number | boolean | (string | number | undefined)[]


const extractAttribute = (jsxAttribute: JsxAttribute): AttributeValue | UnevaluatedConditionalExpression | undefined => {
  const initializer = jsxAttribute.getInitializer();

  return match(initializer)
    // fontSize='24px'
    .when(Node.isStringLiteral, (initializer) => {
      const value = initializer.getLiteralText();
      return value;
    })
    // fontSize={...}
    .when(Node.isJsxExpression, (initializer) => {
      const expression = initializer.getExpression();
      if (!expression) return;

      // fontSize={... ? ... : ...}
      const conditionalExpression = match(expression).when(Node.isConditionalExpression, (conditional) => {
        const condition = conditional.getCondition();
        const whenTrue = handleJsxExpression(decode(conditional.getWhenTrue()));
        const whenFalse = handleJsxExpression(decode(conditional.getWhenFalse()));
        if (whenTrue === undefined || whenFalse === undefined) {
          return undefined
        }
        return unevaluatedConditionalExpression({ expression: condition.getText(), whenTrue, whenFalse });
      }).otherwise(() => undefined)
      if (conditionalExpression) return conditionalExpression;

      const decodedNode = decode(expression);
      return handleJsxExpression(decodedNode);
    })
    // If no initializer is present (e.g., <Spacer horizontal />), treat the prop as true
    .when(
      () => initializer === undefined,
      () => true
    )
    .otherwise(() => undefined)
};
