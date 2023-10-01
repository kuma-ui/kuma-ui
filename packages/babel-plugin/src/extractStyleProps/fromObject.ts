import { types as t, type NodePath } from "@babel/core";
import { isStyledProp, PseudoProps, isPseudoProps } from "@kuma-ui/system";
import { ExtractedStyleProps } from ".";

export function extractStylePropsFromObjectExpression(
  path: NodePath<t.ObjectExpression | t.CallExpression | t.JSXOpeningElement>,
  objectExpression: t.ObjectExpression,
): ExtractedStyleProps<NodePath<t.ObjectExpression>> {
  const styledProps: { [key: string]: string | number | (string | number)[] } =
    {};
  const pseudoProps: PseudoProps = {};

  const filteredProperties = (objectExpression.properties?.filter((prop) => {
    if (
      t.isObjectProperty(prop) &&
      t.isIdentifier(prop.key) &&
      isStyledProp(prop.key.name)
    ) {
      if (t.isStringLiteral(prop.value) || t.isNumericLiteral(prop.value)) {
        styledProps[prop.key.name] = prop.value.value;
      } else if (t.isIdentifier(prop.value)) {
        const binding = path.scope.getBinding(prop.value.name);
        if (binding && ["const", "let", "var"].includes(binding.kind)) {
          const declaration = binding.path.node;
          if (t.isVariableDeclarator(declaration)) {
            const init = declaration.init;
            if (t.isStringLiteral(init) || t.isNumericLiteral(init)) {
              styledProps[prop.key.name] = init.value;
            }
          }
        }
      } else if (t.isMemberExpression(prop.value)) {
        const getPropertyPath = (expr: t.Expression) => {
          const path: string[] = [];
          let currentExpr = expr;
          while (t.isMemberExpression(currentExpr)) {
            if (t.isIdentifier(currentExpr.property)) {
              path.unshift(currentExpr.property.name);
            }
            currentExpr = currentExpr.object;
          }
          if (t.isIdentifier(currentExpr)) {
            path.unshift(currentExpr.name);
          }
          return path;
        };
        const dfs = (
          objBinding:
            | ReturnType<typeof path.scope.getBinding>
            | t.ObjectExpression,
          propertyPath: string[],
        ): t.Expression | null => {
          if (!objBinding) return null;
          const objDeclaration =
            "path" in objBinding ? objBinding.path.node : objBinding;
          if (
            !t.isVariableDeclarator(objDeclaration) &&
            !t.isObjectExpression(objDeclaration)
          ) {
            return null;
          }
          const objExpression =
            "init" in objDeclaration ? objDeclaration.init : objDeclaration;
          if (!t.isObjectExpression(objExpression)) return null;
          const [nextProperty, ...remainingPath] = propertyPath;
          for (const prop of objExpression.properties) {
            if (t.isObjectProperty(prop) && t.isIdentifier(prop.key)) {
              if (prop.key.name === nextProperty) {
                if (remainingPath.length === 0 && t.isExpression(prop.value)) {
                  return prop.value;
                } else {
                  if (t.isObjectExpression(prop.value)) {
                    return dfs(prop.value, remainingPath);
                  } else if (t.isIdentifier(prop.value)) {
                    const nextObjBinding = path.scope.getBinding(
                      prop.value.name,
                    );
                    return dfs(nextObjBinding, remainingPath);
                  } else {
                    return null;
                  }
                }
              }
            }
          }
          return null;
        };

        const propertyPath = getPropertyPath(prop.value);
        if (propertyPath.length === 0) return;

        const objBinding = path.scope.getBinding(propertyPath[0]);
        const target = dfs(objBinding, propertyPath.slice(1));

        if (
          target &&
          (t.isStringLiteral(target) || t.isNumericLiteral(target))
        ) {
          styledProps[prop.key.name] = target.value;
        }
      } else if (t.isArrayExpression(prop.value)) {
        styledProps[prop.key.name] = prop.value.elements
          .map((e) => {
            if (e?.type === "NumericLiteral" || e?.type === "StringLiteral") {
              return e.value;
            }
          })
          .filter(Boolean) as (string | number)[];
      }
      return false;
    } else if (
      t.isObjectProperty(prop) &&
      t.isIdentifier(prop.key) &&
      t.isObjectExpression(prop.value) &&
      isPseudoProps(prop.key.name)
    ) {
      Object.assign(pseudoProps, {
        ...pseudoProps,
        [prop.key.name]: extractStylePropsFromObjectExpression(path, prop.value)
          .styledProps,
      });
      return false;
    } else if (
      t.isObjectProperty(prop) &&
      prop.key.type === "StringLiteral" &&
      prop.key.value === "data-kuma-ui"
    ) {
      return false;
    }
    return true;
  }) || []) as t.ObjectProperty[];

  return { filteredProperties, styledProps, pseudoProps };
}
