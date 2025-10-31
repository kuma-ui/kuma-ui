/**
 * This code is based on the implementation from Chakra UI, an open-source UI library.
 * The original implementation can be found at:
 * https://github.com/chakra-ui/chakra-ui/blob/main/packages/core/system/src/forward-ref.tsx
 *
 * MIT License
 * Copyright (c) 2019 Segun Adebayo
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */

import { forwardRef as forwardReactRef } from "react";
import { ComponentWithAs, As } from "./types";

export function forwardRef<Props extends object, Component extends As>(
  component: React.ForwardRefRenderFunction<
    React.ElementRef<Component>,
    React.PropsWithoutRef<
      Omit<React.ComponentPropsWithoutRef<Component>, keyof Props | "as"> &
        Props & {
          as?: As;
        }
    >
  >,
): ComponentWithAs<Component, Props> {
  return forwardReactRef(component) as unknown as ComponentWithAs<
    Component,
    Props
  >;
}
