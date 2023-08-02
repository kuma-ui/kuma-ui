import { Expression, Node, SyntaxKind, ts } from "ts-morph";
import { match } from "ts-pattern";
import * as types from "../types";
import { isPseudoProps } from "@kuma-ui/system";

/**
 * Normalize ts-morph Node to make further processing simpler
 */
const normalizeNode = (node: Node): Node => {
  if (Node.isAsExpression(node)) {
    return normalizeNode(node.getExpression());
  }

  if (Node.isParenthesizedExpression(node)) {
    return normalizeNode(node.getExpression());
  }

  if (Node.isNonNullExpression(node)) {
    return normalizeNode(node.getExpression());
  }

  if (Node.isTypeAssertion(node)) {
    return normalizeNode(node.getExpression());
  }

  return node;
};

/**
 * This function attempts to statically analyze the JSX expression and determine its value at compile time.
 * However, if the expression cannot be statically analyzed, the function returns `undefined`.
 *
 * The function uses the provided `propName` parameter to optimize the handling of object literal expressions.
 * If `propName` is not a pseudo prop, the function avoids unnecessary recursive computations.
 *
 * @param {Expression<ts.Expression>} node - The JSX expression to handle.
 * @param {string} propName - The name of the property that this expression is being used for.
 * @returns {types.Value | undefined} A `types.Value` representing the value of the JSX expression if it can be statically analyzed, or `undefined` otherwise.
 */
export const handleJsxExpression = (
  node: Expression<ts.Expression>,
  propName: string
): types.Value | undefined => {
  return (
    match(normalizeNode(node))
      // fontSize={24}
      .when(Node.isNumericLiteral, (num) => {
        return types.staticValue(num.getLiteralValue());
      })
      // fontSize={"24px"}
      .when(Node.isStringLiteral, (str) => {
        return types.staticValue(str.getLiteralValue().trim());
      })
      // fontSize={`24px`}
      .when(Node.isNoSubstitutionTemplateLiteral, (literal) => {
        return types.staticValue(literal.getLiteralValue().trim());
      })
      // horizontal={true}
      // eslint-disable-next-line @typescript-eslint/unbound-method -- FIXME
      .when(Node.isTrueLiteral, (bool) => {
        return types.staticValue(bool.getLiteralValue());
      })
      // horizontal={false}
      // eslint-disable-next-line @typescript-eslint/unbound-method -- FIXME
      .when(Node.isFalseLiteral, (bool) => {
        return types.staticValue(bool.getLiteralValue());
      })
      // fontSize={['24px', '32px']}
      .when(Node.isArrayLiteralExpression, (array) => {
        const arrayExpression = array
          .getElements()
          .map((elm) => handleJsxExpression(elm, propName))
          .map((x) =>
            x?.type === "Static"
              ? typeof x.value === "string" || typeof x.value === "number"
                ? x.value
                : undefined
              : undefined
          );
        // If the arrayExpression includes undefined, it means some of its elements
        // could not be statically analyzed, hence handle it at runtime.
        return arrayExpression.some((x) => x === undefined)
          ? undefined
          : types.staticValue(arrayExpression);
      })
      // fontSize={someFlag ? "24px" : "32px"}
      .when(Node.isConditionalExpression, (conditional) => {
        const condition = conditional.getCondition();
        const whenTrue = handleJsxExpression(
          conditional.getWhenTrue(),
          propName
        );
        const whenFalse = handleJsxExpression(
          conditional.getWhenFalse(),
          propName
        );

        return whenTrue?.type === "Static" && whenFalse?.type === "Static"
          ? types.conditional({
              expression: condition.getText(),
              whenTrue: whenTrue.value,
              whenFalse: whenFalse.value,
            })
          : undefined;
      })
      // _hover={{color: 'red'}}
      .when(Node.isObjectLiteralExpression, (obj) => {
        // This must be pseudo props, otherwise it shouldn't be collected.
        if (!isPseudoProps(propName)) return undefined;

        const entries: [string, types.Value][] = [];
        for (const prop of obj.getProperties()) {
          // Ignore the properties that are not simple assignments, like getters, setters, shorthand methods, and computed property names
          if (!Node.isPropertyAssignment(prop)) return undefined;

          const initializer = prop.getInitializer();
          if (!initializer) return undefined;

          const propName = prop.getName();
          const value = handleJsxExpression(initializer, propName);
          if (value === undefined) return undefined;

          entries.push([propName, value]);
        }

        if (entries.every((e) => e[1].type === "Static")) {
          return types.staticValue(
            Object.fromEntries(
              entries.map((e) =>
                e[1].type === "Static" ? [e[0], e[1].value] : ({} as never)
              )
            )
          );
        } else {
          return types.recordValue(Object.fromEntries(entries));
        }
      })
      // fontSize={func()}
      .when(Node.isCallExpression, (_call) => {
        // TODO
        return undefined;
      })
      .otherwise(() => undefined)
  );
};
