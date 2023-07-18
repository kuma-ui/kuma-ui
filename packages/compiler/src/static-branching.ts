type AttributeValue = string | number | boolean | (string | number | undefined)[]

export interface UnevaluatedConditionalExpression {
  type: 'UnevaluatedConditionalExpression',
  expression: string,
  whenTrue: AttributeValue
  whenFalse: AttributeValue
}


export const unevaluatedConditionalExpression = (x: {
  expression: string,
  whenTrue: AttributeValue
  whenFalse: AttributeValue
}): UnevaluatedConditionalExpression => ({
  type: 'UnevaluatedConditionalExpression',
  ...x
})


const COMBINATION_COUNT_MAX = 8;

/**
 * Convert `propsMapWithUnevaluatedConditionals` into a list of propsMap (`propsMapList`), where each of them corresponds to one insantiation of an actual set of values for conditional expressions.
 * It also returns `indexExpression`, which will be evaluated into an integer during runtime to index the corresponding position in `propsMapList`
 *
 * If it could generate too many possibilities, it falls back to completely dynamic behavior.
 *
 * Note that the returned `propsMapList` should always contain at least one element
 */
export const evaluateStaticBranching = (
  propsMapWithUnevaluatedConditionals: Record<string, any>,
): {
  propsMapList: Record<string, any>[],
  /**
   * e.g. "1*!(props.flagA) + 2*!(props.flagB)"
   */
  indexExpression: string
} => {

  const unevaluatedConditionalExpressions: UnevaluatedConditionalExpression[] =
    Object.values(propsMapWithUnevaluatedConditionals).filter(
      (val) => val.type === "UnevaluatedConditionalExpression",
    );

  const normalizedExpressions: string[] = Array.from(
    new Set(
      unevaluatedConditionalExpressions.map((t) => t.expression),
    ),
  );

  const evaluateConditionals = (
    normalizedConditionalExpressionValues: Map<string, boolean>,
  ) => {
    let conditionalIndex = 0;
    return Object.fromEntries(
      Object.entries(propsMapWithUnevaluatedConditionals).map(([k, v]) => {
        if (v.type === "UnevaluatedConditionalExpression") {
          const condition =
            unevaluatedConditionalExpressions[conditionalIndex++];
          const expressionText = condition.expression;
          if (!normalizedConditionalExpressionValues.has(expressionText)) {
            throw new Error(
              "normalizedConditionalExpressionValues does not include the expression: " +
              expressionText,
            );
          }
          return [
            k,
            normalizedConditionalExpressionValues.get(expressionText)
              ? condition.whenFalse
              : condition.whenTrue,
          ];
        }
        return [k, v];
      }),
    );
  };

  const normalizedConditionalExpressionValues = new Map<string, boolean>();
  const combinationCount = 2 ** normalizedExpressions.length;

  const propsMapList = [];

  // Avoid generating too many combinations. If we detect too many combinations could be generated, let's just disable the whole logic for static conditional analysis
  if (combinationCount > COMBINATION_COUNT_MAX) {
    return {
      propsMapList: [
        Object.fromEntries(
          Object.entries(propsMapWithUnevaluatedConditionals).filter(
            ([_k, v]) => v.type !== "UnevaluatedConditionalExpression",
          ),
        ),
      ],
      indexExpression: "0",
    };
  }

  for (
    let combinationIndex = 0;
    combinationIndex < combinationCount;
    ++combinationIndex
  ) {
    normalizedExpressions.forEach((expression, i) => {
      normalizedConditionalExpressionValues.set(
        expression,
        !!((combinationIndex >> i) & 1),
      );
    });
    propsMapList.push(
      evaluateConditionals(normalizedConditionalExpressionValues),
    );
  }
  return {
    propsMapList,
    indexExpression: normalizedExpressions
      .map((condition, i) => `${2 ** i}*!(${condition})`)
      .join(" + ") || '0',
  };
};

