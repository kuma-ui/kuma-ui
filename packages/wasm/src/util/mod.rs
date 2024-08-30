pub fn replace_quotes_and_newlines(source: &str) -> String {
    source.replace("\"", "'").replace(['\n', '\t'], "")
}
