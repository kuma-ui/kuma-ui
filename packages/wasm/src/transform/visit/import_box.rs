use std::collections::HashMap;

use oxc_allocator::Allocator;
use oxc_ast::{
    ast::{
        BindingIdentifier, IdentifierName, ImportDeclaration, ImportDeclarationSpecifier,
        ImportOrExportKind, ImportSpecifier, ModuleDeclaration, ModuleExportName, Program,
        Statement, StringLiteral,
    },
    visit::walk_mut::walk_program,
    AstBuilder, VisitMut,
};
use oxc_span::{Atom, SPAN};

pub struct ImportBox<'a, 'b> {
    ast: AstBuilder<'a>,
    imports: &'b mut HashMap<String, String>,
}

impl<'a, 'b> ImportBox<'a, 'b> {
    pub fn new(allocator: &'a Allocator, imports: &'b mut HashMap<String, String>) -> Self {
        Self {
            ast: AstBuilder::new(allocator),
            imports,
        }
    }
}

impl<'a> VisitMut<'a> for ImportBox<'a, '_> {
    /**
     * If the `Box` component is not imported, this function will create a new import statement for the `Box` component
     * from `@kuma-ui/core` with the local name `__Box`.
     */
    fn visit_program(&mut self, program: &mut Program<'a>) {
        let has_box = self.imports.get("Box");

        if has_box.is_none() {
            let source_literal = StringLiteral {
                span: SPAN,
                value: Atom::from("@kuma-ui/core"),
            };

            let local = BindingIdentifier {
                span: SPAN,
                name: Atom::from("__Box"),
                symbol_id: Default::default(),
            };

            let identifier_name = IdentifierName {
                span: SPAN,
                name: Atom::from("Box"),
            };

            let imported = ModuleExportName::IdentifierName(identifier_name);

            let specifier =
                ImportDeclarationSpecifier::ImportSpecifier(self.ast.alloc(ImportSpecifier {
                    span: SPAN,
                    imported,
                    local,
                    import_kind: ImportOrExportKind::Value,
                }));

            let import_declaration = ImportDeclaration {
                span: SPAN,
                specifiers: Some(self.ast.vec1(specifier)),
                source: source_literal,
                with_clause: None,
                import_kind: ImportOrExportKind::Value,
            };

            let import_statement = Statement::ImportDeclaration(self.ast.alloc(import_declaration));

            self.imports.insert("Box".to_string(), "__Box".to_string());

            program.body.insert(0, import_statement);
        }

        walk_program(self, program)
    }
}

#[cfg(test)]
mod test {
    use std::mem::replace;

    use super::*;
    use crate::js_source::JsSource;
    use oxc_allocator::Allocator;
    use oxc_codegen::Codegen;

    #[test]
    fn test_ensure_react_import() {
        let allocator = Allocator::default();
        let mut imports = HashMap::new();
        let mut import_box = ImportBox::new(&allocator, &mut imports);

        let source_text = "".to_string();
        let extension = "tsx".to_string();

        let program = JsSource::new(&source_text, extension).to_program(&allocator);

        import_box.visit_program(program);

        let source = Codegen::new()
            .with_options(Default::default())
            .build(program)
            .source_text;
        assert_eq!(source, "import { Box as __Box } from \"@kuma-ui/core\";\n")
    }
}
