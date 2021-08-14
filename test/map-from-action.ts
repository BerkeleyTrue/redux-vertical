import _ from 'lodash/fp';
import mapFromAction from '../src/map-from-action';

test('should map action', () => {
  const reducer = mapFromAction(_.get('payload'), _.set('foo'));

  const actual = reducer({ foo: 'bar' }, { type: 'foo', payload: 'baz' });

  expect(actual.foo).toBe('baz');
});
