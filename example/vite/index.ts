import * as path from "path";
import { Project, SyntaxKind } from "ts-morph";

const project = new Project({
  tsConfigFilePath: path.join(process.cwd(), "tsconfig.json"),
});

const source = project.getSourceFileOrThrow("src/App.tsx");

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
    const jsxTagName = openingElement.getTagNameNode().getText();
    console.log(jsxTagName);
  }
});
// if (node.getKind() === SyntaxKind.JsxElement) {
//   const jsxElement = node.asKindOrThrow(SyntaxKind.JsxElement);
//   const openingElement = jsxElement.getOpeningElement();
//   const jsxTagName = openingElement.getTagName().getText();

//   // Check if the current JSX element is a Kuma component
//   if (Object.values(bindings).includes(jsxTagName)) {
//     openingElement.getAttributes().forEach((attr: JsxAttribute) => {
//       const attrName = attr.getName();
//       const attrValue = attr.getInitializer()?.getText();

//       if (attrValue) {
//         assignValueToProp(attrName, attrValue.replace(/"|'/g, ""));
//       }
//     });
//   }
// }
