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
import { decode } from "../collector/decode";
import { handleJsxExpression } from "../collector/expression";

export const optimize = (
  componentName: (typeof componentList)[keyof typeof componentList],
  jsxElement: JsxOpeningElement | JsxSelfClosingElement,
  as?: string
) => {
  const isOptimizable = jsxElement.getAttributes().every((attrLike) => {
    if (Node.isJsxSpreadAttribute(attrLike)) return false;
    const attr = attrLike.asKindOrThrow(SyntaxKind.JsxAttribute);
    if (hasDynamicProp(attr.getNameNode().getText())) return false;
    return true;
  });

  if (!isOptimizable) return;

  const rawHTMLTag = (() => {
    const tag = defaultComponentTag[componentName];
    if (!!as && typeof as === "string") {
      jsxElement.getAttribute("as")?.remove();
      return (as as string).replace(/['"`]/g, "");
    } else {
      if (typeof tag === "string") return tag;
      return "div";
    }
  })();

  jsxElement.getAttribute("IS_KUMA_DEFAULT")?.remove();

  // console.log(jsxElement.getSourceFile().getFullText());

  if (Node.isJsxOpeningElement(jsxElement)) {
    const jsxElementParent = jsxElement.getParentIfKind(SyntaxKind.JsxElement);
    const children = jsxElement.getChildren();
    console.log(jsxElementParent?.getText());

    if (jsxElementParent) {
      const children = jsxElement.getChildren();

      const closingElement = jsxElementParent.getClosingElement();
      const openingElement = jsxElementParent.getOpeningElement();

      openingElement.getTagNameNode();
      closingElement.getTagNameNode();

      console.log(openingElement.getText());
    }
  } else if (Node.isJsxSelfClosingElement(jsxElement)) {
    jsxElement.getTagNameNode().replaceWithText(rawHTMLTag);
    jsxElement
      .getFirstDescendantByKind(SyntaxKind.Identifier)
      ?.replaceWithText(rawHTMLTag);
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
