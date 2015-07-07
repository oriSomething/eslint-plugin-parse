"use strict";


var createTypeCheckerForASTFunction = require("../create-type-checker-for-ast-function");


var PARAMS_TYPES_CHECKER = exports.PARAMS_TYPES_CHECKER = Object.freeze({
    "doesNotExist": createTypeCheckerForASTFunction(["String"]),
    "doesNotMatchKeyInQuery": createTypeCheckerForASTFunction(["String", "String", "Object"]),
    "doesNotMatchQuery": createTypeCheckerForASTFunction(["String", "Object"]),
    "notContainedIn": createTypeCheckerForASTFunction(["String", "Array"]),
    "notEqualTo": createTypeCheckerForASTFunction(["String", "String"])
});

exports.FUNCTIONS_NAME = Object.freeze(Object.keys(PARAMS_TYPES_CHECKER));
