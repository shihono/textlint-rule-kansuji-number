"use strict";
import TextLintTester from "textlint-tester";
const tester = new TextLintTester();
// rule
import rule from "../src/index";
// ruleName, rule, { valid, invalid }
tester.run("rule", rule, {
    valid: [
        // no problem
        "text",
        "1200000",
        "漢数字を含む1億円。",
        "漢数字を含む十二億円。",
    ],
    invalid: [
        // single match
        {
            text: "合計で10000億円になる。",
            errors: [
                {
                    message: "Found bugs.",
                    line: 1,
                    column: 4
                }
            ]
        },
        // multiple match
        {
            text: `70000兆。\n\n数字の80000万。`,
            errors: [
                {
                    message: "Found bugs.",
                    line: 1,
                    column: 1
                },
                {
                    message: "Found bugs.",
                    line: 3,
                    column: 4
                }
            ]
        },

    ]
});