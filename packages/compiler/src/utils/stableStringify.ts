// FIXME: The same file exists in "core" package. We should unify them in the future to avoid this duplication.

// This file was copied from https://github.com/epoberezkin/fast-json-stable-stringify/blob/49e230da2c84247b29ad4de02c9395793caefd15/index.js, which has MIT license.
// Note that it's modified a little bit to adapot it to the coding style in the project (e.g. TypeScript). Also the second argument is removed since we do not use it.
// The following is the original license text (https://github.com/epoberezkin/fast-json-stable-stringify/blob/49e230da2c84247b29ad4de02c9395793caefd15/LICENSE):
/**
This software is released under the MIT license:

Copyright (c) 2017 Evgeny Poberezkin
Copyright (c) 2013 James Halliday

Permission is hereby granted, free of charge, to any person obtaining a copy of
this software and associated documentation files (the "Software"), to deal in
the Software without restriction, including without limitation the rights to
use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of
the Software, and to permit persons to whom the Software is furnished to do so,
subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS
FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR
COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER
IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE./
**/

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function stableStringify(data: Record<string, any>): string;
export function stableStringify(data: undefined): undefined;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function stableStringify(data: any): string | undefined {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const seen: any[] = [];
  return (function stringify(node) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    if (node && node.toJSON && typeof node.toJSON === "function") {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
      node = node.toJSON();
    }

    if (node === undefined) return;
    if (typeof node == "number") return isFinite(node) ? "" + node : "null";
    if (typeof node !== "object") return JSON.stringify(node);

    let i, out;
    if (Array.isArray(node)) {
      out = "[";
      for (i = 0; i < node.length; i++) {
        if (i) out += ",";
        out += stringify(node[i]) || "null";
      }
      return out + "]";
    }

    if (node === null) return "null";

    if (seen.indexOf(node) !== -1) {
      throw new TypeError("Converting circular structure to JSON");
    }

    const seenIndex = seen.push(node) - 1;
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    const keys = Object.keys(node).sort();
    out = "";
    for (i = 0; i < keys.length; i++) {
      const key = keys[i];
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      const value = stringify(node[key]);

      if (!value) continue;
      if (out) out += ",";
      out += JSON.stringify(key) + ":" + value;
    }
    seen.splice(seenIndex, 1);
    return "{" + out + "}";
  })(data);
}
