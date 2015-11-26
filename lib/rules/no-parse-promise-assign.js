/**
 * @fileoverview Don't assign variables explicitly to Parse.Promise instance
 * @author Ori Livni
 * @copyright HappySale
 */
"use strict";


module.exports = function(context) {

    function isNodeCalleeIsPromiseOfParsePromise(node) {
        var callee = node.callee;
        var parent = node.parent;

        return (
            /** The constructor is Promise */
            callee.name === "Promise" &&
            /**
             * It's part of variable assignment:
             * var ... = new Promise(...)
             */
            parent &&
            parent.type === "VariableDeclarator" &&
            /**
             * Has no arguments, because Promises/A+ constructors are look like this:
             * var ... = new Promise(() => ...)
             */
            (
                !(node.arguments) ||
                node.arguments.length === 0
            )
        );
    }

    function isNodeCalleeIsParsePromise(node) {
        var callee = node.callee;

        /**
         * Is this assigment looks like this example
         * ... = new Parse.Promise(...);
         */
        return (
            callee.object &&
            callee.object.name === "Parse" &&
            callee.property &&
            callee.property.name === "Promise"
        );
    }


    return {
        "CallExpression": function(node) {
            var parent = node.parent;
            var callee = node.callee;

            /** It's must be part of variable assignment */
            if (!(parent && parent.type === "VariableDeclarator")) { return; }

            /** Must have callee */
            if (!callee) { return; }

            /** The name of the function must be as / error */
            var property = callee.property;
            if (!(property && (property.name === "as" || property.name === "error"))) { return; }

            /** Must have callee object (Parse.Promise <- as / error) */
            var object = node.callee.object;
            if (!object) { return; }
            if (!(object.object && object.object.name === "Parse")) { return; }
            if (!(object.property && node.callee.object.property.name === "Promise")) { return; }


            context.report(node, `Don't use assignment for \`Parse.Promise.${property.name}\``);
        },

        "NewExpression": function(node) {
            var callee = node.callee;
            if (!callee) { return; }


            if (
                /** Promise */
                isNodeCalleeIsPromiseOfParsePromise(node) ||
                /** Parse.Promise */
                isNodeCalleeIsParsePromise(node)
            ) {
                context.report({
                    node: node,
                    message: "create `Parse.Promise` instances directly"
                });
            }
        }
    };
};
