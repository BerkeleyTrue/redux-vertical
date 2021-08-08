import { config, createTypes, createAsyncTypes } from '../src';

const defaultConfig = Object.assign({}, config);
beforeEach(() => {
  Object.assign(config, defaultConfig);
});

test('should throw if no types is not an array', () => {
  expect(createTypes).toThrowError(/expected a Array of strings for types/);
});

test('should throw if ns is not a string', () => {
  expect(() => createTypes([ 'foo' ], {}))
    .toThrowError(/expected a string for ns/);
  expect(() => createTypes([ 'foo' ], 'app', {}))
    .toThrowError(/expected a string for delimiter/);
});

test('should return an object', () => {
  const expected = {};
  const actual = createTypes([], 'app');
  expect(expected).toEqual(actual);
});

test('should add type keys to object', () => {
  const expected = { foo: 'app.foo' };
  const actual = createTypes([ 'foo' ], 'app');
  expect(expected).toEqual(actual);
});

test('should respect delimiter', () => {
  const expected = { foo: 'app_foo' };
  const actual = createTypes([ 'foo' ], 'app', '_');
  expect(expected).toEqual(actual);
});

test('should respect config delimiter', () => {
  config.delimiter = '_';
  const expected = { foo: 'app_foo' };
  const actual = createTypes([ 'foo' ], 'app');
  expect(expected).toEqual(actual);
});

test('should ignore non-strings', () => {
  const expected = { foo: 'app.foo' };
  const actual = createTypes([
    'foo',
    () => ({}),
  ], 'app');
  expect(expected).toEqual(actual);
});

test('should add async type keys to object', () => {
  const expected = {
    foo: 'app.foo',
    bar: {
      start: 'app.bar.start',
      next: 'app.bar.next',
      error: 'app.bar.error',
      complete: 'app.bar.complete',
    },
  };
  const actual = createTypes([
    'foo',
    createAsyncTypes('bar'),
  ], 'app');
  expect(expected.foo).toBe(actual.foo);
  expect(expected.bar.start).toBe(actual.bar.start);
  expect(expected.bar.next).toBe(actual.bar.next);
  expect(expected.bar.error).toBe(actual.bar.error);
  expect(expected.bar.complete).toBe(actual.bar.complete);
  expect('app.bar').toBe('' + actual.bar);
});

test('should ignore non-strings in async types objects', () => {
  const expected = {
    foo: 'app.foo',
    bar: {
      toString() {
        return 'bar';
      },
    },
  };
  const actual = createTypes(
    [
      'foo',
      {
        start: {},
        toString() {
          return 'bar';
        },
      },
    ],
    'app',
  );
  expect(expected.foo).toBe(actual.foo);
  expect('app.bar').toBe('' + actual.bar);
  expect(!!actual.bar.start).toBe(false);
});

test('should respect async keys', () => {
  config.shouldChangeAsyncKeys = true;
  config.start = 'START';
  const expected = {
    foo: 'app.foo',
    bar: {
      START: 'app.bar.START',
      next: 'app.bar.next',
      error: 'app.bar.error',
      complete: 'app.bar.complete',
    },
  };
  const actual = createTypes([
    'foo',
    createAsyncTypes('bar'),
  ], 'app');
  expect(expected.foo).toBe(actual.foo);
  expect(expected.bar.START).toBe(actual.bar.START);
  expect(expected.bar.next).toBe(actual.bar.next);
  expect(expected.bar.error).toBe(actual.bar.error);
  expect(expected.bar.complete).toBe(actual.bar.complete);
  expect('app.bar').toBe('' + actual.bar);
});
