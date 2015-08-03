/**
 * @fileoverview Never use `Parse.Query#doesNotExist`, use `#equalTo(key, null)`
 * @author Ori Livni
 * @copyright HappySale
 */
"use strict";

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

var rule = require("../../../lib/rules/does-not-exist"),
    RuleTester = require("eslint").RuleTester;

//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

var ruleTester = new RuleTester();
ruleTester.run("lib/rules/does-not-exist", rule, {

    valid: [
        {
            code: "new Parse.Query('_Installation').equalTo('noNotifications', null)"
        }, {
            code: "doesNotExist('noNotifications')"
        }
    ],

    invalid: [
        {
            code: "new Parse.Query('_Installation').doesNotExist('noNotifications')",
            errors: [{
                message: "use equalTo('noNotifications', null) instead",
                type: "Identifier"
            }]
        }, {
            code: "query.doesNotExist('noNotifications')",
            errors: [{
                message: "use equalTo('noNotifications', null) instead",
                type: "Identifier"
            }]
        }
    ]
});
