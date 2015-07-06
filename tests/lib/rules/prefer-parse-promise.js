/**
 * @fileoverview Prefer Parse.Promise over option object with success / error
 * @author Ori Livni
 * @copyright HappySale
 */
"use strict";

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

var eslint = require("eslint"),
    ESLintTester = require("eslint-tester");

//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

var eslintTester = new ESLintTester(eslint.linter);
eslintTester.addRuleTest("lib/rules/prefer-parse-promise", {

    valid: [
        {
            code: "item.save().then(doSomething)"
        }
    ],

    invalid: [{
            code: "item.save({ success: doSomething })",
            errors: [{
                message: "Prefer use `then` or `done` instead of `success` callback",
                type: "Property"
            }]
        }, {
            code: "item.save({ error: doSomething })",
            errors: [{
                message: "Prefer use `then` or `fail` instead of `error` callback",
                type: "Property"
            }]
        }, {
            code: `
                item.save({
                    error: doSomething,
                    success: doSomething
                });
            `,
            errors: [{
                message: "Prefer use `then` or `fail` instead of `error` callback",
                type: "Property"
            }, {
                message: "Prefer use `then` or `done` instead of `success` callback",
                type: "Property"
            }]
        }, {
            code: `
                item.save({
                    success() {}
                });
            `,
            ecmaFeatures: {
                objectLiteralShorthandMethods: true
            },
            errors: [{
                message: "Prefer use `then` or `done` instead of `success` callback",
                type: "Property"
            }]
        }, {
            code: `
                function success() {
                    // empty
                }
                item.save({ success });
            `,
            ecmaFeatures: {
                objectLiteralShorthandProperties: true
            },
            errors: [{
                message: "Prefer use `then` or `done` instead of `success` callback",
                type: "Property"
            }]
        }
    ]
});
