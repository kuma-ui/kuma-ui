/**
 * 
import { Node, isNumericLiteral, isStringLiteral, isArrayLiteralExpression } from 'ts-morph';

function extractValue(node: Node): any {
  if (isNumericLiteral(node) || isStringLiteral(node)) {
    return undefined; // 静的値は処理済みとし、undefinedを返す
  }

  if (isArrayLiteralExpression(node)) {
    return node.getElements().map(element => {
      if (isNumericLiteral(element) || isStringLiteral(element)) {
        return '_'; // 静的な配列要素はアンダースコアに置き換え
      } else {
        return element; // 動的な配列要素はそのまま返す
      }
    });
  }

  return node; 
}

 * 
 * 
 * let styledProps = {};
let pseudoProps = {};

for (let prop in props) {
  if (isStyledProp(prop)) {
    let value = extractValue(props[prop]);
    if (value !== undefined) {
      styledProps[prop] = value;
    }
  } else if (isPseudoProp(prop)) {
    let value = extractValue(props[prop]);
    if (value !== undefined) {
      pseudoProps[prop] = value;
    }
  }
}

// Convert pseudo props to the format expected by the system style function
let convertedPseudoProps = Object.entries(pseudoProps).map(([pseudoKey, pseudoValue]) => {
  return {
    key: normalizePseudo(pseudoKey),
    value: pseudoValue
  };
});

// Create the system style object
let style = {
  base: all(styledProps),
  responsive: all(styledProps),
  pseudo: convertedPseudoProps
};

// Add the style rule to the sheet and get the generated class name
let generatedClassName = sheet.addRule(style);

 */
