import { sheet } from "@kuma-ui/sheet";
import type { NodePath, PluginPass, PluginObj } from "@babel/core";
import { types as t, template } from "@babel/core";
import { ensureReactImport } from "./ensureReactImport";
import type { Core } from "./core";
import { processJSXHTMLTag } from "./processJSXHTMLTag";
import { Node } from "@babel/core";
import { collectImportedStyled } from "./collectImportedStyled";
import { replaceKwithBox } from "./replaceKwithBox";
import { processTaggedTemplateExpression } from "./processTaggedTemplateExpression";
import { processCSS } from "./processCSS";
import { processComponents } from "./components/processComponents";
import { importBox } from "./importBox";
import { theme } from "@kuma-ui/sheet";

export const styledFunctionsMap = new Map<string, Node[]>();

export const visitor = ({ types: t, template }: Core) => {
  // Keep track of the local name for the imported 'styled' function from '@kuma-ui/core'
  // This is necessary to handle cases where the 'styled' function is imported with a different name
  let importedStyleFunctions: Record<string, string> = {};

  const visitor: PluginObj<PluginPass>["visitor"] = {
    Program: {
      enter(path) {
        // Ensure that 'React' is imported in the file
        ensureReactImport(path, t);
        // Reset the importedStyleFunctions
        importedStyleFunctions = collectImportedStyled(path, t);
        // Create an import statement for the 'Box' component from '@kuma-ui/core'
        importBox(path, importedStyleFunctions);
        // Replace the 'k' function from '@kuma-ui/core' with the corresponding HTML tag
        replaceKwithBox(path, t, importedStyleFunctions);
        // Process CSS function calls and generate the hashed classNames
        processCSS(path, t, template, importedStyleFunctions);
        // Process TaggedTemplateExpressions with styled components and generate the hashed classNames
        processTaggedTemplateExpression(path, template, importedStyleFunctions);
        // Traversal over the JSX elements in the Program node to identify Kuma-UI components,
        // processComponents(path, importedStyleFunctions);
        executeCreateTheme(path);

        // Traversal over JSX opening elements, identifying Kuma-UI components and extracting their style props.
        // path.traverse({
        //   JSXOpeningElement(path) {
        //     if (
        //       Object.values(importedStyleFunctions).some((f) => {
        //         if (path.node.name.type === "JSXIdentifier") {
        //           return path.node.name.name === f;
        //         }
        //       })
        //     ) {
        //       processJSXHTMLTag(path);
        //     }
        //   },
        // });
      },
      exit() {
        // (this.file.metadata as { css: string }).css = sheet.getCSS();
        (this.file.metadata as { bindings: Record<string, string> }).bindings =
          importedStyleFunctions;
        // sheet.reset();
      },
    },
  };
  return visitor;
};

export function executeCreateTheme(programPath: NodePath<t.Program>) {
  const importDeclaration = t.importDeclaration(
    [
      t.importSpecifier(
        t.identifier("createTheme"),
        t.identifier("createTheme")
      ),
    ],
    t.stringLiteral("@kuma-ui/core")
  );
  const callExpression = template.expression(
    `
  createTheme(THEME)
`,
    { preserveComments: true }
  )({ THEME: t.valueToNode(theme.getUserTheme()) });
  const callStatement = t.expressionStatement(callExpression);

  programPath.node.body.unshift(importDeclaration, callStatement);
}
