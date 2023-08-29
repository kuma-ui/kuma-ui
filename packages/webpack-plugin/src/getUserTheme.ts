import eval from "eval";
import { buildSync } from "esbuild";
import type { UserTheme } from "packages/sheet";

export const getUserTheme = (configPath: string) => {
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

  return userTheme;
};
