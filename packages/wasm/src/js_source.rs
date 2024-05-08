use oxc_allocator::Allocator;
use oxc_ast::ast::Program;
use oxc_parser::Parser;
use oxc_span::SourceType;
use web_sys::console;

pub struct JsSource<'a> {
    source_text: &'a str,
    is_ts: bool,
    is_jsx: bool,
}

impl<'a> JsSource<'a> {
    pub fn new(source_text: &'a str, extension: String) -> Self {
        Self {
            source_text,
            is_ts: extension == "tsx" || extension == "ts",
            is_jsx: extension == "tsx" || extension == "jsx",
        }
    }

    pub fn to_program(&self, allocator: &'a Allocator) -> &'a mut Program<'a> {
        let source_type: SourceType = SourceType::default()
            .with_module(true)
            .with_typescript(self.is_ts)
            .with_jsx(self.is_jsx);

        let parsed = Parser::new(allocator, self.source_text, source_type).parse();
        if !parsed.errors.is_empty() {
            console::error_1(&format!("Parsing errors: {:?}", parsed.errors).into());
        }

        allocator.alloc(parsed.program)
    }
}
