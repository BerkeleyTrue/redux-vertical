import { handleActions } from '../src';

test('should throw if createHandlers is not a function', () => {
  expect(() => handleActions(null)).toThrowError(/createHandlers.*function/);
});

test('should throw if createHandlers does not return a plain object', () => {
  expect(() => handleActions(() => null, {})({}, {}))
    .toThrowError(/createHandlers.*plain object/);
});

test('should return a reducer', () => {
  const types = { foo: 'foo' };
  const reducer = handleActions(() => ({ [types.foo]: () => 1 }), 0);
  expect(reducer(0, { type: 'foo' })).toBe(1);
  expect(reducer(undefined, { type: 'bar' })).toBe(0);
});

test('reducer should not mutate state', () => {
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
  expect(original).toBe(actual1);
  expect(original).toEqual(actual1);
  expect(actual1).not.toBe(actual2);
  expect(original).not.toBe(actual2);
});

test('should stringify to namespace', () => {
  const types = { foo: 'foo' };
  const reducer = handleActions(() => ({ [types.foo]: () => 1 }), 0, 'foo');
  expect('' + reducer).toBe('foo');
});
