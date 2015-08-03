/**
 * @fileoverview Prevent usage of `Parse.Promise#always`
 * @author Ori Livni
 * @copyright HappySale
 */
"use strict";

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

var rule = require("../../../lib/rules/no-promise-always"),
    RuleTester = require("eslint").RuleTester;

//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

var ruleTester = new RuleTester();
ruleTester.run("lib/rules/no-promise-always", rule, {

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
