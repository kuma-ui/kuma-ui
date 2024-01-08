import type { NextConfig } from "next";
import browserslist from "browserslist";
import { type Configuration, type RuleSetRule } from "webpack";
import KumaUIWebpackPlugin from "@kuma-ui/webpack-plugin";
import { lazyPostCSS } from "next/dist/build/webpack/config/blocks/css/index.js";
import { getGlobalCssLoader } from "next/dist/build/webpack/config/blocks/css/loaders/index.js";
import { findPagesDir } from "next/dist/lib/find-pages-dir.js";
import type { ConfigurationContext } from "next/dist/build/webpack/config/utils.js";

const getSupportedBrowsers = (dir: string, isDevelopment: boolean) => {
  try {
    return browserslist.loadConfig({
      path: dir,
      env: isDevelopment ? "development" : "production",
    });
    // eslint-disable-next-line no-empty -- FIXME
  } catch {}
  return undefined;
};

const kumaUiConfig = (nextConfig: NextConfig): NextConfig => {
  return {
    webpack(config: Configuration & ConfigurationContext, options) {
      // const { dir, dev, isServer } = options;
      // const { appDir } = findPagesDir(
      //   dir,
      //   !!options.config.experimental.appDir,
      // );

      // const cssRules = (
      //   config.module?.rules?.find(
      //     (rule) =>
      //       typeof rule === "object" &&
      //       Array.isArray(rule.oneOf) &&
      //       rule.oneOf.some(
      //         ({ test }) =>
      //           test instanceof RegExp &&
      //           typeof test.test === "function" &&
      //           test.test("filename.css"),
      //       ),
      //   ) as RuleSetRule
      // )?.oneOf;

      // const appDirOptions = appDir
      //   ? {
      //       hasAppDir: true,
      //       experimental: { appDir: true },
      //     }
      //   : {};

      // cssRules?.push({
      //   test: /.css$/i,
      //   sideEffects: true,
      //   use: getGlobalCssLoader(
      //     {
      //       assetPrefix: config.assetPrefix,
      //       isClient: !isServer,
      //       isServer,
      //       isDevelopment: dev,
      //       experimental: {},
      //       // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment -- FIXME
      //       future: nextConfig.future || {},
      //       ...appDirOptions,
      //     } as ConfigurationContext,
      //     () => lazyPostCSS(dir, getSupportedBrowsers(dir, dev), undefined),
      //     [],
      //   ),
      // });

      // config.module?.rules?.push({
      //   test: /\.(tsx|ts|js|mjs|jsx)$/,
      //   exclude: /node_modules/,
      //   use: [
      //     {
      //       loader: KumaUIWebpackPlugin.loader,
      //       options: {
      //         virtualLoader: !appDir,
      //         cssOutputDir: "./.next/cache/kuma",
      //       },
      //     },
      //   ],
      // });

      config.plugins?.push(new KumaUIWebpackPlugin());
      if (typeof nextConfig.webpack === "function") {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-return -- FIXME
        return nextConfig.webpack(config, options);
      }
      return config;
    },
  };
};

export const withKumaUI = (nextConfig: NextConfig) => {
  return Object.assign({}, nextConfig, kumaUiConfig(nextConfig));
};
