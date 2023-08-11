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

import { As, ComponentWithAs, PropsOf } from "./types";
import { forwardRef as forwardReactRef } from "react";

type OmitCommonProps<
  Target,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  OmitAdditionalProps extends keyof any = never
> = Omit<
  Target,
  "transition" | "as" | "color" | "translate" | OmitAdditionalProps
> & {
  htmlTranslate?: "yes" | "no" | undefined;
};

type RightJoinProps<
  // eslint-disable-next-line @typescript-eslint/ban-types
  SourceProps extends object = {},
  // eslint-disable-next-line @typescript-eslint/ban-types
  OverrideProps extends object = {}
> = OmitCommonProps<SourceProps, keyof OverrideProps> & OverrideProps;

export function forwardRef<ComponentType extends As, Props extends object>(
  component: React.ForwardRefRenderFunction<
    React.ElementType<ComponentType>,
    Props
  >
) {
  return forwardReactRef(component) as unknown as ComponentWithAs<
    ComponentType,
    Props
  >;
}
