# Zero-Styled

Zero-Styled is a CSS-in-JS library that combines the best of utility-first and zero-runtime CSS extraction for blazing-fast performance. It is inspired by styled-system, but aims to provide a zero-runtime alternative with build-time CSS extraction using a Babel plugin. Zero-Styled allows you to create reusable, composable, and responsive design systems without the runtime overhead.

# Roadmap

### Improve Serialization and interpolation handling:
- Review and refine the current implementation for processing tagged template literals containing dynamic expressions, i.e., interpolations.
- Enhance helper functions to handle different types of values, such as strings, numbers, or even functions (e.g., when using theme props), and ensure accurate CSS string generation.
- Update the Babel plugin to better handle the transformed CSS string with the interpolations resolved, considering edge cases and potential issues.

### Implement utility functions similar to styled-system:
- Identify a set of utility functions that are commonly used in CSS-in-JS libraries, such as functions for handling spacing, typography, layout, and colors.
- Implement these utility functions as separate modules that can be imported and used in conjunction with the styled function. These utilities should also support dynamic values through props or variables.
- Ensure that the Babel plugin and other parts of the library are compatible with the utility functions and can process them correctly.

### Improve Babel plugin:
- Refine the Babel plugin implementation to handle edge cases and improve code maintainability.
- Add tests to ensure the Babel plugin works correctly with various code inputs.

# Contributing
Contributions are welcome! Please feel free to submit issues or pull requests with any improvements or suggestions.

# License
MIT