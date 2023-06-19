import {
  Project,
  Node,
  SyntaxKind,
  JsxOpeningElement,
  JsxSelfClosingElement,
} from "ts-morph";
import { PseudoProps, isStyledProp, isPseudoProps } from "@kuma-ui/system";
import { collectPropsFromJsx } from "./collector/props";

const project = new Project({});

const extract = (
  code: string,
  id: string,
  bindings: Record<string, string>
) => {
  const source = project.createSourceFile(id, code, { overwrite: true });
  source.forEachDescendant((node) => {
    if (
      node.getKind() === SyntaxKind.JsxElement ||
      node.getKind() === SyntaxKind.JsxSelfClosingElement
    ) {
      let openingElement: JsxOpeningElement | JsxSelfClosingElement;
      if (node.getKind() === SyntaxKind.JsxElement) {
        const jsxElement = node.asKindOrThrow(SyntaxKind.JsxElement);
        openingElement = jsxElement.getOpeningElement();
      } else {
        openingElement = node.asKindOrThrow(SyntaxKind.JsxSelfClosingElement);
      }
      const jsxTagName = openingElement.getTagNameNode().getText();
      // Check if the current JSX element is a Kuma component
      if (!Object.values(bindings).includes(jsxTagName)) return;
      collectPropsFromJsx(openingElement);
    }
  });

  return { code: source.getFullText(), id };
};

type Extracted = {
  styledProps: { [key: string]: any };
  pseudoProps: PseudoProps;
  filteredAttributes: { [key: string]: any };
};
const extracted: Extracted = {
  styledProps: {},
  pseudoProps: {},
  filteredAttributes: {},
};

export { extract };
