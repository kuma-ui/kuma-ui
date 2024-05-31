// #[macro_use]
// extern crate serde_json;

use oxc_allocator::Allocator;
use oxc_codegen::{Codegen, CodegenOptions};
use serde::{Deserialize, Serialize};
use std::collections::HashMap;
use tsify::JsValueSerdeExt;
use wasm_bindgen::prelude::*;
use web_sys::console;

mod compile;
mod js_source;
mod sheet;
mod transform;

use compile::Compile;
use js_source::JsSource;
use transform::Transform;

#[wasm_bindgen(typescript_custom_section)]
const TYPES: &'static str = r#"
export type Result = {
    code: string;
    imports: Record<string, string>;
}

export function transformSync(code: string, extension: string): Result;
"#;

#[derive(Deserialize, Serialize)]
pub struct Output {
    pub code: String,
    pub imports: HashMap<String, String>,
}

#[wasm_bindgen(js_name = transformSync, skip_typescript)]
pub fn transform_sync(source_text: String, extension: String) -> Result<JsValue, JsValue> {
    let allocator = Allocator::default();

    let program = JsSource::new(&source_text, extension).to_program(&allocator);
    let mut transform = Transform::new(&allocator);

    transform.transform(program);

    let imports = transform.get_imports();

    let source_text = Codegen::<true>::new("", &source_text, CodegenOptions::default())
        .build(program)
        .source_text;

    let output = Output {
        code: source_text,
        imports: imports.clone(),
    };

    JsValue::from_serde(&output).map_err(|err| JsValue::from_str(&format!("{}", err)))
}

#[wasm_bindgen(typescript_custom_section)]
const TYPES: &'static str = r#"
export type ComipleResult = {
    code: string;
    css: string;
}

export function compileSync(code: string, id: string, bindings: Record<string, string>): ComipleResult;
"#;

#[derive(Deserialize, Serialize)]
pub struct CompileOutput {
    pub code: String,
    pub css: String,
}

#[wasm_bindgen(js_name = compileSync, skip_typescript)]
pub fn compile_sync(code: String, id: String, bindings: JsValue) -> Result<JsValue, JsValue> {
    let bindings = bindings.into_serde::<HashMap<String, String>>().unwrap();

    let allocator = Allocator::default();

    let program = JsSource::new(&code, "tsx".to_string()).to_program(&allocator);
    let mut compile = Compile::new(&allocator);
    compile.compile(program);

    let output = CompileOutput {
        code,
        css: "".to_string(),
    };

    JsValue::from_serde(&output).map_err(|err| JsValue::from_str(&format!("{}", err)))
}
