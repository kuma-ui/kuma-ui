import { ResponsiveStyle, PseudoProps } from "@kuma-ui/system";

type SystemStyle = {
  base: ResponsiveStyle["base"];
  responsive: ResponsiveStyle["media"];
  pseudo: PseudoProps;
};

export { ResponsiveStyle, PseudoProps, SystemStyle };
