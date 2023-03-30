import React from "react";
import styledSystemMacro from "./styledSystemMacro";

const View = ({
  m = 0,
  color = "black",
  fontSize = "16px",
  children,
  ...props
}) => {
  const style = {
    margin: m,
    color: color,
    fontSize: fontSize,
  };

  return (
    <div style={style} {...props}>
      {children}
    </div>
  );
};

export default View;

export const Test = () => {
  //   console.log(styledSystemMacro);

  // return <styledSystemMacro.View color="red">hello</styledSystemMacro.View>;
  return <View color="red">hello</View>;
};
