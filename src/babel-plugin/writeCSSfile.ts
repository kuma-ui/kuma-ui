import { writeFileSync } from "fs";
import path from "path";

export function writeCSSFile(css: string) {
  const cssFilePath = path.join(process.cwd(), "zero-styled.css");
  writeFileSync(cssFilePath, css);
  return cssFilePath;
}
