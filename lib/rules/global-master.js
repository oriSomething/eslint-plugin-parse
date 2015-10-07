/**
 * @fileoverview Disallow global use of master key
 * @author Ori Livni
 * @copyright HappySale
 */
"use strict";

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

module.exports = function(context) {
    return {
        "CallExpression": function(node) {
            if (!node.callee) { return; }
            if (!node.callee.object) { return; }
            if (!node.callee.property) { return; }
            if (!node.callee.object.object) { return; }
            if (!node.callee.object.property) { return; }

            var callee = node.callee;
            var calleeObject = callee.object.object;
            var calleeProperty = callee.object.property;

            if (callee.property.name !== "useMasterKey") { return; }
            if (calleeObject.type !== "Identifier") { return; }
            if (calleeObject.name !== "Parse") { return; }
            if (calleeProperty.type !== "Identifier") { return; }
            if (calleeProperty.name !== "Cloud") { return; }


            context.report(node, "The use of `Parse.Cloud.useMasterKey()` is discouraged");
        }
    };
};
