// const { createMacro } = require("babel-plugin-macros");

import { createMacro, MacroHandler } from "babel-plugin-macros";

// type Handler = Parameters<typeof createMacro>[0] extends (
//   ...args: infer A
// ) => any
//   ? A
//   : never;

const styledSystemMacro: MacroHandler = ({ references, state, babel }) => {
  const { types: t } = babel;
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
          //   const propValue = prop.node.value.expression.value;
          const propValue = t.isLiteral(prop.node.value.expression)
            ? prop.node.value.expression.value
            : undefined;
          return `${propName}: ${propValue};`;
        })
        .join("\n");

      // Inject the CSS into the document's head during development.
      //   if (process.env.NODE_ENV === "development") {
      if (true) {
        const cssString = `.${uniqueClassName} {\n${css}\n}`;
        const injectCss = t.jsxExpressionContainer(
          t.callExpression(
            t.memberExpression(t.identifier("document"), t.identifier("write")),
            [t.stringLiteral(`<style>${cssString}</style>`)]
          )
        );

        referencePath.parentPath.parentPath?.insertBefore(injectCss);
      }

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
