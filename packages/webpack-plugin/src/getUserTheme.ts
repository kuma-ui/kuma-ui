import eval from "eval";
import { buildSync } from "esbuild";
import fs from "fs";
import type { UserTheme } from "packages/sheet";

let prevConfigText: string | undefined;
let pervUserTheme: Partial<UserTheme> | undefined;

export const getUserTheme = (configPath: string) => {
  const configText = fs.readFileSync(configPath, "utf8");
  const isChanged = configText !== prevConfigText;
  prevConfigText = configText;

  if (!isChanged) {
    return pervUserTheme;
  }

  const result = buildSync({
    bundle: true,
    target: "es2017",
    write: false,
    platform: "node",
    format: typeof require !== "undefined" ? "cjs" : "esm",
    absWorkingDir: process.cwd(),
    outfile: configPath + ".out",
    entryPoints: [configPath],
    logLevel: "silent",
  });

  const { default: userTheme } = eval(
    result.outputFiles[0].text,
    configPath
  ) as {
    default: Partial<UserTheme>;
  };

  pervUserTheme = userTheme;

  return userTheme;
};
