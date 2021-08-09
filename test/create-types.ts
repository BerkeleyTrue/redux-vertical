import { config, createTypes } from '../src';

const defaultConfig = Object.assign({}, config);
beforeEach(() => {
  Object.assign(config, defaultConfig);
});

test('should throw if no types is not an array', () => {
  expect(createTypes).toThrowError(/expected a Array of strings for types/);
});

test('should throw if ns is not a string', () => {
  // @ts-ignore
  expect(() => createTypes({}, ['foo'])).toThrowError(
    /expected a string for ns/,
  );
});

test('should return an object', () => {
  const expected = {};
  const actual = createTypes('app', []);

  expect(expected).toEqual(actual);
});

test('should add type keys to object', () => {
  const expected = { foo: 'app.foo' };
  const actual = createTypes('app', ['foo']);

  expect(expected).toEqual(actual);
});

test('should respect config delimiter', () => {
  config.delimiter = '_';

  const expected = { foo: 'app_foo' };
  const actual = createTypes('app', ['foo']);

  expect(expected).toEqual(actual);
});
