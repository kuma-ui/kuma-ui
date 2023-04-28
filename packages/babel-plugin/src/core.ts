import { types, template } from "@babel/core";

export type Core = {
  types: typeof types;
  template: typeof template;
};
