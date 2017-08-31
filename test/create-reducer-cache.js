import test from 'ava';

import { createReducerCache } from '../src';

test('should throw if is not a function', t => {
  t.throws(
    () => createReducerCache(null),
    /reducers.*functions/
  );
});

test('should throw if function does not have namespace toString', t => {
  t.throws(
    () => createReducerCache(null),
    /reducers.*functions/
  );
});
