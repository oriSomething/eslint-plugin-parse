/**
 * @fileoverview Prefer Parse.Promise over option object with success / error
 * @author Ori Livni
 * @copyright HappySale
 */
"use strict";

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

var rule = require("../../../lib/rules/prefer-parse-promise"),
    RuleTester = require("eslint").RuleTester;

//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

var ruleTester = new RuleTester();
ruleTester.run("lib/rules/prefer-parse-promise", rule, {

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
