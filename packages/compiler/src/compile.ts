import {
  Project,
  Node,
  SyntaxKind,
  JsxOpeningElement,
  JsxSelfClosingElement,
} from "ts-morph";
import { collectPropsFromJsx } from "./collector";
import { extractProps } from "./extractor";
import { componentList } from "@kuma-ui/core";

const project = new Project({});

const compile = (
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
      console.log(bindings, jsxTagName);
      if (!Object.values(bindings).includes(jsxTagName)) return;
      const originalComponentName = Object.keys(bindings).find(
        (key) =>
          bindings[key] === jsxTagName &&
          Object.values(componentList).some((c) => c === key)
      );
      if (!originalComponentName) return;
      const componentName =
        originalComponentName as (typeof componentList)[keyof typeof componentList];
      const extractedPropsMap = collectPropsFromJsx(openingElement);
      extractProps(openingElement, extractedPropsMap);
      console.log(`---------${id} pre----------`);
    }
  });
  console.log(`---------${id} post----------`);
  return { code: source.getFullText(), id };
};

export { compile };
