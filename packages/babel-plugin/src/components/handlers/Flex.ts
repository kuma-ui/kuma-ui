import { NodePath, PluginPass, PluginObj, types as t } from "@babel/core";

export const handleFlex = (path: NodePath<t.JSXElement>) => {
  const openingElement = path.node.openingElement;
  if (!t.isJSXIdentifier(openingElement.name)) return;

  // add 'display="flex"' attribute if it's not already present
  if (
    !openingElement.attributes.some(
      (attr) => attr.type === "JSXAttribute" && attr.name.name === "display",
    )
  ) {
    openingElement.attributes.push(
      t.jsxAttribute(t.jsxIdentifier("display"), t.stringLiteral("flex")),
    );
  }
};
