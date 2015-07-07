/**
 * @fileoverview Never use `Parse.Query#doesNotExist`, use `#equalTo(key, null)`
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
            if (!node.callee.property) { return; }
            if (node.callee.property.name !== "doesNotExist") { return; }
            if (!(node.arguments && node.arguments.length > 0)) { return; }

            context.report(node.callee.property, `use equalTo('${node.arguments[0].value}', null) instead`);
        }
    };
};
