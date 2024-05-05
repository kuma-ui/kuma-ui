export { compile } from "./compile";
import { transformSync } from "@kuma-ui/wasm";

const code = `
import { styled, Button as B } from "@kuma-ui/core";
`;

type Result = {
  source_code: string;
  [key: string]: string;
};

const result: Result = transformSync(code);

const { source_code, ...rest } = result;

console.log(source_code);
console.log(rest);
