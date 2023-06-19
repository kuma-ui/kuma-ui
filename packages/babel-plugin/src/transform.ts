import { transformSync } from "@babel/core";
import { extract } from "@kuma-ui/compiler";

export async function transform(code: string, id: string) {
  const result = await transformSync(code, {
    filename: id,
    sourceMaps: true,
    plugins: [require("./index").default],
  });
  if (!result || !result.code) return;

  const metadata = (
    result.metadata as unknown as { bindings: Record<string, string> }
  ).bindings;

  result.code = extract(result.code, id, metadata).code;
  return result;
}
