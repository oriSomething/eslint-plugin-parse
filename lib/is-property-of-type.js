/**
 * Is property of type
 * ===
 * Check if AST property is the type of the suppose value. The `type` should be
 * as `Object#toString` value
 *
 * @author Ori Livni
 */
"use strict";


var getObjectToStringValue = require("./get-object-to-string-value");


/**
 * Check if AST property is of type of
 * @param  {Object}  property
 * @param  {String}  type     Object#toString String (@example "[object String]")
 * @return {Boolean}
 */
module.exports = function isPropertyOfType(property, type) {
    if (!property) {
        return type === getObjectToStringValue("Undefined");
    }


    switch(property.type) {
        case "Identifier":
            return true;

        case "ArrayExpression":
            return type === getObjectToStringValue("Array");

        case "ConditionalExpression":
            return (
                isPropertyOfType(property.consequent, type) ||
                isPropertyOfType(property.alternate, type)
            );

        case "Literal":
            return type === Object.prototype.toString.apply(property.value);

        case "NewExpression":
            if (property.callee) {
                if (property.callee.name === "RegExp" ||
                    property.callee.name === "Date") {
                    return type === getObjectToStringValue(property.callee.name);
                }
            }
            return type === getObjectToStringValue("Object");

        case "ObjectExpression":
            return type === getObjectToStringValue("Object");
    }


    return false;
};
