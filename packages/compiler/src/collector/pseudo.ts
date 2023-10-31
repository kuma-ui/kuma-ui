import { Node, ts, JsxAttribute } from "ts-morph";
import { decode } from "./decode";
import { handleJsxExpression } from "./expression";

export const extractPseudoAttribute = (jsxAttribute: JsxAttribute) => {
  const initializer = jsxAttribute.getInitializer();

  // fontSize={...}
  if (Node.isJsxExpression(initializer)) {
    const expression = initializer.getExpression();
    if (!expression) return;

    const decodedNode = decode(expression);
    return handlePseudoJsxExpression(decodedNode);
  }
  return undefined;
};

const handlePseudoJsxExpression = (node: Node<ts.Node>) => {
  // fontSize={{xl: '2rem'}['xl']}
  if (Node.isObjectLiteralExpression(node)) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any -- FIXME
    const objProps: Record<string, any> = {};
    for (const prop of node.getProperties()) {
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
    return Object.values(objProps).includes(undefined) ? undefined : objProps;
  }
  return handleJsxExpression(node);
};
