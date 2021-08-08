import { config, combineActions } from '../src';

test('should return a string', () => {
  expect(typeof combineActions('foo', 'bar')).toBe('string');
});

test('should combine types', () => {
  expect(combineActions('foo', 'bar')).toBe('foo' + config.separator + 'bar');
});
