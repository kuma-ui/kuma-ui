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
