use std::collections::HashMap;

use oxc_allocator::Allocator;
use oxc_ast::{
    ast::{ImportDeclaration, ImportDeclarationSpecifier, ModuleExportName},
    visit::walk::walk_import_declaration,
    AstBuilder, Visit,
};

pub struct CollectImportBindings<'a, 'b> {
    _ast: AstBuilder<'a>,
    imports: &'b mut HashMap<String, String>,
}

impl<'a, 'b> CollectImportBindings<'a, 'b> {
    pub fn new(allocator: &'a Allocator, imports: &'b mut HashMap<String, String>) -> Self {
        Self {
            _ast: AstBuilder::new(allocator),
            imports,
        }
    }
}

impl<'a> Visit<'a> for CollectImportBindings<'a, '_> {
    fn visit_import_declaration(&mut self, decl: &ImportDeclaration<'a>) {
        if decl.source.value == "@kuma-ui/core" {
            if let Some(specifiers) = &decl.specifiers {
                for specifier in specifiers.iter() {
                    if let ImportDeclarationSpecifier::ImportSpecifier(specifier) = specifier {
                        if let ModuleExportName::IdentifierName(imported) = &specifier.imported {
                            let name = imported.name.to_string();
                            let local_name = specifier.local.name.to_string();

                            self.imports.insert(name, local_name);
                        }
                    }
                }
            }
        }

        walk_import_declaration(self, decl);
    }
}

#[cfg(test)]
mod test {
    use super::*;
    use crate::js_source::JsSource;
    use oxc_allocator::Allocator;

    #[test]
    fn test_ensure_react_import() {
        let allocator = Allocator::default();
        let mut imports = HashMap::new();
        let mut collect_import_bindings = CollectImportBindings::new(&allocator, &mut imports);

        let source_text =
            "import { Button,  Box as KumaBox } from '@kuma-ui/core'; import { css } from '@kuma-ui/core'"
                .to_string();
        let extension = "tsx".to_string();

        let program = JsSource::new(&source_text, extension).to_program(&allocator);

        collect_import_bindings.visit_program(program);

        assert_eq!(imports.get("Button"), Some(&"Button".to_string()));
        assert_eq!(imports.get("Box"), Some(&"KumaBox".to_string()));
        assert_eq!(imports.get("css"), Some(&"css".to_string()));
    }
}
