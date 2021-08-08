import { config, createAsyncTypes } from '../src';

const defaultConfig = Object.assign({}, config);
beforeEach(() => {
  Object.assign(config, defaultConfig);
});

test('should throw if no type found', () => {
  expect(createAsyncTypes).toThrowError(/expected a string for type/);
});

test('should throw delimiter is not a string', () => {
  expect(() => createAsyncTypes('foo', null))
    .toThrowError(/expected a string for delimiter/);
});

test('should return default object with type', () => {
  const type = 'foo';
  const expected = {
    start: 'foo.start',
    next: 'foo.next',
    error: 'foo.error',
    complete: 'foo.complete',
  };
  const actual = createAsyncTypes('foo');
  expect(expected.start).toBe(actual.start);
  expect(expected.next).toBe(actual.next);
  expect(expected.error).toBe(actual.error);
  expect(expected.complete).toBe(actual.complete);
  expect(type).toBe('' + actual);
});

test('should respect delimiter arg', () => {
  const type = 'foo';
  const expected = {
    start: 'foo_start',
    next: 'foo_next',
    error: 'foo_error',
    complete: 'foo_complete',
  };
  const actual = createAsyncTypes('foo', '_');
  expect(expected.start).toBe(actual.start);
  expect(expected.next).toBe(actual.next);
  expect(expected.error).toBe(actual.error);
  expect(expected.complete).toBe(actual.complete);
  expect(type).toBe('' + actual);
});

test('should use config delimiter', () => {
  config.delimiter = '_';
  const type = 'foo';
  const expected = {
    start: 'foo_start',
    next: 'foo_next',
    error: 'foo_error',
    complete: 'foo_complete',
  };
  const actual = createAsyncTypes('foo');
  expect(expected.start).toBe(actual.start);
  expect(expected.next).toBe(actual.next);
  expect(expected.error).toBe(actual.error);
  expect(expected.complete).toBe(actual.complete);
  expect(type).toBe('' + actual);
});

test('should use config start', () => {
  config.start = 'START';
  const type = 'foo';
  const expected = {
    START: 'foo.START',
    next: 'foo.next',
    error: 'foo.error',
    complete: 'foo.complete',
  };
  const actual = createAsyncTypes('foo');
  expect(expected.START).toBe(actual.START);
  expect(expected.next).toBe(actual.next);
  expect(expected.error).toBe(actual.error);
  expect(expected.complete).toBe(actual.complete);
  expect(type).toBe('' + actual);
});

test('should use config next', () => {
  config.next = 'NEXT';
  const type = 'foo';
  const expected = {
    start: 'foo.start',
    NEXT: 'foo.NEXT',
    error: 'foo.error',
    complete: 'foo.complete',
  };
  const actual = createAsyncTypes('foo');
  expect(expected.start).toBe(actual.start);
  expect(expected.NEXT).toBe(actual.NEXT);
  expect(expected.error).toBe(actual.error);
  expect(expected.complete).toBe(actual.complete);
  expect(type).toBe('' + actual);
});

test('should use config error', () => {
  config.error = 'ERROR';
  const type = 'foo';
  const expected = {
    start: 'foo.start',
    next: 'foo.next',
    ERROR: 'foo.ERROR',
    complete: 'foo.complete',
  };
  const actual = createAsyncTypes('foo');
  expect(expected.start).toBe(actual.start);
  expect(expected.next).toBe(actual.next);
  expect(expected.ERROR).toBe(actual.ERROR);
  expect(expected.complete).toBe(actual.complete);
  expect(type).toBe('' + actual);
});

test('should use config complete', () => {
  config.complete = 'COMPLETE';
  const type = 'foo';
  const expected = {
    start: 'foo.start',
    next: 'foo.next',
    error: 'foo.error',
    COMPLETE: 'foo.COMPLETE',
  };
  const actual = createAsyncTypes(type);
  expect(expected.start).toBe(actual.start);
  expect(expected.next).toBe(actual.next);
  expect(expected.error).toBe(actual.error);
  expect(expected.COMPLETE).toBe(actual.COMPLETE);
  expect(type).toBe('' + actual);
});
