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
import { decode } from "./decode";
import { handleJsxExpression } from "./expression";

export const extractPseudoAttribute = (jsxAttribute: JsxAttribute) => {
  const initializer = jsxAttribute.getInitializer();

  return (
    match(initializer)
      // fontSize={...}
      .when(Node.isJsxExpression, (initializer) => {
        const expression = initializer.getExpression();
        if (!expression) return;

        const decodedNode = decode(expression);
        return handlePseudoJsxExpression(decodedNode);
      })
      .otherwise(() => undefined)
  );
};

const handlePseudoJsxExpression = (node: Node<ts.Node>) => {
  return (
    match(node)
      // fontSize={{xl: '2rem'}['xl']}
      .when(Node.isObjectLiteralExpression, (obj) => {
        const objProps: Record<string, any> = {};
        for (const prop of obj.getProperties()) {
          if (Node.isPropertyAssignment(prop)) {
            const initializer = prop.getInitializer();
            if (initializer) {
              const decodedNode = decode(initializer);
              const propName = prop.getName();
              objProps[propName] = handleJsxExpression(decodedNode);
            }
          }
        }
        // If the objProps includes undefined, it means some of its elements
        // could not be statically analyzed, hence handle it at runtime.
        return Object.values(objProps).includes(undefined)
          ? undefined
          : objProps;
      })
      .otherwise(() => handleJsxExpression(node))
  );
};
