import { Node, SyntaxKind, ts } from "ts-morph";

export const handleJsxExpression = (
  node: Node<ts.Node>,
): string | number | boolean | (string | number | undefined)[] | undefined => {
  // fontSize={24}
  if (Node.isNumericLiteral(node)) {
    return node.getLiteralValue();
  }
  // fontSize={"24px"}
  if (Node.isStringLiteral(node)) {
    return node.getLiteralValue().trim();
  }
  // fontSize={`24px`}
  if (Node.isNoSubstitutionTemplateLiteral(node)) {
    return node.getLiteralValue().trim();
  }
  // horizontal={true}
  if (Node.isTrueLiteral(node)) {
    return node.getLiteralValue();
  }
  // horizontal={false}
  if (Node.isFalseLiteral(node)) {
    return node.getLiteralValue();
  }
  // // fontSize={['24px', '32px']}
  if (Node.isArrayLiteralExpression(node)) {
    const arrayExpression = node.getElements().map((elm) => {
      return handleJsxExpression(elm);
    }) as (string | number | undefined)[];
    // If the arrayExpression includes undefined, it means some of its elements
    // could not be statically analyzed, hence handle it at runtime.
    return arrayExpression.includes(undefined) ? undefined : arrayExpression;
  }
  // fontSize={2 + 5}
  if (Node.isBinaryExpression(node)) {
    const leftOperand = handleJsxExpression(node.getLeft());
    const rightOperand = handleJsxExpression(node.getRight());
    const operator = node.getOperatorToken().getKind();
    if (typeof leftOperand === "number" && typeof rightOperand === "number") {
      switch (operator) {
        case SyntaxKind.PlusToken:
          return leftOperand + rightOperand;
        case SyntaxKind.MinusToken:
          return leftOperand - rightOperand;
        case SyntaxKind.AsteriskToken:
          return leftOperand * rightOperand;
        case SyntaxKind.SlashToken:
          return leftOperand / rightOperand;
        default:
          return undefined;
      }
    }
    return undefined;
  }
  // fontSize={{xl: '2rem'}['xl']}
  if (Node.isObjectLiteralExpression(node)) {
    // TODO
    return undefined;
  }
  // fontSize={func()}
  if (Node.isCallExpression(node)) {
    // TODO
    return undefined;
  }
  return undefined;
};
