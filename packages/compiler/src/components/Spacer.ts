import { NodePath, types as t } from "@babel/core";

/**
 * Transforms a Spacer JSXElement to include specific style attributes.
 * Removes 'size' and 'horizontal' attributes and adds 'display', 'flexShrink',
 * 'width', and 'height' attributes based on the original attributes.
 *
 * @param {NodePath<t.JSXElement>} path - The JSXElement NodePath to transform.
 */
export const handleSpacer = (path: NodePath<t.JSXElement>) => {
  const openingElement = path.node.openingElement;
  if (!t.isJSXIdentifier(openingElement.name, { name: "Spacer" })) return;

  // get 'size' and 'horizontal' props
  let size: t.JSXAttribute | undefined;
  let horizontal: t.JSXAttribute | undefined;

  openingElement.attributes = openingElement.attributes.filter((attr) => {
    if (t.isJSXAttribute(attr)) {
      if (attr.name.name === "size") {
        size = attr;
        return false;
      } else if (attr.name.name === "horizontal") {
        horizontal = attr;
        return false;
      }
    }
    return true;
  });

  // define attributes for vertical or horizontal spacer
  const displayValue = horizontal ? "inline-block" : "block";
  const display = openingElement.attributes.some(
    (attr) => t.isJSXAttribute(attr) && attr.name.name === "display"
  )
    ? undefined
    : t.jsxAttribute(t.jsxIdentifier("display"), t.stringLiteral(displayValue));

  const flexShrink = openingElement.attributes.some(
    (attr) => t.isJSXAttribute(attr) && attr.name.name === "flexShrink"
  )
    ? undefined
    : t.jsxAttribute(
        t.jsxIdentifier("flexShrink"),
        t.jSXExpressionContainer(t.numericLiteral(0))
      );

  let widthValue, heightValue;
  if (size && t.isJSXExpressionContainer(size.value)) {
    widthValue = horizontal
      ? size.value
      : t.jSXExpressionContainer(t.stringLiteral("auto"));
    heightValue = horizontal
      ? t.jSXExpressionContainer(t.stringLiteral("auto"))
      : size.value;
  } else {
    widthValue = horizontal
      ? t.jSXExpressionContainer(t.numericLiteral(0))
      : t.jSXExpressionContainer(t.stringLiteral("auto"));
    heightValue = horizontal
      ? t.jSXExpressionContainer(t.stringLiteral("auto"))
      : t.jSXExpressionContainer(t.numericLiteral(0));
  }

  const width = openingElement.attributes.some(
    (attr) => t.isJSXAttribute(attr) && attr.name.name === "width"
  )
    ? undefined
    : t.jsxAttribute(t.jsxIdentifier("width"), widthValue);

  const height = openingElement.attributes.some(
    (attr) => t.isJSXAttribute(attr) && attr.name.name === "height"
  )
    ? undefined
    : t.jsxAttribute(t.jsxIdentifier("height"), heightValue);

  // add attributes
  [display, flexShrink, width, height].forEach((attr) => {
    if (attr) openingElement.attributes.push(attr);
  });
};
