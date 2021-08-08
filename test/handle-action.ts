import { config, createAsyncTypes, combineActions, handleAction } from '../src';

const defaultConfig = Object.assign({}, config);
beforeEach(() => {
  Object.assign(config, defaultConfig);
});

test('should throw if type is not a string', () => {
  expect(() => handleAction()).toThrowError(/type should be a string/);
});

test('should throw if reducer is not an function/object/undefined', () => {
  expect(() => handleAction('foo', null))
    .toThrowError(/reducer.*should be a function/);
});

test('should throw if default state undefined', () => {
  expect(() => handleAction('foo'))
    .toThrowError(/defaultState.*should be defined/);
});

test('should return a reducer', () => {
  const reducer = handleAction('foo', () => 1, 0);
  expect(typeof reducer).toBe('function');
  expect(reducer(undefined, { type: 'foo' })).toBe(1);
});

test('should accept reducer object', () => {
  const reducer = handleAction('foo', { next: () => 1, throw: () => 2 }, 0);
  expect(reducer(0, { type: 'foo' })).toBe(1);
  expect(reducer(0, { type: 'foo', error: true })).toBe(2);
  const reducer2 = handleAction('foo', { next: () => 1 }, 0);
  expect(reducer2(0, { type: 'foo' })).toBe(1);
});

test('reducer should return default state', () => {
  const reducer = handleAction('foo', () => 1, 0);
  expect(reducer(undefined, {})).toBe(0);
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

test('should work with async types', () => {
  const foo = createAsyncTypes('foo');
  const reducer = handleAction(
    foo,
    (state, { type }) => Object.assign({}, state, { type }),
    {},
  );

  expect(reducer({ baz: 0, type: 'bar' }, { type: foo.toString() })).toEqual({
    baz: 0,
    type: 'foo',
  });
});

test('should not mutate', () => {
  const reducer = handleAction(
    'foo',
    state => Object.assign({}, state, { val: 'foo' }),
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
