import _ from 'lodash/fp';
import type { Reducer } from 'redux';

import { combineReducers } from '../src';

test('should throw if not an object', () => {
  // @ts-ignore
  expect(() => combineReducers()).toThrowError(/reducers.*object/i);
});

test('should return a function', () => {
  const foo = () => ({});
  expect(_.isFunction(combineReducers({ foo }))).toBe(true);
});

test('should change state per namespace', () => {
  const foo: Reducer = (state = 0, { type }) => (type === 'foo' ? 1 : state);
  const bar: Reducer = (state = 0, { type }) => (type === 'bar' ? 2 : state);

  const reducer = combineReducers({ foo, bar });

  expect(reducer({}, { type: 'foo' })).toEqual({ foo: 1, bar: 0 });
  expect(reducer({}, { type: 'bar' })).toEqual({ foo: 0, bar: 2 });
});

test('should change state per namespace for all ns', () => {
  const fooReducer: Reducer = (state = { val: 0 }, { type }) =>
    type === 'foo' ? { val: 1 } : state;
  const barReducer: Reducer = (state = { val: 0 }, { type }) =>
    type === 'foo' ? { val: 2 } : state;
  const reducer = combineReducers({ fooReducer, barReducer });

  expect(reducer({}, { type: 'foo' })).toEqual({
    fooReducer: { val: 1 },
    barReducer: { val: 2 },
  });
});

test('should change state with new ref', () => {
  const fooReducer: Reducer = (state = { val: 0 }, { type }) =>
    type === 'booo' ? { val: 1 } : state;
  const barReducer: Reducer = (state = { val: 0 }, { type }) =>
    type === 'bar' ? { val: 2 } : state;

  const reducer = combineReducers({ fooReducer, barReducer });
  const original = { barReducer: { val: 4 } };
  const actual = reducer(original, { type: 'booo' });

  expect(actual.fooReducer.val).toBe(1);
  expect(actual.barReducer.val).toBe(4);
  expect(original).not.toBe(actual);
});

test("should not change ref if state doesn't change", () => {
  const fooReducer: Reducer = (state = { val: 0 }, { type }) =>
    type === 'foo' ? { val: 1 } : state;
  const barReducer: Reducer = (state = { val: 0 }, { type }) =>
    type === 'bar' ? { val: 2 } : state;

  const reducer = combineReducers({ fooReducer, barReducer });
  const original = { fooReducer: { val: 0 }, barReducer: { val: 4 } };

  const actual = reducer(original, { type: 'booo' });

  expect(actual.fooReducer.val).toBe(0);
  expect(actual.barReducer.val).toBe(4);
  expect(original).toBe(actual);
});

test('should handle undefined state in final reducer', () => {
  const foo: Reducer = (state = 0, { type }) => (type === 'foo' ? 1 : state);
  const bar: Reducer = (state = 0, { type }) => (type === 'bar' ? 2 : state);

  const reducer = combineReducers({ foo, bar });
  const actual = reducer(undefined, { type: 'foo' });
  expect(actual.foo).toBe(1);
});
