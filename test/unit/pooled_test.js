/**
 * Created by msecret on 4/13/15.
 */

import redtape from 'redtape';
import sinon from 'sinon';

import Pool from '../../src/pool';
import Pooled from '../../src/pooled';

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
  t.ok(Pool);
  t.ok(Pool.acquire);
  t.ok(Pooled);
  t.ok(Pooled.make);
  t.end();
});

test('make() returns a new object from the pool', t => {
  var expected = 'testExpected',
      actual;

  sandbox.stub(Pool, 'acquire', () => { return expected; });
  actual = Pooled.make();
  t.equal(actual, expected, 'returns expected from Pool.acquire');

  t.end();
});

test('free() returns undefined', t => {
  var actual;

  sandbox.stub(Pool, 'release', () => { return; });
  actual = Pooled.free();
  t.notOk(actual, 'Returns undefined');

  t.end();
});

test('get() pool returns the created pool', t => {
  var expected = 'testExpected',
    actual;

  sandbox.stub(Pool, 'getPool', () => { return expected; });
  actual = Pooled.pool;
  t.equal(actual, expected, 'returns expected from Pool.getPool');

  t.end();
});
