/**
 * Created by msecret on 4/13/15.
 */

var PoolManager = {
  pools: {},
  get totalPools() {
    return Object.keys(this.pools).length;
  },
  /**
   * Aquires a free member from the pool. Maps directly to the acquire
   * pool methodand then the PoolManager.acquire method. Uses a non-standard
   * Function.name property to obtain the class name.
   * @static
   * @param {Object|Array|Function} classMember The object being fetch from
   * pool
   * @return {Object|Array|Function} The object being return from the pool
   */
  acquire (classMember) {
    var className,
        pool;

    try {
      className = this.getClassName(classMember);
    } catch (e) {
      throw new Error(e);
    }
    pool = this.getOrCreatePool(className, classMember);

    //return pool.acquireMember();
  },

  release() {
    return;
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
    return this.pools[className];
  },

  createPool(className, objPrototype) {
    var pool = {
      activePool: [],
      freePool: []
    };
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
      if (window.toString.call(classMember) === '[object Array]') {
        className = 'array';
      }
      else if (typeof classMember === 'function') {
        className = 'function';
      }
      else if (typeof classMember === 'object') {
        className = 'object';
      }
      else {
        window.console.error('Aquired PoolManager class not a string');
        throw new Error('Aquired PoolManager class not a string');
      }
    }
    return className;
  }
};

export default PoolManager;
