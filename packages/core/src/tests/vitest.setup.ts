import type { TestingLibraryMatchers } from "@testing-library/jest-dom/matchers";
import matchers from "@testing-library/jest-dom/matchers";
import { cleanup } from "@testing-library/react";
import { beforeEach, expect, vi } from "vitest";

declare module "vitest" {
  interface Assertion<T>
    extends jest.Matchers<void, T>,
      TestingLibraryMatchers<T, void> {}
}

expect.extend(matchers);

beforeEach(() => {
  vi.clearAllMocks();
  cleanup();
});
