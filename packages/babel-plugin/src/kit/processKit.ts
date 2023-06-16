import { NodePath, PluginPass, PluginObj, types as t } from "@babel/core";
import { componentList } from "@kuma-ui/kit";
import { match } from "ts-pattern";
import { handleBox } from "./handlers";

export const processKit = (
  nodePath: NodePath<t.Program>,
  importedStyleFunctions: Record<string, string>
) => {
  nodePath.traverse({
    JSXElement(path) {
      const openingElement = path.node.openingElement;
      if (t.isJSXIdentifier(openingElement.name)) {
        const name = openingElement.name.name;
        const componentType =
          componentList[
            importedStyleFunctions[name] as keyof typeof componentList
          ];
        if (componentType) {
          match(componentType).with("Box", () => handleBox(path));
        }
      }
    },
  });
};
