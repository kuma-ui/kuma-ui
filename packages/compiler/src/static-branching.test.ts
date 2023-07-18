import { expect, test } from "vitest";
import {
  evaluateStaticBranching,
  unevaluatedConditionalExpression,
} from "./static-branching";

test("evaluateStaticBranching without unevaluated conditional expression", async () => {
  const result = evaluateStaticBranching({
    bg: "red",
    color: "black",
  });

  expect(result.indexExpression).toEqual("0");
  expect(result.propsMapList).toEqual([{ bg: "red", color: "black" }]);
});

test("evaluateStaticBranching with two flags", async () => {
  const result = evaluateStaticBranching({
    bg: "red",
    fontFamily: unevaluatedConditionalExpression({
      expression: "flag0",
      whenTrue: "monospace",
      whenFalse: "sans-serif",
    }),
    m: unevaluatedConditionalExpression({
      expression: "flag1",
      whenTrue: 1,
      whenFalse: 2,
    }),
  });

  let flag0, flag1;

  {
    flag0 = true;
    flag1 = true;

    expect(result.propsMapList[eval(result.indexExpression)]).toEqual({
      bg: "red",
      fontFamily: "monospace",
      m: 1,
    });
  }

  {
    flag0 = true;
    flag1 = false;

    expect(result.propsMapList[eval(result.indexExpression)]).toEqual({
      bg: "red",
      fontFamily: "monospace",
      m: 2,
    });
  }
});

test("evaluateStaticBranching with duplicated flags", async () => {
  const result = evaluateStaticBranching({
    bg: "red",
    fontFamily: unevaluatedConditionalExpression({
      expression: "flag",
      whenTrue: "monospace",
      whenFalse: "sans-serif",
    }),
    m: unevaluatedConditionalExpression({
      expression: "flag",
      whenTrue: 1,
      whenFalse: 2,
    }),
  });

  // `flag` only appears once in the index expression
  expect(result.indexExpression).toEqual("1*!(flag)");
  // The same conditions are deduped
  expect(result.propsMapList.length).toEqual(2);

  let flag;

  {
    flag = false;
    expect(result.propsMapList[eval(result.indexExpression)]).toEqual({
      bg: "red",
      fontFamily: "sans-serif",
      m: 2,
    });
  }

  {
    flag = true;
    expect(result.propsMapList[eval(result.indexExpression)]).toEqual({
      bg: "red",
      fontFamily: "monospace",
      m: 1,
    });
  }
});


test("evaluateStaticBranching should give up when there are too many conditionals", async () => {
  const result = evaluateStaticBranching({
    p: 123,
    bg: unevaluatedConditionalExpression({
      expression: "flag0",
      whenTrue: "red",
      whenFalse: "black",
    }),
    color: unevaluatedConditionalExpression({
      expression: "flag1",
      whenTrue: "white",
      whenFalse: "green",
    }),
    fontFamily: unevaluatedConditionalExpression({
      expression: "flag2",
      whenTrue: "monospace",
      whenFalse: "sans-serif",
    }),
    m: unevaluatedConditionalExpression({
      expression: "flag3",
      whenTrue: 1,
      whenFalse: 2,
    }),
  });

  expect(result.indexExpression).toEqual("0");
  // all the props with conditionas are removed here since "it gave up"
  expect(result.propsMapList).toEqual([
    { p: 123 }
  ]);
});
