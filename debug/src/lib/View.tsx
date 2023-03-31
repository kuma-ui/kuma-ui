/** @jsxImportSource ../styledSystemMacro */
import React from "react";
import _jsx from "../styledSystemMacro/jsx-runtime";
// import styledSystemMacro from "./styledSystemMacro";
import styledSystem from "./styledSystemMacro";

// const View = ({
//   m = 0,
//   color = "black",
//   fontSize = "16px",
//   children,
//   ...props
// }) => {

//   return (
//     <div {...props}>
//       {children}
//     </div>
//   );
// };

export interface ViewProps extends React.HTMLAttributes<HTMLDivElement> {
  m?: number | string;
  fontSize?: number;
  // Add any other custom props here
}

const View: React.FC<ViewProps> = ({ children, ...props }) => {
  return <div {...props}>{children}</div>;
};

export default View;

export const Test = () => {
  //   return <styledSystemMacro.View color="red">hello</styledSystemMacro.View>;
  return <View>hello</View>;
};
