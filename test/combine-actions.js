import test from 'ava';

import { combineActions } from '../src';

test('should return a string', t => {
  t.is(typeof combineActions('foo', 'bar'), 'string');
});
