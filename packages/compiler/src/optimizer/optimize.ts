import {
  componentList,
  defaultComponentTag,
} from "@kuma-ui/core/components/componentList";
import {
  JsxOpeningElement,
  JsxSelfClosingElement,
  Node,
  SyntaxKind,
} from "ts-morph";
import { isStyledProp, isPseudoProps } from "@kuma-ui/system";

export const optimize = (
  componentName: (typeof componentList)[keyof typeof componentList],
  jsxElement: JsxOpeningElement | JsxSelfClosingElement,
  as?: string
) => {
  const isOptimizable = jsxElement.getAttributes().every((attr) => {
    if (hasDynamicProp(attr.getText())) return false;
    if (Node.isJsxSpreadAttribute(attr)) return false;
    return true;
  });

  if (!isOptimizable) return;

  const rawHTMLTag = (() => {
    const tag = defaultComponentTag[componentName];
    if (as && typeof as === "string") return as;
    else {
      if (typeof tag === "string") return tag;
      return "div";
    }
  })();

  if (Node.isJsxOpeningElement(jsxElement)) {
    const jsxElementParent = jsxElement.getParentIfKind(SyntaxKind.JsxElement);
    if (jsxElementParent) {
      const closingElement = jsxElementParent.getClosingElement();
      jsxElement.getTagNameNode().replaceWithText(rawHTMLTag);
      closingElement.getTagNameNode().replaceWithText(rawHTMLTag);
    }
  } else if (Node.isJsxSelfClosingElement(jsxElement)) {
    jsxElement.getTagNameNode().replaceWithText(rawHTMLTag);
  }
};

function hasDynamicProp(key: string) {
  if (
    isStyledProp(key) ||
    isPseudoProps(key) ||
    key === "variant" ||
    key === "as"
  ) {
    return true;
  }
  return false;
}
