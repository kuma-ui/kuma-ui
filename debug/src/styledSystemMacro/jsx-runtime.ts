import React from "react";
import styledSystemMacro from "./styledSystemMacro";

const createElement = (type, props, ...children) => {
  if (props) {
    props = styledSystemMacro(type, props);
  }

  return React.createElement(type, props, ...children);
};

export default createElement;
