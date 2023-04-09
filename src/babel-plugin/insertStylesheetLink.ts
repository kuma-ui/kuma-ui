import { NodePath } from "@babel/core";
import { JSXElement, JSXAttribute, JSXIdentifier } from "@babel/types";

export function insertStylesheetLink(
  path: NodePath<JSXElement>,
  t: typeof import("@babel/types")
) {
  const openingElement = path.get("openingElement");
  console.log(path.get("openingElement").node.name);
  if (
    t.isJSXIdentifier(openingElement.node.name) &&
    openingElement.node.name.name === "head"
  ) {
    const linkAttr: JSXAttribute[] = [
      t.jsxAttribute(t.jsxIdentifier("rel"), t.stringLiteral("stylesheet")),
      t.jsxAttribute(
        t.jsxIdentifier("href"),
        t.stringLiteral("./zero-styled.css")
      ),
    ];

    const linkElement = t.jsxElement(
      t.jsxOpeningElement(t.jsxIdentifier("link"), linkAttr, true),
      null,
      [],
      true
    );

    // Append the link element to the children of the head element
    path.node.children.push(linkElement);
  }
}
