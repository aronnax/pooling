/**
 * Created by msecret on 4/13/15.
 */

var PoolManager = {
  /**
   * All the current pools, as a hash with the class type as the key.
   * @static
   * @type Pool
   */
  pools: {},

  /**
   * Count of the current total pools
   * @static
   * @type Number
   */
  get totalPools() {
    return Object.keys(this.pools).length;
  },

  /**
   * Will get the pool from the current pools by looking up the classname
   * on the object prototype.
   * @param {Object|Array|Function} objPrototype The prototype of the pool
   * being searched for.
   * @param {String} poolClassName The name of the pool class
   * @returns {Pool} The Pool object.
   */
  getPool(objPrototype, poolClassName) {
    var className = poolClassName || this.getClassName(objPrototype);
    return this.pools[className] || null;
  },

  /**
   * Creates a new pool of a certain type
   * @static
   * @param {Sting} className The name of the class
   * @param {Number} initialSize The initial size to make the free pool
   * @return {Pool} The new pool of the class type
   */
  createPool(className, objPrototype, initialSize) {
    var pool = {freePool: [], activePool: []};
    // overwrite class name to the actual class name, not Pool
    pool.className = className;
    pool.freePool[initialSize - 1 || 10] = {};

    this.pools[className] = pool;
    return pool;
  },

  /**
   * Gets the pool of the class type, creating one if it doesn't exists
   * @static
   * @param {String} className The name of the class
   * @param {String} objPrototype The type of object to get the pool from
   * @return {Pool} The pool of the class type
   */
  getOrCreatePool(className, objPrototype) {
    var pool = this.getPool(objPrototype, className);
    if (!pool) {
      pool = this.createPool(className, objPrototype);
    }

    return pool;
  },

  /**
   * Gets the class name of the member, whether Based or not
   * @param {Object|Array|Function} classMember The member to get name of
   * @returns {String} The name of the member
   */
  getClassName (classMember) {
    var className = classMember.className;
    if (typeof className !== 'string') {
      if (Array.isArray(classMember)) {
        className = 'array';
      }
      else if (typeof classMember === 'function') {
        className = 'function';
      }
      else if (typeof classMember === 'object') {
        className = 'object';
      }
      else {
        console.error('Aquired PoolManager class not a string');
        throw new Error('Aquired PoolManager class not a string');
      }
    }
    return className;
  }
};

export default PoolManager;
