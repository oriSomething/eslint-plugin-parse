/**
 * @fileoverview There are known slow queries that should be avoided
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
eslintTester.addRuleTest("lib/rules/no-slow-query", {

    valid: [
        {
            code: `
                exists('test');
            `
        }, {
            code: `
                someObject.exists();
            `
        }, {
            code: `
                someObject.exists(1);
            `
        }, {
            code: `
                'test'.exists('test');
            `
        }
    ],


    invalid: [
        {
            code: `
                new Parse.Query("Item")
                    .doesNotExist("someKey");
            `,
            errors: [{
                message: "`Parse.Query#doesNotExist()` it's a slow query that can cause timeouts",
                type: "Identifier"
            }]
        }, {
            code: `query.doesNotExist(someVar);`,
            errors: [{
                message: "`Parse.Query#doesNotExist()` it's a slow query that can cause timeouts",
                type: "Identifier"
            }]
        }, {
            code: `query.doesNotExist('someKey');`,
            errors: [{
                message: "`Parse.Query#doesNotExist()` it's a slow query that can cause timeouts",
                type: "Identifier"
            }]
        }, {
            code: `query.doesNotMatchKeyInQuery('someKey', 'someKeyKey', new Parse.Query('Item'));`,
            errors: [{
                message: "`Parse.Query#doesNotMatchKeyInQuery()` it's a slow query that can cause timeouts",
                type: "Identifier"
            }]
        }, {
            code: `query.doesNotMatchQuery('someKey', new Parse.Query('Item'));`,
            errors: [{
                message: "`Parse.Query#doesNotMatchQuery()` it's a slow query that can cause timeouts",
                type: "Identifier"
            }]
        }, {
            code: `query.endsWith('someKey', 'someValue');`,
            errors: [{
                message: "`Parse.Query#endsWith()` it's a slow query that can cause timeouts",
                type: "Identifier"
            }]
        }, {
            code: `query.exists('someKey');`,
            errors: [{
                message: "`Parse.Query#exists()` it's a slow query that can cause timeouts",
                type: "Identifier"
            }]

        }, {
            code: `query.matches('someKey', /regex/);`,
            errors: [{
                message: "`Parse.Query#matches()` it's a slow query that can cause timeouts",
                type: "Identifier"
            }]
        }, {
            code: `query.matches('someKey', /regex/i);`,
            errors: [{
                message: "`Parse.Query#matches()` it's a slow query that can cause timeouts",
                type: "Identifier"
            }]
        }, {
            code: `query.matches('someKey', new RegExp("regex"));`,
            errors: [{
                message: "`Parse.Query#matches()` it's a slow query that can cause timeouts",
                type: "Identifier"
            }]
        }, {
            code: `query.matches('someKey', new RegExp("regex"), "i");`,
            errors: [{
                message: "`Parse.Query#matches()` it's a slow query that can cause timeouts",
                type: "Identifier"
            }]
        }, {
            code: `query.notContainedIn('someKey', []);`,
            errors: [{
                message: "`Parse.Query#notContainedIn()` it's a slow query that can cause timeouts",
                type: "Identifier"
            }]
        }, {
            code: `query.notContainedIn('someKey', 1 ? [] : []);`,
            errors: [{
                message: "`Parse.Query#notContainedIn()` it's a slow query that can cause timeouts",
                type: "Identifier"
            }]
        }, {
            code: `query.notContainedIn('someKey', [1, 2, 3]);`,
            errors: [{
                message: "`Parse.Query#notContainedIn()` it's a slow query that can cause timeouts",
                type: "Identifier"
            }]
        }, {
            code: `query.notEqualTo('someKey', 'hello');`,
            errors: [{
                message: "`Parse.Query#notEqualTo()` it's a slow query that can cause timeouts",
                type: "Identifier"
            }]
        }, {
            code: `query.startsWith('someKey', 'hello');`,
            errors: [{
                message: "`Parse.Query#startsWith()` it's a slow query that can cause timeouts",
                type: "Identifier"
            }]
        }
    ]
});
