import {
  Project,
  Node,
  SyntaxKind,
  JsxOpeningElement,
  JsxSelfClosingElement,
} from "ts-morph";

export const collectPropsFromJsx = (
  node: JsxOpeningElement | JsxSelfClosingElement
) => {
  console.log("hello");
};
