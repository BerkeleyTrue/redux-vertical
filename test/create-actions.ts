import { createAction } from '../src';

test('should throw if type is Void', () => {
  // @ts-ignore
  expect(() => createAction()).toThrow();
});

test('should throw if payloadCreator is not Function|Void', () => {
  // @ts-ignore
  expect(() => createAction('foo', 'bar')).toThrow();
});

test('should return an action creator', () => {
  const ac = createAction('foo');
  expect(ac()).toEqual({ type: 'foo' });
});

test('should accept payloadCreator', () => {
  const ac = createAction('foo', () => 'bar');
  expect(ac()).toEqual({
    type: 'foo',
    payload: 'bar',
  });
});

test('should add error as only payload', () => {
  const ac = createAction('foo', () => 'bar');
  const payload = new Error('baz');
  expect(ac(payload, 1, 2)).toEqual({
    type: 'foo',
    payload: payload,
    error: true,
  });
});

test('should accept metaCreator function', () => {
  const ac = createAction('foo', undefined, () => 'bar');
  expect(ac()).toEqual({
    type: 'foo',
    meta: 'bar',
  });
});
