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
 * init()
 * =============================
 */
test('should set the active and free pools to empty arrays', t => {
  var testPool = PoolProto.init(25, {});

  t.ok(testPool.freePool, 'inits a free pool array');
  t.ok(testPool.activePool, 'inits an active pool array');

  t.end();
});

test('should set its base prototype as the object passed in', t => {
  var testPool,
      expected = {s: 1};

  testPool = PoolProto.init(25, expected);

  t.equal(testPool.basePrototype, expected, 'the basePrototype equals passed in one');

  t.end();
});

test('calls expandPool on itself', t => {
  var stub = sandbox.stub(PoolProto, 'expandPool', () => { return; });

  PoolProto.init(25, {});
  t.ok(stub.calledOnce, 'the expandPool method was called once');

  t.end();
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
