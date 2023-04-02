"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _babelPluginMacros = require("babel-plugin-macros");
var _sheet = require("./utils/sheet");
var _path = require("path");
var _default = (0, _babelPluginMacros.createMacro)(function (_ref) {
  var references = _ref.references,
    state = _ref.state,
    babel = _ref.babel;
  var t = babel.types;
  var cssRefs = references.zeroStyled || [];
  var styleSheet = new _sheet.Sheet();
  Object.assign(state, {
    styleSheet: styleSheet
  });
  cssRefs.forEach(function (ref) {
    var _ref$parentPath, _ref$parentPath2;
    console.log("------");
    console.log(ref.parent);
    console.log("------");
    if (!t.isTaggedTemplateExpression(ref.parent)) {
      throw new Error("Invalid usage of zero-styled macro.");
    }
    var templateLiteral = (_ref$parentPath = ref.parentPath) === null || _ref$parentPath === void 0 ? void 0 : _ref$parentPath.get("quasi");
    var cssString = templateLiteral.node.quasis[0].value.raw; // we should serialize this later
    var className = styleSheet.addRule(cssString);
    (_ref$parentPath2 = ref.parentPath) === null || _ref$parentPath2 === void 0 ? void 0 : _ref$parentPath2.replaceWith(t.stringLiteral(className));
  });
  var filename = state.file.opts.filename || "";
  var output = (0, _path.relative)(process.cwd(), filename.replace(/\.[^.]+$/, ".static.css"));
});
exports["default"] = _default;