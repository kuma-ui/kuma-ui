import { NodePath } from "@babel/traverse";
import { TemplateLiteral } from "@babel/types";
import { parse } from "css";
import { Sheet } from "../core/sheet";

function isValidCSS(cssString: string): boolean {
  try {
    const sheet = parse(cssString, { silent: true });
    // if (sheet.stylesheet?.parsingErrors) throw Error;
    return true;
  } catch (error) {
    return false;
  }
}

export const serializeTemplateLiteral = (
  templateLiteral: NodePath<TemplateLiteral>,
  sheet: Sheet
) => {
  const cssString = templateLiteral.node.quasis[0].value.raw;
  if (isValidCSS(cssString)) {
    const className = sheet.addRule(cssString);
    return className;
  } else {
    console.warn(`Invalid CSS:\n${cssString}`);
    return null;
  }
};

export const serializeStyle = () => {};
