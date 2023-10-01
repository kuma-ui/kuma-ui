import { Node, SyntaxKind, ts } from "ts-morph";
import { match } from "ts-pattern";

export const handleJsxExpression = (
  node: Node<ts.Node>,
): string | number | boolean | (string | number | undefined)[] | undefined => {
  return (
    match(node)
      // fontSize={24}
      .when(Node.isNumericLiteral, (num) => {
        return num.getLiteralValue();
      })
      // fontSize={"24px"}
      .when(Node.isStringLiteral, (str) => {
        return str.getLiteralValue().trim();
      })
      // fontSize={`24px`}
      .when(Node.isNoSubstitutionTemplateLiteral, (literal) => {
        return literal.getLiteralValue().trim();
      })
      // horizontal={true}
      // eslint-disable-next-line @typescript-eslint/unbound-method -- FIXME
      .when(Node.isTrueLiteral, (bool) => {
        return bool.getLiteralValue();
      })
      // horizontal={false}
      // eslint-disable-next-line @typescript-eslint/unbound-method -- FIXME
      .when(Node.isFalseLiteral, (bool) => {
        return bool.getLiteralValue();
      })
      // fontSize={['24px', '32px']}
      .when(Node.isArrayLiteralExpression, (array) => {
        const arrayExpression = array.getElements().map((elm) => {
          return handleJsxExpression(elm);
        }) as (string | number | undefined)[];
        // If the arrayExpression includes undefined, it means some of its elements
        // could not be statically analyzed, hence handle it at runtime.
        return arrayExpression.includes(undefined)
          ? undefined
          : arrayExpression;
      })
      // fontSize={2 + 5}
      .when(Node.isBinaryExpression, (exp) => {
        const leftOperand = handleJsxExpression(exp.getLeft());
        const rightOperand = handleJsxExpression(exp.getRight());
        const operator = exp.getOperatorToken().getKind();
        if (
          typeof leftOperand === "number" &&
          typeof rightOperand === "number"
        ) {
          /**
           * ts-pattern doesn't work when the conditions use an enum with numeric values due to the TS limitation
           * @see https://github.com/gvergnaud/ts-pattern/issues/183
           **/
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
      })
      // fontSize={{xl: '2rem'}['xl']}
      .when(Node.isObjectLiteralExpression, (obj) => {
        // TODO
        return undefined;
      })
      // fontSize={func()}
      .when(Node.isCallExpression, (call) => {
        // TODO
        return undefined;
      })
      .otherwise(() => undefined)
  );
};
