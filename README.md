# Zero-Styled

Zero-Styled is a CSS-in-JS library that combines the best of utility-first and zero-runtime CSS extraction for blazing-fast performance. It is inspired by styled-system, but aims to provide a zero-runtime alternative with build-time CSS extraction using a Babel plugin. Zero-Styled allows you to create reusable, composable, and responsive design systems without the runtime overhead.

# Features

- Zero-runtime CSS extraction for optimal performance
- Build-time CSS generation using Babel or Vite plugins
- Responsive design with breakpoints and media queries
- Utility-first approach for rapid UI development
- Customizable theming and design tokens
- Compatible with popular bundlers like Webpack and Vite

# Roadmap

### Improve Serialization and interpolation handling:
- Review and refine the current implementation for processing tagged template literals containing dynamic expressions, i.e., interpolations.
- Enhance helper functions to handle different types of values, such as strings, numbers, or even functions (e.g., when using theme props), and ensure accurate CSS string generation.
- Update the Babel plugin to better handle the transformed CSS string with the interpolations resolved, considering edge cases and potential issues.

### Additional features and enhancements:
- Add support for theming and custom configurations.
- Improve developer experience with better error messages, debugging tools, and documentation.

### Support theming, responsive design, and pseudo-elements:
- Develop a theming system to enable users to provide custom themes, colors, and other design tokens.
- Integrate responsive design capabilities into the utility functions, allowing users to define styles for different breakpoints.
- Add support for pseudo-elements and pseudo-classes, such as :hover, :focus, ::before, and ::after.

### Bundler support:
- Ensure compatibility with popular bundlers like Webpack and Vite.
- Provide configuration examples and documentation to help users set up Zero-Styled with their preferred bundler.

# Contributing
Contributions are welcome! Please feel free to submit issues or pull requests with any improvements or suggestions.

# License
MIT