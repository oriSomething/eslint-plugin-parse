/**
 * @fileoverview Don't assign variables explicitly to Parse.Promise instance
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
eslintTester.addRuleTest("lib/rules/no-parse-promise-assign", {

    valid: [
        {
            code: `
                var p = new Promise(function(resolve, reject) {
                    // ...
                });
            `
        }, {
            code: `
                var query = new Parse.Query('Item')
                    .equalTo('happy', true)
                    .find();
            `
        }, {
            code: `
                function goodFunction() {
                    return Parse.Promise.as('hi');
                }
            `
        }, {
            code: `
                Parse.Promise.when([
                    Parse.Promise.as('hi')
                ]);
            `
        }
    ],

    invalid: [
        {
            code: `var p = new Parse.Promise();`,
            errors: [{
                message: "create `Parse.Promise` instances directly",
                type: "NewExpression"
            }]
        }, {
            code: `
                var Promise = Parse.Promise;
                var p = new Promise();
            `,
            errors: [{
                message: "create `Parse.Promise` instances directly",
                type: "NewExpression"
            }]
        }, {
            code: `
                var p = Parse.Promise.as(null);
            `,
            errors: [{
                message: "Don't use assignment for `Parse.Promise.as`",
                type: "CallExpression"
            }]
        }, {
            code: `
                var p = Parse.Promise.error(null);
            `,
            errors: [{
                message: "Don't use assignment for `Parse.Promise.error`",
                type: "CallExpression"
            }]
        }
    ]
});
