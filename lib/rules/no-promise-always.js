/**
 * @fileoverview Prevent usage of `Parse.Promise#always`
 * @author Ori Livni
 * @copyright HappySale
 */
"use strict";


module.exports = function(context) {

    return {
        "MemberExpression": function(node) {
            var parent = node.parent;
            var property = node.property;

            if (property &&
                property.type === "Identifier" &&
                property.name === "always" &&
                parent &&
                parent.type === "CallExpression") {

                context.report({
                    node: node,
                    message: "The use of `Parse.Promise#always` is prohibit"
                });
            }
        }
    };
};
