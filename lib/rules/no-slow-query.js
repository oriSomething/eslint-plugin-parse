/**
 * @fileoverview There are known slow queries that should be avoided
 * @author Ori Livni
 * @copyright HappySale
 */
"use strict";


var includes = require("lodash.includes");
var NO_SLOW_QUERY_CONSTS = require("../consts/no-slow-query");


var SLOW_QUERY_FUNCTIONS_PARAMS_TYPES_CHECKER = NO_SLOW_QUERY_CONSTS.PARAMS_TYPES_CHECKER;
var SLOW_QUERY_FUNCTIONS_NAME = NO_SLOW_QUERY_CONSTS.FUNCTIONS_NAME;


module.exports = function(context) {

    return {
        "CallExpression": function(node) {
            var args = node.arguments;
            var object = node.callee.object;
            var property = node.callee.property;


            if (property &&
                args &&
                property.type === "Identifier" &&
                !(object && object.value)) {


                var fnName = property.name;
                var paramsTypesChecker = SLOW_QUERY_FUNCTIONS_PARAMS_TYPES_CHECKER[fnName];


                if (// Is function name is of slow query
                    includes(SLOW_QUERY_FUNCTIONS_NAME, fnName) &&
                    // Type checker of arguments
                    paramsTypesChecker(args)) {

                    context.report(property, `\`Parse.Query#${fnName}()\` it's a slow query that can cause timeouts`);
                }
            }
        }
    };
};
