import { BabelFileResult, transformSync } from "@babel/core";
import plugin from "../";
import { types, template } from "@babel/core";

export function babelTransform(
  code: string,
  runtime: "classic" | "automatic" = "classic"
) {
  const filename = "test.tsx";
  let result: BabelFileResult | null = null;
  result = transformSync(code, {
    plugins: [plugin({ types, template })],
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

  if (result === null || result.code == null)
    throw new Error(`Could not transform`);

  return result;
}

export function getExpectSnapshot(result: BabelFileResult) {
  return `
${(result.metadata as { css: string } | undefined)?.css}

${result.code}
`;
}
