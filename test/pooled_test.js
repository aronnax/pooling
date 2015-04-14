/**
 * Created by msecret on 4/13/15.
 */

import test from 'tape';
import sinon from 'sinon';

import Pooled from '../src/pooled';

test('it exists', t => {
  console.log('poop');
  console.log(sinon);
  console.log(Pooled);
  t.ok(Pooled);
  t.end();
});
