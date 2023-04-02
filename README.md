# Zero-Styled

Zero-Styled is a CSS-in-JS library that combines the best of utility-first and zero-runtime CSS extraction for blazing-fast performance. It is inspired by styled-components and styled-system, but aims to provide a zero-runtime alternative with build-time CSS extraction. Zero-Styled allows you to create reusable, composable, and responsive design systems without the runtime overhead.

# Roadmap

### Serialization and interpolation:
- Implement a function that processes the tagged template literals containing dynamic expressions, i.e., interpolations. You can use the TemplateLiteral node type in the Babel plugin to identify the parts of the template that contain expressions.
- For each expression in the template literal, evaluate it and replace it with the actual value to generate the final CSS string. You may need to create helper functions to handle different types of values, such as strings, numbers, or even functions (e.g., when using theme props).
- Update the Babel plugin to properly handle the transformed CSS string with the interpolations resolved.

### Implement utility functions similar to styled-system:
- Identify a set of utility functions that are commonly used in CSS-in-JS libraries, such as functions for handling spacing, typography, layout, and colors.
- Implement these utility functions as separate modules that can be imported and used in conjunction with the styled function. These utilities should also support dynamic values through props or variables.
- Ensure that the Babel plugin and other parts of the library are compatible with the utility functions and can process them correctly.


# Contributing
Contributions are welcome! Please feel free to submit issues or pull requests with any improvements or suggestions.

# License
MIT