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
        "漢数字を含まない1億円。",
        // "漢数字を含む十二億円。",
        {
            text: "一期一会の出会い。二人乗り自転車。",
            options: {
                "allowKansuji": false,
            },

        }
    ],
    invalid: [
        // single match
        {
            text: "合計で10000億円になる。",
            options: {
                "allowFigure": false,
            },
            errors: [
                {
                    message: "アラビア数字が含まれています: 10000億",
                    line: 1,
                    column: 4
                }
            ]
        },
        {
            text: "漢数字の十億円。",
            options: {
                "allowKansuji": false,
            },
            errors: [
                {
                    message: "漢数字が含まれています: 十億",
                    line: 1,
                    column: 5
                }
            ]
        },
        // multiple match
        {
            text: `70000兆。\n\n数字の80000万。\n漢数字を含む十二億円。`,
            options: {
                "allowKansuji": true,
                "allowFigure": false,
            },
            errors: [
                {
                    message: "アラビア数字が含まれています: 70000兆",
                    line: 1,
                    column: 1
                },
                {
                    message: "アラビア数字が含まれています: 80000万",
                    line: 3,
                    column: 4
                }
            ]
        },

    ]
});