/**
import { Node, isNumericLiteral, isStringLiteral, isArrayLiteralExpression, isObjectLiteralExpression } from 'ts-morph';
import { match, __ } from 'ts-pattern';

// the function to handle the extraction of object literal expressions
function handleObjectLiteralExpression(node: Node): any {
  const value = {};
  node.getProperties().forEach(property => {
    const name = property.getName();
    const initializer = property.getInitializer();
    if (initializer) {
      value[name] = extractValue(initializer);
    }
  });
  return value;
}

// the function to handle the extraction of array literal expressions
function handleArrayLiteralExpression(node: Node): any {
  return node.getElements().map(extractValue);
}

function extractValue(node: Node): any {
  return match(node)
    .with({ kind: isNumericLiteral(node) }, (node) => {
      styledProps[prop] = node.getLiteralValue();
      return undefined;
    })
    .with({ kind: isStringLiteral(node) }, (node) => {
      styledProps[prop] = node.getLiteralValue();
      return undefined;
    })
    .with({ kind: isArrayLiteralExpression(node) }, handleArrayLiteralExpression)
    .with({ kind: isObjectLiteralExpression(node) }, handleObjectLiteralExpression)
    .otherwise(() => node);
}

 */
