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
  jsxElement: JsxOpeningElement | JsxSelfClosingElement
) => {
  let as: string | undefined = undefined;
  const isOptimizable = jsxElement.getAttributes().every((attrLike) => {
    if (Node.isJsxSpreadAttribute(attrLike)) return false;
    const attr = attrLike.asKindOrThrow(SyntaxKind.JsxAttribute);
    if (attr.getNameNode().getText() === "as" && Node.isJsxAttribute(attr)) {
      console.log(attr.getText());
      const initializer = attr.getInitializer();
      if (Node.isStringLiteral(initializer)) {
        as = initializer.getText();
      } else if (Node.isJsxExpression(initializer)) {
        const exp = initializer.getExpression();
        if (!exp) return false;
        const expStr = handleJsxExpression(decode(exp));
        if (typeof expStr == "string") as = expStr;
        else return false;
      }
    }

    if (hasDynamicProp(attr.getNameNode().getFullText())) return false;
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
