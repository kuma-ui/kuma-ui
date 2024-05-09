import { transformSync as babelTransformSync } from "@babel/core";
import plugin from "@kuma-ui/babel-plugin";
import { sheet } from "@kuma-ui/sheet";
import { transformSync, compileSync as wasmCompileSync } from "@kuma-ui/wasm";
import { compile } from "./compile";

type CompileArg = {
  code: string;
  id: string;
  wasm?: boolean;
};

export const compileSync = ({ code, id, wasm }: CompileArg) => {
  const result: { code: string; bindings: Record<string, string> } = {
    code: "",
    bindings: {},
  };

  if (wasm) {
    const extension = (() => {
      const ext = id.split(".").pop();
      if (!ext) return "tsx";
      switch (ext) {
        case "ts":
          return "ts";
        case "tsx":
          return "tsx";
        case "js":
          return "js";
        case "jsx":
          return "jsx";
        default:
          return "tsx";
      }
    })();

    const { code: source_code, imports } = transformSync(code, extension);

    result.code = source_code || "";
    result.bindings = imports;
  } else {
    const transformed = babelTransformSync(code, {
      filename: id,
      sourceMaps: true,
      plugins: [plugin],
    });
    if (!transformed || !transformed.code) return;
    const bindings = (
      transformed.metadata as unknown as { bindings: Record<string, string> }
    ).bindings;
    result.code = transformed.code || "";
    result.bindings = bindings;
  }

  // const compiled = wasm
  //   ? wasmCompileSync(result.code, id, result.bindings)
  //   : compile(result.code, id, result.bindings);

  const compiled = compile(result.code, id, result.bindings);

  const compiledResult = {
    code: compiled.code,
    css: sheet.getCSS() + compiled.css,
  };

  sheet.reset();
  return compiledResult;
};

console.log(
  wasmCompileSync(``, "index.tsx", {
    Box: "Box",
    css: "css",
  }),
);
