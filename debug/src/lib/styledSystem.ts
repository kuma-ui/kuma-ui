// const { createMacro } = require("babel-plugin-macros");
import { MacroHandler, createMacro } from "babel-plugin-macros";
import { system } from "styled-system";
// const { system } = require("styled-system");

const styledSystemMacro: MacroHandler = ({ references, state, babel }) => {
  const { types: t } = babel;

  references.default.forEach((referencePath) => {
    const config = (referencePath.parentPath.node as any).arguments[0];
    const cssProperties = system(config);
    const cssPropertiesObject = t.objectExpression(
      Object.entries(cssProperties).map(([key, value]) =>
        t.objectProperty(t.identifier(key), t.numericLiteral(value))
      )
    );

    referencePath.parentPath.replaceWith(cssPropertiesObject);
  });
};

module.exports = createMacro(styledSystemMacro);
