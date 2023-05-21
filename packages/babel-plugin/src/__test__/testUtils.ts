import { transformSync } from "@babel/core";
import plugin from "../";
import { types, template } from "@babel/core";

export function babelTransform(
  code: string,
  runtime: "classic" | "automatic" = "classic"
) {
  const result = transformSync(code, {
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
    filename: "test.tsx",
  });

  if (result === null || result.code === null)
    throw new Error(`Could not transform`);

  return { result: result, code: result.code };
}
