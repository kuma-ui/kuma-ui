import { type NodePath, template as Template, types } from "@babel/core";
import { extractStylePropsFromObjectExpression } from "./extractStyleProps/fromObject";
import { sheet, SystemStyle } from "@kuma-ui/sheet";
import { all, normalizePseudo, type PseudoProps } from "@kuma-ui/system";

/**
 * Processes CSS function calls in the AST, extracts styles defined as JavaScript objects,
 * and replaces them with hashed classNames.
 *
 *  @example
 * // Before
 * const text = css({ color: 'red'})
 * // After
 * const text = 'hashed_class_name';
 *
 * @param {NodePath<types.Program>} nodePath - The current node in the AST being traversed.
 * @param {typeof t} t - Babel types.
 * @param {template} template - Babel template function.
 * @param {Record<string, string>} importedStyleFunctions - An object containing the imported styled functions.
 */
export function processCSS(
  nodePath: NodePath<types.Program>,
  t: typeof types,
  template: typeof Template,
  importedStyleFunctions: Record<string, string>
) {
  nodePath.traverse({
    CallExpression(path) {
      const { node } = path;
      const isCSS =
        t.isIdentifier(node.callee) &&
        node.callee.name === importedStyleFunctions["css"];
      if (!isCSS) return;
      if (
        !(
          node.arguments.length === 1 && t.isObjectExpression(node.arguments[0])
        )
      ) {
        // `css` can be called without arguments.
        //  In such a case, it returns an empty string at runtime, as no styles are applied.
        path.replaceWith(t.stringLiteral(""));
        return;
      }
      const styleObject = extractStylePropsFromObjectExpression(
        path,
        node.arguments[0]
      );
      const convertedPseudoProps: SystemStyle["pseudo"] = Object.entries(
        styleObject.pseudoProps
      ).map(([pseudoKey, pseudoValue]) => {
        const pseudoStyle = all(pseudoValue);
        return {
          key: normalizePseudo(pseudoKey),
          base: pseudoStyle.base,
          responsive: pseudoStyle.media,
        };
      });

      const style: SystemStyle = {
        base: all(styleObject.styledProps).base,
        responsive: all(styleObject.styledProps).media,
        pseudo: convertedPseudoProps,
      };

      // Add the style rule to the sheet and get the generated class name.
      const className = sheet.addRule(style);
      path.replaceWith(t.stringLiteral(className));
      return;
    },
  });
}
