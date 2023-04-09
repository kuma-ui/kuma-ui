import * as parser from "@babel/parser";
import traverse from "@babel/traverse";
import generate from "@babel/generator";
import { sheet } from "../sheet";
import { extractStylePropsFromAST } from "./extractStyleFromAST";
import { combinedStyles } from "../system";
import { visitor } from "./visitor";
import {
  template,
  types as t,
  parseSync,
  transformFromAstSync,
  transformSync,
  transformAsync,
} from "@babel/core";
import type { ParseResult } from "@babel/core";
import zeroStyledPlugin from "./index";

export async function transform(code: string, id: string) {
  const file: ParseResult | null = parseSync(code);
  if (!file) return;

  const result = await transformFromAstSync(file, code, {
    plugins: [require("./index").default],
  });

  if (!result) return;
  return result;
}
