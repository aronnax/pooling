/**
 *
 * Created by msecret on 4/25/15.
 */

import redtape from 'redtape';
import sinon from 'sinon';

import PoolProto from '../../src/pool_proto';

var sandbox;

var test = redtape({
  beforeEach: (cb) => {
    sandbox = sinon.sandbox.create();
    PoolProto.activePool = [];
    PoolProto.freePool = [];
    cb();
  },
  afterEach: (cb) => {
    sandbox.restore();
    cb();
  }
});

/* =============================
 * expandPool()
 * =============================
 */
test('expandPool() should expand the pool by the amount passed in', t => {
  var expected = 50;

  PoolProto.className = 'testProto';
  PoolProto.expandPool(expected);
  t.equal(PoolProto.freePool.length, expected, 'The freePool was expanded by correct amount');
  PoolProto.expandPool(expected);
  t.equal(PoolProto.freePool.length, expected * 2, 'The freePool was expanded by correct amount');

  t.end();
});

// TODO this should use the config object
test('should expand the pool by a default if not amount is passed in', t => {
  var expected = 25;

  PoolProto.expandPool();
  t.equal(PoolProto.freePool.length, expected, 'The freePool was expanded by correct amount');

  t.end();
});
