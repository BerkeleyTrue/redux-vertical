import { createTypes } from '../src';

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
