import { Node, JsxOpeningElement, JsxSelfClosingElement } from "ts-morph";
import { isStyledProp, isPseudoProps, StyleGenerator } from "@kuma-ui/system";
import {
  componentDefaultProps,
  componentList,
  isComponentProps,
  componentHandler,
} from "@kuma-ui/core/components/componentList";
import { theme } from "@kuma-ui/sheet";
import { match } from "ts-pattern";
import * as types from "../types";

const evaluateProps = (
  componentName: (typeof componentList)[keyof typeof componentList],
  jsx: JsxOpeningElement | JsxSelfClosingElement,
  propsMap: Record<string, types.StaticValue>
) => {
  const styledProps: { [key: string]: types.StaticValue } = {};
  const pseudoProps: { [key: string]: types.StaticValue } = {};
  const componentProps: { [key: string]: types.StaticValue } = {};
  const componentVariantProps: { [key: string]: types.StaticValue } = {};

  const defaultProps = componentDefaultProps(componentName);

  const variant = theme.getVariants(componentName);
  let isDefault = false;

  for (const [propName, propValue] of Object.entries({
    ...defaultProps,
    ...propsMap,
  })) {
    if (isStyledProp(propName)) {
      styledProps[propName] = propValue;
    } else if (isPseudoProps(propName)) {
      pseudoProps[propName] = propValue;
    } else if (isComponentProps(componentName)(propName)) {
      componentProps[propName] = propValue;
    } else if (propName === "variant") {
      Object.assign(
        componentVariantProps,
        variant?.baseStyle,
        variant?.variants?.[propValue as string]
      );
      jsx.getAttribute("variant")?.remove();
    } else if (propName === "IS_KUMA_DEFAULT") {
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
      if (Object.hasOwn(componentVariantProps, prop)) {
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
  className: string | { type: "expression"; expression: string } | undefined
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
      newClassNameInitializer =
        typeof className !== "string"
          ? `\`\${${className.expression}} \${${existingClassName}}\``
          : `\`${className} \${${existingClassName}}\``;
    }
    classNameAttr.remove();
  } else {
    newClassNameInitializer =
      typeof className !== "string"
        ? className.expression
        : JSON.stringify(className);
  }

  jsx.addAttribute({
    name: "className",
    initializer: `{${newClassNameInitializer}}`,
  });
};

const createConditionalStylesMap = () => {
  const conditionalStylesMap = new Map<string, [string, types.Conditional][]>();

  return {
    add: (expression: string, prop: string, value: types.Conditional) => {
      const unevaluatedExpressionList = conditionalStylesMap.get(expression);
      if (!unevaluatedExpressionList) {
        conditionalStylesMap.set(expression, [[prop, value]]);
      } else {
        unevaluatedExpressionList.push([prop, value]);
      }
    },
    getMap: () => conditionalStylesMap,
  };
};
/**
 * Classify props into "completely static" part and "props which can change based on conditionals".
 * The latter is grouped by conditional expression.
 */
const classifyProps = (
  props: Record<string, types.Value>
): {
  staticProps: {
    [_: string]: types.StaticValue;
  };
  conditionalPropsList: Array<{
    expression: string;
    whenTrue: { [_: string]: types.StaticValue };
    whenFalse: { [_: string]: types.StaticValue };
  }>;
} => {
  const staticStyles: [string, types.StaticValue][] = [];

  const conditionalStylesMap = createConditionalStylesMap();

  for (const [k, v] of Object.entries(props)) {
    match(v)
      .with({ type: "Static" }, (v) => {
        staticStyles.push([k, v.value]);
      })
      .with({ type: "Conditional" }, (v) => {
        conditionalStylesMap.add(v.expression, k, v);
      })
      .with({ type: "Record" }, (v) => {
        const classified = classifyProps(v.value);
        classified.conditionalPropsList.forEach((cond) => {
          conditionalStylesMap.add(cond.expression, k, types.conditional(cond));
        });
        staticStyles.push([k, classified.staticProps]);
      })
      .exhaustive();
  }
  return {
    staticProps: Object.fromEntries(staticStyles),
    conditionalPropsList: Array.from(
      conditionalStylesMap.getMap().entries()
    ).map(([expression, styles]) => ({
      expression,
      whenTrue: Object.fromEntries(
        styles.map(([propName, value]) => [propName, value.whenTrue])
      ),
      whenFalse: Object.fromEntries(
        styles.map(([propName, value]) => [propName, value.whenFalse])
      ),
    })),
  };
};

export const extractProps = (
  componentName: (typeof componentList)[keyof typeof componentList],
  jsx: JsxOpeningElement | JsxSelfClosingElement,
  props: Record<string, types.Value>
): { css: string } | undefined => {
  const { staticProps, conditionalPropsList } = classifyProps(props);

  const staticStyles = evaluateProps(componentName, jsx, staticProps);

  const conditinoalResult = conditionalPropsList.map((conditionalProps) => {
    const whenTrue = evaluateProps(
      componentName,
      jsx,
      conditionalProps.whenTrue
    );
    const whenFalse = evaluateProps(
      componentName,
      jsx,
      conditionalProps.whenFalse
    );
    return {
      expression: conditionalProps.expression,
      whenTrue,
      whenFalse,
    };
  });

  const conditionalClassNameExpressions: string[] = conditinoalResult.map(
    (cond) =>
      `(${cond.expression}) ? ${JSON.stringify(
        cond.whenTrue?.generatedClassName ?? ""
      )} : ${JSON.stringify(cond.whenFalse?.generatedClassName ?? "")}`
  );

  updateClassNameAttr(
    jsx,
    conditionalClassNameExpressions.length === 0
      ? staticStyles?.generatedClassName
      : {
        type: "expression",
        expression: `\`${staticStyles?.generatedClassName
            ? staticStyles.generatedClassName + " "
            : ""
          }${conditionalClassNameExpressions
            .map((cond) => "${" + cond + "}")
            .join(" ")}\``,
      }
  );

  return {
    css: [
      ...(staticStyles?.css ? [staticStyles?.css] : []),
      ...conditinoalResult.flatMap((cond) => [
        cond.whenTrue?.css ?? "",
        cond.whenFalse?.css ?? "",
      ]),
    ].join(" "),
  };
};

/**
 * Generates a unique key for props, aiding cache efficiency.
 * Incurs O(n log n) cost due to sorting, but it's acceptable given the
 * expensive nature of StyleGenerator's internals.
 */
const generateKey = (props: Record<string, types.StaticValue>) => {
  return (
    Object.entries(props)
      .filter(([, value]) => value !== undefined)
      .sort((a, b) => a[0].localeCompare(b[0]))
      // eslint-disable-next-line @typescript-eslint/restrict-template-expressions -- FIXME
      .map(([key, value]) => `${key}:${value}`)
      .join("|")
  );
};
const styleCache: {
  [key: string]: { className: string; css: string } | undefined;
} = {};
