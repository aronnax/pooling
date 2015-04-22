/**
 * Created by msecret on 4/13/15.
 */

var Pool = {
  /**
   * Aquires a free member from the pool. Maps directly to the acquire
   * pool methodand then the Pool.acquire method. Uses a non-standard
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
    //pool = this.acquirePool(className, classMember);

    //return pool.acquireMember();
  },

  release() {
    return;
  },

  getPool() {
    return;
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
        window.console.error('Aquired Pool class not a string');
        throw new Error('Aquired Pool class not a string');
      }
    }
    return className;
  }
};

export default Pool;
