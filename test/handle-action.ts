import _ from 'lodash/fp';
import { combineActions, handleAction } from '../src';

test('should throw if type is not a string', () => {
  // @ts-ignore
  expect(() => handleAction()).toThrowError(/type should be a string/);
});

test('should throw if reducer is not an function/object/undefined', () => {
  // @ts-ignore
  expect(() => handleAction('foo', null)).toThrowError(
    /reducer.*should be a function/,
  );
});

test('should throw if default state undefined', () => {
  // @ts-ignore
  expect(() => handleAction('foo')).toThrowError(
    /defaultState.*should be defined/,
  );
});

test('should return a reducer', () => {
  const reducer = handleAction('foo', () => 1, 0);
  expect(_.isFunction(reducer)).toBe(true);
  expect(reducer(undefined, { type: 'foo' })).toBe(1);
});

test('reducer should return default state', () => {
  const reducer = handleAction('foo', () => 1, 0);
  expect(reducer(undefined, { type: 'INIT' })).toBe(0);
});

test('should work with combineActions', () => {
  const reducer = handleAction(
    combineActions('foo', 'bar'),
    (state, { type }) => Object.assign({}, state, { type }),
    {},
  );
  expect(reducer({ baz: 0, type: 'foo' }, { type: 'bar' })).toEqual({
    baz: 0,
    type: 'bar',
  });

  expect(reducer({ baz: 0, type: 'bar' }, { type: 'foo' })).toEqual({
    baz: 0,
    type: 'foo',
  });
});

test('should not mutate', () => {
  const reducer = handleAction(
    'foo',
    (state) => Object.assign({}, state, { val: 'foo' }),
    { val: 'notfoo' },
  );
  expect(reducer(undefined, { type: 'notfoo' })).toEqual({ val: 'notfoo' });
  const original = { val: 'notfoo' };
  const actual = reducer(original, { type: 'foo' });
  const actual2 = reducer(original, { type: 'notfoo' });
  expect(actual).toEqual({ val: 'foo' });
  expect(actual2).toEqual(original);
  expect(actual2).toBe(original);
});

test('should default reducer to identity', () => {
  const initState = {};
  const expectedState = {};
  const reducer = handleAction('foo', undefined, {});

  expect(reducer(initState, { type: 'foo' })).toEqual(initState);
});
