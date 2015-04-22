/**
 *
 * Created by msecret on 4/21/15.
 */

import redtape from 'redtape';
import sinon from 'sinon';

import Pool from '../../src/pool';

var sandbox;

var test = redtape({
  beforeEach: (cb) => {
    sandbox = sinon.sandbox.create();
    cb();
  },
  afterEach: (cb) => {
    sandbox.restore();
    cb();
  }
});

test('it exists', t => {
  t.ok(Pool, 'Pool exists');
  t.ok(Pool.acquire, 'Pool\'s methods exists');
  t.end();
});

test('getClassName() returns className if defined', t => {
  var testObj = {},
      expected = 'testClass',
      actual;

  testObj.className = expected;
  actual = Pool.getClassName(testObj);
  t.equal(actual, expected, 'Return expected className property');

  t.end();
});

test('getClassName() returns "array" if [] passed in', t => {
  var testMember = [],
      expected = 'array',
      actual;

  actual = Pool.getClassName(testMember);
  t.equal(actual, expected, 'Returns string "array"');

  t.end();
});

test('getClassName() returns "function" if () passed in', t => {
  var testMember = function() { },
    expected = 'function',
    actual;

  actual = Pool.getClassName(testMember);
  t.equal(actual, expected, 'Returns string "function"');

  t.end();
});

test('getClassName() returns "object" if {} passed in', t => {
  var testMember = {},
    expected = 'object',
    actual;

  actual = Pool.getClassName(testMember);
  t.equal(actual, expected, 'Returns string "object"');

  t.end();
});

test('getClassName() should return if className not a string', t => {
  var testMember = {},
      expected = 'object',
      actual;

  testMember.className = [];
  actual = Pool.getClassName(testMember);
  t.equal(actual, expected, 'Returns string "object"');
  t.end();
});
