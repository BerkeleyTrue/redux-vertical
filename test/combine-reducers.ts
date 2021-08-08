import sinon from 'sinon';

import { combineReducers } from '../src';

test('should throw if is not a function', () => {
  expect(() => combineReducers(null)).toThrowError(/reducers.*functions/);
});

test('should throw if function does not have namespace toString', () => {
  expect(() => combineReducers(() => ({})))
    .toThrowError(/reducers.*toString function/);
});

test('should return a function', () => {
  const foo = () => ({});
  foo.toString = () => 'foo';
  expect(typeof combineReducers(foo)).toBe('function');
});

test('should change state per namespace', () => {
  const fooReducer = (state = 0, { type }) => type === 'foo' ? 1 : state;
  const barReducer = (state = 0, { type }) => type === 'bar' ? 2 : state;
  fooReducer.toString = () => 'foo';
  barReducer.toString = () => 'bar';
  const reducer = combineReducers(fooReducer, barReducer);

  expect(reducer({}, { type: 'foo' })).toEqual({ foo: 1, bar: 0 });
  expect(reducer({}, { type: 'bar' })).toEqual({ foo: 0, bar: 2 });
});

test('should change state per namespace for all ns', () => {
  const fooReducer = (state = { val: 0 }, { type }) =>
    type === 'foo' ? { val: 1 } : state;
  const barReducer = (state = { val: 0 }, { type }) =>
    type === 'foo' ? { val: 2 } : state;
  fooReducer.toString = () => 'foo';
  barReducer.toString = () => 'bar';
  const reducer = combineReducers(fooReducer, barReducer);

  expect(reducer({}, { type: 'foo' })).toEqual({
    foo: { val: 1 },
    bar: { val: 2 },
  });
});

test('should create flat reducer', () => {
  const fooReducer = (state = { val: 0 }, { type }) =>
    type === 'foo' ? { val: 1 } : state;
  fooReducer.toString = () => 'foo';
  const barReducer = (state = { val: 0 }, { type }) =>
    type === 'bar' ? { val: 2 } : state;
  barReducer.toString = () => 'bar';
  const bazReducer = (state = { val: 0 }, { type }) =>
    type === 'baz' ? { val: 3 } : state;
  bazReducer.toString = () => 'baz';
  const booReducer = (state = { val: 0 }, { type }) =>
    type === 'boo' ? { val: 4 } : state;
  booReducer.toString = () => 'boo';
  const reducer = combineReducers(fooReducer, barReducer);
  const reducer2 = combineReducers(booReducer, bazReducer);
  const reducer3 = combineReducers(reducer, reducer2);

  expect(reducer3({}, { type: 'foo' })).toEqual({
    foo: { val: 1 },
    bar: { val: 0 },
    baz: { val: 0 },
    boo: { val: 0 },
  });
  expect(reducer3({}, { type: 'bar' })).toEqual({
    foo: { val: 0 },
    bar: { val: 2 },
    baz: { val: 0 },
    boo: { val: 0 },
  });
  expect(reducer3({}, { type: 'baz' })).toEqual({
    foo: { val: 0 },
    bar: { val: 0 },
    baz: { val: 3 },
    boo: { val: 0 },
  });
  expect(reducer3({}, { type: 'boo' })).toEqual({
    foo: { val: 0 },
    bar: { val: 0 },
    baz: { val: 0 },
    boo: { val: 4 },
  });
});

test('should filter out double entries', () => {
  const fooReducer = sinon.spy(
    (state = { val: 0 }, { type }) => type === 'foo' ? { val: 1 } : state,
  );
  fooReducer.toString = () => 'foo';
  const barReducer = sinon.spy(
    (state = { val: 0 }, { type }) => type === 'bar' ? { val: 2 } : state,
  );
  barReducer.toString = () => 'bar';
  const reducer = combineReducers(fooReducer, barReducer);
  const combined = combineReducers(reducer, reducer);
  const actual = combined(undefined, { type: 'foo' });
  expect(actual.foo.val).toBe(1);
  expect(fooReducer.callCount).toBe(1);
  expect(barReducer.callCount).toBe(1);
});

test("should not default other ns's out double entries", () => {
  const fooReducer = (state = { val: 0 }, { type }) =>
    type === 'booo' ? { val: 1 } : state;
  fooReducer.toString = () => 'booo';
  const barReducer = (state = { val: 0 }, { type }) =>
    type === 'bar' ? { val: 2 } : state;
  barReducer.toString = () => 'bar';
  const reducer = combineReducers(fooReducer, barReducer);
  const actual = reducer({ bar: { val: 4 } }, { type: 'booo' });
  expect(actual.booo.val).toBe(1);
  expect(actual.bar.val).toBe(4);
});

test('should change state with new ref', () => {
  const fooReducer = (state = { val: 0 }, { type }) =>
    type === 'booo' ? { val: 1 } : state;
  fooReducer.toString = () => 'booo';
  const barReducer = (state = { val: 0 }, { type }) =>
    type === 'bar' ? { val: 2 } : state;
  barReducer.toString = () => 'bar';
  const reducer = combineReducers(fooReducer, barReducer);
  const original = { bar: { val: 4 } };
  const actual = reducer(original, { type: 'booo' });
  expect(actual.booo.val).toBe(1);
  expect(actual.bar.val).toBe(4);
  expect(original).not.toBe(actual);
});

test("should not change ref is state doesn't change", () => {
  const fooReducer = (state = { val: 0 }, { type }) =>
    type === 'foo' ? { val: 1 } : state;
  fooReducer.toString = () => 'foo';
  const barReducer = (state = { val: 0 }, { type }) =>
    type === 'bar' ? { val: 2 } : state;
  barReducer.toString = () => 'bar';
  const reducer = combineReducers(fooReducer, barReducer);
  const original = { foo: { val: 0 }, bar: { val: 4 } };
  const actual = reducer(original, { type: 'booo' });
  expect(actual.foo.val).toBe(0);
  expect(actual.bar.val).toBe(4);
  expect(original).toBe(actual);
});
