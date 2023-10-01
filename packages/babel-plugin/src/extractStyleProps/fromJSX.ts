import { types as t, type NodePath } from "@babel/core";
import { isStyledProp, PseudoProps, isPseudoProps } from "@kuma-ui/system";
import { ExtractedStyleProps } from ".";
import { extractStylePropsFromObjectExpression } from "./fromObject";

export function extractStylePropsFromJSX(
  path: NodePath<t.JSXOpeningElement>,
  openingElement: t.JSXOpeningElement,
): ExtractedStyleProps<NodePath<t.JSXOpeningElement>> {
  const styledProps: { [key: string]: string | number | (string | number)[] } =
    {};
  const pseudoProps: PseudoProps = {};

  const filteredAttributes = (openingElement.attributes.filter((attr) => {
    if (
      t.isJSXAttribute(attr) &&
      t.isJSXIdentifier(attr.name) &&
      isStyledProp(attr.name.name)
    ) {
      if (t.isStringLiteral(attr.value)) {
        styledProps[attr.name.name] = attr.value.value;
      } else if (t.isJSXExpressionContainer(attr.value)) {
        const { expression } = attr.value;
        if (t.isStringLiteral(expression) || t.isNumericLiteral(expression)) {
          styledProps[attr.name.name] = expression.value;
        } else if (t.isIdentifier(expression)) {
          const binding = path.scope.getBinding(expression.name);
          if (binding && ["const", "let", "var"].includes(binding.kind)) {
            const declaration = binding.path.node;
            if (t.isVariableDeclarator(declaration)) {
              const init = declaration.init;
              if (t.isStringLiteral(init) || t.isNumericLiteral(init)) {
                styledProps[attr.name.name] = init.value;
              }
            }
          }
        } else if (t.isMemberExpression(expression)) {
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
                  if (
                    remainingPath.length === 0 &&
                    t.isExpression(prop.value)
                  ) {
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

          const propertyPath = getPropertyPath(expression);
          if (propertyPath.length === 0) return;

          const objBinding = path.scope.getBinding(propertyPath[0]);
          const target = dfs(objBinding, propertyPath.slice(1));

          if (
            target &&
            (t.isStringLiteral(target) || t.isNumericLiteral(target))
          ) {
            styledProps[attr.name.name] = target.value;
          }
        } else if (t.isArrayExpression(expression)) {
          styledProps[attr.name.name] = expression.elements
            .map((e) => {
              if (e?.type === "NumericLiteral" || e?.type === "StringLiteral") {
                return e.value;
              }
            })
            .filter(Boolean) as (string | number)[];
        }
      }
      return false;
    } else if (
      t.isJSXAttribute(attr) &&
      t.isJSXIdentifier(attr.name) &&
      t.isJSXExpressionContainer(attr.value) &&
      t.isObjectExpression(attr.value.expression) &&
      isPseudoProps(attr.name.name)
    ) {
      Object.assign(pseudoProps, {
        ...pseudoProps,
        [attr.name.name]: extractStylePropsFromObjectExpression(
          path,
          attr.value.expression,
        ).styledProps,
      });
      return false;
    } else if (
      t.isJSXAttribute(attr) &&
      t.isJSXIdentifier(attr.name) &&
      attr.name.name === "data-kuma-ui"
    ) {
      return false;
    }
    return true;
  }) || []) as t.JSXAttribute[];

  return { filteredAttributes, styledProps, pseudoProps };
}
