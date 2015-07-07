/**
 * Create type checker function for function arguments
 * ===
 *
 * @author Ori Livni
 */
"use strict";

var every = require("lodash.every");
var map = require("lodash.map");
var size = require("lodash.size");
var getObjectToStringValue = require("./get-object-to-string-value");
var isPropertyOfType = require("./is-property-of-type");


/**
 * In-line function of {@link createTypeCheckerForASTFunction}
 *
 * @see {@link createTypeCheckerForASTFunction}
 * @private
 * @param  {Array of Object} properties
 * @param  {Array of String} types      Array of Object#toString values (@example ["[object String]"])
 * @return {Boolean}
 */
function checkIfPropertiesValidTypes(properties, types) {
    if (size(properties) !== size(types)) {
        return false;
    }

    return every(properties, function(property, index) {
        return isPropertyOfType(property, types[index]);
    });
}

/**
 * Create function for Type checking
 * @public
 * @arguments            Array of String, represent types name of function parameters
 * @return    {Function}
 */
module.exports = function createTypeCheckerForASTFunction(/** ...arrays */) {
    var propertiesTypeCheckers = map(arguments, function(types) {
        var computedType = map(types, getObjectToStringValue);

        /**
         * @param  {Array of Object} astProperties Properties of AST function arguments
         * @return {Boolean}
         */
        return function(astProperties) {
            return checkIfPropertiesValidTypes(astProperties, computedType);
        };
    });

    return function(astProperties) {
        return propertiesTypeCheckers.some(function(fn) {
            return fn(astProperties);
        });
    };
};
