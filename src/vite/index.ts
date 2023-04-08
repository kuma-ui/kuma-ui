import babel from "@babel/core";
import zeroStyledPlugin from "../babel-plugin";

export default function zeroStyled() {
  return {
    name: "zero-styled",
    transform(code: string, id: string) {
      if (
        !id.endsWith(".js") &&
        !id.endsWith(".jsx") &&
        !id.endsWith(".ts") &&
        !id.endsWith(".tsx")
      ) {
        return;
      }

      const result = babel.transformSync(code, {
        plugins: [zeroStyledPlugin],
        filename: id,
      });
      if (!result) return;

      return result.code;
    },
  };
}
