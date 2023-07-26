import { BabelFileResult } from "@babel/core";
import { transform } from "../transform";

export function babelTransform(code: string): BabelFileResult {
  const filename = "test.tsx";
  const result = transform(code, filename);

  if (!result) throw Error("transform failed");

  return {
    metadata: result.metadata,
    code: result.code,
  };
}

export function getExpectSnapshot(result: BabelFileResult) {
  return `
${(result.metadata as { css: string } | undefined)?.css}

${result.code}
`;
}
