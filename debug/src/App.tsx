// App.tsx or any other component file
/** @jsxImportSource ./styledSystemMacro */
import React from "react";
import View from "./lib/View";
import _jsx from "./styledSystemMacro/jsx-runtime";

const App = () => {
  return (
    <View m={16} color="red" fontSize={24}>
      Hello, world!
    </View>
  );
};

export default App;
