import test from 'ava';
import { handleActions } from '../src';

test('should throw if createHandlers is not a function', t => {
  t.throws(() => handleActions(null), /createHandlers.*function/);
});

test('should throw if createHandlers does not return a plain object', t => {
  t.throws(
    () => handleActions(() => null, {})({}, {}),
    /createHandlers.*plain object/,
  );
});

test('should return a reducer', t => {
  const types = { foo: 'foo' };
  const reducer = handleActions(() => ({ [types.foo]: () => 1 }), 0);
  t.is(reducer(0, { type: 'foo' }), 1);
  t.is(reducer(undefined, { type: 'bar' }), 0);
});

test('reducer should not mutate state', t => {
  const original = { key: 0, key2: 1 };
  const reducer = handleActions(
    () => ({ foo: state => Object.keys({}, state, { key: 1 }) }),
    {
      key: 4,
      key2: 2,
    },
  );
  const actual1 = reducer(original, { type: 'bar' });
  const actual2 = reducer(actual1, { type: 'foo' });
  t.is(original, actual1);
  t.deepEqual(original, actual1);
  t.not(actual1, actual2);
  t.not(original, actual2);
});

test('should stringify to namespace', t => {
  const types = { foo: 'foo' };
  const reducer = handleActions(() => ({ [types.foo]: () => 1 }), 0, 'foo');
  t.is('' + reducer, 'foo');
});
