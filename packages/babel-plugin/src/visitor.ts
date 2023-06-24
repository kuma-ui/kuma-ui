import { sheet } from "@kuma-ui/sheet";
import type { NodePath, PluginPass, PluginObj, types as t } from "@babel/core";
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
        processComponents(path, importedStyleFunctions);

        // Traversal over JSX opening elements, identifying Kuma-UI components and extracting their style props.
        path.traverse({
          JSXOpeningElement(path) {
            if (
              Object.values(importedStyleFunctions).some((f) => {
                if (path.node.name.type === "JSXIdentifier") {
                  return path.node.name.name === f;
                }
              })
            ) {
              processJSXHTMLTag(path);
            }
          },
        });
      },
      exit() {
        (this.file.metadata as { css: string }).css = sheet.getCSS();
        sheet.reset();
      },
    },
  };
  return visitor;
};
