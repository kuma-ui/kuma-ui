import * as parser from "@babel/parser";
import traverse from "@babel/traverse";
import generate from "@babel/generator";
import { sheet } from "../sheet";
import { extractStylePropsFromAST } from "./extractStyleFromAST";
import { combinedStyles } from "../system";
import { visitor } from "./visitor";
import { template, types as t } from "@babel/core";

export function transform(code: string, id: string) {
  const ast = parser.parse(code, {
    sourceType: "module",
    plugins: ["jsx", "typescript"],
  });

  if (typeof process !== "undefined" && process.versions.node) {
    const customeVisitor = visitor({ types: t, template });
    const updatedVisitor = {
      TaggedTemplateExpression: customeVisitor.TaggedTemplateExpression!,
      JSXElement: customeVisitor.JSXElement!,
      Program: customeVisitor.Program!,
    } as any;

    traverse(ast, updatedVisitor);
  }

  const generated = generate(ast, {
    sourceMaps: true,
    sourceFileName: id,
  });

  return {
    code: generated.code,
    map: generated.map,
  };
}
