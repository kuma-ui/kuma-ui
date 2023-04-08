import { sheet } from "../sheet";
import path from "path";
import babel from "@babel/core";
import zeroStyledPlugin from "../babel-plugin";
import { Compiler, WebpackPluginInstance } from "webpack";
import { RawSource, Source } from "webpack-sources";

export default class ZeroStyledWebpackPlugin implements WebpackPluginInstance {
  apply(compiler: Compiler): void {
    compiler.hooks.normalModuleFactory.tap(
      "ZeroStyledWebpackPlugin",
      (normalModuleFactory) => {
        normalModuleFactory.hooks.afterResolve.tapPromise(
          "ZeroStyledWebpackPlugin",
          async (data: any) => {
            if (!/\.(t|j)sx?$/.test(data.resource)) return;

            const source = await data.loadData();

            const result = await babel.transformAsync(source, {
              plugins: [zeroStyledPlugin],
              filename: data.resource,
            });
            if (!result) return;

            data.loadData = () => Promise.resolve(result.code);
          }
        );
      }
    );

    compiler.hooks.emit.tapPromise(
      "ZeroStyledWebpackPlugin",
      async (compilation) => {
        const css = sheet.getCSS();
        compilation.emitAsset("zero-styled.css", new RawSource(css) as any);
      }
    );
  }
}
