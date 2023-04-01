import { createMacro } from "babel-plugin-macros";

const createZeroStyledMacro = () => {
  createMacro(({ references, state, babel }) => {
    const { types: t } = babel;
    const cssRefs = references.default || [];

    const styleSheet = new StyleSheet();
    Object.assign(state, { styleSheet });

    cssRefs.forEach((ref) => {
      if (t.isTaggedTemplateExpression(ref.parent)) {
        throw new Error("Invalid usage of zero-styled macro.");
      }
    });
  });
};

export default createZeroStyledMacro;
