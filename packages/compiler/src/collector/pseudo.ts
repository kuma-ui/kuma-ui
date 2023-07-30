import {
  Project,
  Node,
  SyntaxKind,
  JsxOpeningElement,
  JsxSelfClosingElement,
  ts,
  JsxAttribute,
} from "ts-morph";
import { match } from "ts-pattern";
import { handleJsxExpression } from "./expression";

export const extractPseudoAttribute = (jsxAttribute: JsxAttribute) => {
  const initializer = jsxAttribute.getInitializer();

  return (
    match(initializer)
      // fontSize={...}
      .when(Node.isJsxExpression, (initializer) => {
        const expression = initializer.getExpression();
        if (!expression) return;

        return handleJsxExpression(expression);
      })
      .otherwise(() => undefined)
  );
};
