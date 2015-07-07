/**
 * Get object `toString` value
 * ===
 *
 * @author Ori Livni
 */
"use strict";


/**
 * Wrap a typeName with `[object ...]` so it would be identical to the result
 * when you call `Object.prototype.toString.call` on object.
 *
 * NOTE: `typeName` should be capitalized (@example `getObjectToStringValue("String")`)
 *
 * @param  {String} typeName
 * @return {String}
 */
module.exports = function getObjectToStringValue(typeName) {
    return `[object ${typeName}]`;
};
