// TODO: convert to TypeScript compiler api
import { globbySync } from "globby";
import fs from "node:fs";
import { createRequire } from "node:module";
import path from "node:path";

const verbose = false;

const verboseLog = (...args: any[]): void => {
  if (verbose) {
    console.log(...args);
  }
};

const nodeRequire = createRequire(import.meta.url);

let replaceCount = 0;

const convert = (modulePath: string, outFile: string): string => {
  if (modulePath.startsWith(".")) {
    let result;
    if (path.extname(modulePath) === "") {
      const modulePathResolvePath = path.resolve(
        path.dirname(outFile),
        modulePath
      );
      const moduleRequireResolvePath = nodeRequire.resolve(
        modulePathResolvePath
      );
      const ext = moduleRequireResolvePath
        .replace(modulePathResolvePath, "")
        .replace(".js", ".mjs");
      result = `${modulePath}${ext}`;
    } else {
      result = modulePath.replace(".js", ".mjs");
    }
    if (modulePath !== result) {
      replaceCount += 1;
      verboseLog(
        `\treplacing '${modulePath}' -> '${result}' referencing ${outFile}`
      );
    }
    return result;
  }
  return modulePath;
};

const replaceImportStatement = (
  orig: string,
  matched: string,
  outFile: string
): string => {
  const index = orig.indexOf(matched);
  return (
    orig.substring(0, index) +
    convert(matched, outFile) +
    orig.substring(index + matched.length)
  );
};

const addMjsExt = (text: string, outFile: string): string => {
  const importRegex = /(?:import|from) ['"]([^'"]*)['"]/g;
  return text.replace(importRegex, (orig, matched) =>
    replaceImportStatement(orig, matched, outFile)
  );
};

const rootDir = process.cwd();
const outDir = path.resolve(rootDir, "dist");
const files = globbySync(`${outDir}/**/*.mjs`).map((x) => path.resolve(x));

let changedFileCount = 0;

for (let i = 0; i < files.length; i += 1) {
  const file = files[i];
  const text = fs.readFileSync(file, "utf8");
  const prevReplaceCount = replaceCount;
  const newText = addMjsExt(text, file);
  if (text !== newText) {
    changedFileCount += 1;
    verboseLog(
      `${file}: replaced ${replaceCount - prevReplaceCount} import statements`
    );
    fs.writeFileSync(file, newText, "utf8");
  }
}

console.log(
  `Replaced ${replaceCount} import statements in ${changedFileCount} files`
);
