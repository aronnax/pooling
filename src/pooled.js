/**
 * Created by msecret on 4/13/15.
 */

/**
 * @file pooled Holds the Pooled module
 */

import Pool from './pool';

/**
 * An object the provides pooling functionality
 * @class Pooled
 */
var Pooled = {
  /**
   * Gets a free object from the pool, enhances it and then returns it.
   * @return {Object|Array|Function} The object being returned from the pool
   */
  make() {
    return Pool.acquire(this);
  },

  /**
   * Releases a used object, cleans it, and returns it to the free pool.
   */
  free() {
    Pool.release(this);
    return undefined;
  },

  /**
   * The current PoolManager object for this object prototype
   */
  get pool() {
    var pool = Pool.getPool(this);
    return pool;
  }
};

export default Pooled;
