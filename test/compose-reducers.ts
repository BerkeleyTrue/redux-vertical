import { composeReducers } from '../src';

test('should throw if ns is not a string', () => {
  expect(() => composeReducers()).toThrow();
  expect(() => composeReducers('foo', s => s)).not.toThrow();
});

test('should return a reducer', () => {
  expect(typeof composeReducers('foo', s => s)).toBe('function');
  const reducer = composeReducers(
    'app',
    (state, { type }) => type === 'foo' ? 1 : state,
    (state, { type }) => type === 'bar' ? 2 : state,
  );
  const actual0 = reducer(0, {});
  const actual1 = reducer(0, { type: 'foo' });
  expect(actual1).toBe(1);
  const actual2 = reducer(0, { type: 'bar' });
  expect(actual0).toBe(0);
  expect(actual2).toBe(2);
});

test('should thread state through reducers', () => {
  expect(typeof composeReducers('foo', s => s)).toBe('function');
  const reducer = composeReducers(
    'app',
    (state, { type }) => type === 'foo' ? 1 : state,
    (state, { type }) => {
      expect(state).toBe(1);
      return type === 'foo' ? 2 : state;
    },
  );
  expect(reducer(0, { type: 'foo' })).toBe(2);
});

test('should not mutate state', () => {
  const reducer = composeReducers(
    'app',
    (state = {}, { type }) => type === 'foo' ? { foo: 1 } : state,
    (state = {}, { type }) => type === 'bar' ? { bar: 1 } : state,
  );
  const original = { foo: 2, bar: 2 };
  expect(original).not.toBe(reducer(original, { type: 'bar' }));
  expect(original).toBe(reducer(original, { type: 'hello' }));
});

test('should stringify to ns', () => {
  const reducer = composeReducers(
    'app',
    (state, { type }) => type === 'foo' ? 1 : state,
    (state, { type }) => type === 'bar' ? 2 : state,
  );
  expect(String(reducer)).toBe('app');
});
