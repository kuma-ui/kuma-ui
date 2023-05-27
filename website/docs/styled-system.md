---
title: "Styled System"
description: Kuma UI - zero-runtime CSS-in-JS with type-safe utility props
---

Kuma UI includes a powerful Style System that gives developers the flexibility to style their components using simple, type-safe utility props. Let's take a look at some of the main concepts in the Style System.

## Style Props

Style props allow you to modify the style of a component by simply passing props to it. This allows for a more intuitive and efficient way to style your components.

Here's a list of the available style props in Kuma UI, grouped by the relevant CSS properties:

### Space

Space-related style props help you adjust margin and padding of your components.

| Props | CSS Property |
|-------|--------------|
| `m` | margin |
| `mt` | margin-top |
| `mb` | margin-bottom |
| `ml` | margin-left |
| `mr` | margin-right |
| `mx` | margin-left + margin-right |
| `my` | margin-top + margin-bottom |
| `p` | padding |
| `pt` | padding-top |
| `pb` | padding-bottom |
| `pl` | padding-left |
| `pr` | padding-right |
| `px` | padding-left + padding-right |
| `py` | padding-top + padding-bottom |

## Typography

Typography-related style props let you manipulate text properties.

| Props           | CSS Property  |
| --------------- | ------------- |
| `fontSize`        | font-size     |
| `fontWeight`      | font-weight   |
| `lineHeight`      | line-height   |
| `letterSpacing`   | letter-spacing|
| `textAlign`       | text-align    |
| `fontFamily`      | font-family   |
| `textDecoration`  | text-decoration|

## Layout

Layout-related style props give you control over positioning and dimensions of your components.

| Props       | CSS Property |
| ----------- | ------------ |
| `width`       | width        |
| `minWidth`    | min-width    |
| `maxWidth`    | max-width    |
| `height`      | height       |
| `minHeight`   | min-height   |
| `maxHeight`   | max-height   |
| `display`     | display      |
| `overflow`    | overflow     |
| `position`    | position     |
| `zIndex`      | z-index      |

## Flex

Flex-related style props allow you to create flexible layouts with ease.

| Props         | CSS Property  |
| ------------- | ------------- |
| `flexDir`       | flex-direction|
| `justify`       | justify-content|
| `alignItems`    | align-items   |
| `alignContent`  | align-content |
| `flexWrap`      | flex-wrap     |
| `flexGrow`      | flex-grow     |
| `flexShrink`    | flex-shrink   |
| `flexBasis`     | flex-basis    |
| `gap`           | gap           |

## Color

Color-related style props let you adjust the colors and opacity of your components.

| Props        | CSS Property |
| ------------ | ------------ |
| `bg`           | background-color|
| `color`        | color        |
| `borderColor`  | border-color |
| `opacity`      | opacity      |

## Border

Border-related style props allow you to adjust border properties of your components.

| Props          | CSS Property |
| -------------- | ------------ |
| `borderWidth`    | border-width |
| `borderStyle`    | border-style |
| `borderRadius`   | border-radius|
| `borderTop`      | border-top   |
| `borderRight`    | border-right |
| `borderBottom`   | border-bottom|
| `borderLeft`     | border-left  |

## Position

Position-related style props let you adjust the position of your components.

| Props | CSS Property |
| ----- | ------------ |
| `top`   | top          |
| `right` | right        |
| `bottom`| bottom       |
| left`  | left         |
| `inset` | inset |

# Shadow

Shadow-related style props help you add and adjust shadows in your components.

| Props       | CSS Property |
| ----------- | ------------ |
| `textShadow`  | text-shadow  |
| `boxShadow`   | box-shadow   |

## Grid

Grid-related style props allow you to create complex grid layouts with ease.


| Props       | CSS Property |
| ----------- | ------------ |
| `grid` |	grid |
| `gridArea` | grid-area |
| `gridAutoColumns` | grid-auto-columns |
| `gridAutoFlow` | grid-auto-flow |
| `gridAutoFlow` | grid-auto-flow |
| `gridAutoRows` | grid-auto-rows |
| `gridColumn` | grid-column |
| `gridColumnEnd` | grid-column-end |
| `gridColumnStart` | grid-column-start |
| `gridRow` | grid-row |
| `gridRowEnd` | grid-row-end |
| `gridRowStart` | grid-row-start |