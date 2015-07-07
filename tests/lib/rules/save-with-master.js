/**
 * @fileoverview Prevent saving an object with attribute `useMasterKey`
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
eslintTester.addRuleTest("lib/rules/save-with-master", {

    valid: [
        {
            code: "item.save({ useMasterKey: true }, { useMasterKey: true })"
        }, {
            code: "item.save(null, { useMasterKey: true })"
        }, {
            code: "item.save({ title: 'A Title' }, { useMasterKey: true })"
        }, {
            code: "item.set({ useMasterKey: true });"
        }
    ],

    invalid: [
        {
            code: "item.save({ useMasterKey: true });",
            errors: [{
                message: "`useMasterKey` key in first argument of `save()` is probably a mistake",
                type: "CallExpression"
            }]
        }
    ]
});
