/**
 * @fileoverview Prohibit the use of the "nots" query function
 * @author Ori Livni
 * @copyright HappySale
 */
"use strict";

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

var rule = require("../../../lib/rules/no-not-query"),
    RuleTester = require("eslint").RuleTester;

//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

var ruleTester = new RuleTester();
ruleTester.run("lib/rules/no-not-query", rule, {

    valid: [
        {
            code: `doesNotExist('test');`
        }, {
            code: `query.doesNotExist();`
        }
    ],

    invalid: [
        {
            code: `
                new Parse.Query("Item")
                    .doesNotExist("someKey");
            `,
            errors: [{
                message: "`Parse.Query#doesNotExist()` it's unindexable query that can cause timeouts",
                type: "Identifier"
            }]
        }, {
            code: `
                query.doesNotExist(someVar);
            `,
            errors: [{
                message: "`Parse.Query#doesNotExist()` it's unindexable query that can cause timeouts",
                type: "Identifier"
            }]
        }, {
            code: `query.doesNotExist('someKey');`,
            errors: [{
                message: "`Parse.Query#doesNotExist()` it's unindexable query that can cause timeouts",
                type: "Identifier"
            }]
        }, {
            code: `query.doesNotMatchKeyInQuery('someKey', 'someKeyKey', new Parse.Query('Item'));`,
            errors: [{
                message: "`Parse.Query#doesNotMatchKeyInQuery()` it's unindexable query that can cause timeouts",
                type: "Identifier"
            }]
        }, {
            code: `query.doesNotMatchQuery('someKey', new Parse.Query('Item'));`,
            errors: [{
                message: "`Parse.Query#doesNotMatchQuery()` it's unindexable query that can cause timeouts",
                type: "Identifier"
            }]
        }, {
            code: `query.notContainedIn('someKey', []);`,
            errors: [{
                message: "`Parse.Query#notContainedIn()` it's unindexable query that can cause timeouts",
                type: "Identifier"
            }]
        }, {
            code: `query.notContainedIn('someKey', 1 ? [] : []);`,
            errors: [{
                message: "`Parse.Query#notContainedIn()` it's unindexable query that can cause timeouts",
                type: "Identifier"
            }]
        }, {
            code: `query.notContainedIn('someKey', [1, 2, 3]);`,
            errors: [{
                message: "`Parse.Query#notContainedIn()` it's unindexable query that can cause timeouts",
                type: "Identifier"
            }]
        }, {
            code: `query.notEqualTo('someKey', 'hello');`,
            errors: [{
                message: "`Parse.Query#notEqualTo()` it's unindexable query that can cause timeouts",
                type: "Identifier"
            }]
        }
    ]
});
