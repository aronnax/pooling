/**
 * Created by msecret on 4/13/15.
 */

import redtape from 'redtape';
import sinon from 'sinon';

import PoolManager from '../../src/pool';
import Pooled from '../../src/pooled';

var sandbox,
    testPool;

var test = redtape({
  beforeEach: (cb) => {
    sandbox = sinon.sandbox.create();
    Pooled._cachedPool = null;
    testPool = {
      acquireMember() {
        return {};
      },
      releaseMember() {
        return {};
      }
    };
    cb();
  },
  afterEach: (cb) => {
    sandbox.restore();
    cb();
  }
});

test('it exists', t => {
  t.ok(PoolManager);
  t.ok(PoolManager.getPool);
  t.ok(Pooled);
  t.ok(Pooled.make);
  t.end();
});

test('make() returns a new object from the pool', t => {
  var expected = 'testExpected',
      actual;

  sandbox.stub(PoolManager, 'getPool', () => { return testPool; });
  testPool.acquireMember = () => { return expected; };
  actual = Pooled.make();
  t.equal(actual, expected, 'returns expected from Pool.acquireMember');

  t.end();
});

test('free() returns undefined', t => {
  var actual;

  sandbox.stub(PoolManager, 'getPool', () => { return testPool; });
  testPool.releaseMember = () => { return {}; };
  actual = Pooled.free();
  t.notOk(actual, 'Returns undefined');

  t.end();
});

test('get() pool returns the created pool', t => {
  var expected = 'testExpected',
    actual;

  sandbox.stub(PoolManager, 'getPool', () => { return expected; });
  actual = Pooled.pool;
  t.equal(actual, expected, 'returns expected from PoolManager.getPool');

  t.end();
});

test('get() pool returns a cached pool on 2nd access', t => {
  var expected = {s: 1},
      actual,
      stub;

  stub = sandbox.stub(PoolManager, 'getPool', () => { return expected; });
  actual = Pooled.pool;
  t.equal(actual, expected, 'returns expected from PoolManager.getPool');
  t.ok(Pooled._cachedPool, 'a cached pool object exists');
  t.equal(stub.callCount, 1, 'getPool() was called once');
  actual = Pooled.pool;
  t.equal(actual, Pooled._cachedPool, 'returned pool is now the cached pool');
  t.equal(stub.callCount, 1, 'getPool() was still only called once');

  t.end();
});
