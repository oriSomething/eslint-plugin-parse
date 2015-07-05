/**
 * @fileoverview Prevent saving an object with attribute `useMasterKey`
 * @author Ori Livni
 * @copyright HappySale
 */
"use strict";

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

module.exports = function(context) {

    //--------------------------------------------------------------------------
    // Helpers
    //--------------------------------------------------------------------------

    function getArgumentIfObjectExpression(args, index) {
        if (args.length <= index) {
            return null;
        }

        var argument = args[index];

        return (
            argument.type === "ObjectExpression" ?
                argument :
                null
        );
    }

    function isObjectExpressionIncludesUseMasterKey(object) {
        if (object === null) {
            return false;
        } else {
            return object.properties.some(function(property) {
                return (
                    property &&
                    property.type === "Property" &&
                    property.key.name === "useMasterKey"
                );
            });
        }
    }

    //--------------------------------------------------------------------------
    // Public
    //--------------------------------------------------------------------------

    return {
        "CallExpression": function(node) {
            if (!node.callee) { return; }
            if (!node.callee.property) { return; }
            if (node.callee.property.name !== "save") { return; }
            if (node.arguments.length === 0) { return; }

            var firstArg = getArgumentIfObjectExpression(node.arguments, 0);
            var secondArg = getArgumentIfObjectExpression(node.arguments, 1);

            if (isObjectExpressionIncludesUseMasterKey(firstArg) &&
                !isObjectExpressionIncludesUseMasterKey(secondArg)) {
                context.report(node, "`useMasterKey` key in first argument of `save()` is probably a mistake");
            }
        }
    };

};
