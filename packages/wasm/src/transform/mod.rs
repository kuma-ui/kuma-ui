use std::collections::HashMap;

use oxc_allocator::Allocator;
use oxc_ast::ast::*;
use oxc_ast::AstBuilder;
use oxc_codegen::Codegen;
use oxc_span::{Atom, Span, SPAN};

use crate::js_to_program;

pub struct Transform<'a> {
    pub ast: AstBuilder<'a>,
    pub imports: HashMap<String, String>,
}

impl<'a> Transform<'a> {
    pub fn new(allocator: &'a Allocator) -> Self {
        Self {
            ast: AstBuilder::new(allocator),
            imports: std::collections::HashMap::new(),
        }
    }

    pub fn transform(
        &mut self,
        program: &'a mut Program<'a>,
    ) -> (&'a mut Program<'a>, HashMap<String, String>) {
        let program = self.ensure_react_import(program);
        let program = self.collect_import_bindings(program);
        let program = self.import_box(program);
        (program, self.imports.clone())
    }

    /**
     * Ensures React is imported in the given program to satisfy JSX's Classic runtime requirement.
     * While React might already be imported, we can't determine the specifier name if a default import exists.
     * Thus, this function adds a separate React import declaration at the beginning of the program with a unique alias "__KUMA_REACT__".
     * This unique alias allows Kuma's compiler to safely refer to React (e.g., when using React.forwardRef to wrap styled components) without interfering with user-defined variable names.
     */
    pub fn ensure_react_import(&mut self, program: &'a mut Program<'a>) -> &'a mut Program<'a> {
        let source_literal = StringLiteral {
            span: SPAN,
            value: Atom::from("react"),
        };

        let local = BindingIdentifier {
            span: SPAN,
            name: Atom::from("__KUMA_REACT__"),
            symbol_id: Default::default(),
        };

        let specifier = ImportDeclarationSpecifier::ImportDefaultSpecifier(
            self.ast.alloc(ImportDefaultSpecifier { span: SPAN, local }),
        );

        let specifiers = self.ast.new_vec_single(specifier);

        let import_declaration = ImportDeclaration {
            span: SPAN,
            specifiers: Some(specifiers),
            source: source_literal,
            with_clause: None,
            import_kind: ImportOrExportKind::Value,
        };

        let module_declaration =
            ModuleDeclaration::ImportDeclaration(self.ast.alloc(import_declaration));

        let import_statement = Statement::ModuleDeclaration(self.ast.alloc(module_declaration));

        program.body.insert(0, import_statement);
        program
    }

    pub fn collect_import_bindings(&mut self, program: &'a mut Program<'a>) -> &'a mut Program<'a> {
        for node in &program.body {
            if let Statement::ModuleDeclaration(module_declaration) = node {
                if let ModuleDeclaration::ImportDeclaration(import_declaration) =
                    &**module_declaration
                {
                    if import_declaration.source.value == *"@kuma-ui/core" {
                        if let Some(specifiers) = &import_declaration.specifiers {
                            for specifier in specifiers.iter() {
                                if let ImportDeclarationSpecifier::ImportSpecifier(specifier) =
                                    specifier
                                {
                                    if let ModuleExportName::Identifier(imported) =
                                        &specifier.imported
                                    {
                                        let name = imported.name.to_string();
                                        let local_name = specifier.local.name.to_string();

                                        self.imports.insert(name, local_name);
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
        program
    }

    /**
     * If the `Box` component is not imported, this function will create a new import statement for the `Box` component
     * from `@kuma-ui/core` with the local name `__Box`.
     */
    pub fn import_box(&mut self, program: &'a mut Program<'a>) -> &'a mut Program<'a> {
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

            let imported = ModuleExportName::Identifier(identifier_name);

            let specifier =
                ImportDeclarationSpecifier::ImportSpecifier(self.ast.alloc(ImportSpecifier {
                    span: SPAN,
                    imported,
                    local,
                    import_kind: ImportOrExportKind::Value,
                }));

            let import_declaration = ImportDeclaration {
                span: SPAN,
                specifiers: Some(self.ast.new_vec_single(specifier)),
                source: source_literal,
                with_clause: None,
                import_kind: ImportOrExportKind::Value,
            };

            let module_declaration =
                ModuleDeclaration::ImportDeclaration(self.ast.alloc(import_declaration));

            let import_statement = Statement::ModuleDeclaration(self.ast.alloc(module_declaration));

            program.body.insert(0, import_statement);
        }

        program
    }
}

#[test]
fn test_ensure_react_import() {
    let allocator = Allocator::default();
    let souce_text = "".to_string();
    let program = js_to_program(&allocator, &souce_text);
    let program = Transform::new(&allocator).ensure_react_import(program);

    let source = Codegen::<true>::new("", &souce_text, Default::default())
        .build(program)
        .source_text;
    assert_eq!(source, "import __KUMA_REACT__ from 'react';")
}

#[test]
fn test_collect_import_bindings() {
    let allocator = Allocator::default();
    let source_text =
        "import { Button,  Box as KumaBox } from '@kuma-ui/core'; import { css } from '@kuma-ui/core'"
            .to_string();
    let program = js_to_program(&allocator, &source_text);
    let (_, imports) = Transform::new(&allocator).transform(program);

    assert_eq!(imports.get("Button"), Some(&"Button".to_string()));
    assert_eq!(imports.get("Box"), Some(&"KumaBox".to_string()));
    assert_eq!(imports.get("css"), Some(&"css".to_string()));
}

#[test]
fn test_import_box() {
    let allocator = Allocator::default();
    let source_text = "".to_string();
    let program = js_to_program(&allocator, &source_text);
    let program = Transform::new(&allocator).import_box(program);

    let source = Codegen::<true>::new("", &source_text, Default::default())
        .build(program)
        .source_text;
    assert_eq!(source, "import {Box as __Box} from '@kuma-ui/core';");
}
