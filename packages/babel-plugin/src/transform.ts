import { transformSync } from "@babel/core";
import { extract } from "@kuma-ui/compiler";
import { sheet } from "@kuma-ui/sheet";

export async function transform(code: string, id: string) {
  const result = await transformSync(code, {
    filename: id,
    sourceMaps: true,
    plugins: [require("./index").default],
  });
  if (!result || !result.code) return;

  const bindings = (
    result.metadata as unknown as { bindings: Record<string, string> }
  ).bindings;
  result.code = extract(result.code, id, bindings).code;
  (result.metadata as unknown as { css: string }).css = sheet.getCSS();
  sheet.reset();
  return result;
}
