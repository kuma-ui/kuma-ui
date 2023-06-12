import { ResponsiveStyle, PseudoProps } from "@kuma-ui/system";

type SystemStyle = {
  base: ResponsiveStyle["base"];
  responsive: ResponsiveStyle["media"];
  pseudo: {
    key: string;
    base: ResponsiveStyle["base"];
    responsive: ResponsiveStyle["base"];
  }[];
};

export { ResponsiveStyle, PseudoProps, SystemStyle };
