import type { NextConfig } from "next";
import { loadConfig } from "browserslist";
import { type Configuration, type RuleSetRule } from "webpack";
import KumaUIWebpackPlugin from "@kuma-ui/webpack-plugin";
import { lazyPostCSS } from "next/dist/build/webpack/config/blocks/css";
import { getGlobalCssLoader } from "next/dist/build/webpack/config/blocks/css/loaders";
import type { ConfigurationContext } from "next/dist/build/webpack/config/utils";

type KumaConfig = ConstructorParameters<typeof KumaUIWebpackPlugin>[0];

const getSupportedBrowsers = (dir: string, isDevelopment: boolean) => {
  try {
    return loadConfig({
      path: dir,
      env: isDevelopment ? "development" : "production",
    });
  } catch {}
  return undefined;
};

const kumaUiConfig = (
  nextConfig: NextConfig,
  kumaConfig: KumaConfig = {}
): NextConfig => {
  return {
    webpack(config: Configuration & ConfigurationContext, options) {
      const { dir, dev, isServer } = options;
      const appDir = nextConfig.experimental?.appDir === true;

      const cssRules = (
        config.module?.rules?.find(
          (rule) =>
            typeof rule === "object" &&
            Array.isArray(rule.oneOf) &&
            rule.oneOf.some(
              ({ test }) =>
                test instanceof RegExp &&
                typeof test.test === "function" &&
                test.test("filename.css")
            )
        ) as RuleSetRule
      )?.oneOf;

      const appDirOptions = appDir
        ? {
            hasAppDir: true,
            experimental: { appDir: true },
          }
        : {};

      cssRules?.push({
        test: /.css$/i,
        sideEffects: true,
        use: getGlobalCssLoader(
          {
            assetPrefix: config.assetPrefix,
            isClient: !isServer,
            isServer,
            isDevelopment: dev,
            experimental: {},
            future: nextConfig.future || {},
            ...appDirOptions,
          } as ConfigurationContext,
          () => lazyPostCSS(dir, getSupportedBrowsers(dir, dev), undefined),
          []
        ),
      });

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

      config.plugins?.push(
        new KumaUIWebpackPlugin({
          virtualLoader: !appDir,
          cssOutputDir: "./.next/cache/kuma",
        })
      );
      if (typeof nextConfig.webpack === "function") {
        return nextConfig.webpack(config, options);
      }
      return config;
    },
  };
};

export const withKumaUI = (
  nextConfig: NextConfig,
  kumaConfig: KumaConfig = {}
) => {
  return Object.assign({}, nextConfig, kumaUiConfig(nextConfig, kumaConfig));
};
