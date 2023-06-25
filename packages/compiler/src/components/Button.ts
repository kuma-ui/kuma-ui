import { NodePath, PluginPass, PluginObj, types as t } from "@babel/core";

export const handleButton = (path: NodePath<t.JSXElement>) => {
  const openingElement = path.node.openingElement;
  if (!t.isJSXIdentifier(openingElement.name)) return;

  // add 'cursor="pointer"' attribute if it's not already present
  if (
    !openingElement.attributes.some(
      (attr) => attr.type === "JSXAttribute" && attr.name.name === "cursor"
    )
  ) {
    openingElement.attributes.push(
      t.jsxAttribute(t.jsxIdentifier("cursor"), t.stringLiteral("pointer"))
    );
  }
};
