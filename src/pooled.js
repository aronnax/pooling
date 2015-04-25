/**
 * Created by msecret on 4/13/15.
 */

/**
 * @file pooled Holds the Pooled module
 */

import PoolManager from './pool_manager';
import PoolProto from './pool_proto';

/**
 * An object the provides pooling functionality
 * @class Pooled
 */
var Pooled = {
  _cachedPool: null,
  /**
   * Gets a free object from the pool, enhances it and then returns it.
   * @return {Object|Array|Function} The object being returned from the pool
   */
  make() {
    return this.pool.acquireMember();
  },

  /**
   * Releases a used object, cleans it, and returns it to the free pool.
   */
  free() {
    this.pool.releaseMember();
    return undefined;
  },

  /**
   * The current PoolManager object for this object prototype
   */
  get pool() {
    if (this._cachedPool) {
      return this._cachedPool;
    }
    let pool = PoolManager.getOrCreatePool(this);
    this._cachedPool = pool;
    return pool;
  }
};

export default Pooled;
