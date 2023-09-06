import { compile } from "../compile";

type Result = ReturnType<typeof compile>;

export function getExpectSnapshot(result: Result) {
  return `
  ${result.css}
  
  ${result.code}
  `;
}
