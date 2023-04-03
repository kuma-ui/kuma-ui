interface SpaceProps {
  m?: string | number;
  mt?: string | number;
}

export const space = (props: SpaceProps): string => {
  let styles = "";

  if (props.m) {
    styles += `margin: ${props.m}; `;
  }

  if (props.mt) {
    styles += `margin-top: ${props.mt}; `;
  }

  return styles;
};
