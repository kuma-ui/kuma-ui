import type { LoaderContext } from "webpack";
import { CSS_PARAM_NAME } from "./loader";

export default function cssLoader(this: LoaderContext<unknown>, src: string) {
  try {
    const params = new URLSearchParams(this.resourceQuery);
    const css = `${src}\n${params.get(CSS_PARAM_NAME) ?? ""}`;
    this.callback(undefined, css);
  } catch (error) {
    this.callback(error as Error);
  }
}
