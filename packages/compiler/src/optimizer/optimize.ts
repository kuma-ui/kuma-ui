import { componentList } from "@kuma-ui/core/components/componentList";
import { JsxOpeningElement, JsxSelfClosingElement } from "ts-morph";

export const optimize = (
  componentName: (typeof componentList)[keyof typeof componentList],
  jsxElement: JsxOpeningElement | JsxSelfClosingElement
) => {
  const isOptimizable = jsxElement.getAttributes().some((attr) => {
    console.log("-------------------");
    console.log(attr.getText());
    return true;
  });
};
