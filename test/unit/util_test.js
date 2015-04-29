/**
 *
 * Created by msecret on 4/28/15.
 */

import redtape from 'redtape';

import util from '../../src/util';

var test = redtape();

test('cleanAnything() should remove all immediate properties from an object', t => {
  var testObj = {
    id:  3,
    testProp: 'test'
  };

  util.cleanAnything(testObj);

  t.ok(testObj, 'doesn\'t delete object');
  t.ok(!testObj.id, 'no more id property');
  t.ok(!testObj.testProp, 'no more testProp property');

  t.end();
});

test('should  not clear an objects prototype properties', t => {
  var testPrototype = {
      testProp1: 1
    },
    testObj;

  testObj = Object.create(testPrototype);
  testObj.testProp2 = 2;

  util.cleanAnything(testObj);

  t.ok(testObj, 'still defined');
  t.ok(!testObj.testProp2, 'removes testProp2');
  t.ok(testObj.testProp1, 'doesn\'t remove property on prototype');

  t.end();
});

test('should clear all keys of an array', t => {
  var testArray = [1,2,4,'test'];

  util.cleanAnything(testArray);

  t.equal(testArray.length, 0, 'the array has length of 0');
  t.ok(!testArray[1], 'at least first index removed');

  t.end();
});
