import { consumeStyleProps, StyledProps } from "./consumeStyleProps";
import { describe, expect, test } from "vitest";

function consumeAndTest(props: StyledProps) {
  // Act
  const styles = consumeStyleProps(props);
  // Assert
  expect(styles).toMatchSnapshot();
}

describe("consumeStyleProps function", () => {
  test("should consume animation props", () => {
    consumeAndTest({
      animation: "3s ease-in 1s infinite reverse both running slidein",
      animationComposition: "add",
      animationDelay: "1s",
      animationDirection: "reverse",
      animationDuration: "1s",
      animationFillMode: "both",
      animationIterationCount: 10,
      animationName: "slidein",
      animationPlayState: "running",
      animationTimeline: "test1",
      animationTimingFunction: "ease-in",
    });
  });
  test("should consume background props", () => {
    consumeAndTest({
      backgroundImage: "url('img_tree.png')",
      backgroundPosition: "center",
      backgroundPositionX: 10,
      backgroundPositionY: 20,
      backgroundSize: "cover",
      backgroundRepeat: "no-repeat",
      backgroundAttachment: "fixed",
      backgroundClip: "border-box",
      backgroundOrigin: "content-box",
      backgroundBlendMode: "hue",
    });
  });
  test("should consume shortened background props", () => {
    consumeAndTest({
      bgImage: "url('img_tree.png')",
      bgPosition: "center",
      bgPositionX: 10,
      bgPositionY: 20,
      bgSize: "cover",
      bgRepeat: "no-repeat",
      bgAttachment: "fixed",
      bgClip: "border-box",
      bgOrigin: "content-box",
      bgBlendMode: "hue",
    });
  });
  test("should consume border props", () => {
    consumeAndTest({
      borderX: 1,
      borderY: 2,
      border: "1px solid red",
      borderTop: 1,
      borderLeft: "2px",
      borderRight: 3,
      borderBottom: 4,
      borderRadius: 1,
      borderStyle: "solid",
      borderWidth: 10,
    });
  });
  test("should consume color props", () => {
    consumeAndTest({
      background: "red",
      backgroundColor: "red",
      color: "yellow",
      borderColor: "black",
      outlineColor: "pink",
      accentColor: "springgreen",
      caretColor: "salmon",
      opacity: 0.5,
      visibility: "hidden",
    });
  });
  test("should consume column props", () => {
    consumeAndTest({
      columnCount: 1,
      columnFill: "auto",
      columnGap: 1,
      columnRule: "1px solid red",
      columnRuleColor: "yellow",
      columnRuleStyle: "dotted",
      columnRuleWidth: 1,
      columnSpan: "all",
      columnWidth: 1,
      columns: "auto 2",
    });
  });
  test("should consume effect props", () => {
    consumeAndTest({
      transition: "0.5s ease",
      transitionDuration: "0.5s",
      transitionProperty: "all",
      transitionTimingFunction: "ease-in-out",
      transform: "scale(1.2)",
      transformBox: "border-box",
      transformOrigin: "center",
      transformStyle: "preserve-3d",
      clipPath: "ellipse(130px 140px at 10% 20%)",
    });
  });
  test("should consume filter props", () => {
    consumeAndTest({
      filter: "invert(100%)",
      backdropFilter: "blur(2px)",
    });
  });
  test("should consume flex props", () => {
    consumeAndTest({
      flexDirection: "column",
      justifyItems: "flex-start",
      justifyContent: "center",
      justifySelf: "flex-start",
      justify: "cener",
      alignContent: "center",
      alignItems: "center",
      alignSelf: "baseline",
      flex: "1 1 100px",
      flexBasis: 1,
      flexFlow: "row",
      flexGrow: 1,
      flexShrink: 1,
      flexWrap: "wrap",
      gap: "10px 20px",
      placeItems: "center",
      placeContent: "end center",
    });
  });
  test("should consume font props", () => {
    consumeAndTest({
      fontSize: 24,
      fontFamily: "Arial",
      fontWeight: 500,
    });
  });
  test("should consume grid props", () => {
    consumeAndTest({
      gridGap: 8,
      gridColumn: "2/3",
      gridColumnStart: 2,
      gridColumnEnd: 3,
      gridTemplateRows: "auto 1fr",
    });
  });
  test("should consume layout props", () => {
    consumeAndTest({
      width: 8,
      minWidth: "12px",
      height: "2em",
      maxHeight: "1rem",
      display: "flex",
      zIndex: 2,
      overflow: "hidden",
      overflowX: "auto",
      overflowY: "visible",
      aspectRatio: "16/9",
      boxSizing: "border-box",
      float: "right",
      clear: "both",
      objectFit: "contain",
      objectPosition: "250px 125px",
      resize: "horizontal",
      verticalAlign: "sub",
      userSelect: "none",
    });
    consumeAndTest({
      w: 8,
      h: "2em",
    });
  });
  test("should consume list props", () => {
    consumeAndTest({
      listStyle: "outside",
      listStyleImage: "url('hoge.png')",
      listStylePosition: "inside",
      listStyleType: "disc",
    });
  });
  test("should consume mask props", () => {
    consumeAndTest({
      mask: "url(#c1) luminance",
      maskBorder: 'url("border-mask.png") 25',
      maskBorderMode: "alpha",
      maskBorderOutset: 1.5,
      maskBorderRepeat: "stretch round",
      maskBorderSlice: 10,
      maskBorderSource: "url('hogesrc.png')",
      maskBorderWidth: 10,
      maskClip: "border-box",
      maskComposite: "add",
      maskImage: "url('hogeimg.png')",
      maskMode: "luminance",
      maskOrigin: "border-box",
      maskPosition: "center",
      maskRepeat: "repeat",
      maskSize: "10% 20%",
      maskType: "alpha",
    });
  });
  test("should consume outline props", () => {
    consumeAndTest({
      outline: "1px solid red",
      outlineOffset: 1,
      outlineStyle: "dotted",
      outlineWidth: 1,
    });
  });
  test("should consume position props", () => {
    consumeAndTest({
      top: 1,
      right: "2px",
      left: "3rem",
      bottom: 4,
      inset: "10",
    });
  });

  test("should consume responsible styles", () => {
    consumeAndTest({
      fontSize: [24, 32],
    });
  });
  test("should consume styles with zero value", () => {
    consumeAndTest({
      fontSize: [0, 24],
      width: 0,
    });
  });
  test("should respect props order", () => {
    consumeAndTest({
      border: "1px solid",
      borderColor: "red",
    });
    consumeAndTest({
      borderColor: "red",
      border: "1px solid",
    });
  });
  test("should convert units", () => {
    consumeAndTest({
      width: 1,
    });
    consumeAndTest({
      width: "2px",
    });
    consumeAndTest({
      width: "3",
    });
    consumeAndTest({
      width: "4rem",
    });
  });
  test("should not include invalid keys in the resulting CSS", () => {
    consumeAndTest({
      invalid: true,
    } as unknown as StyledProps);
  });
});
