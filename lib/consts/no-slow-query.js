"use strict";


var assign = require("lodash.assign");
var NO_NOT_QUERY_CONSTS = require("./no-not-query");
var createTypeCheckerForASTFunction = require("../create-type-checker-for-ast-function");


var PARAMS_TYPES_CHECKER = exports.PARAMS_TYPES_CHECKER = Object.freeze(assign({
    "endsWith": createTypeCheckerForASTFunction(["String", "String"]),
    "exists": createTypeCheckerForASTFunction(["String"]),
    "matches": createTypeCheckerForASTFunction(["String", "RegExp"], ["String", "RegExp", "String"]),
    "startsWith": createTypeCheckerForASTFunction(["String", "String"])
}, NO_NOT_QUERY_CONSTS.PARAMS_TYPES_CHECKER));

exports.FUNCTIONS_NAME = Object.freeze(Object.keys(PARAMS_TYPES_CHECKER));
