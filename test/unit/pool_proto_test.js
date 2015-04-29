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

/* =============================
 * acquireMember()
 * =============================
 */
test('should return instance of base prototype', t => {
  var expected = {s: 1, className: 'test'},
      testPool,
      actual;

  testPool = PoolProto.init(25, expected);
  actual = testPool.acquireMember();

  t.equal(actual.className, expected.className, 'Returned object is same as base prototype');

  t.end();
});

test('should expland the pool if it gets down to 0 members', t => {
  var testPool = PoolProto.init(1, {});

  t.equal(testPool.freePool.length, 1, 'free pool starts out with one');
  testPool.acquireMember();
  t.equal(testPool.freePool.length, 0, 'free pool goes to 0');
  testPool.acquireMember();
  t.equal(testPool.freePool.length, 24, 'free pool goes to 24');

  t.end();
});

test('should add the member to the active pool', t => {
  var testPool = PoolProto.init(1, {});

  t.equal(testPool.activePool.length, 0, 'active pool starts at 0');
  testPool.acquireMember();
  t.equal(testPool.activePool.length, 1, 'active pool gets object added');

  t.end();
});
