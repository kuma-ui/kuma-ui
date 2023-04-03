import { Component } from "react";

export const dataAttributeName = "data-zero-styled";

/**
 * Assigns a library-specific data attribute to an HTML element.
 * This data attribute is used for detecting components that
 * use styled-system-like props, so that their styles can be
 * extracted at build time via AST.
 *
 * @param {HTMLElement} element - The HTML element to which the data attribute will be assigned.
 */
export function assignDataAttribute(element: HTMLElement): void {
  element.setAttribute(dataAttributeName, "");
}
