/**
 * @fileoverview Never use `Parse.Query#doesNotExist`, use `#equalTo(key, null)`
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
eslintTester.addRuleTest("lib/rules/does-not-exist", {

    valid: [
        {
            code: "new Parse.Query('_Installation').equalTo('noNotifications', null)"
        }
    ],

    invalid: [
        {
            code: "new Parse.Query('_Installation').doesNotExist('noNotifications')",
            errors: [{
                message: "use equalTo('noNotifications', null) instead",
                type: "CallExpression"
            }]
        }
    ]
});
