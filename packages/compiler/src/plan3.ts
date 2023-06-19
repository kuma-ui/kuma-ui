/**
 
import { Node, isNumericLiteral, isStringLiteral, isArrayLiteralExpression, isObjectLiteralExpression } from 'ts-morph';
import { match, __ } from 'ts-pattern';

// styledProps, pseudoProps, and filteredAttributes
let styledProps: { [key: string]: any } = {};
let pseudoProps: { [key: string]: any } = {};
let filteredAttributes: { [key: string]: any } = {};

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

// the function to extract the value of a node and assign it to the appropriate object
function extractValue(prop: string, node: Node): any {
  return match(node)
    .with({ kind: isNumericLiteral(node) }, (node) => {
      assignValueToProp(prop, node.getLiteralValue());
      return undefined;
    })
    .with({ kind: isStringLiteral(node) }, (node) => {
      assignValueToProp(prop, node.getLiteralValue());
      return undefined;
    })
    .with({ kind: isArrayLiteralExpression(node) }, handleArrayLiteralExpression)
    .with({ kind: isObjectLiteralExpression(node) }, handleObjectLiteralExpression)
    .otherwise(() => node);
}

// the function to assign a value to a prop in the correct object
function assignValueToProp(prop: string, value: any): void {
  if (isStyledProps(prop)) {
    styledProps[prop] = value;
  } else if (isPseudoProps(prop)) {
    pseudoProps[prop] = value;
  } else {
    filteredAttributes[prop] = value;
  }
}

// you'd call extractValue with the prop and node like this:
// extractValue('color', node);

 */
