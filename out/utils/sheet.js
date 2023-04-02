import { generateHash } from "./generateHash";
export class Sheet {
    constructor() {
        this.rules = [];
    }
    addRule(css) {
        const id = generateHash(css);
        const existingRule = this.rules.find((rule) => rule.id === id);
        if (!existingRule)
            this.rules.push({ id, css });
        return id;
    }
    getCSS() {
        return this.rules.map((rule) => `.${rule.id} {${rule.css}}`).join("\n");
    }
}
