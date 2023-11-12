import { NodePath, PluginPass, PluginObj, types as t } from "@babel/core";
import { componentList } from "@kuma-ui/core/components/componentList";
import {
  handleBox,
  handleFlex,
  handleSpacer,
  handleText,
  handleButton,
  handleHeading,
} from "./handlers";

export const processComponents = (
  nodePath: NodePath<t.Program>,
  importedStyleFunctions: Record<string, string>,
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
          switch (componentType) {
            case "Box":
              return handleBox(path);
            case "Flex":
              return handleFlex(path);
            case "Spacer":
              return handleSpacer(path);
            case "Text":
              return handleText(path);
            case "Button":
              return handleButton(path);
            case "Heading":
              return handleHeading(path);
          }
        }
      }
    },
  });
};
