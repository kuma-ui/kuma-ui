import { createMacro, MacroHandler } from "babel-plugin-macros";
import fs from "fs";
import path from "path";

const styledSystemMacro: MacroHandler = ({ references, state, babel }) => {
  const { types: t } = babel;
  const outputCSSPath = path.join(process.cwd(), "output.css");

  references.default.forEach((referencePath) => {
    if (referencePath?.parentPath?.type === "JSXOpeningElement") {
      const attrs = referencePath.parentPath.get("attributes") as any[];
      const styleProps = attrs.filter((attr) =>
        ["m", "color", "fontSize"].includes(attr.node.name.name)
      );

      // Process the styling props and generate CSS.
      const uniqueClassName = `view-${state.file.opts.filename}-${referencePath.node.start}`;

      const css = styleProps
        .map((prop) => {
          const propName = prop.node.name.name;
          const propValue = t.isLiteral(prop.node.value.expression)
            ? prop.node.value.expression.value
            : undefined;
          return `${propName}: ${propValue};`;
        })
        .join("\n");

      // Save CSS to the output file.
      const cssString = `.${uniqueClassName} {\n${css}\n}`;
      fs.appendFileSync(outputCSSPath, cssString);

      // Replace the styling props with the generated class name.
      styleProps.forEach((prop) => prop.remove());
      if (t.isJSXOpeningElement(referencePath.parentPath.node)) {
        referencePath.parentPath.node.attributes.push(
          t.jsxAttribute(
            t.jsxIdentifier("className"),
            t.stringLiteral(uniqueClassName)
          )
        );
      }
    }
  });
};

export default createMacro(styledSystemMacro);
