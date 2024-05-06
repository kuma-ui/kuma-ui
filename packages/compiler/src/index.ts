import { transformSync as babelTransformSync } from "@babel/core";
import plugin from "@kuma-ui/babel-plugin";
import { compile } from "./compile";
import { sheet } from "@kuma-ui/sheet";
import { transformSync } from "@kuma-ui/wasm";

type WasmResult = {
  source_code: string;
  [key: string]: string;
};

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
    const { source_code, ...rest } = transformSync(
      code,
      extension,
    ) as WasmResult;
    if (!source_code || !source_code) return;
    result.code = source_code || "";
    result.bindings = rest;
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

  const compiled = compile(result.code, id, result.bindings);

  const compiledResult = {
    code: compiled.code,
    css: sheet.getCSS() + compiled.css,
  };

  sheet.reset();
  return compiledResult;
};
