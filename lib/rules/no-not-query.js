/**
 * @fileoverview Prohibit the use of the "nots" query function
 * @author Ori Livni
 * @copyright HappySale
 */
"use strict";
var includes = require("lodash.includes");
var NO_NOT_QUERY_CONSTS = require("../consts/no-not-query");


var NOT_QUERY_FUNCTIONS_PARAMS_TYPES_CHECKER = NO_NOT_QUERY_CONSTS.PARAMS_TYPES_CHECKER;
var NOT_QUERY_FUNCTIONS_NAME = NO_NOT_QUERY_CONSTS.FUNCTIONS_NAME;


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
                var paramsTypesChecker = NOT_QUERY_FUNCTIONS_PARAMS_TYPES_CHECKER[fnName];


                if (// Is function name is of not query
                    includes(NOT_QUERY_FUNCTIONS_NAME, fnName) &&
                    // Type checker of arguments
                    paramsTypesChecker(args)) {

                    context.report(property, `\`Parse.Query#${fnName}()\` it's unindexable query that can cause timeouts`);
                }
            }
        }
    };
};
