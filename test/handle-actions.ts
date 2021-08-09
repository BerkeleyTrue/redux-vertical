import { handleActions } from '../src';

test('should throw if handlers is not a object', () => {
  // @ts-ignore
  expect(() => handleActions(null)).toThrowError(/handleActions.*object/);
});

test('should throw if handlers has non-function value', () => {
  // @ts-ignore
  expect(() => handleActions({ foo: null })).toThrowError(/function.*key/);
});

test('should return a reducer', () => {
  const types = { foo: 'foo' };
  const reducer = handleActions({ [types.foo]: () => 1 }, 0);
  expect(reducer(0, { type: 'foo' })).toBe(1);
  expect(reducer(undefined, { type: 'bar' })).toBe(0);
});

test('reducer should not mutate state', () => {
  const original = { key: 0, key2: 1 };
  const reducer = handleActions(
    { foo: (state) => ({ ...state, key: 1 }) },
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
