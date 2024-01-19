import type { NextConfig } from "next";
import browserslist from "browserslist";
import { type Configuration, type RuleSetRule } from "webpack";
import KumaUIWebpackPlugin from "@kuma-ui/webpack-plugin";
import { lazyPostCSS } from "next/dist/build/webpack/config/blocks/css/index.js";
import { getGlobalCssLoader } from "next/dist/build/webpack/config/blocks/css/loaders/index.js";
import type { ConfigurationContext } from "next/dist/build/webpack/config/utils.js";

/** 
This config sets destination directory for generated CSS files which is a temporary workaround to enable HMR in Next.js client components.
Do not document this option as it will be removed once the issue is fixed.
NOTE: Any emitted CSS files under ./next directory will be ignored by Next.js. Thus, we need to emit CSS files under some other directory.
*/
type KumaConfig = ConstructorParameters<typeof KumaUIWebpackPlugin>[0];

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

const kumaUiConfig = (
  nextConfig: NextConfig,
  kumaUiConfig: KumaConfig = {},
): NextConfig => {
  return {
    webpack(config: Configuration & ConfigurationContext, options) {
      const { dir, dev, isServer } = options;

      const cssRules = (
        config.module?.rules?.find(
          (rule) =>
            typeof rule === "object" &&
            Array.isArray(rule.oneOf) &&
            rule.oneOf.some(
              ({ test }) =>
                test instanceof RegExp &&
                typeof test.test === "function" &&
                test.test("filename.css"),
            ),
        ) as RuleSetRule
      )?.oneOf;

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
            // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment -- FIXME
            future: nextConfig.future || {},
          } as ConfigurationContext,
          () => lazyPostCSS(dir, getSupportedBrowsers(dir, dev), undefined),
          [],
        ),
      });

      config.plugins?.push(
        new KumaUIWebpackPlugin({
          outputDir: kumaUiConfig?.outputDir,
        }),
      );
      if (typeof nextConfig.webpack === "function") {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-return -- FIXME
        return nextConfig.webpack(config, options);
      }
      return config;
    },
  };
};

export const withKumaUI = (
  nextConfig: NextConfig,
  kumaConfig: KumaConfig = {},
) => {
  return Object.assign({}, nextConfig, kumaUiConfig(nextConfig, kumaConfig));
};
