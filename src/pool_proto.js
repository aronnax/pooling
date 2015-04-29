/**
 *
 * Created by msecret on 4/25/15.
 */

import util from './util';

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
      toreturn = Object.create(this.basePrototype);
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

  },

  /**
   * Aquires a member from the free pool
   * @return {Object|Array|Function} The empty member returned from the pool
   */
  acquireMember() {
    if (this.freePool.length <= 0) {
      this.expandPool();
    }
    var member = this.freePool.pop();
    // TODO store
    this.activePool.push(member);
    return member;
  },

  /**
   * Releases a member back to the pool, adding it to free pools and taking
   * away from active pool.
   * @param {Object} member The object to release
   */
  releaseMember(member) {
    // TODO store
    var activeMember = this.activePool.get(member),
      released;

    if (!activeMember) {
      throw new Error('Member not found, cannot be released');
    }

    released = this.activePool.remove(member);
    // TODO util
    util.cleanAnything(released);
    this.freePool.push(released);
  }
};

export default PoolProto;