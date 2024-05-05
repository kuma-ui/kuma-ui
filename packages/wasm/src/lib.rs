use oxc_allocator::Allocator;
use oxc_codegen::{Codegen, CodegenOptions};
use wasm_bindgen::prelude::*;

use oxc_ast::ast::Program;
use oxc_parser::Parser;
use oxc_span::SourceType;
use web_sys::console;

mod transform;
use transform::Transform;

pub fn js_to_program<'a>(allocator: &'a Allocator, source_text: &'a String) -> &'a mut Program<'a> {
    let source_type = SourceType::default()
        .with_module(true)
        .with_typescript(true);

    let ret = Parser::new(allocator, source_text, source_type).parse();
    if !ret.errors.is_empty() {
        console::error_1(&format!("Parsing errors: {:?}", ret.errors).into());
    }

    allocator.alloc(ret.program)
}

#[wasm_bindgen(js_name = transformSync)]
pub fn transform_sync(source_text: String) -> String {
    let allocator = Allocator::default();

    let program = js_to_program(&allocator, &source_text);
    let program = Transform::new(&allocator).transform(program);

    Codegen::<true>::new("", &source_text, CodegenOptions::default())
        .build(program)
        .source_text
}
