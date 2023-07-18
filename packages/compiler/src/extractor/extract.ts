import {
  Project,
  Node,
  SyntaxKind,
  JsxOpeningElement,
  JsxSelfClosingElement,
} from "ts-morph";
import * as ts from "ts-morph";
import {
  isStyledProp,
  isPseudoProps,
  normalizePseudo,
  all,
  SystemStyle,
  StyleGenerator,
} from "@kuma-ui/system";
import {
  componentDefaultProps,
  componentList,
  isComponentProps,
  componentHandler,
} from "@kuma-ui/core/components/componentList";
import { theme } from "@kuma-ui/sheet";
import { evaluateStaticBranching } from "../static-branching";

const evaluateProps = (
  componentName: (typeof componentList)[keyof typeof componentList],
  jsx: JsxOpeningElement | JsxSelfClosingElement,
  propsMap: Record<string, any>,
) => {
  const styledProps: { [key: string]: any } = {};
  const pseudoProps: { [key: string]: any } = {};
  const componentProps: { [key: string]: any } = {};

  const componentVariantProps: { [key: string]: any } = {};

  const defaultProps = componentDefaultProps(componentName);

  const variant = theme.getVariants(componentName);
  let isDefault = false;

  for (const [propName, propValue] of Object.entries({
    ...defaultProps,
    ...propsMap,
  })) {
    if (isStyledProp(propName.trim())) {
      styledProps[propName.trim()] = propValue;
    } else if (isPseudoProps(propName.trim())) {
      pseudoProps[propName.trim()] = propValue;
    } else if (isComponentProps(componentName)(propName.trim())) {
      componentProps[propName.trim()] = propValue;
    } else if (propName.trim() === "variant") {
      Object.assign(
        componentVariantProps,
        variant?.baseStyle,
        variant?.variants?.[propValue as string],
      );
      jsx.getAttribute("variant")?.remove();
    } else if (propName.trim() === "IS_KUMA_DEFAULT") {
      isDefault = true;
    }
  }

  Object.assign(componentVariantProps, variant?.baseStyle);

  if (
    !(
      !!Object.keys(styledProps).length ||
      !!Object.keys(pseudoProps).length ||
      !!Object.keys(componentProps)
    )
  ) {
    return;
  }

  const specificProps = componentHandler(componentName)(componentProps);

  // Every component internally uses the Box component.
  // However, we do not want to apply the Box theme in those cases.
  if (componentName === "Box" && isDefault) {
    for (const prop in componentVariantProps) {
      if (componentVariantProps.hasOwnProperty(prop)) {
        delete componentVariantProps[prop];
      }
    }
  }

  const combinedProps = {
    ...componentVariantProps,
    ...specificProps,
    ...styledProps,
    ...pseudoProps,
  };
  const key = generateKey(combinedProps);
  let generatedStyle = styleCache[key];
  // If the result isn't in the cache, generate it and save it to the cache
  if (!generatedStyle) {
    generatedStyle = new StyleGenerator(combinedProps).getStyle();
    styleCache[key] = generatedStyle;
  }
  const { className: generatedClassName, css } = generatedStyle;

  // If no generatedClassName is returned, the component should remain intact
  if (!generatedClassName) return { css };

  for (const styledPropKey of Object.keys(styledProps)) {
    jsx.getAttribute(styledPropKey)?.remove();
  }

  for (const pseudoPropKey of Object.keys(pseudoProps)) {
    jsx.getAttribute(pseudoPropKey)?.remove();
  }

  for (const componentPropsKey of Object.keys(componentProps)) {
    jsx.getAttribute(componentPropsKey)?.remove();
  }

  return { css, generatedClassName };
};

const updateClassNameAttr = (
  jsx: JsxOpeningElement | JsxSelfClosingElement,
  className: string | { type: 'expression', expression: string } | undefined,
) => {
  if (!className) {
    return;
  }
  const classNameAttr = jsx.getAttribute("className");
  let newClassNameInitializer = "";

  // Check if a className attribute already exists
  if (classNameAttr && Node.isJsxAttribute(classNameAttr)) {
    const initializer = classNameAttr.getInitializer();
    const existingClassName = Node.isStringLiteral(initializer)
      ? initializer.getText()
      : Node.isJsxExpression(initializer)
        ? initializer.getExpression()?.getText()
        : undefined;

    if (existingClassName) {
      newClassNameInitializer = typeof className !== 'string' ? `\`\${${className.expression}} \${${existingClassName}}\`` : `\`${className} \${${existingClassName}}\``;
    }
    classNameAttr.remove();
  } else {
    newClassNameInitializer = typeof className !== 'string' ? className.expression : JSON.stringify(className);
  }

  jsx.addAttribute({
    name: "className",
    initializer: `{${newClassNameInitializer}}`,
  });
};


export const extractProps = (
  componentName: (typeof componentList)[keyof typeof componentList],
  jsx: JsxOpeningElement | JsxSelfClosingElement,
  propsMapWithUnevaluatedConditionals: Record<string, any>,
): { css: string } | undefined => {
  const { propsMapList, indexExpression } = evaluateStaticBranching(
    propsMapWithUnevaluatedConditionals,
  );

  const evaluationResults = propsMapList.map((propsMap) =>
    evaluateProps(componentName, jsx, propsMap),
  );

  const kumaClassNames: string[] = evaluationResults.map(
    (r) => r?.generatedClassName ?? "",
  );

  const switchingClassNameExpression = `${JSON.stringify(
    kumaClassNames,
  )}[${indexExpression}]`;

  updateClassNameAttr(
    jsx,
    kumaClassNames.length === 1
      ? kumaClassNames[0] ? kumaClassNames[0] : undefined
      : { type: 'expression', expression: switchingClassNameExpression },
  );

  return {
    css: evaluationResults.map((r) => r?.css ?? "").join(" "),
  };
};

/**
 * Generates a unique key for props, aiding cache efficiency.
 * Incurs O(n log n) cost due to sorting, but it's acceptable given the
 * expensive nature of StyleGenerator's internals.
 */
const generateKey = (props: Record<string, any>) => {
  return Object.entries(props)
    .filter(([, value]) => value !== undefined)
    .sort((a, b) => a[0].localeCompare(b[0]))
    .map(([key, value]) => `${key}:${value}`)
    .join("|");
};
const styleCache: {
  [key: string]: { className: string; css: string } | undefined;
} = {};
