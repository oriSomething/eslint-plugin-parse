/**
 * @fileoverview Prevent saving an object with attribute `useMasterKey`
 * @author Ori Livni
 * @copyright HappySale
 */
"use strict";

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------


var rule = require("../../../lib/rules/save-with-master"),
    RuleTester = require("eslint").RuleTester;

//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

var ruleTester = new RuleTester();
ruleTester.run("lib/rules/save-with-master", rule, {

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
