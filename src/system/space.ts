import { toCssUnit } from "./util";
export interface SpaceProps {
  m?: string | number;
  mt?: string | number;
}

export const space = (props: SpaceProps): string => {
  let styles = "";

  if (props.m) {
    styles += `margin: ${toCssUnit(props.m)}; `;
  }

  if (props.mt) {
    styles += `margin-top: ${toCssUnit(props.mt)}; `;
  }

  return styles;
};
