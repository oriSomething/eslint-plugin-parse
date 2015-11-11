/**
 * @fileoverview There are known slow queries that should be avoided
 * @author Ori Livni
 * @copyright HappySale
 */
"use strict";

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

var rule = require("../../../lib/rules/no-slow-query"),
    RuleTester = require("eslint").RuleTester;

//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

var ruleTester = new RuleTester();
ruleTester.run("lib/rules/no-slow-query", rule, {

    valid: [
        {
            code: `
                exists('test');
            `
        }, {
            code: `
                hi();
                doesNotExist('test');
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
        }, {
            code: `
                _.exists('test');
            `
        }, {
            code: `
                // ok when there is no assignment to a new Parse.Query
                query.exists('test');
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
            code: `
                new Parse.Query("Item")
                    .bullshit()
                    .doesNotExist("someKey");
            `,
            errors: [{
                message: "`Parse.Query#doesNotExist()` it's a slow query that can cause timeouts",
                type: "Identifier"
            }]
        }, {
            code: `
                var query = new Parse.Query("Item");
                query.doesNotExist("someKey");
            `,
            errors: [{
                message: "`Parse.Query#doesNotExist()` it's a slow query that can cause timeouts",
                type: "Identifier"
            }]
        }, {
            code: `new Parse.Query("Item").doesNotExist(someVar);`,
            errors: [{
                message: "`Parse.Query#doesNotExist()` it's a slow query that can cause timeouts",
                type: "Identifier"
            }]
        }, {
            code: `new Parse.Query("Item").doesNotExist('someKey');`,
            errors: [{
                message: "`Parse.Query#doesNotExist()` it's a slow query that can cause timeouts",
                type: "Identifier"
            }]
        }, {
            code: `new Parse.Query("Item").doesNotMatchKeyInQuery('someKey', 'someKeyKey', new Parse.Query('Item'));`,
            errors: [{
                message: "`Parse.Query#doesNotMatchKeyInQuery()` it's a slow query that can cause timeouts",
                type: "Identifier"
            }]
        }, {
            code: `new Parse.Query("Item").doesNotMatchQuery('someKey', new Parse.Query('Item'));`,
            errors: [{
                message: "`Parse.Query#doesNotMatchQuery()` it's a slow query that can cause timeouts",
                type: "Identifier"
            }]
        }, {
            code: `new Parse.Query("Item").endsWith('someKey', 'someValue');`,
            errors: [{
                message: "`Parse.Query#endsWith()` it's a slow query that can cause timeouts",
                type: "Identifier"
            }]
        }, {
            code: `new Parse.Query("Item").exists('someKey');`,
            errors: [{
                message: "`Parse.Query#exists()` it's a slow query that can cause timeouts",
                type: "Identifier"
            }]

        }, {
            code: `new Parse.Query("Item").matches('someKey', /regex/);`,
            errors: [{
                message: "`Parse.Query#matches()` it's a slow query that can cause timeouts",
                type: "Identifier"
            }]
        }, {
            code: `new Parse.Query("Item").matches('someKey', /regex/i);`,
            errors: [{
                message: "`Parse.Query#matches()` it's a slow query that can cause timeouts",
                type: "Identifier"
            }]
        }, {
            code: `new Parse.Query("Item").matches('someKey', new RegExp("regex"));`,
            errors: [{
                message: "`Parse.Query#matches()` it's a slow query that can cause timeouts",
                type: "Identifier"
            }]
        }, {
            code: `new Parse.Query("Item").matches('someKey', new RegExp("regex"), "i");`,
            errors: [{
                message: "`Parse.Query#matches()` it's a slow query that can cause timeouts",
                type: "Identifier"
            }]
        }, {
            code: `new Parse.Query("Item").notContainedIn('someKey', []);`,
            errors: [{
                message: "`Parse.Query#notContainedIn()` it's a slow query that can cause timeouts",
                type: "Identifier"
            }]
        }, {
            code: `new Parse.Query("Item").notContainedIn('someKey', 1 ? [] : []);`,
            errors: [{
                message: "`Parse.Query#notContainedIn()` it's a slow query that can cause timeouts",
                type: "Identifier"
            }]
        }, {
            code: `new Parse.Query("Item").notContainedIn('someKey', [1, 2, 3]);`,
            errors: [{
                message: "`Parse.Query#notContainedIn()` it's a slow query that can cause timeouts",
                type: "Identifier"
            }]
        }, {
            code: `new Parse.Query("Item").notEqualTo('someKey', 'hello');`,
            errors: [{
                message: "`Parse.Query#notEqualTo()` it's a slow query that can cause timeouts",
                type: "Identifier"
            }]
        }, {
            code: `new Parse.Query("Item").startsWith('someKey', 'hello');`,
            errors: [{
                message: "`Parse.Query#startsWith()` it's a slow query that can cause timeouts",
                type: "Identifier"
            }]
        }
    ]
});
