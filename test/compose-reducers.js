import test from 'ava';

import { composeReducers } from '../src';

test('should throw if ns is not a string', t => {
  t.throws(() => composeReducers());
  t.notThrows(() => composeReducers('foo', s => s));
});

test('should return a reducer', t => {
  t.is(typeof composeReducers('foo', s => s), 'function');
  const reducer = composeReducers(
    'app',
    (state, { type }) => type === 'foo' ? 1 : state,
    (state, { type }) => type === 'bar' ? 2 : state,
  );
  const actual0 = reducer(0, {});
  const actual1 = reducer(0, { type: 'foo' });
  t.is(actual1, 1);
  const actual2 = reducer(0, { type: 'bar' });
  t.is(actual0, 0);
  t.is(actual2, 2);
});

test('should thread state through reducers', t => {
  t.is(typeof composeReducers('foo', s => s), 'function');
  const reducer = composeReducers(
    'app',
    (state, { type }) => type === 'foo' ? 1 : state,
    (state, { type }) => {
      t.is(state, 1);
      return type === 'foo' ? 2 : state;
    },
  );
  t.is(reducer(0, { type: 'foo' }), 2);
});

test('should not mutate state', t => {
  const reducer = composeReducers(
    'app',
    (state = {}, { type }) => type === 'foo' ? { foo: 1 } : state,
    (state = {}, { type }) => type === 'bar' ? { bar: 1 } : state,
  );
  const original = { foo: 2, bar: 2 };
  t.not(original, reducer(original, { type: 'bar' }));
  t.is(original, reducer(original, { type: 'hello' }));
});

test('should stringify to ns', t => {
  const reducer = composeReducers(
    'app',
    (state, { type }) => type === 'foo' ? 1 : state,
    (state, { type }) => type === 'bar' ? 2 : state,
  );
  t.is(String(reducer), 'app');
});
