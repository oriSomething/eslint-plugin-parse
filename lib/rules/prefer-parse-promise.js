/**
 * @fileoverview Prefer Parse.Promise over option object with success / error
 * @author Ori Livni
 * @copyright HappySale
 */
"use strict";


module.exports = function(context) {
    /**
     * Functions name of function that receive `options` of `success` and `error`,
     * but also return `Parse.Promise`
     * @constant
     * @type {Array}
     */
    var FUNCTIONS_NAMES_WITH_OPTIONS = Object.freeze([
        "become",
        "count",
        "current",
        "destroy",
        "destroyAll",
        "fetch",
        "fetchAll",
        "fetchAllIfNeeded",
        "find",
        "first",
        "get",
        "httpRequest",
        "link",
        "logIn",
        "requestPasswordReset",
        "run",
        "save",
        "saveAll",
        "send",
        "setName",
        "signUp",
        "unlink"
    ]);

    return {
        "CallExpression": function(node) {
            if (!node.callee) { return; }
            if (!node.callee.property) { return; }

            var functionHasOptions = FUNCTIONS_NAMES_WITH_OPTIONS.some(function(name) {
                return name === node.callee.property.name;
            });
            if (!functionHasOptions) { return; }
            if (node.arguments.length === 0) { return; }

            var lastArg = node.arguments[node.arguments.length - 1];
            if (lastArg.type !== "ObjectExpression") { return; }
            if (!lastArg.properties) { return; }

            var sucessOrErrorOptions = lastArg.properties.filter(function(property) {
                    return (
                        property &&
                        property.type === "Property" &&
                        (property.key.name === "success" || property.key.name === "error")
                    );
                });
            var optionKeys = sucessOrErrorOptions.map(function(property) {
                    return property.key.name;
                });

            if (optionKeys.indexOf("success") !== -1) {
                var successCallback = sucessOrErrorOptions.filter(function(property) {
                    return property.key.name === "success";
                })[0];
                context.report({
                    node: successCallback,
                    message: "Prefer use `then` or `done` instead of `success` callback"
                });
            }

            if (optionKeys.indexOf("error") !== -1) {
                var errorCallback = sucessOrErrorOptions.filter(function(property) {
                    return property.key.name === "error";
                })[0];
                context.report({
                    node: errorCallback,
                    message: "Prefer use `then` or `fail` instead of `error` callback"
                });
            }
        }
    };
};
