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

/**
 * Optimizes JSX elements by converting Kuma components to raw HTML elements
 * during compilation, when possible.
 *
 * The transformation can only be applied when no runtime-affecting prefix
 * utility props are present. This is because these would necessitate runtime
 * processing and therefore an intermediary component.
 *
 * For example, a <Flex as='section'> component would be converted to a <section>
 * based on the 'as' prop, or to the default HTML element for that component.
 *
 * @param {string} componentName - The name of the Kuma component.
 * @param {JsxOpeningElement|JsxSelfClosingElement} jsxElement - The JSX element to optimize.
 * @param {string|undefined} as - The HTML element to use as a replacement.
 */
export const optimize = (
  componentName: keyof typeof componentList,
  jsxElement: JsxOpeningElement | JsxSelfClosingElement,
  as?: string,
) => {
  const isOptimizable = jsxElement.getAttributes().every((attrLike) => {
    if (Node.isJsxSpreadAttribute(attrLike)) {
      return false;
    }

    const attr = attrLike.asKindOrThrow(SyntaxKind.JsxAttribute);

    if (hasDynamicProp(attr.getNameNode().getText().trim(), !!as)) {
      return false;
    }

    return true;
  });

  if (!isOptimizable) return;

  const rawHTMLTag = (() => {
    const safeAs = typeof as === "string" ? as.replace(/['"`]/g, "") : as;

    if (safeAs) {
      return safeAs;
    }

    const tag = defaultComponentTag[componentName];

    if (typeof tag === "string") {
      return tag;
    }

    return "div";
  })();

  safeReplaceTagName(jsxElement, rawHTMLTag);
};

function hasDynamicProp(key: string, hasAs: boolean): boolean {
  return (
    isStyledProp(key) ||
    isPseudoProps(key) ||
    key === "variant" ||
    (!hasAs && key === "as")
  );
}

/**
 * Safely attempts to perform a replacement operation on a JSX element.
 * If any error occurs during the operation, it is caught silently, ensuring
 * that the rest of the code execution is unaffected.
 *
 * @param {JsxOpeningElement|JsxSelfClosingElement} jsxElement - Target JSX element to be replaced
 * @param {string} newTagName - HTML tag to replace with
 */
function safeReplaceTagName(
  jsxElement: JsxOpeningElement | JsxSelfClosingElement,
  newTagName: string,
): void {
  const originalComponent = jsxElement.getTagNameNode().getText();
  try {
    if (Node.isJsxOpeningElement(jsxElement)) {
      const jsxElementParent = jsxElement.getParentIfKind(
        SyntaxKind.JsxElement,
      );
      if (jsxElementParent) {
        jsxElementParent
          .getOpeningElement()
          .getTagNameNode()
          .replaceWithText(newTagName);
        jsxElementParent
          .getClosingElement()
          .getTagNameNode()
          .replaceWithText(newTagName);
      }
    } else if (Node.isJsxSelfClosingElement(jsxElement)) {
      jsxElement.getTagNameNode().replaceWithText(newTagName);
      jsxElement
        .getFirstDescendantByKind(SyntaxKind.Identifier)
        ?.replaceWithText(newTagName);
    }

    // Common logic for both JSX element types.
    jsxElement.getAttribute("as")?.remove();
    jsxElement.getAttribute("IS_KUMA_DEFAULT")?.remove();

    // if (process.env.NODE_ENV === "development") {
    //   console.log(
    //     `[Kuma UI] Optimize Success 🐻‍❄️: ${originalComponent} component has been optimized.`
    //   );
    // }
  } catch {
    // if (process.env.NODE_ENV === "development") {
    //   console.error(
    //     `[Kuma UI] Optimize Failed 🐻‍❄️: ${originalComponent} component has not been optimized`
    //   );
    // }
  }
}
