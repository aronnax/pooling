/**
 * Created by msecret on 4/28/15.
 */

function clearArray(array) {
  array.length = 0;
}

/**
 * Clear out an object of all properties
 * @private
 */
function clearObject(object) {
  var key;

  for (key in object) {
    if (object.hasOwnProperty(key)) {
      // Ensures only writable properties are deleted.
      try {
        delete object[key];
      } catch (e) { }
    }
  }
}

var util = {

  /**
   *
   * Cleans any type of primitive, object or array. For an object will clear
   * all it's propertyes, for an array it will clear all it's elements.
   * @param {Object|Array} thing The primitive to be cleared.
   * @return {Object|Array} The cleaned thing.
   */
  cleanAnything(thing) {
    if (Array.isArray(thing)) {
      clearArray(thing);
    }
    else if (typeof thing === 'object') {
      clearObject(thing);
    }

    return thing;
  }
};

export default util;
