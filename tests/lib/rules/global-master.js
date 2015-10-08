/**
 * @fileoverview Disallow global use of master key
 * @author Ori Livni
 * @copyright HappySale
 */
"use strict";

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

var rule = require("../../../lib/rules/global-master"),
    RuleTester = require("eslint").RuleTester;

//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

var ruleTester = new RuleTester();
ruleTester.run("lib/rules/global-master", rule, {

    valid: [
        {
            code: `
                    new Parse.Query("_Installation")
                        .find({
                            useMasterKey: true
                        });
                `
        }, {
            code: `useMasterKey();`
        }, {
            code: `obj.useMasterKey();`
        }
    ],

    invalid: [
        {
            code: "Parse.Cloud.useMasterKey()",
            errors: [{
                message: "The use of `Parse.Cloud.useMasterKey()` is discouraged",
                type: "CallExpression"
            }]
        }
    ]
});
