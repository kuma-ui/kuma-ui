import { BabelFileResult, transformSync } from "@babel/core";
import plugin from "../";

export function babelTransform(
  code: string,
  runtime?: "classic" | "automatic"
): BabelFileResult {
  const filename = "test.tsx";
  const result1 = transformSync(code, {
    plugins: [plugin],
    filename,
  });

  if (result1 === null || result1.code == null)
    throw new Error(`Could not transform`);

  if (!runtime) {
    return result1;
  }

  const result2 = transformSync(result1.code, {
    presets: [
      "@babel/preset-typescript",
      [
        "@babel/preset-react",
        {
          runtime,
        },
      ],
    ],
    filename,
  });

  if (result2 === null || result2.code == null)
    throw new Error(`Could not transform`);

  return {
    metadata: result1.metadata,
    code: result2.code,
  };
}

export function getExpectSnapshot(result: BabelFileResult) {
  return `
${(result.metadata as { css: string } | undefined)?.css}

${result.code}
`;
}
