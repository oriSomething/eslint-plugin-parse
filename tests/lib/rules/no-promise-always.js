/**
 * @fileoverview Prevent usage of `Parse.Promise#always`
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
eslintTester.addRuleTest("lib/rules/no-promise-always", {

    valid: [
        {
            code: `always();`
        }
    ],

    invalid: [
        {
            code: `new Parse.Query('Item').find().always(someFunction);`,
            errors: [{
                message: "The use of `Parse.Promise#always` is prohibit",
                type: "MemberExpression"
            }]
        }, {
            code: `promise.always(someFunction);`,
            errors: [{
                message: "The use of `Parse.Promise#always` is prohibit",
                type: "MemberExpression"
            }]
        }, {
            code: `promise.always(someFunction).then(someFunction);`,
            errors: [{
                message: "The use of `Parse.Promise#always` is prohibit",
                type: "MemberExpression"
            }]
        }
    ]
});
