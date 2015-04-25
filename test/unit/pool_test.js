/**
 *
 * Created by msecret on 4/21/15.
 */

import redtape from 'redtape';
import sinon from 'sinon';

import PoolManager from '../../src/pool';

var sandbox;

var test = redtape({
  beforeEach: (cb) => {
    sandbox = sinon.sandbox.create();
    cb();
  },
  afterEach: (cb) => {
    sandbox.restore();
    PoolManager.pools = {};
    cb();
  }
});

test('it exists', t => {
  t.ok(PoolManager, 'PoolManager exists');
  t.ok(PoolManager.getPool, 'PoolManager\'s methods exists');
  t.end();
});

/* =============================
 * getClassName()
 * =============================
 */
test('getClassName() returns className if defined', t => {
  var testObj = {},
      expected = 'testClass',
      actual;

  testObj.className = expected;
  actual = PoolManager.getClassName(testObj);
  t.equal(actual, expected, 'Return expected className property');

  t.end();
});

test('getClassName() returns "array" if [] passed in', t => {
  var testMember = [],
      expected = 'array',
      actual;

  actual = PoolManager.getClassName(testMember);
  t.equal(actual, expected, 'Returns string "array"');

  t.end();
});

test('getClassName() returns "function" if () passed in', t => {
  var testMember = function() { },
    expected = 'function',
    actual;

  actual = PoolManager.getClassName(testMember);
  t.equal(actual, expected, 'Returns string "function"');

  t.end();
});

test('getClassName() returns "object" if {} passed in', t => {
  var testMember = {},
    expected = 'object',
    actual;

  actual = PoolManager.getClassName(testMember);
  t.equal(actual, expected, 'Returns string "object"');

  t.end();
});

test('getClassName() should return if className not a string', t => {
  var testMember = {},
      expected = 'object',
      actual;

  testMember.className = [];
  actual = PoolManager.getClassName(testMember);
  t.equal(actual, expected, 'Returns string "object"');
  t.end();
});

/* =============================
 * getOrCreatePool()
 * =============================
 */
test('getOrCreatePool() should return a Pool object', t => {
  var actual = PoolManager.getOrCreatePool('testProto', {});

  t.ok(actual, 'Returned pool is a thing');
  t.equal(typeof actual, 'object', 'Returned pool is an object')
  t.ok(actual.activePool, 'Active pool object is there');
  t.ok(actual.freePool, 'Free pool object is there');

  t.end();
});

test('getOrCreatePool() should create new pools if not already there', t => {
  t.equal(PoolManager.totalPools, 0, 'Manager starts off with no pools');
  PoolManager.getOrCreatePool('testProto1', {});
  t.equal(PoolManager.totalPools, 1, 'Manager has a pool added');
  PoolManager.getOrCreatePool('testProto2', {});
  t.equal(PoolManager.totalPools, 2, 'Manager has a 2nd pool added');

  t.end();
});

test('getOrCreatePool() should return the same Pool if already created', t => {
  var testPool1,
      testPool2;

  t.equal(PoolManager.totalPools, 0, 'Manager starts off with no pools');
  testPool1 = PoolManager.getOrCreatePool('testProto', {});
  t.equal(PoolManager.totalPools, 1, 'Manager has a pool added');
  testPool2 = PoolManager.getOrCreatePool('testProto', {});
  t.equal(PoolManager.totalPools, 1, 'Manager has no pool added because its same pool');
  t.equal(testPool1, testPool2, 'The Pools are equal to one-another');

  t.end();
});

/* =============================
 * getPool()
 * =============================
 */
test('getPool() should return pool of passed classname if it exists ', t => {
  var expected = {},
      testClass = 'test',
      actual;

  PoolManager.pools[testClass] = expected;
  actual = PoolManager.getPool({}, testClass);

  t.ok(actual, 'It returns something');
  t.equal(actual, expected, 'The returned pool is the correct one');

  t.end();
});

test('getPool() returns the correct pool based on the prototype passed in', t => {
  var expected = {},
      testClass = 'test',
      actual;

  sandbox.stub(PoolManager, 'getClassName', () => { return testClass; });
  PoolManager.pools[testClass] = expected;
  actual = PoolManager.getPool({});

  t.ok(actual, 'It returns something');
  t.equal(actual, expected, 'The returned pool is the correct one');

  t.end();
});

test('getPool() returns null if it can\'t find the pool', t => {
  let actual = PoolManager.getPool({}, 'poolNotThere');

  t.ok(!actual, 'Returns null');

  t.end();
});

/* =============================
 * createPool()
 * =============================
 */
test('createPool() should update the pools object with the new pool', t => {
  var testClassName = 'testPool';

  let actual = PoolManager.createPool(testClassName, {});
  t.ok(actual, 'Returns something');
  t.ok(PoolManager.pools[testClassName], 'The pool exists on the manager\'s pool property');

  t.end();
});

test('createPool will create a pool of initial size passed in', t => {
  var expected = 25,
      actual = PoolManager.createPool('testPool', {}, expected);

  t.equal(actual.freePool.length, expected, 'The pools free pool length is equal to the expected');

  t.end();
});

