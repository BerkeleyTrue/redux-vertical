import test from 'ava';
import { handleActions } from '../src';

test('should throw if createHandlers is not a function', t => {
  t.throws(() => handleActions({}, null), /createHandlers.*function/);
});

test('should throw if createHandlers does not return a plain object', t => {
  t.throws(() => handleActions({}, () => null), /createHandlers.*plain object/);
});

test('should return a reducer', t => {
  const reducer = handleActions(
    { foo: 'foo' },
    types => ({ [types.foo]: () => 1 }),
    0,
  );
  t.is(reducer(0, { type: 'foo' }), 1);
  t.is(reducer(undefined, { type: 'bar' }), 0);
});

test('should stringify to namespace', t => {
  const reducer = handleActions(
    { foo: 'foo' },
    types => ({ [types.foo]: () => 1 }),
    0,
    'foo',
  );
  t.is('' + reducer, 'foo');
});
