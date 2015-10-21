/**
 * @fileoverview There are known slow queries that should be avoided
 * @author Ori Livni
 * @copyright HappySale
 */
"use strict";


var includes = require("lodash.includes");
var NO_SLOW_QUERY_CONSTS = require("../consts/no-slow-query");


// var SLOW_QUERY_FUNCTIONS_PARAMS_TYPES_CHECKER = NO_SLOW_QUERY_CONSTS.PARAMS_TYPES_CHECKER;
var SLOW_QUERY_FUNCTIONS_NAME = NO_SLOW_QUERY_CONSTS.FUNCTIONS_NAME;


module.exports = function(context) {
    /** @type {Object[]} Contains nodes of declaration of `new Parse.Query` */
    var VARS;

    // @todo Support of callee which are not member expression
    function getRootOfTypeOfCallExpression(node) {
        if (node.type !== "CallExpression") {
            throw new TypeError("node is not a CallExpression");
        }

        var callee = node.callee;

        if (callee.type !== "MemberExpression") return null;

        if (callee.object.type === "CallExpression") {
            return getRootOfTypeOfCallExpression(callee.object);
        } else if (callee.type) {
            return callee.object;
        }

        return null;
    }

    function isNewExpressionOfParseQuery(node) {
        var callee = node.callee;

        if (!callee) return false;
        if (callee.type !== "MemberExpression") return false;
        if (!callee.object) return false;
        if (callee.object.type !== "Identifier") return false;
        if (callee.object.name !== "Parse") return false;
        if (!callee.property) return false;
        if (callee.property.type !== "Identifier") return false;
        if (callee.property.name !== "Query") return false;

        return true;
    }


    return {
        "Program": function() {
            VARS = [];
        },

        "NewExpression": function(node) {
            var callee = node.callee;

            if (callee.type !== "MemberExpression") return;
            if (!callee.object) return;
            if (callee.object.type !== "Identifier") return;
            if (callee.object.name !== "Parse") return;
            if (!callee.property) return;
            if (callee.property.type !== "Identifier") return;
            if (callee.property.name !== "Query") return;

            var parent = node.parent;
            if (parent && parent.type === "VariableDeclarator") {
                VARS.push(parent);
            }
        },

        "CallExpression": function(node) {
            var callee = node.callee;

            if (!callee) return;
            if (callee.type !== "MemberExpression") return;
            if (!callee.property) return;
            if (callee.property.type !== "Identifier") return;
            if (!includes(SLOW_QUERY_FUNCTIONS_NAME, callee.property.name)) return;

            var fnName = callee.property.name;
            var topNode = getRootOfTypeOfCallExpression(node);

            if (!topNode) return;

            switch(topNode.type) {
            // Invoked directly on `new Parse.Query` object
            case "NewExpression":
                if (isNewExpressionOfParseQuery(topNode)) {
                    context.report(callee.property, `\`Parse.Query#${fnName}()\` it's a slow query that can cause timeouts`);
                }
                return;

            // Invoked by variable of `Parse.Query` object
            // NOTE: - it only iterates on variables names
            //       - id doesn't check for scoping, and remove irrelevant variables
            case "Identifier":
                if (VARS.some(function(variable) {
                    switch(variable.type) {
                    case "VariableDeclarator":
                        return (
                            variable.id.type === "Identifier" &&
                            variable.id.name === topNode.name
                        );
                    }

                    return false;
                })) {
                    context.report(callee.property, `\`Parse.Query#${fnName}()\` it's a slow query that can cause timeouts`);
                }
            }
        }
    };
};
