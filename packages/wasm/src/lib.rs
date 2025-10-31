// #[macro_use]
// extern crate serde_json;

use oxc_allocator::Allocator;
use oxc_codegen::{Codegen, CodegenOptions};
use serde::{Deserialize, Serialize};
use std::collections::HashMap;
use tsify::JsValueSerdeExt;
use wasm_bindgen::prelude::*;

mod js_source;
mod transform;
mod util;

use js_source::JsSource;
use transform::Transform;
#[cfg(test)]
use util::replace_quotes_and_newlines;

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

    let source_text = Codegen::new()
        .with_options(CodegenOptions::default())
        .build(program)
        .source_text;

    let output = Output {
        code: source_text.to_owned(),
        imports: imports.clone(),
    };

    JsValue::from_serde(&output).map_err(|err| JsValue::from_str(&format!("{}", err)))
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_transform_sync() {
        let source_text = "
            import {k, Box} from '@kuma-ui/core';
            export const App = () => {
                return <k.div><k.span>hello</k.span></k.div>;
            }
        ";
        let extension = "tsx".to_string();

        let allocator = Allocator::default();

        let program = JsSource::new(source_text, extension).to_program(&allocator);
        let mut transform = Transform::new(&allocator);

        transform.transform(program);

        let _imports = transform.get_imports();

        let source_text = Codegen::new()
            .with_options(CodegenOptions::default())
            .build(program)
            .source_text;

        let source_text = replace_quotes_and_newlines(&source_text);

        assert_eq!(
            source_text,
            "import __KUMA_REACT__ from 'react';import { k, Box } from '@kuma-ui/core';export const App = () => {return <Box as='div' IS_KUMA_DEFAULT={true}><Box as='span' IS_KUMA_DEFAULT={true}>hello</Box></Box>;};"
        );
    }
}
