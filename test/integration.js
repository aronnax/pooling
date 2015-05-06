/**
 *
 * Created by msecret on 4/28/15.
 */

import redtape from 'redtape';

import './setup';
import Pooled from '../src/pooled';

var testClassProto,
    testClassName = 'testClass',
    testValP = 'valueofP',
    testM = function(s) { return s + 1; },
    i = 0;

var test = redtape({
  beforeEach: (cb) => {
    testClassProto = {
      className: {
        value: testClassName + i
      },
      testP: {
        value: testValP
      },
      testM: {
        value: testM
      }
    };
    cb();
  },
  afterEach: (cb) => {
    i = i + 1;
    cb();
  }
});

test('exists', t => {
  t.ok(Pooled);
  t.end();
});

test('extending from Pooled creates correct methods', t => {
  var testClass = Object.create(Pooled);
  t.ok(testClass.make, 'make() is defined on class');
  t.ok(testClass.free, 'free() is defined on class');
  t.ok(testClass.pool, 'pool is defined on class');

  let testInst = Object.create(testClass);
  t.ok(testInst.make, 'make() is defined on instance');
  t.ok(testInst.free, 'free() is defined on instance');
  t.ok(testInst.pool, 'pool is defined on instance');

  t.end();
});

test('make returns a correct object', t => {
  var TestClass = Object.create(Pooled, testClassProto);

  let actual = TestClass.make();
  t.ok(actual, 'returns something');
  t.equal(actual.className, testClassName + i, 'class name is correct');
  t.equal(actual.testP, testValP, 'test property is correct');
  t.ok(actual.testM, 'test method exists');
  t.equal(actual.testM(1), 2, 'test method works correctly');

  t.end();
});

test('make moves object from free to active pool', t => {
  var TestClass = Object.create(Pooled, testClassProto);

  t.equal(TestClass.pool.freePool.length, 25, 'free pool has default value ' +
      'of members');
  t.equal(TestClass.pool.activePool.length, 0, 'active pool starts with 0');
  let actual = TestClass.make();
  t.equal(TestClass.pool.freePool.length, 24, 'equals 1 less then default');
  t.equal(TestClass.pool.activePool.length, 1, 'is one now');
  let actual2 = TestClass.make();
  t.equal(TestClass.pool.freePool.length, 23, 'equals 2 less then default');
  t.equal(TestClass.pool.activePool.length, 2, 'is 2 now');

  t.end();
});

test('free moves object from active to free pool', t => {
  var TestClass = Object.create(Pooled, testClassProto);

  let actual = TestClass.make();
  t.equal(TestClass.pool.freePool.length, 24, 'equals 1 less then default');
  t.equal(TestClass.pool.activePool.length, 1, 'is one now');
  actual.free();
  t.equal(TestClass.pool.freePool.length, 25, 'free pool is default now');
  t.equal(TestClass.pool.activePool.length, 0, 'none now');
  let actual1 = TestClass.make();
  let actual2 = TestClass.make();
  t.equal(TestClass.pool.freePool.length, 23, 'equals 2 less then default');
  t.equal(TestClass.pool.activePool.length, 2, 'is 2 now');
  actual1.free();
  t.equal(TestClass.pool.freePool.length, 24, 'equals 1 less then default');
  t.equal(TestClass.pool.activePool.length, 1, 'is one now');
  actual2.free();
  t.equal(TestClass.pool.freePool.length, 25, 'equals 1 less then default');
  t.equal(TestClass.pool.activePool.length, 0, 'is one now');

  t.end();
});

test('still works when free pool gets emptied', t => {
  var TestClass = Object.create(Pooled, testClassProto),
      instances = [];

  for (let i = 0, ilen = 25; i < ilen; i++) {
    instances.push(TestClass.make());
  }

  t.equal(TestClass.pool.freePool.length, 0, 'no more members left in free pool');
  t.equal(TestClass.pool.activePool.length, 25, 'active pool at default');

  let actual = TestClass.make();

  t.equal(TestClass.pool.freePool.length, 24, 'free pool is default now');
  t.equal(TestClass.pool.activePool.length, 26, 'active pool is over default');

  let actual2 = TestClass.make();

  t.equal(TestClass.pool.freePool.length, 23, 'equals 1 less then default');
  t.equal(TestClass.pool.activePool.length, 27, 'active pool is 2 over default');

  t.ok(actual, 'still returns an object');
  t.equal(actual.testP, testValP, 'test property is correct');

  t.end();
});

