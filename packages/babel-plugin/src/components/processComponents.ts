import { NodePath, PluginPass, PluginObj, types as t } from "@babel/core";
import { componentList } from "@kuma-ui/core/dist/components/componentList";
import { match } from "ts-pattern";
import { handleBox, handleFlex, handleSpacer } from "./handlers";

export const processComponents = (
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
          match(componentType)
            .with("Box", () => handleBox(path))
            .with("Flex", () => handleFlex(path))
            .with("Spacer", () => handleSpacer(path));
        }
      }
    },
  });
};
