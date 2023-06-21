import { JsxOpeningElement, JsxSelfClosingElement, Node } from "ts-morph";
export const decodeNode = (node: Node): Node => {
  // If node is an AsExpression, decode it
  if (Node.isAsExpression(node)) {
    return decodeNode(node.getExpression());
  }

  // If node is a ParenthesizedExpression, decode it
  if (Node.isParenthesizedExpression(node)) {
    return decodeNode(node.getExpression());
  }

  // If node is a NonNullExpression, decode it
  if (Node.isNonNullExpression(node)) {
    return decodeNode(node.getExpression());
  }

  // If node is a TypeAssertion, decode it
  if (Node.isTypeAssertion(node)) {
    return decodeNode(node.getExpression());
  }

  // If node is not any of the above, return it as is
  return node;
};
