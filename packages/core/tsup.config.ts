import { defineConfig } from "tsup";
import fs from "fs";
import path from "path";

export default defineConfig([
  {
    clean: true,
    dts: true,
    format: ["cjs"],
    entry: [
      "src",
      "!src/**/*.test.*",
      "!src/**__test__/**",
      "!src/**/vitest.setup.ts",
    ],
    bundle: false,
  },
  {
    clean: true,
    format: ["esm"],
    entry: [
      "src",
      "!src/**/*.test.*",
      "!src/**__test__/**",
      "!src/**/vitest.setup.ts",
    ],
    bundle: true,
    esbuildPlugins: [
      {
        name: "add-extension",
        setup(build) {
          build.onResolve({ filter: /.*/ }, (args) => {
            const fileExtension = ".ts";
            const extension = ".mjs";
            if (args.importer) {
              const p = path.join(args.resolveDir, args.path);
              let tsPath = `${p}${fileExtension}`;
              let tsxPath = `${p}${fileExtension}x`;

              let importPath = "";
              if (fs.existsSync(tsPath) || fs.existsSync(tsxPath)) {
                importPath = args.path + extension;
              } else {
                tsPath = path.join(
                  args.resolveDir,
                  args.path,
                  `index${fileExtension}`,
                );
                tsxPath = path.join(
                  args.resolveDir,
                  args.path,
                  `index${fileExtension}x`,
                );
                if (fs.existsSync(tsPath) || fs.existsSync(tsxPath)) {
                  importPath = `${args.path}/index${extension}`;
                }
              }
              return { path: importPath, external: true };
            }
          });
        },
      },
    ],
  },
]);
