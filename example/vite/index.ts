import * as path from "path";
import { Project, SyntaxKind, Node, JsxAttribute } from "ts-morph";
import { match } from "ts-pattern";

const project = new Project({
  tsConfigFilePath: path.join(process.cwd(), "tsconfig.json"),
});

const source = project.getSourceFileOrThrow("src/App.tsx");

const pattern = (jsxAttribute: JsxAttribute) => {
  const initializer = jsxAttribute.getInitializer();

  return match(initializer)
    .when(Node.isStringLiteral, (initializer) => {
      const value = initializer.getLiteralText();
      return value;
    })
    .when(Node.isJsxExpression, (initializer) => {
      const expression = initializer.getExpression();
      console.log(expression?.getFullText());
      expression;
    })
    .otherwise(() => undefined);
};

source.forEachDescendant((node) => {
  if (
    node.getKind() === SyntaxKind.JsxElement ||
    node.getKind() === SyntaxKind.JsxSelfClosingElement
  ) {
    let openingElement;
    if (node.getKind() === SyntaxKind.JsxElement) {
      const jsxElement = node.asKindOrThrow(SyntaxKind.JsxElement);
      openingElement = jsxElement.getOpeningElement();
    } else {
      openingElement = node.asKindOrThrow(SyntaxKind.JsxSelfClosingElement);
    }

    const jsxAttributes = openingElement.getAttributes();
    jsxAttributes.forEach((jsxAttribute) => {
      if (Node.isJsxAttribute(jsxAttribute)) {
        const value = pattern(jsxAttribute);
        console.log(value);
      }
    });
  }
});
