import combineActions from '../src/combine-actions';

test('should return a string', () => {
  expect(typeof combineActions('foo', 'bar')).toBe('string');
});
