import { transformSync } from "@babel/core";
import { compile } from "@kuma-ui/compiler";
import pluin from ".";
import { sheet } from "@kuma-ui/sheet";

export async function transform(code: string, id: string) {
  const result = transformSync(code, {
    filename: id,
    sourceMaps: true,
    plugins: [pluin],
  });
  if (!result || !result.code) return;

  const bindings = (
    result.metadata as unknown as { bindings: Record<string, string> }
  ).bindings;
  const compiled = compile(result.code, id, bindings);
  result.code = compiled.code;
  (result.metadata as unknown as { css: string }).css =
    sheet.getCSS() + compiled.css;
  sheet.reset();
  return result;
}
