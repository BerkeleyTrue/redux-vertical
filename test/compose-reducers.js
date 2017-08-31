import test from 'ava';

import { composeReducers } from '../src';

test('should throw if ns is not a string', t => {
  t.throws(() => composeReducers());
  t.notThrows(() => composeReducers('foo', s => s));
});

test('should return a reducer', t => {
  t.is(
    typeof composeReducers('foo', s => s),
    'function'
  );
  const reducer = composeReducers(
    'app',
    (state, { type }) => type === 'foo' ? 1 : state,
    (state, { type }) => type === 'bar' ? 2 : state
  );
  const actual0 = reducer(0, {});
  const actual1 = reducer(0, { type: 'foo' });
  const actual2 = reducer(0, { type: 'bar' });
  t.is(actual0, 0);
  t.is(actual1, 1);
  t.is(actual2, 2);
});

test('should stringify to ns', t => {
  const reducer = composeReducers(
    'app',
    (state, { type }) => type === 'foo' ? 1 : state,
    (state, { type }) => type === 'bar' ? 2 : state
  );
  t.is(
    String(reducer),
    'app'
  );
});
