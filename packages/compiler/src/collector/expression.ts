import { Node, ts } from "ts-morph";
import { match } from "ts-pattern";

export const handleJsxExpression = (node: Node<ts.Node>) => {
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
