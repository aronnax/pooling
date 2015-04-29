/**
 *
 * Created by msecret on 4/25/15.
 */

function _createMember(className) {
  /*jshint validthis:true */
  var toreturn;
  switch(className) {
    case 'array':
      toreturn = [];
      break;
    case 'function':
      toreturn = function() {};
      break;
    case 'Base':
    case 'object':
      toreturn = {};
      break;
    default:
      toreturn = Object.create({});
      break;
  }

  return toreturn;
}

var PoolProto = {
  /**
   * The current pool of active members, a store
   * @type Object
   */
  activePool: [],
  /**
   * A free pool of objects ready to be used
   * @type Array
   */
  freePool: [],

  init(initialSize, basePrototype, className) {
    this.freePool = [];
    this.activePool = [];
    this.basePrototype = basePrototype;

    this.expandPool(initialSize);
    return this;
  },

  /**
   * Expand the free pool array by a certain amount
   * @param {Number} byAmount The amount to expand the pool by
   */
  // TODO this should use a config value
  expandPool(amount=25) {
    var i = 0;

    for ( ; i < amount; i++) {
      var item = _createMember.call(this, this.className);
      this.freePool.push(item);
    }

  }
};

export default PoolProto;