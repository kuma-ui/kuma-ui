let styleElement: HTMLStyleElement | undefined;
if (typeof document !== "undefined") {
  styleElement = document.createElement("style");
}

const styleMap = new Map<symbol, string>();

export function injectCSS(css: string, id: symbol) {
  styleMap.set(id, css);
  resetAllCSS();
}

function resetAllCSS() {
  if (styleElement) {
    styleElement.textContent = "";
    styleMap.forEach((css) => {
      if (styleElement) {
        styleElement.textContent += css;
      }
    });
  }
}
