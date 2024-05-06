import { compile } from "../compile";
import { compileSync } from "..";

type Result = ReturnType<typeof compile>;

export function getExpectSnapshot(result: Result) {
  return `
  ${result.css}
  
  ${result.code}
  `;
}

type CompileResult = ReturnType<typeof compileSync>;

export function getExpectSnapshotSync(result: CompileResult) {
  return `
  ${result?.css}
  
  ${result?.code}
  `;
}
