import { combineActions } from '../src';
import constants from '../src/constants';

test('should return a string', () => {
  expect(typeof combineActions('foo', 'bar')).toBe('string');
});

test('should combine types', () => {
  expect(combineActions('foo', 'bar')).toBe(
    'foo' + constants.separator + 'bar',
  );
});
