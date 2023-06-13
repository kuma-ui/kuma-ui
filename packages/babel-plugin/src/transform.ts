import { transformSync } from "@babel/core";

export async function transform(code: string, id: string) {
  const result = await transformSync(code, {
    filename: id,
    sourceMaps: true,
    plugins: [require("./index").default],
  });

  if (!result) return;
  return result;
}
