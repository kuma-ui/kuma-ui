import type { NextConfig } from "next";
import { type Configuration, type RuleSetRule } from "webpack";
import KumaUIWebpackPlugin from "@kuma-ui/webpack-plugin";

type KumaConfig = ConstructorParameters<typeof KumaUIWebpackPlugin>[0];

const kumaUiConfig = (
  nextConfig: NextConfig,
  kumaConfig: KumaConfig = {}
): NextConfig => {
  return {
    webpack(config: Configuration, options) {
      const { dev } = options;

      config.module?.rules?.push({
        test: /\.(tsx|ts|js|mjs|jsx)$/,
        exclude: /node_modules/,
        use: [
          {
            loader: KumaUIWebpackPlugin.loader,
          },
          {
            loader: "babel-loader",
            options: {
              presets: [
                "@babel/preset-env",
                "@babel/preset-typescript",
                [
                  "@babel/preset-react",
                  {
                    runtime: "classic",
                  },
                ],
              ],
            },
          },
        ],
      });

      config.plugins?.push(new KumaUIWebpackPlugin(kumaConfig));
      if (typeof nextConfig.webpack === "function") {
        return nextConfig.webpack(config, options);
      }
      return config;
    },
  };
};

export const withKumUI = (
  nextConfig: NextConfig,
  kumaConfig: KumaConfig = {}
) => {
  return Object.assign({}, nextConfig, kumaUiConfig(nextConfig, kumaConfig));
};
