import { createMacro } from "babel-plugin-macros";
import { Sheet } from "./utils/sheet";
import { relative, basename, join } from "path";
import { readFileSync } from "fs";
import { type NodePath } from "@babel/core";
import type { TaggedTemplateExpression } from "@babel/types";

export default createMacro(({ references, state, babel }) => {
  const { types: t } = babel;
  const cssRefs = references.zeroStyled || [];

  const styleSheet = new Sheet();
  Object.assign(state, { styleSheet });

  cssRefs.forEach((ref) => {
    console.log("------");
    console.log(ref.parent);
    console.log("------");
    if (!t.isTaggedTemplateExpression(ref.parent)) {
      throw new Error("Invalid usage of zero-styled macro.");
    }
    const templateLiteral = ref.parentPath?.get("quasi") as NodePath<
      TaggedTemplateExpression["quasi"]
    >;
    const cssString = templateLiteral.node.quasis[0].value.raw; // we should serialize this later
    const className = styleSheet.addRule(cssString);

    ref.parentPath?.replaceWith(t.stringLiteral(className));
  });

  const filename = state.file.opts.filename || "";
  const output = relative(
    process.cwd(),
    filename.replace(/\.[^.]+$/, ".static.css")
  );
});
