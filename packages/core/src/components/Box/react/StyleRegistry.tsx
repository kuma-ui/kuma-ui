import React from "react";
import { StyleSheetRegistry } from "./StyleSheetRegistry";

export const StyleSheetContext = React.createContext<StyleSheetRegistry | null>(
  null
);
StyleSheetContext.displayName = "StyleSheetContext";

export function createStyleRegistry(): StyleSheetRegistry {
  return new StyleSheetRegistry();
}

export function StyleRegistry({
  registry: configuredRegistry,
  children,
}: {
  registry?: StyleSheetRegistry | null;
  children: React.ReactElement;
}): React.ReactElement {
  const rootRegistry = React.useContext(StyleSheetContext);
  const [registry] = React.useState(
    () => rootRegistry || configuredRegistry || createStyleRegistry()
  );

  return React.createElement(
    StyleSheetContext.Provider,
    { value: registry },
    children
  );
}

export function useStyleRegistry(): StyleSheetRegistry | null {
  return React.useContext(StyleSheetContext);
}
