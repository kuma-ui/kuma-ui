import {
  Project,
  Node,
  SyntaxKind,
  JsxOpeningElement,
  JsxSelfClosingElement,
  JsxAttribute,
} from "ts-morph";
import { isPseudoProps, isStyledProp } from "packages/system/dist";
import { match } from "ts-pattern";

export const collectPropsFromJsx = (
  node: JsxOpeningElement | JsxSelfClosingElement
) => {
  const jsxAttributes = node.getAttributes();
  const extracted: Record<string, any> = {};
  jsxAttributes.forEach((jsxAttribute) => {
    if (Node.isJsxAttribute(jsxAttribute)) {
      const propName = jsxAttribute.getNameNode().getFullText();
      const isStyled = isStyledProp(propName);
      const isPseudo = isPseudoProps(propName);
      if (!isStyled && isPseudo) return;
      // If the value is returned, it means that it can be statically analyzed, so we remove the corresponding prop from the Jsx tag and generate CSS.
      const propValue = extractAttribute(jsxAttribute);
      if (!propValue) return;
      extracted[propName] = propValue;
    }
  });
  return extracted;
};

const extractAttribute = (jsxAttribute: JsxAttribute) => {
  const initializer = jsxAttribute.getInitializer();

  return (
    match(initializer)
      // fontSize='24px'
      .when(Node.isStringLiteral, (initializer) => {
        const value = initializer.getLiteralText();
        return value;
      })
      // fontSize={...}
      .when(Node.isJsxExpression, (initializer) => {
        const expression = initializer.getExpression();
        if (!expression) return;
        // TODO
        return expression.getFullText();
      })
      .otherwise(() => undefined)
  );
};
