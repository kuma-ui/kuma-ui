import { createMacro } from "babel-plugin-macros";
import { Sheet } from "./utils/sheet";
import { relative, basename, join } from "path";
import { readFileSync } from "fs";

export default createMacro(({ references, state, babel }) => {
  const { types: t } = babel;
  const cssRefs = references.default || [];
  console.log(cssRefs);

  const styleSheet = new Sheet();
  Object.assign(state, { styleSheet });

  cssRefs.forEach((ref) => {
    if (t.isTaggedTemplateExpression(ref.parent)) {
      throw new Error("Invalid usage of zero-styled macro.");
    }
  });

  const filename = state.file.opts.filename || "";
  const output = relative(
    process.cwd(),
    filename.replace(/\.[^.]+$/, ".static.css")
  );
});
