import type { LoaderContext } from 'webpack';

function virtualLoader(this: LoaderContext<{ src: string }>): string {
  const { src } = this.getOptions();
  return src;
}

export default virtualLoader;
