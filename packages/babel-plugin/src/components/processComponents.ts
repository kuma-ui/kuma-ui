import { NodePath, PluginPass, PluginObj, types as t } from "@babel/core";
import { componentList } from "@kuma-ui/core/components/componentList";
import { match } from "ts-pattern";
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
  importedStyleFunctions: Record<string, string>
) => {
  nodePath.traverse({
    JSXElement(path) {
      const openingElement = path.node.openingElement;
      if (t.isJSXIdentifier(openingElement.name)) {
        const name = openingElement.name.name;
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment -- FIXME
        const componentType =
          // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access -- FIXME
          componentList[
            importedStyleFunctions[name] as keyof typeof componentList
          ];
        if (componentType) {
          match(componentType)
            .with("Box", () => handleBox(path))
            .with("Flex", () => handleFlex(path))
            .with("Spacer", () => handleSpacer(path))
            .with("Text", () => handleText(path))
            .with("Button", () => handleButton(path))
            .with("Heading", () => handleHeading(path));
        }
      }
    },
  });
};
