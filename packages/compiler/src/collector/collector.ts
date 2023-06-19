import { PseudoProps, isStyledProp, isPseudoProps } from "@kuma-ui/system";

type Extracted = {
  styledProps: { [key: string]: any };
  pseudoProps: PseudoProps;
  filteredAttributes: { [key: string]: any };
};
const extracted: Extracted = {
  styledProps: {},
  pseudoProps: {},
  filteredAttributes: {},
};

function assignValueToProp(prop: string, value: any): void {
  if (isStyledProp(prop)) {
    extracted.styledProps[prop] = value;
  } else if (isPseudoProps(prop)) {
    extracted.pseudoProps[prop] = value;
  } else {
    extracted.filteredAttributes[prop] = value;
  }
}

class Collector {
  private static instance: Collector;

  private constructor() {}

  static getInstance() {
    if (!Collector.instance) {
      Collector.instance = new Collector();
    }
    return Collector.instance;
  }
}
